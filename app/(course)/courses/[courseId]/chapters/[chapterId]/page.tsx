import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { PDFViewer } from "./_components/pdf-viewer";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const user = await currentUser();
  const userId =  user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
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
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to enroll in this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-screen-2xl mx-auto pb-20 p-4">
        <div className="mb-6">
          {chapter.videoUrl ? (
            <div className="relative aspect-video border rounded-md overflow-hidden bg-slate-100">
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
            <div className="relative aspect-[3/4] md:aspect-video border rounded-md overflow-hidden bg-slate-100">
              <div className="absolute inset-y-0 inset-x-0 w-full h-full">
                <PDFViewer chapter={chapter} isLocked={isLocked} />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="border rounded-md p-6 flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-lg lg:text-2xl font-semibold mb-2 lg:mb-0 lg:text-center">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={params.courseId} />
            )}
          </div>
          <div className="border rounded-md p-4 mt-4">
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <div className="flex flex-col gap-2 py-2">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center gap-1 p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
