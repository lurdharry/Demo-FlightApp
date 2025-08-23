import { PassengerType } from "@/types";

interface PassengerInfoProp {
  label: string;
  age: string;
  value: PassengerType;
}

export const PASSENGER_INFO: PassengerInfoProp[] = [
  { label: "Adults", age: "12+ years", value: "adults" },
  { label: "Children", age: "2-11 years", value: "children" },
  { label: "Infants", age: "Under 2", value: "infants" },
];
