import {EnumTableName} from "@/utils/enum/EnumTable";
import {_tb_movie} from "@/utils/api/supabase_tb/_tb_movie";
import {_gets} from "@/utils/api/__general";

export async function _getMovies() {
    // Now fetch movies
    return await _gets<Array<_tb_movie>>({
        tableName: EnumTableName.Movie,
    });
}
