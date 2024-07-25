import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingForm = {
  name: string;
  phone: string;
  vehicle: string;
  pickUp: string;
  dropOff: string;
  pickUpPlace: { lat: string; lng: string } | null;
  dropOffPlace: { lat: string; lng: string } | null;
  bookingID: string;
  price: number;
  driverID?: string;
};

export interface useBookingFormState {
  bookingForm: BookingForm;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setVehicle: (vehicle: string) => void;
  setPickUpPlace: (pickUpPlace: string) => void;
  setDropOffPlace: (dropOffPlace: string) => void;
  setPickUpLatLng: (pickUpLatLng: { lat: string; lng: string }) => void;
  setDropOffLatLng: (dropOffLatLng: { lat: string; lng: string }) => void;
  setBookingID: (bookingID: string) => void;
  setPrice: (price: number) => void;
  setDriverID: (driverID: string) => void;
  clearAll: () => void;
}

const useBookingForm = create(
  persist(
    (set) => ({
      bookingForm: {
        name: "",
        phone: "",
        vehicle: "",
        pickUp: "",
        dropOff: "",
        pickUpPlace: null,
        dropOffPlace: null,
        bookingID: "",
        price: 0,
        driverID: "",
      },
      setName: (name: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, name },
        }));
      },
      setPhone: (phone: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, phone },
        }));
      },
      setVehicle: (vehicle: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, vehicle },
        }));
      },
      setPickUpPlace: (pickUp: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, pickUp },
        }));
      },
      setDropOffPlace: (dropOff: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, dropOff },
        }));
      },
      setPickUpLatLng: (pickUpPlace: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, pickUpPlace },
        }));
      },
      setDropOffLatLng: (dropOffPlace: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, dropOffPlace },
        }));
      },
      setBookingID: (bookingID: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, bookingID },
        }));
      },
      setPrice: (price: number) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, price },
        }));
      },
      setDriverID: (driverID: string) => {
        set((state: any) => ({
          bookingForm: { ...state.bookingForm, driverID },
        }));
      },
      clearAll: () => {
        set((state: any) => ({
          bookingForm: {
            name: "",
            phone: "",
            vehicle: "",
            pickUp: "",
            dropOff: "",
            pickUpPlace: null,
            dropOffPlace: null,
            bookingID: "",
            price: 0,
            driverID: "",
          },
        }));
      },
    }),
    {
      name: "booking-storage",
    }
  )
);

export default useBookingForm;
