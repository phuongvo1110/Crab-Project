import React, { useState } from "react";
import Image from "next/image";
import bikePic from "@/../public/assets/motor-image.jpeg";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TripNoti(props: any) {
  const { customerName, customerPhoneNumber, departure, destination, price } =
    props;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Booking Notification</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <Image
            className="h-[40px] w-[40px] rounded-full"
            src={bikePic}
            alt="User Image"
          />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{customerName}</p>
            <p className="text-muted-foreground text-sm">
              {customerPhoneNumber}
            </p>
          </div>
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Departure: {departure}
              </p>
              <p className="text-muted-foreground text-sm">
                Destination: {destination}
              </p>
              <p className="text-muted-foreground text-sm">Price: {price}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
