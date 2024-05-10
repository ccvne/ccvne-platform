import { SidebarRoutes } from "./sidebar-routes";
import { currentUser } from "@/lib/auth";

export const Sidebar = async () => {
  const user = await currentUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex flex-col w-full">
        <SidebarRoutes isAdmin={isAdmin} />
      </div>
    </div>
  );
};
