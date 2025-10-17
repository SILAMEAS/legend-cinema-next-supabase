import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumSort} from "@/utils/enum/EnumSort";


export async function GET(request: Request) {
    try {
        const {page, limit, search} =
            getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Banner, {
            page,
            limit,
            searchColumn: "name",
            searchValue: search,
            orderBy:"order",
            orderDirection:EnumSort.ASC,
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}