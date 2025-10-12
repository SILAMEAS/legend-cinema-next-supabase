"use client"
import {hasEnvVars} from "@/lib/utils";
import {EnvVarWarning} from "@/components/env-var-warning";
import {AuthButton} from "@/components/auth-button";
import {useAuth} from "@/context/AuthContext";
import {FormatJSON} from "@/utils/commons/FormatJSON";

export default function HomePage() {
  const {profile,user}=useAuth();
  return <>
    {!hasEnvVars ? <EnvVarWarning/> : <AuthButton/>}
    <FormatJSON data={profile}/>
    <FormatJSON data={user}/>
  </>
}
