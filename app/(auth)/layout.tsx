import React from "react";

import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <section className="mt-16 container mx-auto max-w-7xl flex-grow md:py-10 px-6">
      {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6 border-x-2 border-default-300 container mx-auto max-w-7xl flex-grow"> */}

        {children}
      </section>
    </>
  );
}
