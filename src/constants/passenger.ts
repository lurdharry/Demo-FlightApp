import { PassengerType } from "@/types";

export type PassengerInfoProp = Record<PassengerType, { label: string; age: string }>;

export const PASSENGER_INFO: PassengerInfoProp = {
  adults: { label: "Adults", age: "12+ years" },
  children: { label: "Children", age: "2-11 years" },
  infants: { label: "Infants", age: "Under 2" },
};
