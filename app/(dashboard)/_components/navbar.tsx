import { currentUser } from "@/lib/auth";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

import Link from "next/link";
import Image from "next/image";

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="p-4 border-b h-full flex items-center bg-white">
      <div className="flex items-center justify-start h-[80px] border-b">
        <Link href="/dashboard" className="cursor-pointer">
          <div className="items-center gap-x-2 flex hover:opacity-75 transition-opacity">
            <Image src="/logo-symbol.png" width={24} height={20} alt="Logo" />
            <div className="leading-tight">
              <p className="font-semibold text-sm text-sky-700">
                Clubes Ciência Viva na Escola 296
              </p>
              <p className="text-xs text-muted-foreground">
                Ensinar a partir do entendimento de como funciona, no lugar do uso.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <MobileSidebar />
      <NavbarRoutes user={user} />
    </div>
  );
};
