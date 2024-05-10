import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Paperclip, PlayCircle, FileX2 } from "lucide-react";

import { db } from "@/lib/db";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseSideBarActivity } from "./course-sidebar-activity";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
}

export const CourseSidebar = async ({ course }: CourseSidebarProps) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  const attachments = await db.attachment.findMany({
    where: {
      courseId: course.id,
    },
  });

  return (
    <div className="h-full border-l flex flex-col overflow-y-auto shadow-sm">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full h-14">
          <TabsTrigger value="content" className="w-full h-full p-4">
            <PlayCircle className="w-6 h-6" />
          </TabsTrigger>
          <TabsTrigger value="resources" className="w-full h-full p-4">
            <Paperclip />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content">
          <div className="flex flex-col w-full md:p-3">
            <h2 className="w-full text-base md:text-xl text-foreground font-bold">
              Conteúdo do Curso
            </h2>
            <div className="mt-4 border rounded-md h-full">
              <div className="flex flex-col flex-1 overflow-hidden p-4">
                <h2 className="text-base text-slate-800 text-ellipsis overflow-hidden whitespace-nowrap">
                  {course.title}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-700 leading-normal">
                  <span>{course.chapters.length} aulas</span>
                  <div className="flex flex-shrink-0 w-1 h-1 rounded-full bg-slate-500"></div>
                  <span>
                    {
                      course.chapters.filter(
                        (chapter) => chapter.userProgress?.[0]?.isCompleted
                      ).length
                    }{" "}
                    concluídas
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-2">
                {course.chapters.map((chapter) => (
                  <CourseSidebarItem
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchase}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    nextChapterId={
                      course.chapters[course.chapters.indexOf(chapter) + 1]?.id
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="resources">
          <div className="flex flex-col w-full md:p-3">
            <h2 className="w-full text-base md:text-xl text-foreground font-bold">
              Materiais Extras
            </h2>
            {!purchase ? (
              <div className="w-full mt-8 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 max-w-[252px]">
                  <div className="text-slate-700 text-[40px]">
                    <FileX2 />
                  </div>
                  <p className="self-stretch text-slate-500 text-center text-sm">
                    Não existem materiais extras relacionados a este curso.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 border rounded-md h-full">
                <div className="flex flex-col flex-1 overflow-hidden p-4">
                  <h2 className="text-base text-slate-800 text-ellipsis overflow-hidden whitespace-nowrap">
                    Material Complementar
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 leading-normal">
                    <span>{attachments.length} materiais ou recursos</span>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  {attachments.map((attachment) => (
                    <CourseSideBarActivity
                      key={attachment.id}
                      id={attachment.id}
                      name={attachment.name}
                      url={attachment.url}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
