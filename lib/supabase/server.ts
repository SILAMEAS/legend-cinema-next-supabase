import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Use for server-side reads (SSR / API routes)
 * - Respects RLS policies
 */
export async function createServerSupabaseClient() {
    const cookieStore = await cookies(); // ✅ await the Promise

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(),
                setAll: (cookiesToSet) => {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                        // ignore if called in server components
                    }
                },
            },
        },
    );
}
