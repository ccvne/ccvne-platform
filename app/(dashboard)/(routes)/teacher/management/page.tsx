import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

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
        <RoleGate allowedRole={UserRole.ADMIN}>
          <DataTable columns={columns} data={users} />
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
      </div>
  );
};
export default ManagementPage;
