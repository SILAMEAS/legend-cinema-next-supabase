import {createClient} from "@/lib/supabase/server";
import {ANY} from "@/utils/commons/type";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {EnumSort} from "@/utils/enum/EnumSort";
import {EnumCount} from "@/utils/enum/EnumCount";
import {PAGE_DEFAULT, PAGE_SIZE} from "@/utils/constants/constants";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";


interface Filter {
    column: string;
    operator: EnumOperator;
    value: ANY;
}

interface FetchOptions {
    page?: number;
    pageSize?: number;
    searchColumn?: string;
    searchValue?: string;
    orderBy?: string;
    orderDirection?: EnumSort.ASC | EnumSort.DESC;
    selected?: string;
    filters?: Filter[]; // 👈 added
    notNull?: string[];
}

/**
 * Generic Supabase pagination utility with filters and formatted output.
 */
export async function fetchPaginatedData<T>(
    table: string,
    options?: FetchOptions
) {
    const {
        page = PAGE_DEFAULT,
        pageSize = PAGE_SIZE,
        searchColumn,
        searchValue,
        orderBy =EnumTableColum.CREATED_AT,
        orderDirection = EnumSort.DESC,
        selected,
        filters = [],
        notNull=[]
    } = options || {};

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await createClient();

    let query = supabase
        .from(table)
        .select(selected ?? "*", {count: `${EnumCount.EXACT}`})
        .order(orderBy, {ascending: orderDirection === `${EnumSort.ASC}`})
        .range(from, to);

    // 🔍 Apply search
    if (searchColumn && searchValue) {
        query = query.ilike(searchColumn, `%${searchValue}%`);
    }

    // 🧩 Apply filters dynamically
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
}
