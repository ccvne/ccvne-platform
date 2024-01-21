import Link from "next/link";
import { SidebarRoutes } from "./sidebar-routes";
import { Lightbulb } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex items-center justify-start h-[80px] px-5 border-b">
        <Link href="/" className="cursor-pointer">
          <div className="items-center gap-x-2 flex hover:opacity-75 transition-opacity">
            <Lightbulb strokeWidth={1.35} className="w-[35px] h-[35px] rotate-[-20deg] text-sky-700"/>
            <div className="leading-tight">
              <p className="font-semibold text-sm text-sky-700">
                Clube Ciência Viva na Escola
              </p>
              <p className="text-xs text-muted-foreground">
                Aprender, partilhar e construir!
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
