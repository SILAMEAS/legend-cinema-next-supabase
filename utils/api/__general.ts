import {ANY, typeFilters} from "@/utils/commons/type";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
/** ------------------------------------------------------ */

/** ---------------      Get One     ----------------- */

/** ------------------------------------------------------ */
export async function _get<T>({tableName, key, value, select}: {
    tableName: EnumTableName,
    key: string,
    value: number,
    select?: string
}) {
    const supabase = createClient();
    try {
        const res = await supabase.from(tableName).select(select ?? "*").eq(key, value);
        return {
            ...res,
            data: res.data as T,
        };
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      Gets     ----------------- */

/** ------------------------------------------------------ */
export async function _gets<T>({tableName, select, filters = [], notNull = []}: {
    tableName: EnumTableName,
    select?: string,
    filters?: Array<typeFilters>,
    notNull?: string[];
}) {
    const supabase = createClient();
    try {
        let query = supabase.from(tableName).select(select, {count: 'exact'});

        // Apply all filters
        for (const f of filters) {
            const {column, operator = "eq", value} = f;
            if (operator === "in" && Array.isArray(value)) {
                query = query.in(column, value);
            } else {
                query = (query as ANY)[operator](column, value);
            }
        }

        // Filter out null columns
        for (const col of notNull) {
            query = query.not(col, "is", null);
        }
        const res = await query;
        if (res.error) throw res.error;

        return {...res, data: res.data as T}
    } catch (error: unknown) {
        throw error instanceof Error ? error.message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      INSERT DATA     ----------------- */
/** ------------------------------------------------------ */
export async function _insert<T>({tableName, data}: { tableName: EnumTableName, data: T }) {
    const supabase = createClient();
    try {
        return await supabase
            .from(tableName)
            .insert([data])
            .select()
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      INSERT multiple DATA     ----------------- */
/** ------------------------------------------------------ */
export async function _inserts<T>({tableName, data}: { tableName: EnumTableName, data: Array<T> }) {
    const supabase = createClient();
    try {
        return await supabase
            .from(tableName)
            .insert(data)
            .select()
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      Delete One     ----------------- */

/** ------------------------------------------------------ */
export async function _delete({tableName, key, value}: { tableName: EnumTableName, key: string, value: string }) {
    const supabase = createClient();
    try {
        return await supabase.from(tableName).delete().eq(key, value)
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      Update     ----------------- */

/** ------------------------------------------------------ */
export async function _update<T>({tableName, key, value, newData, select}: {
    tableName: EnumTableName,
    key: string,
    value: string,
    newData: T,
    select?: string
}) {
    const supabase = createClient();
    try {
        const res = await supabase.from(tableName).update(newData).eq(key, value).select(select ?? "*");
        return {
            ...res,
            data: res.data as T,
        };
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */

/** ---------------      Gets As Pagination    ----------------- */

/** ------------------------------------------------------ */
export async function _getsAsPagination<T>({
                                   tableName,
                                   select = "*",
                                   filters = [],
                                   notNull = [],
                                   page = 1,
                                   limit = 10,
                                   orderBy,
                                   ascending = true,
                                   search,
                                   searchColumns = [],
                               }: {
    tableName: EnumTableName;
    select?: string;
    filters?: Array<typeFilters>;
    notNull?: string[];
    page?: number;
    limit?: number;
    orderBy?: string;
    ascending?: boolean;
    search?: string;            // search keyword
    searchColumns?: string[];   // columns to apply search
}) {
    const supabase = createClient();
    let loading = true;
    let error: string | null = null;

    try {
        // 1️⃣ Pagination range
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        // 2️⃣ Base query
        let query = supabase
            .from(tableName)
            .select(select, {count: "exact"})
            .range(from, to);

        // 3️⃣ Apply filters
        for (const f of filters) {
            const {column, operator = "eq", value} = f;
            if (operator === "in" && Array.isArray(value)) {
                query = query.in(column, value);
            } else {
                query = (query as ANY)[operator](column, value);
            }
        }

        // 4️⃣ Exclude null columns
        for (const col of notNull) {
            query = query.not(col, "is", null);
        }

        // 5️⃣ Search (case-insensitive match on one or more columns)
        if (search && searchColumns.length > 0) {
            query = query.or(
                searchColumns
                    .map((col) => `${col}.ilike.%${search}%`)
                    .join(",")
            );
        }

        // 6️⃣ Ordering
        if (orderBy) {
            query = query.order(orderBy, {ascending});
        }

        // 7️⃣ Execute
        const res = await query;
        if (res.error) throw res.error;

        loading = false;

        // 8️⃣ Return consistent structure
        return {
            data: res.data as T[],
            totalCount: res.count ?? 0,
            totalPages: Math.ceil((res.count ?? 0) / limit),
            currentPage: page,
            perPage: limit,
            loading,
            error,
        };
    } catch (err: any) {
        loading = false;
        error = err.message ?? "An error occurred";

        return {
            data: [] as T[],
            totalCount: 0,
            totalPages: 0,
            currentPage: page,
            perPage: limit,
            loading,
            error,
        };
    }
}
