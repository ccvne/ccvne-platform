import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { Footer } from "@/components/footer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { VideoPlayer } from "./_components/video-player";
import { PDFViewer } from "./_components/pdf-viewer";
import { Evaluation } from "./_components/evaluation";
import { CourseEnrollButton } from "./_components/course-enroll-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const {
    courseOwner,
    chapter,
    course,
    nextChapter,
    userProgress,
    purchase,
    tags,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/dashboard");
  }

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="Parabéns, já completou este capítulo."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Precisa de se inscrever no curso para ver este capítulo."
        />
      )}
      <div className="flex flex-col max-w-screen-2xl mx-auto pb-6">
        <div className="mb-6">
          {chapter.videoUrl ? (
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <div className="absolute inset-y-0 inset-x-0 w-full h-full">
                <VideoPlayer
                  chapterId={params.chapterId}
                  title={chapter.title}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isLocked={isLocked}
                  completeOnEnd={completeOnEnd}
                  chapter={chapter}
                />
              </div>
            </div>
          ) : (
            <div className="relative aspect-[3/4] md:aspect-video overflow-hidden bg-slate-100">
              <div className="absolute inset-y-0 inset-x-0 w-full h-full">
                <PDFViewer chapter={chapter} isLocked={isLocked} />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex flex-col gap-12 md:py-6 md:px-6">
            <div className="flex flex-col-reverse flex-1 md:flex-row gap-10 self-stretch">
              <div className="flex flex-col gap-8 flex-1">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl lg:text-lg font-bold mb-2 lg:mb-0">
                      {chapter.title}
                    </h2>
                    <div className="flex gap-[6px] w-full flex-wrap font-semibold">
                      {tags &&
                        tags.map((tag) => (
                          <a
                            key={tag.id}
                            href="#"
                            className="inline-flex justify-center items-center gap-2 flex-shrink-0 rounded-full box-border cursor-default select-none bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 h-7 text-xs leading-3"
                          >
                            {tag.name}
                          </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="inline-flex flex-row-reverse">
                        <Avatar className="flex justify-center items-center flex-shrink-0 bg-purpleseat-base text-white select-none w-[3.25rem] h-12 [&+&]:-mr-4 hover:z-10 transition-all">
                          <AvatarImage src={user?.image || ""} />
                          <AvatarFallback className="bg-sky-500">
                            <User className="text-white" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm md:text-md">
                          {courseOwner?.name}
                        </p>
                        <span className="text-xs md:text-sm text-slate-600">
                          Professor
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 text-base leading-[1.6] w-full max-w-[800px]">
                  <Preview value={chapter.description!} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                {(isLocked || !purchase) && (
                  <CourseEnrollButton courseId={params.courseId} />
                )}
                {!isLocked && purchase && (
                  <Evaluation
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChapterIdPage;
