import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {store} from "@/redux/store";
import {EnumRole} from "@/utils/enum/EnumRole";


export async function GET(request: Request) {
    try {
        const {page, pageSize, search, orderBy, orderDirection,searchColumn} =
            getPaginationParams(request);
        const user = store.getState().counter.user
        const selected = [
            EnumTableColum.ID,
            EnumTableColum.TITLE,
            EnumTableColum.IMAGE,
            EnumTableColum.RATING,
            EnumTableColum.DURATION,
            EnumTableColum.GENRE,
            `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
        ]
        if (user?.role===EnumRole.ADMIN) {
            selected.push(EnumTableColum.RELEASE_DATE)
        }
        const result = await fetchPaginatedData(EnumTableName.Movie, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
            selected: selected.join(",")
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}