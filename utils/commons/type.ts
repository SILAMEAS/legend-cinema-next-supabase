import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumSort} from "@/utils/enum/EnumSort";
import React, {Dispatch, SetStateAction} from "react";
import {IMovieResponse} from "@/redux/services/movie/type";

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

export interface IDeleteCinemaModal {
    show: boolean;
    cinemaId: number | null;
    cinemaName: string
}

export interface IModalCreateCinemaFormData {
    name: string,
    address: string,
    phone: string,
    email: string,
    hours: string,
    screens: string,
    seats: string,
    facilities: Array<string>,
}

export interface IEditMovieModal {
    show: boolean;
    movie?: IMovieResponse
}
export interface IEditMovieModalProps {
    editModal: IEditMovieModal,
    setEditModal: Dispatch<SetStateAction<IEditMovieModal>>,
    setToast: Dispatch<SetStateAction<IToast | null>>
}
