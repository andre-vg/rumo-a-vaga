import { Link } from "@heroui/link";
import { NavbarItem } from "@heroui/navbar";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import React from "react";

export default function SidebarCard({
  label,
  icon,
  href,
  index,
}: {
  label: string | undefined;
  icon: JSX.Element;
  href: string;
  index: number;
}) {
  return (
    // <NavbarItem>

    //       className="flex justify-between gap-2 text-pretty rounded-lg bg-primary-100 dark:bg-primary-900 px-3 py-2"
    //     >
    //       <div>
    //         <p className="text-sm font-normal">{label}</p>
    //       </div>
    //       <div className="flex items-center justify-center">
    //         <div className="rounded-md bg-primary-200 dark:bg-primary-800 p-2">{icon}</div>
    //       </div>
    //     </m.div>
    //   </AnimatePresence>
    // </NavbarItem>
    (<NavbarItem>
      <AnimatePresence mode="sync">
        <m.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: (index - 4) * -0.2,
            },
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
        >
          <Link
            className={
              "flex w-full items-center justify-center gap-2 rounded-lg p-3 data-[active=true]:text-white " +
              "data-[hover=true]:justify-start data-[hover=true]:px-6 data-[hover=true]:py-3 "
            }
            href={href}
          >
            {icon}
            <m.p
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: ["auto", "auto", 0] }}
            >
              {label}
            </m.p>
          </Link>
        </m.div>
      </AnimatePresence>
    </NavbarItem>)
  );
}
