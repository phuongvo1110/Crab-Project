"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/customers/Components/Columns";

export default function page() {
  const { data: customers } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Customer")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  return (
    <section className="px-4 sm:px-2">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All customers</h1>
      </div>
      <DataTable
        columns={columns}
        data={customers?.data ?? []}
        isPaginationEnabled={true}
        defaultPageSize={10}
        searchAttribute="name"
        columns_headers={columns_headers}
      />
    </section>
  );
}
