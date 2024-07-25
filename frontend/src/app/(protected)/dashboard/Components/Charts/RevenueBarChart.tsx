"use client";

import { BarChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDatePicker from "@/zustand/useDatePicker";
import formatVNDate from "@/utils/functions/formatDate";

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface MonthType {
  revenue: number;
  profit: number;
}

interface ChartType {
  Month: string;
  Year: string;
  revenue: number;
  profit: number;
}

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: revenueAndProfit } = useQuery({
    queryKey: ["revenues-profit", from, to],
    queryFn: async () =>
      axios
        .post(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DashBoard/getRevenueProfit",
          {
            startDate: "2024-04-08T07:14:56.738Z",
            endDate: "2024-05-08T07:14:56.738Z",
          },
          {
            headers: {
              accept: "text/plain",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const chartTypeList = createChartTypeList(
    revenueAndProfit?.data ?? [],
    months,
    from,
    to
  );

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader className="pb-0">
        <CardTitle className="mb-2">Finance</CardTitle>
        <div className="flex w-full flex-row items-center justify-between sm:flex-col sm:gap-2">
          <CardDescription>
            Finance chart in the whole country{" "}
            <span className="hidden sm:block">
              from {formatVNDate(from)} to {formatVNDate(to)}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-2 h-fit">
        <div>
          <BarChart
            data={chartTypeList}
            index="name"
            categories={["revenue", "profit"]}
            colors={["blue", "red"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function createChartTypeList(
  chartdata: MonthType[],
  months: string[],
  from: Date,
  to: Date
): ChartType[] {
  const chartTypeList: ChartType[] = [];
  let currentMonth = new Date(from);
  let index = 0;

  while (currentMonth <= to) {
    const monthIndex = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const month = months[monthIndex];
    const chartDataItem = chartdata[index];
    const revenue = chartDataItem ? chartDataItem.revenue : 0;
    const profit = chartDataItem ? chartDataItem.profit : 0;

    chartTypeList.push({
      Month: month,
      Year: year.toString(),
      revenue: revenue,
      profit: profit,
    });

    currentMonth.setMonth(currentMonth.getMonth() + 1);
    index++;
  }

  return chartTypeList;
}
