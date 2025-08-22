import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

interface TravelOptionType<T = string> {
  value: string;
  label: string;
  icon: T;
}

export const CABIN_CLASSES: TravelOptionType<ComponentProps<typeof MaterialIcons>["name"]>[] = [
  { value: "economy", label: "Economy", icon: "airline-seat-recline-normal" },
  {
    value: "premium_economy",
    label: "Premium Economy",
    icon: "airline-seat-recline-extra",
  },
  { value: "business", label: "Business", icon: "business-center" },
  { value: "first", label: "First Class", icon: "star" },
];

export const TRIP_TYPES: TravelOptionType[] = [
  { value: "oneway", label: "One Way", icon: "arrow-right-thick" },
  { value: "roundtrip", label: "Round Trip", icon: "swap-horizontal" },
  { value: "multicity", label: "Multi-City", icon: "city" },
];
