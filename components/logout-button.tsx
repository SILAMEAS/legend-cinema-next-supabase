"use client";

import {createClient} from "@/lib/supabase/config/client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {EnumPage} from "@/utils/enum/EnumPage";
import {useAppDispatch} from "@/redux/hooks";
import {setUser} from "@/redux/slices/counterSlice";

export function LogoutButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const logout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        dispatch(setUser(null));
        router.push(EnumPage.AUTH_LOGIN);
    };

    return <Button onClick={logout}>Logout</Button>;
}
