import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface _tb_banner extends _tb_base {
    [EnumTableColum.IMAGE]:string,
    [EnumTableColum.ALT]:string

}