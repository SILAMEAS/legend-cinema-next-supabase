import React from 'react';
import {_getProfile} from "@/utils/api/__profile";
import {createClient} from "@/lib/supabase/server";
import {EnumRole} from "@/utils/enum/EnumRole";
import {redirect} from "next/navigation";
import {EnumPage} from "@/utils/enum/EnumPage";

export default async function AdminLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    const supabase =await createClient();
    const { data } = await supabase.auth.getUser();
    if(data.user){
        const getProfile=await _getProfile(data.user);
        if (getProfile?.data?.role !== EnumRole.ADMIN) {
            redirect(EnumPage.ROOT);
        }
    }
    return (
        <>{children}</>
    )
}