// services/supabase.service.ts
import {createClient} from "@/lib/supabase/config/client";
import {createClient as createServerClient} from "@/lib/supabase/server";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {EnumSort} from "@/utils/enum/EnumSort";
import {EnumCount} from "@/utils/enum/EnumCount";
import {PAGE_DEFAULT, PAGE_SIZE} from "@/utils/constants/constants";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {ANY} from "@/utils/commons/type";
import {InsertResult, PaginationOptions, PaginationResult, QueryFilter, SingleResult} from "@/lib/supabase/services/type/type";


class SupabaseService {
    private async handleError(error: unknown): Promise<string> {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        console.error("Database error:", error);
        return errorMessage;
    }

    private applyFilters(query: ANY, filters: QueryFilter[] = []) {
        let filteredQuery = query;

        for (const filter of filters) {
            const {column, operator = "eq", value} = filter;

            if (operator === "in" && Array.isArray(value)) {
                filteredQuery = filteredQuery.in(column, value);
            } else {
                filteredQuery = filteredQuery[operator](column, value);
            }
        }

        return filteredQuery;
    }

    private applyNotNull(query: ANY, notNull: string[] = []) {
        let resultQuery = query;

        for (const column of notNull) {
            resultQuery = resultQuery.not(column, "is", null);
        }

        return resultQuery;
    }


    /** -----------------------------------------
     findOne
     ----------------------------------------- */
    async findOne<T>(params: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
        select?: string;
    }): Promise<SingleResult<T>> {
        const {tableName, key, value, select = "*"} = params;

        try {
            const supabase = createClient();
            const {data, error} = await supabase
                .from(tableName)
                .select(select)
                .eq(key, value)
                .single();

            if (error) throw error;

            return {data: data as T};
        } catch (error) {
            return {data: null, error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     findMany
     ----------------------------------------- */
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
            notNull = []
        } = options;

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        try {
            const supabase = await createServerClient();

            let query = supabase
                .from(table)
                .select(select ?? "*", {count: `${EnumCount.EXACT}`})
                .order(orderBy, {ascending: orderDirection === `${EnumSort.ASC}`})
                .range(from, to);

            // 🔍 Apply search
            if (searchColumn && searchValue) {
                query = query.ilike(searchColumn, `%${searchValue}%`);
            }

            // 🧩 Apply filters dynamically
            query = this.applyFilters(query, filters);
            query = this.applyNotNull(query, notNull);

            const {data, count, error} = await query;

            if (error) {
                console.error(`❌ Error fetching ${table}:`, error);
                return {
                    contents: [],
                    hasNext: false,
                    page,
                    pageSize,
                    total: 0,
                    totalPages: 0,
                    error: error.message,
                };
            }

            const total = count ?? 0;
            const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0;
            const hasNext = page * pageSize < total;

            return {
                contents: (data || []) as T[],
                hasNext,
                page,
                pageSize,
                total,
                totalPages,
                error: null,
            };
        } catch (error) {
            return {
                contents: [],
                hasNext: false,
                page,
                pageSize,
                total: 0,
                totalPages: 0,
                error: await this.handleError(error),
            };
        }
    }

    // Create operations
    async create<T>(params: {
        tableName: EnumTableName;
        data: Partial<T>;
        select?: string;
    }): Promise<InsertResult<T>> {
        const {tableName, data, select = "*"} = params;

        try {
            const supabase = createClient();
            const {data: result, error} = await supabase
                .from(tableName)
                .insert([data])
                .select(select);

            if (error) throw error;

            return {
                data: result && result.length === 1 ? result[0] as T : result as T[]
            };
        } catch (error) {
            return {data: null, error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     createMany
     ----------------------------------------- */
    async createMany<T>(params: {
        tableName: EnumTableName;
        data: Partial<T>[];
        select?: string;
    }): Promise<InsertResult<T[]>> {
        const {tableName, data, select = "*"} = params;

        try {
            const supabase = createClient();
            const {data: result, error} = await supabase
                .from(tableName)
                .insert(data)
                .select(select);

            if (error) throw error;

            return {data: result as T[]};
        } catch (error) {
            return {data: null, error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     update
     ----------------------------------------- */
    async update<T>(params: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
        data: Partial<T>;
        select?: string;
    }): Promise<SingleResult<T>> {
        const {tableName, key, value, data, select = "*"} = params;

        try {
            const supabase = createClient();
            const {data: result, error} = await supabase
                .from(tableName)
                .update(data)
                .eq(key, value)
                .select(select)
                .single();

            if (error) throw error;

            return {data: result as T};
        } catch (error) {
            return {data: null, error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     updateMany
     ----------------------------------------- */

    async updateMany<T>(params: {
        tableName: EnumTableName;
        key: string;
        values: (string | number)[];
        data: Partial<T>;
        select?: string;
    }): Promise<InsertResult<T[]>> {
        const {tableName, key, values, data, select = "*"} = params;

        try {
            const supabase = createClient();
            const {data: result, error} = await supabase
                .from(tableName)
                .update(data)
                .in(key, values)
                .select(select);

            if (error) throw error;

            return {data: result as T[]};
        } catch (error) {
            return {data: null, error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     delete
     ----------------------------------------- */
    async delete(params: {
        tableName: EnumTableName;
        key: string;
        value: string | number;
    }): Promise<{ error?: string }> {
        const {tableName, key, value} = params;

        try {
            const supabase = createClient();
            const {error} = await supabase
                .from(tableName)
                .delete()
                .eq(key, value);

            if (error) throw error;

            return {};
        } catch (error) {
            return {error: await this.handleError(error)};
        }
    }

    /** -----------------------------------------
     deleteMany
     ----------------------------------------- */
    async deleteMany(params: {
        tableName: EnumTableName;
        key: string;
        values: (string | number)[];
    }): Promise<{ error?: string }> {
        const {tableName, key, values} = params;

        try {
            const supabase = createClient();
            const {error} = await supabase
                .from(tableName)
                .delete()
                .in(key, values);

            if (error) throw error;

            return {};
        } catch (error) {
            return {error: await this.handleError(error)};
        }
    }
}

export const supabaseService = new SupabaseService();