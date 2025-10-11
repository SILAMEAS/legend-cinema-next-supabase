import {_getProfile} from "@/utils/api/__profile";
import {FormatJSON} from "@/utils/commons/FormatJSON";

export default async function HomePage() {
  const profile = await _getProfile();

  return <FormatJSON data={profile?.data}/>
}
