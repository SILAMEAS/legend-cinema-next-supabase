/** ------------------------------------------------------ */
/** ---------------      GET SESSION     ----------------- */
import {createClient} from "@/lib/supabase/server";
import {ANY} from "@/utils/commons/type";
import {User} from "@supabase/auth-js";
import {_getProfile} from "@/utils/api/__profile";
import {_tb_profile} from "@/utils/api/supabase_tb/_tb_profile";

type _getCurrentUserInterface = _tb_profile & Omit<User, keyof _tb_profile | "role">;

/** ------------------------------------------------------ */
export async function _getCurrentUser(): Promise<_getCurrentUserInterface> {

    try {
        const supabase = await createClient();
        const user = await supabase.auth.getUser().then(r => {
            if (r.data.user === null) {
                throw new Error("User null");
            }
            return r.data.user;
        })
        const profile = await _getProfile(user.id).then(r => r.data);
        return {user, profile} as unknown as _getCurrentUserInterface;
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */
export async function _checkRole(): Promise<{ isUser: boolean, isAdmin: boolean }> {
    const getCurrentUser = await _getCurrentUser();
    console.log("--------------------getCurrentUser", getCurrentUser)
    const isAdmin = true;
    const isUser = true;
    return {isUser, isAdmin};
}