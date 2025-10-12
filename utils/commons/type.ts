import { SupabaseClient } from "@supabase/supabase-js";
import {EnumOperator} from "@/utils/enum/EnumOperator";

export interface TypeCreateUser{
    email:string,
    name:string,
    user_id:string
}

export type ANY=any
export type UNKONWN=unknown

export type TypeSupabase = SupabaseClient<ANY, "public", "public", ANY, ANY>;



export type IBasePageProps = {
    searchParams: { category?: string; page?: string };
}
export type typeFilters = {
    column: string;
    operator?:keyof typeof EnumOperator;
    value: string | number | string[];
};