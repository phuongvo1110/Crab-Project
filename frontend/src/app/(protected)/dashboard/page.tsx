"use client";

import { Car, Hash, MoreVertical, Bike, CalendarDays } from "lucide-react";
import { DataTable } from "@components/Table/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import DataCard from "@app/(protected)/dashboard/Components/DataCard";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/Components/OverviewColumns";
import formatCurrencyWithCommas from "@/utils/functions/formatCurrency";
import { Customer, Driver, DriverBooking } from "@utils/type";
import formatDate from "@/utils/functions/formatDate";
import { useState } from "react";

export default function page() {
  const { data: total_bike, isLoading: isTotalBikeLoading } = useQuery({
    queryKey: ["total_bike", "all"],
    queryFn: () =>
      axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/DashBoard/totalMotorbikeRides"
      ),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const { data: total_car, isLoading: isTotalCarLoading } = useQuery({
    queryKey: ["total_car", "all"],
    queryFn: () =>
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DashBoard/totalCarDrives"
        )
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const [trip_month, setTrip_month] = useState<number>(-1);
  axios
    .post(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DashBoard/totalRidesInMonth",
      { date: new Date().toISOString() },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setTrip_month(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const { data: success_percent, isLoading: isSuccessPercentLoading } =
    useQuery({
      queryKey: ["success_percent"],
      queryFn: () =>
        axios
          .get(
            process.env.NEXT_PUBLIC_BACKEND_API_URL +
              "/DashBoard/successfulRate"
          )
          .then((res) => res),
      staleTime: 1000 * 60 * 60,
      retry: 3,
    });

  const { data: table } = useQuery({
    queryKey: ["table", "trips"],
    queryFn: () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DriverBooking")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: () =>
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Customer")
        .then((res) => res),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });

  const { data: drivers } = useQuery({
    queryKey: ["drivers", "all"],
    queryFn: () =>
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
    <div className="bg-muted/40 flex min-h-screen w-full flex-col overflow-hidden px-4 pb-4 sm:px-2 sm:pb-2">
      <div className="flex flex-col gap-4 sm:gap-2">
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1 sm:gap-2">
          <DataCard
            title="Total bike trips"
            data={total_bike ? total_bike.data.toString() : "0"}
            previousData="Mostly successful"
            icon={<Bike className="text-muted-foreground h-4 w-4" />}
            isLoading={isTotalBikeLoading}
          />
          <DataCard
            title="Total car trips"
            data={total_car ? total_car.data.toString() : "0"}
            previousData="Mostly satisfied"
            icon={<Car className="text-muted-foreground h-4 w-4" />}
            isLoading={isTotalCarLoading}
          />
          <DataCard
            title="Trips this month"
            data={trip_month >= 0 ? trip_month.toString() : "0"}
            previousData="2/2/2024"
            icon={<CalendarDays className="text-muted-foreground h-4 w-4" />}
            isLoading={trip_month === -1}
          />
          <DataCard
            title="Successful percent"
            data={
              success_percent
                ? success_percent.data.toFixed(2).toString() + " %"
                : "0 %"
            }
            previousData="Counted on total data"
            icon={<Hash className="text-muted-foreground h-4 w-4" />}
            isLoading={isSuccessPercentLoading}
          />
        </div>
        <div className="grid grid-cols-6 items-start gap-4 py-0 lg:gap-0 sm:gap-2">
          <div className="col-span-4 lg:col-span-6">
            <DataTable
              columns={columns}
              data={tableData ?? []}
              isPaginationEnabled={true}
              defaultPageSize={10}
              searchAttribute="customerId"
              columns_headers={columns_headers}
            />
          </div>
          <Card className="col-span-2 w-full overflow-hidden lg:col-span-6">
            <CardHeader className="bg-muted/50 flex flex-row items-start">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Trips report
                </CardTitle>
                <CardDescription>
                  Time: {formatDate(new Date())}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Reload</DropdownMenuItem>
                    <DropdownMenuItem>Export PDF</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Report Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total trips:</span>
                    <span>200</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trips in HCM:</span>
                    <span>103</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trips in HN:</span>
                    <span>76</span>
                  </li>
                </ul>
                <Separator className="" />
                <div className="font-semibold">Finance Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total revenue:
                    </span>
                    <span>${formatCurrencyWithCommas(2000)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Revenue in HCM:
                    </span>
                    <span>${formatCurrencyWithCommas(2000)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Revenue in HN:
                    </span>
                    <span>${formatCurrencyWithCommas(2000)}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row justify-between gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Successful trips</div>
                  <address className="text-muted-foreground grid gap-0.5 not-italic">
                    <span>99000</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Failed trips</div>
                  <div className="text-muted-foreground">1000 </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex w-full justify-center border-t px-6 py-3 text-sm font-medium">
              A report is generated automatically.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
