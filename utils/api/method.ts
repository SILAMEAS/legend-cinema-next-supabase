import { SupabaseClient } from "@supabase/supabase-js";
import { ANY, TypeSupabase, UNKONWN } from "./type";
import { EnumPropertyKey } from "../enum/EnumPropertyKey";
import { EnumTableName } from "../enum/EnumTable";

/** ------------------------------------------------------ */
/** ---------------      GET SESSION     ----------------- */ 
/** ------------------------------------------------------ */  
export async function _get_user_login(supabase: TypeSupabase){

  let isLoading = false;
  let errorMessage = undefined;
    try {
      const res =  await supabase.auth.getSession();
      if (res.error) throw res.error;
      return res.data.session?.user;
    } catch (error: UNKONWN) {
      errorMessage = error instanceof Error ? (error as ANY).message : "An error occurred";
    } finally {
      isLoading = false;
    }
}
/** ------------------------------------------------------ */
/** ---------------      INSERT DATA     ----------------- */ 
/** ------------------------------------------------------ */ 
export async function _db_insert_data<T>({supabase,tableName,data}:{supabase: TypeSupabase,tableName:string,data:T}) {
  let isLoading = false;
  let errorMessage = undefined;
    try {
      const res = await await supabase
      .from(tableName)
      .insert([data])
      .select()
      if (res.error) throw res.error;
      return res;
    } catch (error: UNKONWN) {
      errorMessage = error instanceof Error ? (error as ANY).message : "An error occurred";
    } finally {
      isLoading = false;
    }
}
/** ------------------------------------------------------ */
/** ---------------      VIEW   DATA     ----------------- */ 
/** ------------------------------------------------------ */ 
export async function _db_view_data({supabase,tableName,key,value}:{supabase:TypeSupabase,tableName:string,key:string,value:string}) {
  let isLoading = false;
  let errorMessage = undefined;
    try {
      const res = await supabase.from(tableName).select().eq(key,value)
      if (res.error) throw res.error;
      return res;
    } catch (error: UNKONWN) {
      errorMessage = error instanceof Error ? (error as ANY).message : "An error occurred";
    } finally {
      isLoading = false;
    }
}

/** ------------------------------------------------------ */
/** ---------------      GET   Profile     ----------------- */ 
/** ------------------------------------------------------ */ 
export async function __get_profile(supabase:TypeSupabase) {
  let isLoading = false;
  let errorMessage = undefined;
    try {
      const user = await _get_user_login(supabase);
      const res = await supabase.from(EnumTableName.Profile).select().eq(EnumPropertyKey.user_id,user?.id).single();
      if (res.error) throw res.error;
      return res;
    } catch (error: UNKONWN) {
      errorMessage = error instanceof Error ? (error as ANY).message : "An error occurred";
    } finally {
      isLoading = false;
    }
}