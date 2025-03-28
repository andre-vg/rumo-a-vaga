"use client";
import { Link } from "@heroui/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { LibraryBig } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavbarLanding() {
  const session = useSession();
  const [path, setPath] = useState("/");

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBlurred={scrollPosition < 300}
      classNames={{
        base: [
          `border-primary bg-transparent justify-center items-center backdrop-blur-none`,
        ],
        wrapper: [
          "flex justify-between transition-all duration-500 ease-in-out items-center",
          "xl:px-8 xl:py-8 pl-0 bg-background backdrop-blur-sm",
          scrollPosition < 300
            ? "xl:mt-0 xl:border-0 xl:rounded-none xl:shadow-none"
            : "xl:mt-10 xl:border-1 xl:border-default xl:rounded-full xl:shadow-md bg-background/60 backdrop-blur-md",
        ],
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "text-default-500 hover:text-primary",
        ],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <LibraryBig />
            <p className="font-bold text-inherit">Rumo a Vaga</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start items-center ml-2">
          {siteConfig.landingNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                  "gap-1"
                )}
                href={item.href}
                data-active={item.href === path}
                onClick={() => setPath(item.href)}
              >
                <item.icon />
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem> */}
        <NavbarItem>
          <Button
            onPress={() => signIn("google", { redirectTo: "/dashboard" })}
            color="primary"
          >
            Entrar
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
