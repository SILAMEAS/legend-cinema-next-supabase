
import {ANY} from "@/utils/commons/type";
import {logCallingAPI} from "@/utils/commons/log";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
/** ------------------------------------------------------ */
/** ---------------      Get One     ----------------- */

/** ------------------------------------------------------ */
export async function _get({tableName,key,value}:{tableName:string,key:string,value:string}) {
    const supabase =  await createClient();
    try {
        return  await supabase.from(tableName).select().eq(key,value)
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */
/** ---------------      Gets     ----------------- */

/** ------------------------------------------------------ */
export async function _gets<T>({tableName}:{tableName:EnumTableName}) {
    const supabase =  await createClient();
    try {
        logCallingAPI("_gets",tableName);
        const res =   await supabase.from(tableName).select("*");
        return {
            ...res,
            data: res.data as T,
        };
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */
/** ---------------      INSERT DATA     ----------------- */
/** ------------------------------------------------------ */
export async function _insertData<T>({tableName,data}:{tableName:EnumTableName,data:T}) {
    const supabase =  await createClient();
    try {
        return await supabase
            .from(tableName)
            .insert([data])
            .select()
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
