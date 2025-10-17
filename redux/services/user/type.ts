import {baseColumn} from "@/utils/BaseColumn";
import {EnumRole} from "@/utils/enum/EnumRole";
import {Session, User} from "@supabase/auth-js";

export interface type extends baseColumn {
    name: string;
    email: string;
    role: {
        id: number,
        name: EnumRole
    };
}
export interface IUserResponse {
    id:string,
    name: string;
    email: string;
    role:string,
}

export interface IUserRequest{
    user: User | null
    session: Session | null
}