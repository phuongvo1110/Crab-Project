"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/editor/ui/button";
import { Check } from "lucide-react";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import TripNoti from "./TripNoti";

export default function TripNotiDialog({
  customerName,
  customerPhoneNumber,
  departure,
  destination,
  price,
}: any) {
  const { setStatus } = useUserSessionStore() as UserSessionStore;
  const [open, setOpen] = useState(false);
  const onBooking = true;

  useEffect(() => {
    setOpen(onBooking);
  }, [onBooking]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-md pt-12 sm:max-w-[425px]">
        <TripNoti
          customerName={customerName}
          customerPhoneNumber={customerPhoneNumber}
          departure={departure}
          destination={destination}
          price={price}
        />
        <DialogFooter>
          <Button
            className="w-full bg-foreground text-background"
            onClick={() => {
              setStatus(2);
              setOpen(false);
            }}
          >
            <Check className="mr-2 h-4 w-4" /> Take the booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
