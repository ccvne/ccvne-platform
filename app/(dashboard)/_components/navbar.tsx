import { currentUser } from "@/lib/auth";

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="p-4 border-b h-full flex items-center bg-white">
        <MobileSidebar />
        <NavbarRoutes user={user}/>
    </div>
  );
};
