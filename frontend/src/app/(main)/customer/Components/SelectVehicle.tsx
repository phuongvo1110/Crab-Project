"use client";

import React from "react";
import SelectVehicleItem from "./SelectVehicleItem";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";
import useGoogleMap from "@/zustand/useGoogleMap";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import { Location } from "@/utils/type";
import Image from "next/image";
import { useState } from "react";

export default function SelectVehicle() {
  const [paymentTypeValue, setPaymentTypeValue] = useState(1); // 0 is momo, 1 is cash
  const router = useRouter();
  const { bookingForm, setVehicle, setBookingID } =
    useBookingForm() as useBookingFormState;
  const { userSession } = useUserSessionStore() as UserSessionStore;
  const { googleMap } = useGoogleMap();
  var location1: Location, location2: Location;

  const bookingDriverMutation = useMutation({
    mutationFn: (data) =>
      axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/DriverBooking",
        data,
        stickJWTToHeader()
      ),
    onSuccess: (data) => {
      if (data?.data && "id" in data.data) {
        setBookingID(data.data.id as string);
        if ("pageUrl" in data.data && data.data.pageUrl !== "") {
          const url = data.data.pageUrl as string;
          window.open(url, "_blank", "noopener,noreferrer");
        }
        toast.success("Booked successfully!");
        router.push("/customer/waitdriver");
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const addLocationMutation = useMutation({
    mutationFn: (data: Location) =>
      axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Location",
        data,
        stickJWTToHeader()
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    retry: 3,
  });

  const handleLocation = () => {
    const pickUp = bookingForm.pickUp.split(",");
    const dropOff = bookingForm.dropOff.split(",");

    location1 = {
      id: "",
      longtitude: googleMap.pickUpPlace?.lng as number,
      latitude: googleMap.pickUpPlace?.lat as number,
      destination: bookingForm.pickUp,
      city: pickUp[4],
      country: pickUp[3],
      district: pickUp[2],
      street: pickUp[0],
    };

    location2 = {
      id: "",
      longtitude: googleMap.dropOffPlace?.lng as number,
      latitude: googleMap.dropOffPlace?.lat as number,
      destination: bookingForm.dropOff,
      city: dropOff[4],
      country: dropOff[3],
      district: dropOff[2],
      street: dropOff[0],
    };
  };

  const checkLocation = async () => {
    let res1, res2;
    handleLocation();
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/Location/GetLocationByLatLong?longtitude=" +
          location1.longtitude.toString() +
          "&latitude=" +
          location1.latitude.toString(),
        stickJWTToHeader()
      )
      .then((res) => {
        console.log(res.data);
        res1 = res;
        location1.id = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        res1 = null;
      });
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          "/Location/GetLocationByLatLong?longtitude=" +
          location2.longtitude.toString() +
          "&latitude=" +
          location2.latitude.toString(),
        stickJWTToHeader()
      )
      .then((res) => {
        console.log(res.data);
        res2 = res;
        location2.id = res.data.id;
      })
      .catch((err) => {
        console.log(err);
        res2 = null;
      });

    if (res1 === null) {
      const newLocation = await addLocationMutation.mutate(
        { ...location1 },
        {
          onSuccess: (data) => {
            if (data && "id" in data) {
              location1.id = data?.id as string;
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }

    if (res2 === null) {
      const newLocation = await addLocationMutation.mutate(
        { ...location2 },
        {
          onSuccess: (data) => {
            if (data && "id" in data) {
              location2.id = data?.id as string;
            }
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }
  };

  const submit = async () => {
    await checkLocation();

    var booking = {
      customerId: userSession.id,
      customerPhoneNumber: userSession.phoneNumber,
      departureID: location1.id,
      destinationID: location2.id,
      vehicle: bookingForm.vehicle === "Car" ? 1 : 0,
      price:
        bookingForm.vehicle === "Car"
          ? googleMap.distance && googleMap.distance * 1.5
          : googleMap.distance && googleMap.distance * 0.5,
      distance: googleMap.distance,
      statusType: 0,
      paymentType: paymentTypeValue,
    };

    bookingDriverMutation.mutate(booking as any);
  };

  return (
    <Drawer>
      <DrawerTrigger className="w-full ">
        <Button className="w-full">Select Vehicel</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Picking your drive?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="flex h-full w-full flex-col justify-center gap-2 rounded-lg px-4">
            <p
              className="w-full"
              onClick={() => {
                setVehicle("Car");
              }}
            >
              <SelectVehicleItem
                type="Car"
                isSelected={bookingForm.vehicle == "Car" ? true : false}
              />
            </p>
            <p
              className="w-full"
              onClick={() => {
                setVehicle("Motorbike");
              }}
            >
              <SelectVehicleItem
                type="Motorbike"
                isSelected={bookingForm.vehicle == "Motorbike" ? true : false}
              />
            </p>
            <Select
              defaultValue="1"
              onValueChange={(value) => setPaymentTypeValue(Number(value))}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select a payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment method</SelectLabel>
                  <SelectItem value="1">
                    <div className="flex w-full flex-row items-center gap-1">
                      <div>
                        <Image
                          alt="Cash"
                          src="/assets/cash.png"
                          width={25}
                          height={25}
                        />
                      </div>
                      <span>Cash</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="0">
                    <div className="flex w-full flex-row items-center gap-1">
                      <div>
                        <Image
                          alt="Momo"
                          src="/assets/momo.png"
                          width={25}
                          height={25}
                        />
                      </div>
                      <span>Momo</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DrawerFooter className="sm:px-4">
            <Button
              className="w-full bg-foreground p-0 text-background"
              onClick={submit}
            >
              Submit
            </Button>
            <DrawerClose>
              <Button className="w-full p-0" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
