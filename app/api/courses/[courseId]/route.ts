import { currentUser } from "@/lib/auth"
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const userId =  user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    
    const { courseId } = params;
    const { tagId, ...rest } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data: any = { ...rest };

    if (tagId) {
      const tags = tagId.map((id: string) => ({ id }));
      data.tags = { set: tags };
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data,
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}