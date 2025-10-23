import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumRole} from "@/utils/enum/EnumRole";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IMovieResponse} from "@/redux/services/movie/type";
import {$ok} from "@/utils/commons/$ok";
import {profileService} from "@/lib/supabase/services/ProfileService";
import {parseFormData} from "@/lib/supabase/services/method/parseFormData";
import {SupabaseStorageService} from "@/lib/supabase/services/SupabaseStorageService";

const storageService = new SupabaseStorageService();

/** select column for display  **/
let select = [
    EnumTableColum.ID,
    EnumTableColum.TITLE,
    EnumTableColum.IMAGE,
    EnumTableColum.RATING,
    EnumTableColum.DURATION,
    EnumTableColum.GENRE,
    `${EnumTableColum.STATUS}:${EnumTableName.MovieStatus} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
    `${EnumTableColum.CINEMA}:${EnumTableName.Cinema} ( ${EnumTableColum.NAME} ,${EnumTableColum.ID})`,
]

export async function GET(request: Request) {
    try {
        /** get user from redux that already store on layout **/
        const user = await profileService();
        /** get param from request  */
        const {page, pageSize, search, orderBy, orderDirection, searchColumn, date, onlyName, cinemaId} =
            getParams(request);
        /** column can't null  **/
        const notNull = [];
        /** add more column release if user role is ADMIN */
        if (user?.role === EnumRole.ADMIN) {
            select.push(EnumTableColum.RELEASE_DATE)
        }

        /** add filter before display  */
        const filters = [];
        if (date) {
            filters.push({
                column: EnumTableColum.DATE_SHOWING,
                operator: EnumOperator.eq,
                value: date
            });
        }
        console.log("cinemaId", cinemaId)
        if ($ok(cinemaId)) {
            filters.push({
                column: EnumTableColum.CINEMA_ID,
                operator: EnumOperator.eq,
                value: cinemaId?.split("_")[0]
            });
            notNull.push(EnumTableColum.CINEMA)
        }

        /** show only name,id for list cinema for choosing */
        if (onlyName) {
            select = [EnumTableColum.NAME, EnumTableColum.ID]
        }
        const result = await supabaseService.findMany<IMovieResponse>(EnumTableName.Movie, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderBy,
            orderDirection,
            select: select.join(","),
            filters,
            notNull
        });
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}


export async function POST(request: Request) {
    try {
        /** get body from request passing to formdata */
        const formData = await request.formData();

        const keys = Object.values(EnumTableColum) as (keyof IMovieResponse)[];

        const movieData = parseFormData<IMovieResponse>(formData, keys);

        /** get user from redux that already store on layout **/
        const user = await profileService();
        /** checking role */
        if (user?.role !== EnumRole.ADMIN) {
            return Response.json({
                status: 401,
                message: "Access denied",
            });
        }
        /** checking image */
        if(!movieData[EnumTableColum.IMAGE]){
            return Response.json({
                status: 400,
                message: "File Not Found",
            })

        }
        /** upload file to Storage  **/
        const image = await storageService.uploadFile(movieData[EnumTableColum.IMAGE] as File).then(r=>r.url);
        formData.append("image", image);
        console.log("movieData",movieData);
        const object = Object.fromEntries(formData.entries());
        console.log("object",object);
        /** create new movie */
        const movie = await supabaseService.create<IMovieResponse>({
            tableName:EnumTableName.Movie,
            data: object,
            select:select.join(","),
        });
        console.log("movie",movie);

        /** add more column release if user role is ADMIN */
        /** add filter before display  */
        /** show only name,id for list cinema for choosing */

        return Response.json({
            status: 200,
            message: "success creation movie",
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}
