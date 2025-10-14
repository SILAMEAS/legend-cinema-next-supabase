import { createClient } from "@/lib/supabase/server";

export async function _getCurrentUser() {
    const supabase = await createClient(); // SSR client
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        console.log("No user logged in on server");
        return null;
    }

    return session.user;
}
