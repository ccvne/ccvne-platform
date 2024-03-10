import { StarsIcon } from "lucide-react";

import Navbar from "@/components/navbar";

import Hero from "./_components/hero";
import Highlights from "./_components/highlights";
import OpenSource from "./_components/open-source";
import ChangeLog from "./_components/change-log";

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <div
        className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
        style={{
          background:
            "repeating-linear-gradient(to right, hsl(var(--border)), transparent 1px, transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--border)), transparent 1px, transparent 50px)",
        }}
      />
      <main className="container mb-[80px] top-[70px] relative max-w-[1100px] px-2 py-4 lg:py-16">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)",
          }}
        >
          <div className="relative">
            <StarsIcon
              className="absolute -left-2 -top-2 z-10 size-4 xl:scale-[200%] text-sky-500"
              stroke="none"
              fill="currentColor"
            />
            <StarsIcon
              className="absolute -bottom-2 -right-2 z-10 size-4 xl:scale-[200%] text-sky-500"
              stroke="none"
              fill="currentColor"
            />
            <Hero />
          </div>
          <Highlights />
          <ChangeLog />
          <OpenSource />
        </div>
      </main>

      <footer className="p-4 md:px-[26rem] w-full bg-white border-t flex flex-col lg:flex-row items-start lg:items-center">
        <div className="text-xs text-muted-foreground py-2 px-4 lg:flex-1">
          © 2024 Clubes Ciência Viva na Escola. All rights reserved.
        </div>
        <a
          className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
          href="#"
        >
          Contact
        </a>
        <a
          target="_blank"
          className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
          href="#"
        >
          Terms of Service
        </a>
        <a
          target="_blank"
          className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline h-10 px-4 py-2 text-muted-foreground text-xs"
          href="#"
        >
          Privacy Policy
        </a>
      </footer>
    </>
  );
}
