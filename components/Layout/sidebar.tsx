"use client";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useDisclosure } from "@heroui/modal";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgePlus,
  BarChart,
  CheckCircle,
  Clock,
  Handshake,
  LayoutDashboard,
  Link2,
  LogOut,
  Moon,
  PlusSquare,
  Sun,
  TrendingUp,
} from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
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
        initial={{
          opacity: 0.5,
          x: -150,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        ref={ref}
        className="col-span-1 w-max"
      >
        <Nav
          isMenuOpen={menuOpen}
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
                  <Popover placement="bottom" showArrow>
                    <PopoverTrigger className="cursor-pointer">
                      <Avatar
                        isBordered
                        color="primary"
                        src={session.data?.user?.image}
                        imgProps={{
                          referrerPolicy: "no-referrer",
                        }}
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
                          onPress={() => signOut()}
                          variant="flat"
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
                  id="rybena-sidebar-modos"
                  fullWidth
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
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: ["auto", "auto", 0] }}
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden"
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
                id="rybena-sidebar-modos"
                size="lg"
                fullWidth
                onPress={() => {
                  theme === "light" ? setTheme("dark") : setTheme("light");
                }}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <Button
                fullWidth
                color="danger"
                variant="flat"
                size="lg"
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
