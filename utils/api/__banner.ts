import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_banner} from "@/utils/api/supabase_tb/_tb_banner";

export async function _insertBanners<T extends _tb_banner>(data: Array<T>) {
    return await _inserts<T>({tableName: EnumTableName.Banner, data})
}

export async function _getBanners() {
    return await _gets<Array<_tb_banner>>({tableName: EnumTableName.Banner})
}