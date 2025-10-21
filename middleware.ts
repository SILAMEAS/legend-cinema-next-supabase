import {updateSession} from "@/lib/supabase/middleware";
import {type NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
    // ✅ Log the user-agent
    const userAgent = request.headers.get("user-agent") || "unknown";
    console.log(`[User-Agent] ${userAgent} - Path: ${request.nextUrl.pathname}`);
    return await updateSession(request);
}

export const config = {
    runtime: "nodejs", // ✅ add this,
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ]
};
