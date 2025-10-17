import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_banner extends baseColumn {
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ALT]:string

}