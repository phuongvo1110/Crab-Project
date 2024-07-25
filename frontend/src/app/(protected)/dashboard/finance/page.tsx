"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Banknote, HandCoins, MapPin, Map } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useDatePicker from "@/zustand/useDatePicker";
import { DateRangePicker } from "@components/Picker/RangeDate/DateRangePicker";
import formatDate from "@/utils/functions/formatDate";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  const { data: revenue, isLoading: isRevenueLoading } = useQuery({
    queryKey: ["revenue", "all", from, to],
    queryFn: async () =>
      axios
        .post(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DashBoard/getRevenueRange",
          {
            startDate: from,
            endDate: to,
          },
          {
            headers: {
              accept: "text/plain",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 5,
  });

  const { data: locationRevenue, isLoading: isLocationRevenueLoading } =
    useQuery({
      queryKey: ["locationRevenue", "all", from, to],
      queryFn: async () =>
        axios
          .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/LocationRevenue")
          .then((res) => res),
      staleTime: 1000 * 60 * 5,
    });

  const maxRevenueLocation = locationRevenue?.data.reduce(
    (prev: any, current: any) =>
      prev.totalRevenue > current.totalRevenue ? prev : current
  );

  return (
    <main className="flex w-full flex-col gap-4 px-4 pb-4 xl:col-span-3 sm:gap-2 sm:px-2 sm:pb-2 sm:pt-2">
      <div className="flex h-fit w-full flex-row items-center justify-between lg:flex-col lg:gap-2">
        <h1 className="font-medium">
          Data from {formatDate(from)} to {formatDate(to)}
        </h1>
        <div className="lg:w-full">
          <DateRangePicker showCompare={false} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        <DataCard
          title="Total revenue"
          data={"$ " + (revenue?.data.toFixed(2) ?? 0).toString()}
          previousData={"Profit: $ " + (revenue?.data * 0.3 ?? 0).toString()}
          icon={<Banknote className="text-muted-foreground h-4 w-4" />}
          isLoading={isRevenueLoading}
        />
        <DataCard
          title="Highest province"
          data={
            "$ " + (maxRevenueLocation?.totalRevenue.toFixed(2).toString() ?? 0)
          }
          previousData={maxRevenueLocation?.city ?? "Unknown"}
          icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
          isLoading={isLocationRevenueLoading}
        />
        <DataCard
          title="North side"
          data={"$ 640,21"}
          previousData="Total trips"
          icon={<MapPin className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
        <DataCard
          title="South side"
          data={"$ 120,00"}
          previousData="Total trips"
          icon={<Map className="text-muted-foreground h-4 w-4" />}
          isLoading={false}
        />
      </div>
      <div className="">
        <RevenueBarChart />
      </div>
    </main>
  );
}
