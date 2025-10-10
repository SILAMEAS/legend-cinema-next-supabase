import { createClient } from "@/lib/supabase/server";
import { __get_profile, _db_view_data, _get_user_login } from "@/utils/api/method";

export default async function HomePage() {
  const supabase = await createClient()
  const profile = await __get_profile(supabase);

  return <pre>{JSON.stringify(profile?.data, null, 2)}</pre>
}
