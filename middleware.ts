import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
 // Run your existing Supabase session handler
  const response = await updateSession(request);
   // 🧠 Check if user is not logged in and trying to access "/"
  const isRootPath = request.nextUrl.pathname === "/";

  // You can get the session from the request cookies (Supabase stores it as sb-access-token or similar)
  const accessToken = request.cookies.get("sb-access-token")?.value;

  if (isRootPath && !accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
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
  ],
};
