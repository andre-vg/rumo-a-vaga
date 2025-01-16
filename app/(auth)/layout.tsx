import SideBar from "@/components/Layout/sidebar";
import { Navbar } from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <section className="mt-16">{children}</section>
    </>
  );
}
