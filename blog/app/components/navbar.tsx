"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NavbarInternal,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/navbar";
import { useState } from "react";
import { Icon } from "../ui/icons";
import { Link } from "@nextui-org/link";

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
        wrapper: "justify-center sm:justify-between",
      }}
    >
      <Link href={"/"} underline="hover">
        <NavbarBrand>
          <Icon className="p-3" />
          <h3 className="text-primary">Coasting Along</h3>
        </NavbarBrand>
      </Link>
      <NavbarContent className="sm:flex sm:!justify-end hidden">
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item.name}`}>
            <Link href={item.href} color="secondary" underline="hover">
              <h5>{item.name}</h5>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>
      <NavbarMenu className="hidden sm:flex">
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
        className="sm:hidden"
      />
    </NavbarInternal>
  );
}
