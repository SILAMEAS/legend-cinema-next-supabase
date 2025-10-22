import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {ICategoryResponse} from "@/redux/services/category/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection, searchColumn} =
            getParams(request);

        const result = await supabaseService.findMany<ICategoryResponse>(EnumTableName.Category, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
            filters: [
                {
                    column: "name",
                    operator: EnumOperator.eq,
                    value: "Popcorn"
                }
            ]
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}