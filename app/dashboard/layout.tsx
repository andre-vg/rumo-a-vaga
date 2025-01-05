import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
