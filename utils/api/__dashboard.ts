import {EnumTableName} from "@/utils/enum/EnumTable";
import {_gets} from "@/utils/api/__general";
import {_tb_cinema} from "@/utils/api/supabase_tb/_tb_cinema";
import {_tb_offer} from "@/utils/api/supabase_tb/_tb_offer";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {_tb_profile} from "@/utils/api/supabase_tb/_tb_profile";
import {_tb_movie} from "@/utils/api/supabase_tb/_tb_movie";
import {_sum} from "@/utils/api/_sum";

export async function _getDashboard() {
    const _active_cinemas = await _gets<_tb_cinema>({
        tableName: EnumTableName.Cinema, filters: [{
            column: EnumTableColum.ACTIVE,
            value: "true",
            operator: EnumOperator.eq
        }]
    }).then(r => r.count);
    const _active_offers = await _gets<_tb_offer>({tableName: EnumTableName.Offer}).then(r => r.count)??0;
    const _active_users = await _gets<_tb_profile>({tableName: EnumTableName.Profile}).then(r => r.count)??0;
    const _total_movies = await _gets<_tb_movie>({tableName: EnumTableName.Movie}).then(r => r.count)??0;
    const _total_booking = await _sum({
        tableName: EnumTableName.Movie,
        column: EnumTableColum.BOOKING,
    })??0;
    return {
        error: null,
        status: 200, statusText: "", data: {
            active_cinemas:_active_cinemas?? 0,
            active_offers:_active_offers?? 0,
            active_users: _active_users??0,
            revenue_today: 0,
            total_booking:_total_booking?? 0,
            total_movies:_total_movies?? 0
        }
    };
}
