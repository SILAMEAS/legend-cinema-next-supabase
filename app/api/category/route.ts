import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumSort} from "@/utils/enum/EnumSort";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {ICategoryResponse} from "@/redux/services/category/type";

export async function GET(request: Request) {
    try {
        // ✅ Extract headers
        const userAgent = request.headers.get("user-agent") || "Unknown";

        console.log("🔍 Incoming Request Info:", {
            method: request.method,
            url: request.url,
            userAgent, // ✅ Log user-agent
        });

        const {page, pageSize, search, searchColumn} = getParams(request);

        const result = await supabaseService.findMany<ICategoryResponse>(EnumTableName.Category, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderDirection: EnumSort.ASC,
        });

        return Response.json(result);
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}
