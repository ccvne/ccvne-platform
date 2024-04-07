"use client";

import { BarChart, Compass, Layout, List, Shield } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

interface SidebarRoutesProps {
  isAdmin: boolean;
}

const guestRoutes = [
  {
    icon: Layout,
    label: "DashBoard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const adminRoutes = [
  {
    icon: Shield,
    label: "Management",
    href: "/teacher/management",
  },
];

export const SidebarRoutes = ({ isAdmin }: SidebarRoutesProps) => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  let routes = isTeacherPage ? teacherRoutes : guestRoutes;

  if (isAdmin && isTeacherPage) {
    routes = [...routes, ...adminRoutes];
  }

  return (
    <div className="flex flex-col w-full space-y-1.5 p-3 mt-3">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
