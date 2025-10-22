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
        /** get user from redux that already store on layout **/
        const user = store.getState().counter.user;
        /** get param from request  */
        const {page, pageSize, search, orderBy, orderDirection, searchColumn, date,onlyName,cinemaId} =
            getParams(request);
        /** column can't null  **/
        const notNull=[];
        /** select column for display  **/
        let select = [
            EnumTableColum.ID,
            EnumTableColum.TITLE,
            EnumTableColum.IMAGE,
            EnumTableColum.RATING,
            EnumTableColum.DURATION,
            EnumTableColum.GENRE,
            `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
            `${EnumTableColum.CINEMA}:${EnumTableName.Cinema} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
        ]
        /** add more column release if user role is ADMIN */
        if (user?.role === EnumRole.ADMIN) {
            select.push(EnumTableColum.RELEASE_DATE)
        }

        /** add filter before display  */
        const filters=[];
        if(date){
            filters.push({
                column: EnumTableColum.DATE_SHOWING,
                operator: EnumOperator.eq,
                value: date
            });
        }
        if(cinemaId){
            filters.push({
                column: EnumTableColum.CINEMA_ID,
                operator: EnumOperator.eq,
                value: cinemaId
            });
            notNull.push(EnumTableColum.CINEMA)
        }

        /** show only name,id for list cinema for choosing */
        if(onlyName){
            select=[EnumTableColum.NAME,EnumTableColum.ID]
        }
        const result = await supabaseService.findMany<IMovieResponse>(EnumTableName.Movie, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
            select: select.join(","),
            filters,
            notNull
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}