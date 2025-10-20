import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumOperator} from "@/utils/enum/EnumOperator";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection, searchColumn} =
            getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Category, {
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