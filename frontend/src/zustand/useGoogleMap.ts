import { create } from "zustand";

type GoogleMap = {
  currentPosition: { lat: number; lng: number } | null;
  pickUpPlace: { lat: number; lng: number } | null;
  dropOffPlace: { lat: number; lng: number } | null;
  distance: number | null;
  pickUp: string | null;
  dropOff: string | null;
}

interface useGoogleMapState {
  googleMap: GoogleMap;
  setCurrent: (currentPosition: { lat: number; lng: number }) => void;
  setPickUp: (pickUpPlace: { lat: number; lng: number }) => void;
  setDropOff: (dropOffPlace: { lat: number; lng: number }) => void;
  setDistance: (distance: number) => void;
  setPickUpLocation: (pickUp: string) => void;
  setDropOffLocation: (dropOff: string) => void;
  clearAll: () => void;
}

const useGoogleMap = create<useGoogleMapState>((set) => ({
  googleMap: {
    currentPosition: null,
    pickUpPlace: null,
    dropOffPlace: null,
    distance: 0,
    pickUp: null,
    dropOff: null
  },
  setCurrent: (currentPosition) => {
    set((state) => ({
      googleMap: { ...state.googleMap, currentPosition },
    }));
  },
  setPickUp: (pickUpPlace) => {
    set((state) => ({
      googleMap: { ...state.googleMap, pickUpPlace },
    }));
  },
  setDropOff: (dropOffPlace) => {
    set((state) => ({
      googleMap: { ...state.googleMap, dropOffPlace },
    }));
  },
  setDistance: (distance: number) => {
    set((state) => ({
      googleMap: { ...state.googleMap, distance },
    }));
  },
  setPickUpLocation: (pickUp: string) => {
    set((state) => ({
      googleMap: { ...state.googleMap, pickUp },
    }));
  },
  setDropOffLocation: (dropOff: string) => {
    set((state) => ({
      googleMap: { ...state.googleMap, dropOff },
    }));
  },
  clearAll: () => {
    set((state) => ({
      googleMap: {
        currentPosition: null,
        pickUpPlace: null,
        dropOffPlace: null,
        distance: 0,
        pickUp: null,
        dropOff: null
      },
    }));
  }
}));

export default useGoogleMap;