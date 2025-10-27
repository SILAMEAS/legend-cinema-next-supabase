import {EnumTableName} from "@/utils/enum/EnumTable";
import {getParams} from "@/lib/supabase/services/method/getParams";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {EnumRole} from "@/utils/enum/EnumRole";
import {EnumOperator} from "@/utils/enum/EnumOperator";
import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {IMovieRequest, IMovieResponse} from "@/redux/services/movie/type";
import {$ok} from "@/utils/commons/$ok";
import {profileService} from "@/lib/supabase/services/ProfileService";
import {parseFormData} from "@/lib/supabase/services/method/parseFormData";
import {SupabaseStorageService} from "@/lib/supabase/services/SupabaseStorageService";
import {AccessDeniesException} from "@/lib/supabase/services/exception/AccessDeniesException";
import {NotFoundException} from "@/lib/supabase/services/exception/NotFoundException";
import {SuccessException} from "@/lib/supabase/services/exception/SuccessException";
import {AuthorizeException} from "@/lib/supabase/services/exception/AuthorizeException";

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
            const AdminSelectMore = [
                EnumTableColum.RELEASE_DATE,
                EnumTableColum.DIRECTOR,
                EnumTableColum.CAST,
                EnumTableColum.DIRECTOR,
                EnumTableColum.TRAILER,
                EnumTableColum.SYNOPSIS
            ]
            select.push([...AdminSelectMore].join(","))
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
        // 1️⃣ Get form data from request
        const formData = await request.formData();

        const keys = Object.values(EnumTableColum) as (keyof IMovieRequest)[];
        const movieData = parseFormData<IMovieRequest>(formData, keys);

        // 2️⃣ Get authenticated user
        const user = await profileService();
        if (!user) return AuthorizeException({ message: "Unauthorized" });

        // 3️⃣ Check admin role
        if (user.role !== EnumRole.ADMIN) return AccessDeniesException();

        // 4️⃣ Validate image
        if (!movieData[EnumTableColum.IMAGE]) {
            return NotFoundException({ message: "File not found" });
        }

        // 5️⃣ Upload image to Storage
        const uploadedImage = await storageService.uploadFile(movieData[EnumTableColum.IMAGE]);
        formData.set("image", uploadedImage.url); // ✅ overwrite image with uploaded URL

        // 6️⃣ Convert formData to object for Supabase insert
        const objectToInsert = Object.fromEntries(formData.entries());

        console.log("objectToInsert",objectToInsert)

        // 7️⃣ Insert into database using serverTrusted flag
        await supabaseService.create<IMovieRequest>({
            tableName: EnumTableName.Movie,
            data: objectToInsert,
            select: select.join(","),
            serverTrusted: true // ✅ bypass RLS safely
        });

        // 8️⃣ Return success response
        return SuccessException({ message: "Create Movie Success" });
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

