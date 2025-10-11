import { SupabaseClient } from "@supabase/supabase-js";

export interface TypeCreateUser{
    email:string,
    name:string,
    user_id:string
}

export type ANY=any
export type UNKONWN=unknown

export type TypeSupabase = SupabaseClient<ANY, "public", "public", ANY, ANY>;
