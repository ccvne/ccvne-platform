import { db } from "@/lib/db";

export const getAnalytics = async (userId: string) => {
  try {
    const enrolledUsers = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      select: {
        userId: true,
      },
      distinct: ['userId'],
    });

    const enrolledUsersCount = enrolledUsers.length;
    
    const totalUsersCount = await db.course.count();

    const data = [
      { registered: totalUsersCount, enrolled: 0 },
      { registered: 0, enrolled: enrolledUsersCount },
    ];

    return {
      enrolledUsersCount,
      totalUsersCount,
      data
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
