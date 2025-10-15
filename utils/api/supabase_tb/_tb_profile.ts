import {_tb_base} from "@/utils/api/supabase_tb/_tb_base";
import {EnumRole} from "@/utils/enum/EnumRole";

export interface _tb_profile extends _tb_base {
    name: string;
    email: string;
    role: {
        id: number,
        name: EnumRole
    };
}