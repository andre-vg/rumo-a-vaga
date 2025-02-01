"use client";
import { Button } from "@heroui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <p>aaa</p>

        <Button onPress={() => signIn("google", { redirectTo: "/dashboard" })}>
          Sign in
        </Button>
      </section>
    </main>
  );
}
