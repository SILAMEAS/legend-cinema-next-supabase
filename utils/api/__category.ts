import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets} from "@/utils/api/__general";
import {_tb_category} from "@/utils/api/supabase_tb/_tb_category";


export async function _getCategories() {
    const res = await _gets<Array<_tb_category>>({tableName: EnumTableName.Category});
    console.log("_getCategories", res)
    return res;
}
