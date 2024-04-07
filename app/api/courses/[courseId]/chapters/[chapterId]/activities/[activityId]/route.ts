import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string, activityId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findFirst({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const activity = await db.activity.delete({
      where: {
        chapterId: params.chapterId,
        id: params.activityId,
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.log("ACTIVITY_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
