import { create } from "zustand";

interface useDatePickerState {
  from: Date;
  to: Date;
  setFrom: (date: Date | undefined) => void;
  setTo: (date: Date | undefined) => void;
}
const previousYear = new Date().getFullYear();
const firstDayOfPreviousYear = new Date(previousYear, 0, 1);
const today = new Date();

const useDatePicker = create<useDatePickerState>((set) => ({
  from: firstDayOfPreviousYear,
  to: today,
  setFrom: (date) => set({ from: date }),
  setTo: (date) => set({ to: date }),
}));

export default useDatePicker;
