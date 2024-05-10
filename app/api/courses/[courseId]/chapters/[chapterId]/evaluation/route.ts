import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    const { rating, tags, comment } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let tagsString: string = '';

    if (Array.isArray(tags)) {
      tagsString = tags.join(', ');
    } else if (typeof tags === 'string') {
      tagsString = tags;
    }

    const evaluation = await db.evaluation.create({
      data: {
        userId,
        chapterId: params.chapterId,
        rating,
        tags: tagsString,
        comment,
      },
    });

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("[CHAPTER_EVALUATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const evaluation = await db.evaluation.findFirst({
      where: {
        userId,
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("[CHAPTER_EVALUATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}