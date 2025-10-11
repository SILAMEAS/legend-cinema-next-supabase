import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_offer} from "@/utils/api/type-from-tb/_tb_offer";

export async function _insertOffers<T extends _tb_offer>(data: Array<T>) {
    return await _inserts<T>({tableName: EnumTableName.Offer, data})
}

export async function _getOffers() {
    return await _gets<Array<_tb_offer>>({tableName: EnumTableName.Offer})
}