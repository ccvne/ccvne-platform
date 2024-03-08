import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const updatedUser = await db.user.update({
      where: {
        id: values.id,
      },
      data: {
        isAuthorized: values.isAuthorized,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
