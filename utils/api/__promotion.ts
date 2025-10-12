import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_promotion} from "@/utils/api/supabase_tb/_tb_promotion";

export async function _insertPromotions<T extends _tb_promotion>(data: Array<T>) {
    return await _inserts<T>({tableName: EnumTableName.Promotion, data})
}

export async function _getPromotions() {
    return await _gets<Array<_tb_promotion>>({tableName: EnumTableName.Promotion})
}