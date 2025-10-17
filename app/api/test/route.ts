import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/app/api/utils/getPaginationParams";
import {fetchPaginatedData} from "@/app/api/utils/fetchPaginatedData";
import {EnumOperator} from "@/utils/enum/EnumOperator";


export async function GET(request: Request) {
    try {
        const {page, limit, search, orderBy, orderDirection} =
            getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Category, {
            page,
            limit,
            searchColumn: "name",
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