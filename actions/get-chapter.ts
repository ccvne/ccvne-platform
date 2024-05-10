import { db } from "@/lib/db";
import { Attachment, Chapter, Tag } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const courseOwner = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or Course Not Found.");
    }

    let tags: Tag[] = [];

    tags = await db.tag.findMany({
      where: {
        courses: {
          some: {
            id: courseId,
          },
        },
      },
    });

    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      courseOwner,
      chapter,
      course,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      tags,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      tags: [],
    };
  }
};
