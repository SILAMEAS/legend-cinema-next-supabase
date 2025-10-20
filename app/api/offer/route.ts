import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection,searchColumn} =
            getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Offer, {
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