import {EnumTableName} from "@/utils/enum/EnumTable";
import {getPaginationParams} from "@/utils/commons/getPaginationParams";
import {fetchPaginatedData} from "@/utils/commons/fetchPaginatedData";
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
        // const _active_cinemas = await _gets<_tb_cinema>({
        //         tableName: EnumTableName.Cinema, filters: [{
        //             column: EnumTableColum.ACTIVE,
        //             value: "true",
        //             operator: EnumOperator.eq
        //         }]
        //     }).then(r => r.count);
        //     const _active_offers = await _gets<_tb_offer>({tableName: EnumTableName.Offer}).then(r => r.count)??0;
        //     const _active_users = await _gets<type>({tableName: EnumTableName.Profile}).then(r => r.count)??0;
        //     const _total_movies = await _gets<_tb_movie>({tableName: EnumTableName.Movie}).then(r => r.count)??0;
        //     const _total_booking = await _sum({
        //         tableName: EnumTableName.Movie,
        //         column: EnumTableColum.BOOKING,
        //     })??0;
        //     return {
        //         error: null,
        //         status: 200, statusText: "", data: {
        //             active_cinemas:_active_cinemas?? 0,
        //             active_offers:_active_offers?? 0,
        //             active_users: _active_users??0,
        //             revenue_today: 0,
        //             total_booking:_total_booking?? 0,
        //             total_movies:_total_movies?? 0
        //         }
        //     };


        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}