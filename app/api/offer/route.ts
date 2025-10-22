import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IOfferResponse} from "@/redux/services/offer/type";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection, searchColumn} =
            getParams(request);

        const result = await supabaseService.findMany<IOfferResponse>(EnumTableName.Offer, {
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