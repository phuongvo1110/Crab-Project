"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HistoryItem from "./HistoryItem";
import GoogleMap from "../../../customer/Components/GoogleMap";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DialogDemo(props: any) {
  const {
    id,
    customerPhoneNumber,
    staffID,
    departureID,
    destinationID,
    date,
    driverID,
    price,
    paymentType,
    vehicle,
    distance,
  } = props;

  const [pickUp, setPickUp] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickUpLngLat, setPickUpLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [destinationLngLat, setDestinationLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const historyItem = {
    departure: pickUp,
    destination: destination,
    date: date,
    vehicle: vehicle,
    price: price,
    pickUpLngLat: pickUpLngLat,
    destinationLngLat: destinationLngLat,
  };

  const getLocation = async (locationID: string, bool: boolean) => {
    await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Location/" + locationID)
      .then((res) => {
        if (
          res?.data &&
          "destination" in res.data &&
          "longtitude" in res.data &&
          "latitude" in res.data
        ) {
          if (bool) {
            setPickUp(res.data.destination);
            setPickUpLngLat({
              lng: res.data.longtitude,
              lat: res.data.latitude,
            });
          } else {
            setDestination(res.data.destination);
            setDestinationLngLat({
              lng: res.data.longtitude,
              lat: res.data.latitude,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const updateLocation = async () => {
      await getLocation(departureID, true);
      await getLocation(destinationID, false);
    };
    updateLocation();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mx-auto flex items-center lg:w-full">
          <button className="w-full">
            <HistoryItem {...historyItem} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking detail</DialogTitle>
          <DialogDescription>ID: {id}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[30%_65%] gap-4">
            <Label className="my-auto">Pick up</Label>
            <Input value={pickUp} readOnly />
            <Label className="my-auto">Destination</Label>
            <Input value={destination} readOnly />
            <Label className="my-auto">Date</Label>
            <Input value={date} readOnly />
            <Label className="my-auto">Payment method</Label>
            <Input value={paymentType ? "Cash" : "Momo"} readOnly />
            <Label className="my-auto">Vehical type</Label>
            <Input value={vehicle? "Car" : "Motor"} readOnly />
            <Label className="my-auto">Price</Label>
            <Input value={price} readOnly />
            <Label className="my-auto">Distance</Label>
            <Input value={distance} readOnly />
            {staffID && (
              <>
                <Label className="my-auto">Staff</Label>
                <Input value={staffID} readOnly />
              </>
            )}
          </div>
          <div className="map mt-4 h-[200px] w-full border">
            <GoogleMap
              isSearch={false}
              initialFirstPlace={pickUpLngLat}
              initialSecondPlace={destinationLngLat}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-foreground text-background">
            Re-order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
