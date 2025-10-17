import {getSupabaseProfile} from "@/utils/commons/getSupabaseProfile";


export async function GET() {
    try {
        const result = await getSupabaseProfile();
        return Response.json(result);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.json({error: "Internal Server Error"}, {status: 500});
    }
}