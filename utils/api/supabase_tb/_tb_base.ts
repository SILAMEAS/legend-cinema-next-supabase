import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_base{
    [EnumTableColum.ID]:number,
    [EnumTableColum.CREATED_AT]?:string
}