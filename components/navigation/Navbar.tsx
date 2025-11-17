"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileNav from "./MobileNav";

type Item = {
  id: number;
  title: { rendered: string };
  url: string;
  parent: number;
  menu_order: number;
};

export function Navbar({ items }: { items: Item[] }) {
  const slug = items.map((item) => item.url);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-[#121213] z-10 font-inter sticky top-0">
      <div className="h-[62px] px-4  flex justify-between items-center max-w-[1440px] mx-auto ">
        <div
          className="text-white text-[26px] font-[900] z-[100] cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Link href="/">MGDK</Link>
          <span className="text-primary">.</span>
        </div>
        <MobileNav
          items={items}
          slug={slug}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item, index) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink asChild>
                  <Link href={slug[index]}>{item.title.rendered}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Navbar;
