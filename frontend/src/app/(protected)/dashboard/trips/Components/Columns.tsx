"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import formatDate from "@/utils/functions/formatDate";
import { DriverBookingWithDriverAndCustomer } from "@/utils/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns_headers = [
  { accessKey: "driverID", name: "Driver" },
  { accessKey: "customerId", name: "Customer" },
  { accessKey: "vehicle", name: "Vehicle" },
  { accessKey: "price", name: "Price" },
  { accessKey: "date", name: "Time" },
  { accessKey: "actions", name: "Actions" },
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
    accessorKey: "distance",
    header: "Distance",
    cell: ({ row }) => {
      const distance = row.original.distance ?? 0;

      return <div className="text-left">{distance} Km</div>;
    },
  },
  {
    accessorKey: "vehicle",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          className="border-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vehicle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const vehicel = row.original.vehicle === 1 ? "Car" : "Bike";

      return <div className="w-full pr-5 text-center">{vehicel}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price ?? 0;

      return <div className="text-left">$ {price.toFixed(2)}</div>;
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
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy trip ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
