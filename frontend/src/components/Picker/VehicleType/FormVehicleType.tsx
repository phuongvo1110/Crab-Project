"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import vehicletype from "@/static-data/vehicletype.json";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";

export default function FormVehicleType() {
  const [vehicle, setVehicletype] = useState<{
    id: string;
    type: string;
  } | null>(null);
  const { setVehicle } = useBookingForm() as useBookingFormState;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Select
        onValueChange={(value) => {
          const parsedValue = JSON.parse(value);
          setVehicletype(parsedValue);
          setVehicle(parsedValue.type);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              vehicle && vehicle.type !== ""
                ? vehicle.type
                : "Select booking type"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Vehicle Type</SelectLabel>
            {vehicletype.map((type, index) => (
              <SelectItem
                key={index}
                value={JSON.stringify({ type: type.type, id: type.id })}
              >
                {type.type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
