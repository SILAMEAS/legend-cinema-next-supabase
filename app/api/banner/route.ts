import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumSort} from "@/utils/enum/EnumSort";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IBannerResponse} from "@/redux/services/banner/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, searchColumn} =
            getParams(request);

        const result = await supabaseService.findMany<IBannerResponse>(EnumTableName.Banner, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy: EnumTableColum.ORDER,
            orderDirection: EnumSort.ASC,
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}