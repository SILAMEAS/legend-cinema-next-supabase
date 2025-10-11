import {ANY, TypeCreateUser} from "../commons/type";
import {EnumPropertyKey} from "../enum/EnumPropertyKey";
import {EnumTableName} from "../enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
import {_insertData} from "@/utils/api/__general";
import {Session, User} from "@supabase/auth-js";

/** ------------------------------------------------------ */
/** ---------------      GET SESSION     ----------------- */ 
/** ------------------------------------------------------ */  
export async function _getUserLogin(){
    const supabase =  await createClient();
    try {
      const res =  await supabase.auth.getSession();
      return res.data.session?.user;
    } catch (error: unknown) {
      throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */
/** ---------------      GET Profile     ----------------- */
/** ------------------------------------------------------ */ 
export async function _getProfile() {
    const supabase =  await createClient();
    try {
      const user = await _getUserLogin();
      return await supabase.from(EnumTableName.Profile).select().eq(EnumPropertyKey.user_id,user?.id).single();
    } catch (error: unknown) {
      throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */
/** ---------------      Create Profile     ----------------- */
/** ------------------------------------------------------ */
export async function _createProfile( data: {     user: User | null  ,   session: Session | null }) {
    try {
        const _email = data.user?.email;
        return await _insertData<TypeCreateUser>({
            tableName:EnumTableName.Profile,
            data:{
                email:`${_email}`,
                name:`${_email?.slice(0,5)}`,
                user_id:`${data.user?.id}`
            }
        });
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
