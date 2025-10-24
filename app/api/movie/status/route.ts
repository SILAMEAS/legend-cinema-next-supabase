import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IStatus} from "@/utils/commons/type";


export async function GET(request: Request) {
    try {
        /** get user from redux that already store on layout **/
        /** get param from request  */
        /** select column for display  **/
        /** add more column release if user role is ADMIN */
        /** add filter before display  */
        /** show only name,id for list cinema for choosing */
        const {page, pageSize, search, orderBy, orderDirection, searchColumn} =
            getParams(request);

        const result = await supabaseService.findMany<IStatus>(EnumTableName.MovieStatus, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}