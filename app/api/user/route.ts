import {profileService} from "@/lib/supabase/services/ProfileService";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {IUserRequest} from "@/redux/services/user/type";
import {createServerSupabaseClient} from "@/lib/supabase/server";


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
        const body = await request.json(); // Parse JSON body

        if (!body) {
            return new Response(JSON.stringify({error: "Request body is missing"}), {status: 400});
        }

        const data = body as IUserRequest;
        const supabase = await createServerSupabaseClient();

        if (data.user) {
            const _email = data.user.email;

            const {error: insertError} = await supabase
                .from(EnumTableName.Profile)
                .insert([
                    {
                        email: _email,
                        name: _email?.slice(0, 5),
                        user_id: data.user.id,
                    },
                ])
                .select();

            if (insertError) {
                return new Response(JSON.stringify({error: insertError.message}), {status: 500});
            }

            return new Response(JSON.stringify({message: "Created User Successfully"}), {status: 201});
        }

        return new Response(JSON.stringify({error: "User data is missing"}), {status: 400});
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
    }
}