"use client";

import {
  NavbarBrand,
  NavbarContent,
  Navbar as NavbarInternal,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/navbar";
import { useState } from "react";
import { Icon } from "../ui/icons";
import { Link } from "@nextui-org/link";
import { SearchInput } from "@/ui/searchInput";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{ name: "Meet the authors", href: "/authors" }];
  return (
    <NavbarInternal
      maxWidth="full"
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "justify-center sm:justify-between mt-3",
      }}
    >
      <Link href="/" underline="hover">
        <NavbarBrand>
          <Icon className="p-3" />
          <h3 className="text-primary">Coasting Along</h3>
        </NavbarBrand>
      </Link>
      <NavbarContent className="md:flex md:!justify-end hidden">
        <NavbarMenuItem>
          <SearchInput />
        </NavbarMenuItem>
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item.name}`}>
            <Link href={item.href} color="secondary" underline="hover">
              <h5>{item.name}</h5>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="hidden md:flex">
        <NavbarMenuItem className="flex justify-center p-3">
          <SearchInput />
        </NavbarMenuItem>
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item.name}`} className="flex justify-center p-3">
            <Link href={item.href} color="secondary" underline="hover" size="lg">
              <h4>{item.name}</h4>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
    </NavbarInternal>
  );
}
