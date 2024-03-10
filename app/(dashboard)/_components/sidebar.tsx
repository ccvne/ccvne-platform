import Link from "next/link";
import Image  from "next/image";

import { SidebarRoutes } from "./sidebar-routes";
import { Lightbulb } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex items-center justify-start h-[80px] px-5 border-b">
        <Link href="/dashboard" className="cursor-pointer">
          <div className="items-center gap-x-2 flex hover:opacity-75 transition-opacity">
            <Image src="/logo-symbol.png" width={28} height={20} alt="Logo" />
            <div className="leading-tight">
              <p className="font-semibold text-sm text-sky-700">
                Clubes Ciência Viva na Escola
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
