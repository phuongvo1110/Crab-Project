"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavBar from "@/components/Layout/Header/NavBar";
import Dropdown from "@/components/Layout/Header/Dropdown";
import DashboardSidebar from "@/app/(protected)/dashboard/Components/DashboardSidebar";
import PrimaryLogo from "@components/PrimaryLogo";
import { usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import useDatePicker from "@/zustand/useDatePicker";
import ThemeButton from "@/components/Theme/ThemeButton";

export default function DashboardHeader() {
  const pathname = usePathname();
  const pathShowResetRangeTime = ["/dashboard", "/dashboard/finance"];
  const { setFrom, setTo } = useDatePicker();

  return (
    <header className="fixed top-0 z-30 flex h-16 w-full flex-row items-center justify-around border-b bg-background px-4 sm:static">
      <nav className="flex w-full flex-row items-center gap-2 text-lg font-medium xl:hidden">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <PrimaryLogo />
        </Link>
        <div className="xl:hidden">
          <NavBar />
        </div>
      </nav>
      <div className="hidden xl:block">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 px-3">
            <nav className="grid gap-3 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <PrimaryLogo />
              </Link>
              <DashboardSidebar />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-4 lg:gap-4 md:gap-2">
        <ThemeButton />
        {pathShowResetRangeTime.includes(pathname) && (
          <div className="sm:hidden">
            <Button
              variant="outline"
              className="h-8"
              onClick={() => {
                const from = new Date();
                const to = new Date();

                from.setMonth(0, 1);
                from.setHours(0, 0, 0, 0);
                to.setFullYear(
                  to.getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                );
                to.setHours(23, 59, 59, 999);

                setFrom(from);
                setTo(to);
              }}
            >
              <RotateCcw className="mr-1 h-4 w-4" />
              Now
            </Button>
          </div>
        )}
        <Dropdown />
      </div>
    </header>
  );
}
