"use client";

import { usePathname } from "next/navigation";
import { LogOut, Library } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { ExtendedUser } from "@/next-auth";
import { UserButton } from "@/components/auth/user-button";

interface NavbarRoutesProps {
  user?: ExtendedUser;
}

export const NavbarRoutes = ({user}: NavbarRoutesProps) => {
  const userId = user?.id;
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="ml-16 lg:block hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              <Library className="h-4 w-4 mr-2" />
              Teacher
            </Button>
          </Link>
        ) : null}
        <UserButton />
      </div>
    </>
  )
}