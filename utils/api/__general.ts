
import {ANY} from "@/utils/commons/type";
import {logCallingAPI} from "@/utils/commons/log";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
/** ------------------------------------------------------ */
/** ---------------      Get One     ----------------- */

/** ------------------------------------------------------ */
export async function _get<T>({tableName,key,value,select}:{tableName:EnumTableName,key:string,value:number,select?:string}) {
    const supabase =  createClient();
    try {
        logCallingAPI("_get",tableName);
        const res =  await supabase.from(tableName).select(select??"*").eq(key,value);
        return {
            ...res,
            data: res.data as T,
        };
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */
/** ---------------      Gets     ----------------- */

/** ------------------------------------------------------ */
export async function _gets<T>({tableName,select}:{tableName:EnumTableName,select?:string}) {
    const supabase =  createClient();
    try {
        logCallingAPI("_gets",tableName);
        const res =   await supabase.from(tableName).select(select??"*");
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
export async function _insert<T>({tableName,data}:{tableName:EnumTableName,data:T}) {
    const supabase = createClient();
    try {
        logCallingAPI("_insert",tableName);
        return await supabase
            .from(tableName)
            .insert([data])
            .select()
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */
/** ---------------      INSERT multiple DATA     ----------------- */
/** ------------------------------------------------------ */
export async function _inserts<T>({tableName,data}:{tableName:EnumTableName,data:Array<T>}) {
    const supabase = createClient();
    try {
        logCallingAPI("_inserts",tableName);
        return await supabase
            .from(tableName)
            .insert(data)
            .select()
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}
/** ------------------------------------------------------ */
/** ---------------      Delete One     ----------------- */

/** ------------------------------------------------------ */
export async function _delete({tableName,key,value}:{tableName:EnumTableName,key:string,value:string}) {
    const supabase =  createClient();
    try {
        logCallingAPI("_delete",tableName);
        return  await supabase.from(tableName).delete().eq(key,value)
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}

/** ------------------------------------------------------ */
/** ---------------      Update     ----------------- */

/** ------------------------------------------------------ */
export async function _update<T>({tableName,key,value,newData,select}:{tableName:EnumTableName,key:string,value:string,newData:T,select?:string}) {
    const supabase =  createClient();
    try {
        logCallingAPI("_update",tableName);
        const res =  await supabase.from(tableName).update(newData).eq(key,value).select(select??"*");
        return {
            ...res,
            data: res.data as T,
        };
    } catch (error: unknown) {
        throw error instanceof Error ? (error as ANY).message : "An error occurred";
    }
}