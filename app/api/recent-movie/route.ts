import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {store} from "@/redux/store";
import {EnumRole} from "@/utils/enum/EnumRole";
import {ANY} from "@/utils/commons/type";
import {EnumSort} from "@/utils/enum/EnumSort";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IMovieResponse} from "@/redux/services/movie/type";


export async function GET(request: Request) {
    try {
        const {search, searchColumn} =
            getParams(request);
        const user = store.getState().counter.user
        const select = [
            EnumTableColum.ID,
            EnumTableColum.TITLE,
            EnumTableColum.BOOKING,
            `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
        ]
        if (user?.role === EnumRole.ADMIN) {
            select.push(EnumTableColum.RELEASE_DATE)
        }
        const result = await supabaseService.findMany<IMovieResponse>(EnumTableName.Movie, {
            page: 1,
            pageSize: 4,
            searchColumn,
            searchValue: search,
            orderDirection: EnumSort.DESC,
            select: select.join(",")
        }).then(res => {
            return {
                ...res,
                contents: res.contents.map((item: ANY) => ({
                    ...item,
                    status: item.status?.name ?? null, // <-- just take the name
                }))
            }
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}