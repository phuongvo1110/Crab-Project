"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/trips/Components/Columns";
import { Customer, Driver, DriverBooking } from "@utils/type";

export default function page() {
  const { data: table } = useQuery({
    queryKey: ["table", "trips"],
    queryFn: async () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DriverBooking")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: async () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Customer")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const { data: drivers } = useQuery({
    queryKey: ["drivers", "all"],
    queryFn: async () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Driver")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const tableData = table?.data.map((booking: DriverBooking) => {
    const driver = drivers?.data.find(
      (driver: Driver) => driver.id === booking.driverID
    );
    const customer = customers?.data.find(
      (customer: Customer) => customer.id === booking.customerId
    );
    return { ...booking, driver: driver ?? null, customer: customer ?? null };
  });

  return (
    <section className="px-4 sm:px-2">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All trips</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/trips/create"
        >
          Create new trip
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={tableData ?? []}
        isPaginationEnabled={true}
        defaultPageSize={10}
        searchAttribute="distance"
        columns_headers={columns_headers}
        isSearchEnabled={false}
      />
    </section>
  );
}
