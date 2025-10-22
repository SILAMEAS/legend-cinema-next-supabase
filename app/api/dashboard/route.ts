import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IDashboardResponse} from "@/redux/services/dashboard/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection, searchColumn = EnumTableColum.TITLE} =
            getParams(request);

        const result = await supabaseService.findMany<IDashboardResponse>(EnumTableName.Dashboard, {
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