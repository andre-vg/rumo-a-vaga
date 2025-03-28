"use client";
import Bento from "@/components/Landing/bento";
import Companies from "@/components/Landing/companies";
import Hero from "@/components/Landing/hero";
import Video from "@/components/Landing/video";
import { Footer } from "@/components/Layout/footer";
import NavbarLanding from "@/components/navbarLanding";

export default function Home() {
  return (
    <>
      <NavbarLanding />
      <main className="container mx-auto max-w-7xl px-6 flex-grow border-x-2">
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Hero />
          <Bento />
          <Video />
          <Companies />
        </section>
      </main>
      <Footer />
    </>
  );
}
