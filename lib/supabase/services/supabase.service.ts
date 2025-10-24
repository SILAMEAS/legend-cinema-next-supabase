// services/supabase.service.ts
import { createClient } from "@/lib/supabase/config/client";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { EnumTableName } from "@/utils/enum/EnumTable";
import { EnumSort } from "@/utils/enum/EnumSort";
import { EnumCount } from "@/utils/enum/EnumCount";
import { PAGE_DEFAULT, PAGE_SIZE } from "@/utils/constants/constants";
import { EnumTableColum } from "@/utils/enum/EnumTableColum";
import { ANY } from "@/utils/commons/type";
import {
    InsertResult,
    PaginationOptions,
    PaginationResult,
    QueryFilter,
    SingleResult
} from "@/lib/supabase/services/type/type";
import {supabaseServiceRoleClient} from "@/lib/supabase/config/supabaseServiceRoleClient ";

export class SupabaseService {
    /** ----------------------
     * Centralized error handling
     ---------------------- */
    private async handleError(error: unknown): Promise<string> {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Database error:", error);
        return message;
    }

    /** ----------------------
     * Dynamic filter helper
     ---------------------- */
    private applyFilters(query: ANY, filters: QueryFilter[] = []): ANY {
        return filters.reduce((q, { column, operator = "eq", value }) => {
            if (operator === "in" && Array.isArray(value)) return q.in(column, value);
            return q[operator](column, value);
        }, query);
    }

    /** ----------------------
     * Not null helper
     ---------------------- */
    private applyNotNull(query: ANY, notNull: string[] = []): ANY {
        return notNull.reduce((q, column) => q.not(column, "is", null), query);
    }

    /** ----------------------
     * Find one record
     ---------------------- */
    async findOne<T>({
                         tableName,
                         key,
                         value,
                         select = "*",
                         serverTrusted = false
                     }: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
        select?: string;
        serverTrusted?: boolean;
    }): Promise<SingleResult<T>> {
        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();
            const { data, error } = await supabase.from(tableName).select(select).eq(key, value).single();
            if (error) throw error;
            return { data: data as T };
        } catch (error) {
            return { data: null, error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Find many records (with pagination)
     ---------------------- */
    async findMany<T>(
        table: string,
        options: PaginationOptions = {}
    ): Promise<PaginationResult<T>> {
        const {
            page = PAGE_DEFAULT,
            pageSize = PAGE_SIZE,
            searchColumn,
            searchValue,
            orderBy = EnumTableColum.CREATED_AT,
            orderDirection = EnumSort.DESC,
            select,
            filters = [],
            notNull = [],
            serverTrusted = false
        } = options;

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : await createServerSupabaseClient();

            let query = supabase
                .from(table)
                .select(select ?? "*", { count: `${EnumCount.EXACT}` })
                .order(orderBy, { ascending: orderDirection === EnumSort.ASC })
                .range(from, to);

            if (searchColumn && searchValue) query = query.ilike(searchColumn, `%${searchValue}%`);
            query = this.applyFilters(query, filters);
            query = this.applyNotNull(query, notNull);

            const { data, count, error } = await query;

            if (error) throw error;

            const total = count ?? 0;
            const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0;
            const hasNext = page * pageSize < total;

            return {
                contents: (data || []) as T[],
                page,
                pageSize,
                total,
                totalPages,
                hasNext,
                error: null
            };
        } catch (error) {
            return {
                contents: [],
                page,
                pageSize,
                total: 0,
                totalPages: 0,
                hasNext: false,
                error: await this.handleError(error)
            };
        }
    }

    /** ----------------------
     * Create single record
     ---------------------- */
    async create<T>(params: {
        tableName: EnumTableName;
        data: Partial<T>;
        select?: string;
        serverTrusted?: boolean; // optional flag for server inserts
    }): Promise<InsertResult<T>> {
        const { tableName, data, select = "*", serverTrusted = false } = params;

        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();

            // ✅ Remove `id` to let DB auto-generate it
            const insertData = { ...data };
            if ("id" in insertData) delete insertData.id;

            // ✅ Auto-cast numeric foreign keys if present
            if ("cinema_id" in insertData) insertData.cinema_id = Number(insertData.cinema_id);
            if ("movie_status_id" in insertData) insertData.movie_status_id = Number(insertData.movie_status_id);

            const { data: result, error } = await supabase
                .from(tableName)
                .insert([insertData])
                .select(select);

            if (error) throw error;

            return {
                data: result && result.length === 1 ? result[0] as T : result as T[]
            };
        } catch (error) {
            return { data: null, error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Create multiple records
     ---------------------- */
    async createMany<T>(params: {
        tableName: EnumTableName;
        data: Partial<T>[];
        select?: string;
        serverTrusted?: boolean;
    }): Promise<InsertResult<T[]>> {
        const { tableName, data, select = "*", serverTrusted = false } = params;

        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();

            const insertData = data.map(d => {
                const copy = { ...d };
                if ("id" in copy) delete copy.id;
                if ("cinema_id" in copy) copy.cinema_id = Number(copy.cinema_id);
                if ("movie_status_id" in copy) copy.movie_status_id = Number(copy.movie_status_id);
                return copy;
            });

            const { data: result, error } = await supabase
                .from(tableName)
                .insert(insertData)
                .select(select);

            if (error) throw error;

            return { data: result as T[] };
        } catch (error) {
            return { data: null, error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Update single record
     ---------------------- */
    async update<T>({
                        tableName,
                        key,
                        value,
                        data,
                        select = "*",
                        serverTrusted = false
                    }: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
        data: Partial<T>;
        select?: string;
        serverTrusted?: boolean;
    }): Promise<SingleResult<T>> {
        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();
            const { data: result, error } = await supabase
                .from(tableName)
                .update(data)
                .eq(key, value)
                .select(select)
                .single();
            if (error) throw error;
            return { data: result as T };
        } catch (error) {
            return { data: null, error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Update many records
     ---------------------- */
    async updateMany<T>({
                            tableName,
                            key,
                            values,
                            data,
                            select = "*",
                            serverTrusted = false
                        }: {
        tableName: EnumTableName;
        key: string;
        values: (string | number)[];
        data: Partial<T>;
        select?: string;
        serverTrusted?: boolean;
    }): Promise<InsertResult<T[]>> {
        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();
            const { data: result, error } = await supabase
                .from(tableName)
                .update(data)
                .in(key, values)
                .select(select);
            if (error) throw error;
            return { data: result as T[] };
        } catch (error) {
            return { data: null, error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Delete single record
     ---------------------- */
    async delete({
                     tableName,
                     key,
                     value,
                     serverTrusted = false
                 }: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
        serverTrusted?: boolean;
    }): Promise<{ error?: string }> {
        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();
            const { error } = await supabase.from(tableName).delete().eq(key, value);
            if (error) throw error;
            return {};
        } catch (error) {
            return { error: await this.handleError(error) };
        }
    }

    /** ----------------------
     * Delete many records
     ---------------------- */
    async deleteMany({
                         tableName,
                         key,
                         values,
                         serverTrusted = false
                     }: {
        tableName: EnumTableName;
        key: string;
        values: (string | number)[];
        serverTrusted?: boolean;
    }): Promise<{ error?: string }> {
        try {
            const supabase = serverTrusted ? supabaseServiceRoleClient : createClient();
            const { error } = await supabase.from(tableName).delete().in(key, values);
            if (error) throw error;
            return {};
        } catch (error) {
            return { error: await this.handleError(error) };
        }
    }
}

export const supabaseService = new SupabaseService();
