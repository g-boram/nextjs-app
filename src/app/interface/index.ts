export type DetailFilterType = "location" | "checkIn" | "checkOut" | "guest";

export interface FilterProps {
  location: string;
  checkIn?: string;
  checkOut: string;
  guest: number;
}
