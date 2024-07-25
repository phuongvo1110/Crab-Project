"use client";

import TripNotiDialog from "./Component/TripNotiDialog";
import { useState, useEffect } from "react";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import axios from "axios";

export default function page() {
  const [status, setStatus] = useState(false);
  const { bookingForm, setDriverID } = useBookingForm() as useBookingFormState;
  let interval: string | number | NodeJS.Timeout | undefined;

  const getDriverStatus = () => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/DriverBooking/" +
          bookingForm.bookingID
      )
      .then((res) => {
        if (res.data && "driverID" in res.data) {
          res.data.driverID ? setStatus(true) : setStatus(false);
          setDriverID(res.data.driverID);
        }
      });
  };

  useEffect(() => {
    getDriverStatus();
    interval = setInterval(getDriverStatus, 30000);
  }, []);

  useEffect(() => {
    if (status) {
      clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-3xl font-bold">Waiting for driver...</div>
      <div className="mt-4 text-xl">
        Please wait for the driver to confirm your order
      </div>
      {status && <TripNotiDialog />}
    </div>
  );
}
