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
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6 border-x-2 border-default-300 container mx-auto max-w-7xl flex-grow">
        <Hero />
        <Bento />
        <Video />
        <Companies />
      </section>
      <Footer />
    </>
  );
}
