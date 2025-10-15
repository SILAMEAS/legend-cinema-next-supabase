import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_category extends _tb_base {
    [EnumTableColum.NAME]:string;
}