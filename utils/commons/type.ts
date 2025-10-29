import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumSort} from "@/utils/enum/EnumSort";

export type ANY = any

export interface IStatus {
    [EnumTableColum.ID]: string | number,
    [EnumTableColum.NAME]: string
}

export interface IPagination<T> {
    contents: T[];
    page: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
    hasNext?: boolean;
    totalInvalid?: number;
}

export interface IPaginationRequest {
    page?: number;
    pageSize?: number;
    search?: string;
    orderBy?: string,
    orderDirection?: EnumSort,
    searchColumn?: EnumTableColum,
    date?: string | null
}

export interface IToast {
    show: boolean
    message: string
    type: "success" | "error" | "warning"
}
