"use client"
import Link from "next/link";
import {Button} from "./ui/button";
import {LogoutButton} from "./logout-button";
import {EnumPage} from "@/utils/enum/EnumPage";

export function AuthButton() {
    // NEED AUTH
    // const {user} = useAuth();
    const user ={email:'las'}

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href={EnumPage.AUTH_LOGIN}>Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href={EnumPage.AUTH_SIGN_UP}>Sign up</Link>
      </Button>
    </div>
  );
}
