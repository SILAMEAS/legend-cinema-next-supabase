import {EnumSort} from "@/utils/enum/EnumSort";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

/**
 * Extracts pagination and sorting parameters from a Request URL.
 *
 * Example usage:
 * const { page, limit, search, orderBy, orderDirection } = getPaginationParams(request);
 */
export interface PaginationParams {
    page: number;
    pageSize: number;
    search: string;
    orderBy: string;
    orderDirection: EnumSort;
    searchParams: URLSearchParams,
    searchColumn:EnumTableColum,
    date:string|null
}

export function getPaginationParams(request: Request): PaginationParams {
    const { searchParams } = new URL(request.url);

    return {
        page: Number(searchParams.get("page")) || 1,
        pageSize: Number(searchParams.get("pageSize")) || 10,
        search: searchParams.get("search") || "",
        orderBy: searchParams.get("orderBy") || "created_at",
        orderDirection:
            (searchParams.get("orderDirection") as EnumSort) || EnumSort.DESC,
        searchParams,
        searchColumn: (searchParams.get("searchColumn")??EnumTableColum.NAME) as EnumTableColum,
        date:searchParams.get("date")
    };
}
