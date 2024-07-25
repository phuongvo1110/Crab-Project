"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import navUrls from "./navUrls.json";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavBar() {
  const path = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="h-fit w-fit px-3">
        {navUrls.map((navUrl, index: number) => (
          <NavigationMenuItem key={index}>
            <Link href={navUrl.url}>
              <NavigationMenuLink className="hover:text-accent-foreground focus:text-accent-foreground relative h-10 w-fit text-nowrap rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                {navUrl.name}
                {path === navUrl.url && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1.5 left-0 block h-[4px] w-full bg-foreground"
                  />
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:text-accent-foreground focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
