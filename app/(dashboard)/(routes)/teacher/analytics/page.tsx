import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const user = await currentUser();
  const userId =  user?.id;

  if (!userId) {
    return redirect("/auth/login");
  }

  const {
    enrolledUsersCount,
    totalUsersCount,
    data,
  } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Registered Users"
          value={totalUsersCount}
        />
        <DataCard
          label="Enrolled Users"
          value={enrolledUsersCount}
        />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
