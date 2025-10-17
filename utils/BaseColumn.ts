import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface baseColumn {
    [EnumTableColum.ID]:number,
    [EnumTableColum.CREATED_AT]?:string
}