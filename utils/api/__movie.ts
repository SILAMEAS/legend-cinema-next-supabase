import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets, _inserts} from "@/utils/api/__general";
import {_tb_movie} from "@/utils/api/type-from-tb/_tb_movie";

export async function _insertMovies<T extends _tb_movie>(data:Array<T>) {
    return await _inserts<T>({tableName:EnumTableName.Movie,data})
}

export async function _getMovies() {
    return await _gets<Array<_tb_movie>>({tableName:EnumTableName.Movie})
}