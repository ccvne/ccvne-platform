import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const ManagementPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
      <div className="p-6">
          <DataTable columns={columns} data={users} />
      </div>
  );
};
export default ManagementPage;
