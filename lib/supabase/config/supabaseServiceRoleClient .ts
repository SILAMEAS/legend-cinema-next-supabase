// lib/supabase/supabaseServiceRoleClient .ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const supabaseServiceRoleClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);
