"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/editor/ui/button";
import { Check } from "lucide-react";

import TripNoti from "@app/(main)/customer/waitdriver/Component/TripNoti";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";

export default function TripNotiDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { bookingForm } = useBookingForm() as useBookingFormState;
  const onBooking = true;
  const mutation = useMutation({
    mutationFn: (data) =>
      axios.put(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/DriverBooking/" +
          bookingForm.bookingID,
        data,
        stickJWTToHeader()
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    retry: 3,
  });

  const {
    data: booking,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["Booking"],
    queryFn: () =>
      axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DriverBooking/" +
            bookingForm.bookingID
        )
        .then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });


  useEffect(() => {
    setOpen(onBooking);
  }, [onBooking]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-md pt-12 sm:max-w-[425px]">
        <TripNoti />
        <DialogFooter>
          <Button
            className="w-full bg-foreground text-background"
            onClick={async () => {
              setOpen(false);
              if (isSuccess && booking && "statusType" in booking) {
                console.log(booking);
                booking.statusType = 2;
              }
              await mutation.mutate(booking as any);
              router.push("/customer");
            }}
          >
            <Check className="mr-2 h-4 w-4" /> Take the booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
