// types/supabase.types.ts
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {EnumSort} from "@/utils/enum/EnumSort";
import {ANY} from "@/utils/commons/type";


export interface SingleResult<T> {
    data: T | null;
    error?: string | null;
}

// Types
export interface QueryFilter {
    column: string;
    operator: EnumOperator;
    value: ANY;
}

export interface PaginationOptions {
    page?: number;
    pageSize?: number;
    searchColumn?: string;
    searchValue?: string;
    orderBy?: string;
    orderDirection?: EnumSort.ASC | EnumSort.DESC;
    select?: string;
    filters?: QueryFilter[];
    notNull?: string[];
}

export interface PaginationResult<T> {
    contents: T[];
    hasNext: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    error: string | null;
}

export interface SingleResult<T> {
    data: T | null;
    error?: string | null;
}

export interface InsertResult<T> {
    data: T | T[] | null;
    error?: string | null;
}