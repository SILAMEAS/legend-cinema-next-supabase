import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface ICinemaResponse extends baseColumn{
    [EnumTableColum.NAME]:string,
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ADDRESS]:string,
    [EnumTableColum.PHONE]:string,
    [EnumTableColum.HOURS]:string,
    [EnumTableColum.ACTIVE]:boolean
}