/** ------------------------------------------------------ */
/** ---------------      GET SESSION     ----------------- */
import {createClient} from "@/lib/supabase/client";
import {ANY} from "@/utils/commons/type";
import {Session} from "@supabase/auth-js";
import {_getProfile} from "@/utils/api/__profile";
import {_tb_profile} from "@/utils/api/supabase_tb/_tb_profile";
import {EnumRole} from "@/utils/enum/EnumRole";


/** ------------------------------------------------------ */
export async function _getCurrentUser(): Promise<{ session: Session | null, profile: _tb_profile | null }> {

    try {
        const supabase = createClient();
        const session = await supabase.auth.getSession().then(r => r.data.session);
        const userId = session?.user?.id;
        if (userId) {
            const profile = await _getProfile(userId).then(r => r.data);
            return {session, profile};
        }
        return {session, profile: null}
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */
export async function _checkRole(): Promise<{ isUser: boolean, isAdmin: boolean }> {
    const {profile} = await _getCurrentUser();
    if (!profile) {
        throw Error("Not logged in");
    }
    const response: { isUser: boolean, isAdmin: boolean } = {isAdmin: false, isUser: false};
    const role = profile.role.name;
    switch (role) {
        case EnumRole.ADMIN:
            return {...response, isAdmin: true};
        case EnumRole.USER:
            return {...response, isUser: true};
        default:
            return response;
    }
}