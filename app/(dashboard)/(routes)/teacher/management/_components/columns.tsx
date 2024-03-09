"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, UserCheck, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsCellProps {
  row: {
    original: User;
  };
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row }) => {
  const router = useRouter();

  const { id, isAuthorized, email } = row.original;
  const onClick = async () => {
    try {
      let response;

      if (isAuthorized) {
        response = await axios.patch(`/api/users/`, {
          id: id,
          isAuthorized: null,
        });
      } else {
        response = await axios.patch(`/api/users/`, {
          id: id,
          isAuthorized: new Date(),
        });
      }

      if (response) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-4 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Button variant="ghost" className="h-6 px-2 py-0" onClick={onClick}>
          <DropdownMenuItem>
            {isAuthorized ? (
              <>
                <UserX className="h-4 w-4 mr-2" />
                Remover Autorização
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Autorizar
              </>
            )}
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isAuthorized",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Autorizado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { isAuthorized } = row.original;

      return (
        <span>
          {isAuthorized
            ? new Date(isAuthorized).toLocaleDateString()
            : "Sem autorização"}
        </span>
      );
    },
  },
  {
    accessorKey: "isTwoFactorEnabled",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          2FA
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
