"use client";

//Map component Component from library
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import useBookingForm, { useBookingFormState } from "@/zustand/useBookingForm";
import useGoogleMap from "@/zustand/useGoogleMap";
import axios from "axios";
import useUserSessionStore, { UserSessionStore } from "@/zustand/useSession";
import stickJWTToHeader from "@/utils/functions/stickJWTToHeader";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
};

//Default zoom level, can be adjusted
const defaultMapZoom = 14;

interface MapComponentProps {
  isSearch: boolean;
  isDriver?: boolean;
  initialFirstPlace: { lat: number; lng: number } | null;
  initialSecondPlace: { lat: number; lng: number } | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
  isSearch,
  isDriver,
  initialFirstPlace,
  initialSecondPlace,
}) => {
  const { setPickUpPlace, setDropOffPlace, setPickUpLatLng, setDropOffLatLng } =
    useBookingForm() as useBookingFormState;
  const {
    setCurrent,
    setDistance,
    setDropOff,
    setPickUp,
    setPickUpLocation,
    setDropOffLocation,
  } = useGoogleMap();
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);
  const [firstPlace, setFirstPlace] = useState(null);
  const [secondPlace, setSecondPlace] = useState(null);
  const [firstLngLat, setFirstLngLat] = useState(initialFirstPlace);
  const [secondLngLat, setSecondLngLat] = useState(initialSecondPlace);
  const autocompleteRef1 = useRef(null);
  const autocompleteRef2 = useRef(null);
  const { userSession } = useUserSessionStore() as UserSessionStore;

  //Map options
  const defaultMapOptions = {
    zoomControl: false,
    fullscreenControl: isDriver ? true : false,
    draggable: isDriver ? true : false,
    streetViewControl: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: isDriver ? true : false,
    tilt: 0,
    gestureHandling: isSearch || isDriver ? "auto" : "none",
  };

  const handleFirstPlaceChanged = () => {
    if (autocompleteRef1 && autocompleteRef1.current) {
      setTimeout(() => {}, 500);
      const place = (autocompleteRef1.current as any).getPlace();
      console.log(place);
      setFirstPlace(place);
      setPickUpPlace(place.formatted_address);
      setPickUpLocation(place.formatted_address);
      const firstPlaceLatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setFirstLngLat(firstPlaceLatLng);
      setPickUpLatLng(firstPlaceLatLng);
      setPickUp(firstPlaceLatLng);
    }
  };

  const handleSecondPlaceChanged = () => {
    if (autocompleteRef2.current) {
      setTimeout(() => {}, 500);
      const place = (autocompleteRef2.current as any).getPlace();
      setSecondPlace(place);
      setDropOffPlace(place.formatted_address);
      setDropOffLocation(place.formatted_address);
      const secondPlaceLatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSecondLngLat(secondPlaceLatLng);
      setDropOffLatLng(secondPlaceLatLng);
      setDropOff(secondPlaceLatLng);
      if (firstLngLat) {
        calculateDirections(firstLngLat, secondPlaceLatLng);
        calcDistance(firstLngLat, secondPlaceLatLng);
      }
    }
  };

  // Calc distance
  const calcDistance = (
    firstLngLat: { lat: number; lng: number },
    secondLngLat: { lat: number; lng: number }
  ) => {
    if (firstLngLat && secondLngLat) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [firstLngLat],
          destinations: [secondLngLat],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK) {
            if (response) {
              const distance =
                response.rows[0].elements[0].distance.value / 1000;
              setDistance(distance);
              console.log("Distance:", distance);
            }
          } else {
            console.error("Error calculating distance:", status);
          }
        }
      );
    }
  };

  const calculateDirections = (
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: {
          lat: origin.lat,
          lng: origin.lng,
        },
        destination: {
          lat: destination.lat,
          lng: destination.lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(response as any);
        } else {
          console.error("Error calculating directions:", status);
        }
      }
    );
  };

  // Get user's current position
  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setCurrent({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          if (isDriver) {
            axios.patch(
              process.env.NEXT_PUBLIC_BACKEND_API_URL +
                "/Driver/" +
                userSession.id,
              {
                latitude: position.coords.latitude,
                longtitude: position.coords.longitude,
              },
              stickJWTToHeader()
            );
          }
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    console.log("Initial first place:", initialFirstPlace);
    console.log("Initial second place:", initialSecondPlace);

    firstLngLat && secondLngLat && calculateDirections(firstLngLat, secondLngLat)

    setInterval(async () => {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setCurrent({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (isDriver) {
              axios.patch(
                process.env.NEXT_PUBLIC_BACKEND_API_URL +
                  "/Driver/" +
                  userSession.id,
                {
                  latitude: position.coords.latitude,
                  longtitude: position.coords.longitude,
                },
                stickJWTToHeader()
              );
            }
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }, 1000 * 60 * 60);
  }, []);

  const defaultMapCenter = currentPosition;

  return (
    <div className="h-full w-full">
      <Autocomplete
        className={isSearch ? "" : "hidden"}
        onLoad={(autocomplete) => {
          (autocompleteRef1.current as any) = autocomplete;
        }}
        onPlaceChanged={handleFirstPlaceChanged}
        options={{
          fields: [
            "address_components",
            "geometry",
            "name",
            "formatted_address",
          ],
        }}
      >
        <Input type="text" placeholder="Search for first location" />
      </Autocomplete>

      <Autocomplete
        className={isSearch ? "py-4" : "hidden"}
        onLoad={(autocomplete) => {
          (autocompleteRef2.current as any) = autocomplete;
        }}
        onPlaceChanged={handleSecondPlaceChanged}
        options={{
          fields: [
            "address_components",
            "geometry",
            "name",
            "formatted_address",
          ],
        }}
      >
        <Input type="text" placeholder="Search for second location" />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={firstLngLat ? firstLngLat : defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {isDriver && <Marker position={defaultMapCenter as any} />}
        {firstPlace && <Marker position={firstLngLat as any} />}
        {secondPlace && <Marker position={secondLngLat as any} />}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
