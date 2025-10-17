import {ANY, TypeCreateProfile, TypeCreateUser} from "../commons/type";
import {EnumPropertyKey} from "../enum/EnumPropertyKey";
import {EnumTableName} from "../enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
import {_insert} from "@/utils/api/__general";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {type} from "@/redux/services/user/type";


/** ------------------------------------------------------ */

/** ---------------      GET Profile     ----------------- */
/** ------------------------------------------------------ */
export async function _getProfile(userId: string) {
    const supabase = createClient();
    try {
        const res = await supabase.from(EnumTableName.Profile).select(
            `
            ${EnumTableColum.ID},
            ${EnumTableColum.NAME},
            ${EnumTableColum.EMAIL},
            role:Role(id,name)
            `
        ).eq(EnumPropertyKey.user_id, userId).single();
        if (res.error || userId === null) {
            throw new Error(res.error?.message ?? 'User null')
        }
        return {...res,data:res.data as unknown as type};
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */

/** ---------------      Create Profile     ----------------- */
/** ------------------------------------------------------ */
export async function _createProfile(data: TypeCreateProfile) {
    try {
        const _email = data.user?.email;
        return await _insert<TypeCreateUser>({
            tableName: EnumTableName.Profile,
            data: {
                email: `${_email}`,
                name: `${_email?.slice(0, 5)}`,
                user_id: `${data.user?.id}`
            }
        });
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
