import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IStatus} from "@/utils/commons/type";

export interface _tb_profile extends _tb_base{
    [EnumTableColum.NAME]:string;
    [EnumTableColum.EMAIL]:string;
    [EnumTableColum.ROLE]:IStatus;
}