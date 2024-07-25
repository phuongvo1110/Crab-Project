"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/functions/formatDate";
import { DriverBookingWithDriverAndCustomer } from "@/utils/type";

export const columns_headers = [
  { accessKey: "driverID", name: "Driver" },
  { accessKey: "customerId", name: "Customer" },
  { accessKey: "vehicle", name: "Vehicle" },
  { accessKey: "date", name: "Time" },
];

export const columns: ColumnDef<DriverBookingWithDriverAndCustomer>[] = [
  {
    accessorKey: "driverID",
    header: "Driver",
    cell: ({ row }) => {
      const name = row.original.driver?.name ?? "Unknown";

      return <div className="text-left">{name}</div>;
    },
  },
  {
    accessorKey: "customerId",
    header: "Customer",
    cell: ({ row }) => {
      const name = row.original.customer?.name ?? "Unknown";

      return <div className="text-left">{name}</div>;
    },
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const name = row.original.vehicle === 1 ? "Car" : "Bike";

      return <div className="text-left">{name}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex w-32 items-center justify-center border-none">
          <Button
            variant="outline"
            className="border-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = formatDate(date);

      return (
        <div className="w-32 text-center">
          {row.getValue("date") ? formatted : "Unknown"}
        </div>
      );
    },
  },
];
