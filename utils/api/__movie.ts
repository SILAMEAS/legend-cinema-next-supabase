import {EnumTableName} from "@/utils/enum/EnumTable";
import {_tb_movie} from "@/utils/api/supabase_tb/_tb_movie";
import {_gets} from "@/utils/api/__general";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";

export async function _getMovies() {
    const {isAdmin} = {isAdmin:true};
    const select = [
        EnumTableColum.ID,
        EnumTableColum.TITLE,
        EnumTableColum.IMAGE,
        EnumTableColum.RATING,
        EnumTableColum.DURATION,
        EnumTableColum.GENRE,
        `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
    ]
    if (isAdmin) {
        select.push(EnumTableColum.RELEASE_DATE)
    }
    // Now fetch movies
    const movies = await _gets<Array<_tb_movie>>({
        tableName: EnumTableName.Movie,
        select: select.join(",")
    });
    return movies;
}
