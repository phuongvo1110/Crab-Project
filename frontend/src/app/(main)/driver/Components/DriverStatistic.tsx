"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@components/ui/button";
import { Banknote, CarTaxiFront } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";

import { Switch } from "@components/ui/switch";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export default function SheetSide() {
  const { userSession, setStatus } = useUserSessionStore() as UserSessionStore;
  const { bookingForm } = useBookingForm() as useBookingFormState;
  const [isDesktop, setIsDesktop] = useState(true);

  const {
    data: bookingData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () =>
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DriverBooking/" +
            bookingForm.bookingID
        )
        .then((res) => {
          {
            console.log(res)
            res.data.statusType = 1;
            return res.data;
          }
        }),
    staleTime: 1000 * 60 * 5,
  });

  const submitBooking = useMutation({
    mutationFn: (data) =>
      axios.put(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/DriverBooking/" +
          bookingForm.bookingID,
        data,
        stickJWTToHeader()
      ),
    retry: 3,
  });

  const checkDesktop = () => {
    if (window.innerWidth <= 900) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };

  useEffect(() => {
    checkDesktop();
  }, [isDesktop]);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", checkDesktop);
  }

  const handleStatusChange = () => {
    if (userSession.status !== 0) {
      setStatus(0);
    } else {
      setStatus(1);
    }
  };

  const handleSubmit = () => {
    if (isSuccess) {
      toast.promise(
        async () => {
          bookingData.statusType = 1;
          console.log("Booking", bookingData)
          submitBooking.mutate(bookingData as any);
        },
        {
          loading: "Finish booking...",
          success: () => {
            setStatus(0);
            return "Finish trip!";
          },
          error: (error: any) => {
            return error.message;
          },
        }
      );
    }
  };

  return (
    <div className="w-full">
      <Sheet key={isDesktop ? "left" : "bottom"}>
        <SheetTrigger asChild>
          <div className="flex w-full justify-center">
            <Button className="mx-2 my-2 w-full bg-foreground text-background hover:bg-foreground">
              Statistic
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent
          side={isDesktop ? "left" : "bottom"}
          className={isDesktop ? "w-1/4" : "w-full"}
        >
          <SheetHeader>
            <SheetTitle>Driver Statistics</SheetTitle>
            <SheetDescription>
              Driver trips done and the total revenue.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-2 font-bold">
              <Switch
                checked={userSession.status !== 0 ? true : false}
                onCheckedChange={handleStatusChange}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
              DRIVER STATUS
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <DataCard
                title="Total trips"
                data={"96 bookings"}
                previousData="Total trips"
                icon={
                  <CarTaxiFront className="text-muted-foreground h-4 w-4" />
                }
                isLoading={false}
              />
              <DataCard
                title="Total revenue"
                data={"$1,000"}
                previousData={"Profit: $300"}
                icon={<Banknote className="text-muted-foreground h-4 w-4" />}
                isLoading={false}
              />
            </div>
          </div>
          <SheetFooter>
            {userSession.status === 2 && (
              <SheetClose asChild className="py-4">
                <Button
                  className="w-full bg-foreground text-background hover:bg-foreground"
                  onClick={() => setStatus(3)}
                >
                  Got Customer
                </Button>
              </SheetClose>
            )}
            {userSession.status === 3 && (
              <SheetClose asChild>
                <Button
                  className="w-full bg-foreground text-background hover:bg-foreground"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Finish
                </Button>
              </SheetClose>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
