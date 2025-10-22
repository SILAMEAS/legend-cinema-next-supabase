import { createClient } from "@/lib/supabase/server";
import { EnumTableName } from "@/utils/enum/EnumTable";
import { EnumPropertyKey } from "@/utils/enum/EnumPropertyKey";
import { ANY } from "@/utils/commons/type";

interface Profile {
    id: string;
    name: string;
    user_id: string;
    email: string;
    role: string;
}

/**
 * Fetches the authenticated user's profile from Supabase.
 * - Extracts the user ID from Supabase Auth JWT claims.
 * - Queries the Profile table for the matching record.
 * - Returns the user's profile or `null` if unauthorized or not found.
 */
export async function profileService(): Promise<Profile | null> {
    const supabase = await createClient();

    // 🧩 Get authenticated user's claims
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError) {
        console.error("❌ Failed to get claims:", claimsError.message);
        return null;
    }

    const userId = claimsData?.claims?.sub;
    if (!userId) {
        console.warn("⚠️ No user ID found in JWT claims");
        return null;
    }

    // 🧩 Fetch user's profile
    const { data, error } = await supabase
        .from(EnumTableName.Profile)
        .select("id, name, user_id, email, role:Role(name)")
        .eq(EnumPropertyKey.user_id, userId)
        .single();

    if (error) {
        console.error("❌ Error fetching profile:", error.message);
        return null;
    }

    if (!data) {
        console.warn("⚠️ No profile found for user:", userId);
        return null;
    }

    // 🧩 Flatten nested role
    const profile: Profile = {
        ...data,
        role: (data.role as ANY)?.name ?? "Unknown",
    };

    return profile;
}
