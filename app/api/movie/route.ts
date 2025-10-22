import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {store} from "@/redux/store";
import {EnumRole} from "@/utils/enum/EnumRole";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IMovieResponse} from "@/redux/services/movie/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection, searchColumn, date} =
            getParams(request);
        const user = store.getState().counter.user
        const select = [
            EnumTableColum.ID,
            EnumTableColum.TITLE,
            EnumTableColum.IMAGE,
            EnumTableColum.RATING,
            EnumTableColum.DURATION,
            EnumTableColum.GENRE,
            `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
        ]
        if (user?.role === EnumRole.ADMIN) {
            select.push(EnumTableColum.RELEASE_DATE)
        }
        const result = await supabaseService.findMany<IMovieResponse>(EnumTableName.Movie, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
            select: select.join(","),
            filters: date ? [{
                column: EnumTableColum.DATE_SHOWING,
                operator: EnumOperator.eq,
                value: date
            }] : []
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}