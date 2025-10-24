import {supabaseService} from "@/lib/supabase/services/supabase.service";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {IUserRequest} from "@/redux/services/user/type";
import {profileService} from "@/lib/supabase/services/ProfileService";

export async function GET() {
    try {
        const result = await profileService();
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body) {
            return Response.json({error: "Request body is missing"}, {status: 400});
        }

        const data = body as IUserRequest;

        if (data.user) {
            const _email = data.user.email;

            const insertResult = await supabaseService.create({
                tableName: EnumTableName.Profile,
                data: {
                    email: _email,
                    name: _email?.slice(0, 5),
                    user_id: data.user.id,
                },
                serverTrusted: true, // use service role client
            });

            if (insertResult.error) {
                return Response.json({error: insertResult.error}, {status: 500});
            }

            return Response.json({message: "Created User Successfully", data: insertResult.data}, {status: 201});
        }

        return Response.json({error: "User data is missing"}, {status: 400});
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}
