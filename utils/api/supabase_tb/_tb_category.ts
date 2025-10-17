import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_category extends baseColumn {
    [EnumTableColum.NAME]:string;
}