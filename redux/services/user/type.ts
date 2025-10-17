import {baseColumn} from "@/utils/api/supabase_tb/BaseColumn";
import {EnumRole} from "@/utils/enum/EnumRole";

export interface type extends baseColumn {
    name: string;
    email: string;
    role: {
        id: number,
        name: EnumRole
    };
}
// export interface IUser extends baseColumn{
//     id:string,
//     name: string;
//     email: string;
//     role: {
//         id: number,
//         name: EnumRole
//     };
// }