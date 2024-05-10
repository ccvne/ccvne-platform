import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <main className="md:pr-80 pt-[80px] h-full">{children}</main>
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full mt-20 w-80 flex-col fixed inset-y-0  right-0 z-50">
        <CourseSidebar course={course} />
      </div>
    </div>
  );
};

export default CourseLayout;
