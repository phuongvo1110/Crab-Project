"use client";

import { LogOut, User, History } from "lucide-react";
import Link from "next/link";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import { toast } from "sonner";

export default function Dropdown() {
  const { userSession, setLogout } = useUserSessionStore() as UserSessionStore;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 px-2" variant="outline">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3 w-56 bg-background">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {userSession.isLoggedIn && (
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/profile">{userSession.name}</Link>
            </DropdownMenuItem>
          )}
          {userSession.isLoggedIn && (
            <DropdownMenuItem>
              <History className="mr-2 h-4 w-4" />
              <Link href="/history">History</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            {userSession.isLoggedIn === true ? (
              <Link
                href="/auth"
                onClick={() => {
                  toast.success("Signed out successfully!");
                  setLogout();
                }}
              >
                Log out
              </Link>
            ) : (
              <Link href="/auth">Log in</Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
