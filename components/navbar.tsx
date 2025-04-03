"use client";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "./icons";
import { LibraryBig } from "lucide-react";

export default function Navbar() {
  const session = useSession();
  const [path, setPath] = useState("/dashboard");

  return (
    <NextUINavbar
      classNames={{
        base: [
          `border-primary bg-transparent justify-center items-center backdrop-blur-none`,
        ],
        wrapper: [
          "flex justify-between transition-all duration-500 ease-in-out items-center",
          "xl:px-8 xl:py-8 pl-0 bg-background backdrop-blur-sm",
          "xl:mt-0 xl:border-0 xl:rounded-xl xl:shadow-none px-4",
        ],
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "text-default-500 hover:text-primary",
        ],
      }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <LibraryBig />
            <p className="font-bold text-inherit">Rumo a Vaga</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                  "gap-1"
                )}
                data-active={item.href === path}
                href={item.href}
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
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link> */}
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem />
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
        {session.data?.user?.image && (
          <Popover showArrow placement="bottom">
            <PopoverTrigger className="cursor-pointer">
              <Avatar
                isBordered
                color="primary"
                imgProps={{
                  referrerPolicy: "no-referrer",
                }}
                src={session.data?.user?.image}
              />
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <p className="font-body text-2xl font-bold">
                    {session.data?.user?.name}
                  </p>
                  <p className="font-body text-lg font-light">
                    {session.data?.user?.email}
                  </p>
                </div>
                <Button
                  fullWidth
                  color="danger"
                  variant="flat"
                  onPress={() => signOut()}
                >
                  Sair
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
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
                href={item.href}
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
