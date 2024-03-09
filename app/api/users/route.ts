import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

import { sendAuthorizationConfirmEmail } from "@/lib/mail";

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

    sendAuthorizationConfirmEmail(updatedUser.email as string);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
