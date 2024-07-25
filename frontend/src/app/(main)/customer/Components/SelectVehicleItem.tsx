"use client";

import Image from "next/image";
import carPic from "@/../public/assets/car-image.jpg";
import bikePic from "@/../public/assets/motor-image.jpeg";
import useGoogleMap from "@/zustand/useGoogleMap";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";

interface SelectVehicleItemProps {
  type: string;
  isSelected: boolean;
}

const SelectVehicleItem: React.FC<SelectVehicleItemProps> = ({
  type,
  isSelected,
}) => {
  const { googleMap } = useGoogleMap();
  const { bookingForm } = useBookingForm() as useBookingFormState;

  return (
    <div
      className={`h-fit w-full rounded-lg border p-4 transition duration-300 ease-in ${
        isSelected
          ? "bg-foreground text-background shadow-md"
          : "bg-background text-foreground"
      }`}
    >
      <div className="flex h-full w-full items-center">
        <div className="flex h-[120px] w-[120px] flex-col items-center justify-center">
          {type === "Car" ? (
            <Image src={carPic} className="rounded-md" alt="car" />
          ) : (
            <Image src={bikePic} className="rounded-md" alt="bike" />
          )}
        </div>
        <div className="ml-4 text-left">
          {type === "Car" ? (
            <div>Price: ${googleMap.distance && googleMap.distance * 1.5} </div>
          ) : (
            <div>Price: ${googleMap.distance && googleMap.distance * 0.5} </div>
          )}
          <div>From: {bookingForm.pickUp} </div>
          <div>To: {bookingForm.dropOff} </div>
        </div>
      </div>
    </div>
  );
};

export default SelectVehicleItem;
