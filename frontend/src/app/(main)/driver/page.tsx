"use client";

import TripNotiDialog from "@app/(main)/driver/Components/TripNotiDialog";
import GoogleMap from "../customer/Components/GoogleMap";
import SheetSide from "./Components/DriverStatistic";
import { useState, useEffect, use } from "react";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import useGoogleMap from "@/zustand/useGoogleMap";
import axios from "axios";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";

export default function page() {
  const {
    bookingForm,
    setDriverID,
    setBookingID,
    setName,
    setPhone,
    clearAll,
  } = useBookingForm() as useBookingFormState;
  const { userSession, setStatus } = useUserSessionStore() as UserSessionStore;
  const { googleMap } = useGoogleMap();
  let interval: string | number | NodeJS.Timeout | undefined;
  const [departureID, setDepartureID] = useState<string>("");
  const [destinationID, setDestinationID] = useState<string>("");
  const [pickUp, setPickUp] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pickUpLngLat, setPickUpLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [customerID, setCustomerID] = useState<string>("");
  const [destinationLngLat, setDestinationLngLat] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const getDriverStatus = async () => {
    if (userSession.status === 1) {
      await axios
        .get(
          process.env.NEXT_PUBLIC_BACKEND_API_URL +
            "/DriverBooking/GetByDriverIdLatest?driverId=" +
            userSession.id
        )
        .then((res) => {
          if (
            res.data &&
            "statusType" in res.data &&
            "driverID" in res.data &&
            "departureID" in res.data &&
            "destinationID" in res.data &&
            "customerId" in res.data &&
            "price" in res.data
          ) {
            res.data.statusType === 2 ? setStatus(4) : setStatus(1);
            setDriverID(res.data.driverID);
            setBookingID(res.data.id);
            setDepartureID(res.data.departureID);
            setDestinationID(res.data.destinationID);
            setCustomerID(res.data.customerId);
            setPrice(res.data.price);
          }
        });
    }
  };
  const getLocation = async (locationID: string, bool: boolean) => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Location/" + locationID,
      )
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

  const getCustomerInfo = async () => {
    await axios
      .get(process.env.NEXT_PUBLIC_BACKEND_API_URL + "/Customer/" + customerID)
      .then((res) => {
        if (res?.data && "name" in res.data && "phoneNumber" in res.data) {
          setName(res.data.name);
          setPhone(res.data.phoneNumber);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const updateInfo = async () => {
      await getDriverStatus();
      interval = setInterval(getDriverStatus, 30000);
    };
    updateInfo();
  }, [userSession.status]);

  useEffect(() => {
    if (userSession.status === 2 || userSession.status === 4) {
      clearInterval(interval);
    }
  }, [userSession.status]);

  useEffect(() => {
    clearInterval(interval);
    const updateInfo = async () => {
      if (departureID) {
        await getLocation(departureID, true);
      }
      if (destinationID) {
        await getLocation(destinationID, false);
      }
      if (customerID) {
        await getCustomerInfo();
      }
    };
    updateInfo();
  }, [departureID, destinationID, customerID]);

  return (
    <div className="h-auto w-full">
      <SheetSide />
      <div className="h-[90vh] w-full px-2 pb-2">
        {(userSession.status === 1 || userSession.status === 4) && (
          <GoogleMap isSearch={false} isDriver={true} />
        )}
        {userSession.status === 2 &&
          googleMap.currentPosition &&
          pickUpLngLat &&
          destinationLngLat && (
            <GoogleMap
              isSearch={false}
              isDriver={true}
              initialFirstPlace={googleMap.currentPosition}
              initialSecondPlace={pickUpLngLat}
            />
          )}
        {userSession.status === 3 &&
          googleMap.currentPosition &&
          pickUpLngLat &&
          destinationLngLat && (
            <GoogleMap
              isSearch={false}
              isDriver={true}
              initialFirstPlace={googleMap.currentPosition}
              initialSecondPlace={destinationLngLat}
            />
          )}
      </div>

      {userSession.status === 4 &&
        bookingForm.name &&
        bookingForm.phone &&
        pickUp &&
        destination &&
        price && (
          <TripNotiDialog
            customerName={bookingForm.name}
            customerPhoneNumber={bookingForm.phone}
            departure={pickUp}
            destination={destination}
            price={price}
          />
        )}
    </div>
  );
}
