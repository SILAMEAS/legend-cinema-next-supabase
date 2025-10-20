import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumSort} from "@/utils/enum/EnumSort";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search,searchColumn} =
            getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Banner, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy:EnumTableColum.ORDER,
            orderDirection:EnumSort.ASC,
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}