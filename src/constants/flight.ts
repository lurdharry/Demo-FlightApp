import { CabinClass, TripType } from "@/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];
type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
interface TravelOptionType<P = string, T = string> {
  value: P;
  label: string;
  icon: T;
}

export const CABIN_CLASSES: TravelOptionType<CabinClass, MaterialIconName>[] = [
  { value: "economy", label: "Economy", icon: "airline-seat-recline-normal" },
  {
    value: "premium_economy",
    label: "Premium Economy",
    icon: "airline-seat-recline-extra",
  },
  { value: "business", label: "Business", icon: "business-center" },
  { value: "first", label: "First Class", icon: "star" },
];

export const TRIP_TYPES: TravelOptionType<TripType, MaterialCommunityIconName>[] = [
  { value: "oneway", label: "One Way", icon: "arrow-right-thick" },
  { value: "roundtrip", label: "Round Trip", icon: "swap-horizontal" },
];
