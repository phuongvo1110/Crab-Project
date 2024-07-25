import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import bikePic from "@/../public/assets/motor-image.jpeg";
import carPic from "@/../public/assets/car-image.jpg";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import useGoogleMap from "@/zustand/useGoogleMap";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export default function TripNoti({ className, ...props }: CardProps) {
  const { bookingForm } = useBookingForm() as useBookingFormState;
  const { googleMap } = useGoogleMap();

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Booking Notification</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          {bookingForm.vehicle === "car" ? (
            <Image src={carPic} className="h-[40px] w-[40px] rounded-full" alt="car" />
          ) : (
            <Image src={bikePic} className="h-[40px] w-[40px] rounded-full" alt="bike" />
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Driver name</p>
            <p className="text-muted-foreground text-sm">
              Vehicle Registration
            </p>
          </div>
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Pickup: {bookingForm.pickUp}
              </p>
              <p className="text-muted-foreground text-sm">
                Destination: {bookingForm.dropOff}
              </p>
              {bookingForm.vehicle === "Car" ? (
                <p className="text-muted-foreground text-sm">
                  Price: ${googleMap.distance && googleMap.distance * 1.5}
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Price: ${googleMap.distance && googleMap.distance * 0.5}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
