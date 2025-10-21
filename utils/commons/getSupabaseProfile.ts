import {createClient} from "@/lib/supabase/server";
import {EnumTableName} from "@/utils/enum/EnumTable";
import {EnumPropertyKey} from "@/utils/enum/EnumPropertyKey";
import {ANY} from "@/utils/commons/type";

/**
 * Retrieves the current upload's profile from Supabase
 * using the session's JWT claims.
 */
export async function getSupabaseProfile() {
    const supabase = await createClient();

    // Get JWT claims to identify the upload
    const {data: claimsData, error: claimsError} = await supabase.auth.getClaims();
    if (claimsError || !claimsData?.claims?.sub) {
        console.error("❌ Failed to get claims:", claimsError);
        return null;
    }

    const userId = claimsData.claims.sub;

    // Query the Profile table for this upload
    const {data: profile, error: profileError} = await supabase
        .from(EnumTableName.Profile)
        .select("id,name,user_id,email,role:Role(name)")
        .eq(EnumPropertyKey.user_id, userId)
        .single().then(res => {
            return {
                ...res, data: {
                    ...res.data,
                    role: (res.data?.role as ANY).name
                }
            }
        });

    if (profileError) {
        console.error("❌ Error fetching profile:", profileError);
        return null;
    }
    if (!profile) {
        return Response.json({message: "Unauthorized or no profile found"}, {status: 401});
    }
    return profile;
}
