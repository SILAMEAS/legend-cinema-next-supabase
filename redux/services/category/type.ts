import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export interface ICategoryResponse extends baseColumn {
    [EnumTableColum.NAME]: string;
}