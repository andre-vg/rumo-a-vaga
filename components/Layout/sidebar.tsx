"use client";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Avatar } from "@heroui/avatar";
import { signOut, useSession } from "next-auth/react";

import SidebarCard from "./sidebarCard";

export default function SideBar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  const session = useSession();

  const navItems = [
    {
      label: "TESTE",
      icon: <Handshake />,
      href: "/agentes",
    },
  ];

  return (
    <>
      <motion.div
        ref={ref}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="col-span-1 w-max"
        initial={{
          opacity: 0.5,
          x: -150,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
      >
        <Nav
          classNames={{
            base: [
              "lg:bg-background dark:lg:bg-primary-950 lg:fixed lg:w-max lg:h-[calc(100vh-6rem)] lg:data-[hover=true]:w-72 lg:items-start lg:ml-12 lg:mt-12",
              "lg:rounded-2xl lg:shadow-lg lg:z-40 lg:overflow-auto lg:px-4 lg:py-3 lg:pt-8 ",
            ],
            wrapper: "lg:h-full lg:flex-col lg:overflow-x-hidden px-1",
            item: [
              "data-[active=true]:bg-primary-400",
              "data-[active=true]:font-bold",
              "data-[active=true]:text-white",
              "rounded-xl font-medium",
              "lg:hover:outline lg:hover:outline-2 lg:hover:outline-primary-300",
            ],
            menuItem: [
              "data-[active=true]:bg-primary-400",
              "data-[active=true]:font-bold",
              "data-[active=true]:text-white",
              "rounded-2xl font-medium",
            ],
            brand: "flex-grow-0",
          }}
          isMenuOpen={menuOpen}
        >
          <NavbarContent className="hidden w-full items-start justify-center gap-4 px-0 lg:flex lg:flex-col lg:data-[justify=start]:justify-between">
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-col gap-2">
                <NavbarBrand>{/* <RybenaLogo /> */}</NavbarBrand>
                {/* {cardItems.map((item, index) => (
                  <SidebarCard key={index} {...item} index={index} />
                ))} */}
                {navItems.map((item, index) => (
                  <SidebarCard key={index} {...item} index={index} />
                ))}
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
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-x-2 gap-y-4 py-2">
              <AnimatePresence mode="sync">
                <Button
                  fullWidth
                  id="rybena-sidebar-modos"
                  onPress={() => {
                    theme === "light" ? setTheme("dark") : setTheme("light");
                  }}
                >
                  {theme === "dark" ? <Sun /> : <Moon />}
                </Button>
              </AnimatePresence>
              <AnimatePresence mode="sync">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    signOut();
                  }}
                >
                  <LogOut size={24} />
                  <motion.p
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: ["auto", "auto", 0] }}
                    initial={{ opacity: 0, width: 0 }}
                  >
                    Sair
                  </motion.p>
                </Button>
              </AnimatePresence>
            </div>
          </NavbarContent>

          <NavbarContent className="w-full !justify-around lg:hidden">
            {/* <NavbarBrand>
              <RybenaLogoShort />
            </NavbarBrand> */}
            <NavbarMenuToggle
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </NavbarContent>
          <NavbarMenu className="justify-between backdrop-blur-lg">
            <div className="grid gap-4 pt-12">
              {navItems.map((item, index) => (
                <SidebarCard key={index} {...item} index={index} />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 pb-8">
              <Button
                fullWidth
                id="rybena-sidebar-modos"
                size="lg"
                onPress={() => {
                  theme === "light" ? setTheme("dark") : setTheme("light");
                }}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <Button
                fullWidth
                color="danger"
                size="lg"
                variant="flat"
                onPress={() => {
                  signOut();
                }}
              >
                <LogOut />
                Sair
              </Button>
            </div>
          </NavbarMenu>
        </Nav>
      </motion.div>
    </>
  );
}
