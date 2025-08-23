import { AirportResponse, FlightSearchParams, FlightSearchResponse } from "@/types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import Constants from "expo-constants";

const { apiUrl, apiKey, apiHost } = Constants.expoConfig?.extra || {};

export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
  },
});

export const apiService = async <R>(props: AxiosRequestConfig): Promise<R> => {
  const { url, method = "GET", data, headers, params } = props;

  try {
    const res = await apiClient({
      data,
      headers,
      method,
      url,
      params: {
        ...params,
      },
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err.response?.data || err.message;
    }
    throw err;
  }
};

export const flightApi = {
  searchAirports: (query: string): Promise<AirportResponse> =>
    apiService({
      url: "/flights/searchAirport",
      params: { query },
    }),

  searchFlightsWithCities: async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
    // Get airports
    const [originRes, destRes] = await Promise.all([
      flightApi.searchAirports(params.origin),
      flightApi.searchAirports(params.destination),
    ]);

    const origin = originRes?.data?.[0]?.navigation?.relevantFlightParams;
    const dest = destRes?.data?.[0]?.navigation?.relevantFlightParams;

    if (!origin || !dest) {
      throw new Error("Airports not found");
    }

    // Search flights
    return apiService({
      url: "/flights/searchFlights",
      params: {
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
      },
    });
  },
};
