import type { LucideIcon } from "lucide-react";
import { LayoutIcon, PersonStandingIcon, RocketIcon } from "lucide-react";
import type { ReactNode } from "react";
import { EarthIcon } from "./icons";

export default function Highlights(): JSX.Element {
  return (
    <div className="relative z-[2] grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <Highlight icon={RocketIcon} heading="Light and Fast.">
        Full powered application with Next.js App Router, and recent
        technologies.
      </Highlight>
      <Highlight icon={LayoutIcon} heading="Accessibility & UX first.">
        An easy-to-use platform with great accessibility and intuitive
        interface.
      </Highlight>
      <Highlight icon={PersonStandingIcon} heading="Profile Personalization.">
        Craft and set up your distinctive and fully customizable In-App
        Identity.
      </Highlight>
      <div className="col-span-full flex flex-col items-center border-l border-t px-6 py-12 text-center">
        <div className="mx-auto max-w-md text-center sm:max-w-xl">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-gray-700 sm:text-5xl sm:leading-tight">
            <span>Learn. </span> Build.
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Share.
            </span>
          </h2>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Ap-pdf.club is more than just a learning platform. We&apos;ve built
            a suite of powerful features that gives your brain superpowers.
          </p>
        </div>
        <div
          className="mt-14 w-full"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(to right,hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 40px)",
              "repeating-linear-gradient(to bottom,hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 40px)",
            ].join(","),
          }}
        >
          <EarthIcon className="-my-8 mx-auto h-auto w-60" />
        </div>
      </div>
    </div>
  );
}

function Highlight({
  icon: Icon,
  heading,
  children,
}: {
  icon: LucideIcon;
  heading: ReactNode;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="relative z-[2] border-l border-t px-6 py-12">
      <div className="mb-4 flex flex-row items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-sky-500" />
        <span className="text-lg font-semibold bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
          {heading}
        </span>
      </div>
      <span className="font-medium text-muted-foreground">{children}</span>
    </div>
  );
}
