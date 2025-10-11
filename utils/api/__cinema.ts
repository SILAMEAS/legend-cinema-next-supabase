import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets} from "@/utils/api/__general";
import {_tb_cinema} from "@/utils/api/type-from-tb/_tb_cinema";

export async function _getsCinema() {
    return await _gets<Array<_tb_cinema>>({tableName:EnumTableName.Cinema})
}