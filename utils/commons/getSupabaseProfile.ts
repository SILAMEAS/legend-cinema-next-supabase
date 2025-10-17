import { createClient } from "@/lib/supabase/server";
import { EnumTableName } from "@/utils/enum/EnumTable";
import { EnumPropertyKey } from "@/utils/enum/EnumPropertyKey";

/**
 * Retrieves the current user's profile from Supabase
 * using the session's JWT claims.
 */
export async function getSupabaseProfile() {
    const supabase = await createClient();

    // Get JWT claims to identify the user
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError || !claimsData?.claims?.sub) {
        console.error("❌ Failed to get claims:", claimsError);
        return null;
    }

    const userId = claimsData.claims.sub;

    // Query the Profile table for this user
    const { data: profile, error: profileError } = await supabase
        .from(EnumTableName.Profile)
        .select("*")
        .eq(EnumPropertyKey.user_id, userId)
        .single();

    if (profileError) {
        console.error("❌ Error fetching profile:", profileError);
        return null;
    }
    if (!profile) {
        return Response.json({ message: "Unauthorized or no profile found" }, { status: 401 });
    }
    return profile;
}
