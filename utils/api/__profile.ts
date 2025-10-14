import {ANY, TypeCreateProfile, TypeCreateUser} from "../commons/type";
import {EnumPropertyKey} from "../enum/EnumPropertyKey";
import {EnumTableName} from "../enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
import {_insert} from "@/utils/api/__general";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {__format_profile} from "@/utils/api/format_response/__format_profile";


/** ------------------------------------------------------ */

/** ---------------      GET Profile     ----------------- */
/** ------------------------------------------------------ */
export async function _getProfile(userId: string | number) {
    const supabase = createClient();
    try {
        const res = await supabase.from(EnumTableName.Profile).select(
            `
            ${EnumTableColum.ID},
            ${EnumTableColum.NAME},
            ${EnumTableColum.EMAIl},
            role:Role(role)
            `
        ).eq(EnumPropertyKey.user_id, userId).single();

        const data = res.data;
        if (res.error || userId === null) {
            throw new Error(res.error?.message ?? 'User null')
        }

        // 🧠 Transform the nested structure into flat one
        const formatted = {
            ...data,
            user_id: userId,
            role: (res.data?.role as ANY).role, // flatten role object
        };

        return {
            ...res,
            data: formatted as unknown as __format_profile
        }
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
