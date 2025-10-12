import {_tb_profile} from "@/utils/api/supabase_tb/_tb_profile";
import {EnumRole} from "@/utils/enum/EnumRole";

export interface __format_profile extends Omit<_tb_profile, 'role_id'>{
    role:EnumRole
}