import { atom } from "recoil";
import { DetailFilterType, FilterProps } from "../interface";

export const detailFilterState = atom<DetailFilterType | null>({
  key: "detailFilter",
  default: null,
});

export const filterState = atom<FilterProps>({
  key: "filter",
  default: {
    location: "",
    checkIn: "",
    checkOut: "",
    guest: 0,
  },
});
