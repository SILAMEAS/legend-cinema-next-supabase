import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_offer extends baseColumn{
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.DESCRIPTION]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.VALID_UNTIL]:string,
    [EnumTableColum.DISCOUNT]?:string
}