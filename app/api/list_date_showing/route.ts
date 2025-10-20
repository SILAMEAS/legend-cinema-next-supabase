import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {ListDateShowingResponse} from "@/redux/services/movie/type";
import {PAGE_DEFAULT} from "@/utils/constants/constants";

export async function GET(request: Request) {
    try {
        const { page, pageSize, search, orderBy, orderDirection, searchColumn } = getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Movie, {
            page: PAGE_DEFAULT,
            pageSize: 10000, // large enough to capture duplicates
            searchColumn,
            searchValue: search,
            orderBy: orderBy || EnumTableColum.DATE_SHOWING,
            orderDirection,
            selected: EnumTableColum.DATE_SHOWING,
        });

        // Cast contents to the proper type
        const contents = result.contents as ListDateShowingResponse[];

        // Remove duplicate date_showing values
        const uniqueDates = Array.from(
            new Set(contents.map(item => item[EnumTableColum.DATE_SHOWING]))
        ).map(date => ({ date_showing: date }));

        // Pagination on unique dates
        const start = (page - 1) * pageSize;
        const paginatedDates = uniqueDates.slice(start, start + pageSize);

        const total = uniqueDates.length;
        const totalPages = Math.ceil(total / pageSize);
        const hasNext = page < totalPages;

        return Response.json({
            contents: paginatedDates,
            page,
            pageSize,
            total,
            totalPages,
            hasNext,
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
