import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_offer extends _tb_base{
    [EnumTableColum.TITLE]:string,
    [EnumTableColum.DESCRIPTION]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.VALID_UNTIL]:string,
    [EnumTableColum.DISCOUNT]?:string
}