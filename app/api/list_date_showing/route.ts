import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {IMovieResponse, ListDateShowingResponse} from "@/redux/services/movie/type";
import {PAGE_DEFAULT} from "@/utils/constants/constants";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {EnumSort} from "@/utils/enum/EnumSort";

export async function GET(request: Request) {
    try {
        const {page, pageSize, search, searchColumn} = getParams(request);

        const result = await supabaseService.findMany<IMovieResponse>(EnumTableName.Movie, {
            page: PAGE_DEFAULT,
            pageSize: 10000, // large enough to capture duplicates
            searchColumn,
            searchValue: search,
            orderBy: EnumTableColum.DATE_SHOWING,
            orderDirection:EnumSort.ASC,
            select: EnumTableColum.DATE_SHOWING,
        });

        // Cast contents to the proper type
        const contents = result.contents as ListDateShowingResponse[];

        const today = new Date();
        today.setHours(0, 0, 0, 0); // reset time for fair comparison

        const uniqueDates = Array.from(
            new Set(
                contents
                    .map(item => {
                        const date = new Date(item[EnumTableColum.DATE_SHOWING]);
                        if (date >= today) {
                            return date.toISOString().split("T")[0]; // keep only YYYY-MM-DD
                        }
                        return null;
                    })
                    .filter(Boolean) // remove nulls
            )
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
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}
