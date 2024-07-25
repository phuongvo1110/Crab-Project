import { create } from "zustand";

interface useAddressSelectsState {
  addressValues: {
    address: string;
    province: string;
    provinceId: string;
    district: string;
    districtId: string;
    commune: string;
    communeId: string;
  };
  setAddress: (address: string) => void;
  setProvince: (province: string, provinceId: string) => void;
  setDistrict: (district: string, districtId: string) => void;
  setCommune: (commune: string, communeId: string) => void;
  clearAll: () => void;
}

const useAddressSelects = create<useAddressSelectsState>((set) => ({
  addressValues: {
    address: "",
    province: "",
    provinceId: "",
    district: "",
    districtId: "",
    commune: "",
    communeId: "",
  },
  setAddress: (address: string) =>
    set((state) => ({ addressValues: { ...state.addressValues, address } })),
  setProvince: (province: string, provinceId: string) =>
    set((state) => ({
      addressValues: { ...state.addressValues, province, provinceId },
    })),
  setDistrict: (district: string, districtId: string) =>
    set((state) => ({
      addressValues: { ...state.addressValues, district, districtId },
    })),
  setCommune: (commune: string, communeId: string) =>
    set((state) => ({
      addressValues: { ...state.addressValues, commune, communeId },
    })),
  clearAll: () => {
    set(() => ({
      addressValues: {
        address: "",
        province: "",
        provinceId: "",
        district: "",
        districtId: "",
        commune: "",
        communeId: "",
      },
    }));
  },
}));

export default useAddressSelects;
