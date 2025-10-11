import { createClient } from "@/lib/supabase/server";
import { __get_profile } from "@/utils/api/method";
import { FormatJSON } from "@/utils/commons/FormatJSON";

export default async function HomePage() {
  const supabase = await createClient()
  const profile = await __get_profile(supabase);

  return <FormatJSON data={profile?.data}/>
}
