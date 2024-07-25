"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useSession } from "@/zustand/useSession";
import { Wallet, Folder } from "lucide-react";

export const dashboardSidebarList = [
  {
    name: "Overview",
    link: "/dashboard",
    icon: <Folder className="h-4 w-4" />,
    permissions: [],
  },
  {
    name: "Finance",
    link: "/dashboard/finance",
    icon: <Wallet className="h-4 w-4" />,
    permissions: ["Admin"],
  },
  {
    name: "Trips",
    link: "/dashboard/trips",
    icon: <Wallet className="h-4 w-4" />,
    permissions: ["Admin"],
  },
  {
    name: "Customers",
    link: "/dashboard/customers",
    icon: <Wallet className="h-4 w-4" />,
    permissions: ["Admin"],
  },
  {
    name: "Drivers",
    link: "/dashboard/driver",
    icon: <Wallet className="h-4 w-4" />,
    permissions: ["Admin"],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  // const { session, removeSession } = useSession();

  return (
    <div className="flex h-full w-60 flex-col justify-between gap-2 border-r px-4 pt-4 xl:w-full xl:border-none xl:px-0">
      <nav className="flex flex-col gap-2 overflow-auto">
        {dashboardSidebarList.map((item, index) => {
          if (true)
            return (
              <Link
                key={index}
                href={item.link}
                className={`${
                  item.link === pathname.split("/").slice(0, 3).join("/")
                    ? "bg-accent shadow-sm"
                    : "bg-background"
                } hover:text-accent-foreground focus:text-accent-foreground mx-auto flex h-9 w-full
            flex-row  items-center gap-2 
            rounded-md px-4 py-2 text-sm font-medium 
            transition-colors hover:bg-accent focus:bg-accent 
            focus:outline-none disabled:pointer-events-none disabled:opacity-50 
            data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 
            
            `}
              >
                {item.icon}
                <span className="mt-0.5">{item.name}</span>
              </Link>
            );
        })}
      </nav>
    </div>
  );
}
