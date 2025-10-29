import {baseColumn} from "@/utils/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface ICinemaResponse extends baseColumn{
    [EnumTableColum.NAME]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ADDRESS]:string,
    [EnumTableColum.PHONE]:string,
    [EnumTableColum.HOURS]:string,
    [EnumTableColum.ACTIVE]:boolean
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

