import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar-routes";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

import Link from "next/link";
import Image from "next/image";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="flex justify-between w-full p-4 border-b h-full items-center bg-white shadow-sm">
      <div className="flex items-center justify-start h-[80px]">
        <Link href="/dashboard" className="cursor-pointer">
          <div className="items-center gap-x-2 flex hover:opacity-75 transition-opacity">
            <Image src="/logo-symbol.png" width={28} height={20} alt="Logo" />
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
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
