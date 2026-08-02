"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { PhsuShield } from "./phsu-shield";
import { ThemeToggle } from "./theme-toggle";

export function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      maxWidth="xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-3">
          <PhsuShield size={26} />
          <div className="leading-tight">
            <p className="font-sans text-sm font-extrabold tracking-tight">
              {siteConfig.programShort} Faculty
            </p>
            <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-default-600">
              {siteConfig.university}
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-7 sm:flex" justify="center">
        {siteConfig.nav.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              color="foreground"
              className="font-sans text-sm font-medium"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            color="primary"
            radius="md"
            className="font-sans font-semibold"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            Email the program
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.nav.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              color="foreground"
              size="lg"
              className="w-full font-sans"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
