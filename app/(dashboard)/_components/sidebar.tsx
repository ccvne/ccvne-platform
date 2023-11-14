import Link from "next/link";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex items-center justify-start h-[80px] px-5 border-b">
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-x-2">
            <Logo />
          </div>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
