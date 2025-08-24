import {
  AirportResponse,
  FlightAPIParams,
  FlightSearchParams,
  FlightSearchResponse,
} from "@/types";
import { apiService } from "./apiService";

export const flightApi = {
  searchAirports: (query: string) =>
    apiService<AirportResponse>({
      url: "/flights/searchAirport",
      params: { query },
    }),

  searchFlightsWithCities: async (params: FlightSearchParams) => {
    // Get airports details
    const [originRes, destRes] = await Promise.all([
      flightApi.searchAirports(params.origin),
      flightApi.searchAirports(params.destination),
    ]);

    const origin = originRes?.data?.[0]?.navigation?.relevantFlightParams;
    const dest = destRes?.data?.[0]?.navigation?.relevantFlightParams;

    if (!origin || !dest) {
      throw new Error("Airports details not found");
    }

    const searchFlightParams: FlightAPIParams = {
      originSkyId: origin.skyId,
      destinationSkyId: dest.skyId,
      originEntityId: origin.entityId,
      destinationEntityId: dest.entityId,
      date: params.departDate,
      returnDate: params.returnDate,
      adults: params.adults,
      children: params.children,
      infants: params.infants,
      cabinClass: params.cabinClass,
    };

    // Search flights
    return apiService<FlightSearchResponse>({
      url: "/flights/searchFlights",
      params: searchFlightParams,
    });
  },
};
