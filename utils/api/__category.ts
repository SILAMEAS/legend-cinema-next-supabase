import {EnumTableName} from "@/utils/enum/EnumTable";
import {_get, _gets} from "@/utils/api/__general";
import {_tb_category} from "@/utils/api/supabase_tb/_tb_category";
import {EnumPropertyKey} from "@/utils/enum/EnumPropertyKey";


export async function _getCategories() {
    return await _gets<Array<_tb_category>>({tableName: EnumTableName.Category})
}

export async function _getCategoryId(id: number) {
    return await _get<_tb_category>({tableName: EnumTableName.Category, key: EnumPropertyKey.id, value: id})
}