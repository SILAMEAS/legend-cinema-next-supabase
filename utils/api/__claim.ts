/** ------------------------------------------------------ */
/** ---------------      GET SESSION     ----------------- */
import {createClient} from "@/lib/supabase/server";
import {ANY} from "@/utils/commons/type";
import {User} from "@supabase/auth-js";

/** ------------------------------------------------------ */
export async function _getUser():Promise<User>{

    try {
        const supabase = await createClient();
        return await supabase.auth.getUser().then(r=>{
            if(r.data.user===null){
                throw new Error("User null");
            }
            return r.data.user;
        })
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}