import {EnumTableName} from "@/utils/enum/EnumTable";
import {_tb_movie} from "@/utils/api/supabase_tb/_tb_movie";
import {_gets} from "@/utils/api/__general";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export async function _getMovies() {
    // const {isAdmin} = await _checkRole();
    const select = [
        EnumTableColum.ID,
        EnumTableColum.TITLE,
        EnumTableColum.IMAGE,
        EnumTableColum.RATING,
        EnumTableColum.DURATION,
        EnumTableColum.GENRE,
        `status:MovieStatus(id,name)`
    ]
    if (true) {
        select.push(EnumTableColum.RELEASE_DATE)
    }
    // Now fetch movies
    const movies = await _gets<Array<_tb_movie>>({
        tableName: EnumTableName.Movie,
        select: select.join(",")
    });
    console.log(movies.data[0]);
    return movies;
}
