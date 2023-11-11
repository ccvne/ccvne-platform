import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const enrolledUsersCount = purchases
      .map((purchase) => purchase.userId)
      .filter((value, index, self) => self.indexOf(value) === index)
      .length;

    // Explicitly define the type for aggregate result:
    const totalUsersCount: { _count: { userId: number } } = await db.course.aggregate({
      _count: {
        userId: true,
      },
    });

    // Collect data related to courses for the chart:
    const data = purchases.map((purchase) => ({
      registered: totalUsersCount._count.userId - enrolledUsersCount,
      enrolled: enrolledUsersCount,
    }));

    return {
      enrolledUsersCount,
      totalUsersCount: totalUsersCount._count.userId,
      data,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      enrolledUsersCount: 0,
      totalUsersCount: 0,
      data: [],
    };
  }
};
