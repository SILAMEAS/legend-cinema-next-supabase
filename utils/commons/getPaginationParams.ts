import {EnumSort} from "@/utils/enum/EnumSort";

/**
 * Extracts pagination and sorting parameters from a Request URL.
 *
 * Example usage:
 * const { page, limit, search, orderBy, orderDirection } = getPaginationParams(request);
 */
export interface PaginationParams {
    page: number;
    limit: number;
    search: string;
    orderBy: string;
    orderDirection: EnumSort;
}

export function getPaginationParams(request: Request): PaginationParams {
    const { searchParams } = new URL(request.url);

    return {
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 10,
        search: searchParams.get("search") || "",
        orderBy: searchParams.get("orderBy") || "created_at",
        orderDirection:
            (searchParams.get("orderDirection") as EnumSort) || EnumSort.DESC,
    };
}
