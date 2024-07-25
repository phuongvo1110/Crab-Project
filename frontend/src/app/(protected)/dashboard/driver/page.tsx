"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/driver/Components/Columns";
import Link from "next/link";

export default function page() {
  const { data: drivers } = useQuery({
    queryKey: ["driver", "all"],
    queryFn: async () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Driver")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  return (
    <section className="px-4 sm:px-2">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All drivers</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/driver/create"
        >
          Create new driver
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={drivers?.data ?? []}
        isPaginationEnabled={true}
        defaultPageSize={10}
        searchAttribute="name"
        columns_headers={columns_headers}
      />
    </section>
  );
}
