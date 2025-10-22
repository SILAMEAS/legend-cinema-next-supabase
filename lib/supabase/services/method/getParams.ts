// utils/pagination.utils.ts
import { EnumSort } from "@/utils/enum/EnumSort";
import { EnumTableColum } from "@/utils/enum/EnumTableColum";

export interface PaginationParams {
    page: number;
    pageSize: number;
    search: string;
    orderBy: string;
    orderDirection: EnumSort;
    searchParams: URLSearchParams;
    searchColumn: EnumTableColum;
    date: string | null;
}

export function getParams(request: Request): PaginationParams {
    const { searchParams } = new URL(request.url);

    return {
        page: Math.max(1, Number(searchParams.get("page")) || 1),
        pageSize: Math.max(1, Number(searchParams.get("pageSize")) || 10),
        search: searchParams.get("search")?.trim() || "",
        orderBy: searchParams.get("orderBy") || "created_at",
        orderDirection: (searchParams.get("orderDirection") as EnumSort) || EnumSort.DESC,
        searchParams,
        searchColumn: (searchParams.get("searchColumn") as EnumTableColum) || EnumTableColum.NAME,
        date: searchParams.get("date")
    };
}