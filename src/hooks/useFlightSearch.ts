import { flightApi } from "@/services/api";
import { FlightSearchParams } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useFlightSearch = () => {
  return useMutation({
    mutationFn: (params: FlightSearchParams) => flightApi.searchFlightsWithCities(params),
  });
};
