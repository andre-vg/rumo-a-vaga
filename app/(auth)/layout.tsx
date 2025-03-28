import React from "react";

import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <section className="mt-16">{children}</section>
    </>
  );
}
