"use client";
import Companies from "@/components/Landing/companies";
import Hero from "@/components/Landing/hero";
import { Footer } from "@/components/Layout/footer";
import NavbarLanding from "@/components/navbarLanding";

export default function Home() {
  return (
    <>
      <NavbarLanding />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 border-x-2">
          <Hero />
          {/* <Video /> */}
          <Companies />
        </section>
      </main>
      <Footer />
    </>
  );
}
