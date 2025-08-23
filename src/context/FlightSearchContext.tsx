import { FlightItinerary, TripType } from "@/types";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface SearchState {
  searchResults: FlightItinerary[];
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  tripType: TripType;
}

interface FlightSearchContextType extends SearchState {
  setSearchResults: (searchData: SearchState) => void;
  clearResults: () => void;
}

const initialState: SearchState = {
  searchResults: [],
  origin: "",
  destination: "",
  departureDate: "",
  returnDate: undefined,
  tripType: "roundtrip",
};

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export function FlightSearchProvider({ children }: PropsWithChildren) {
  const [searchState, setSearchState] = useState<SearchState>(initialState);

  const setSearchResults = (searchData: SearchState) => {
    setSearchState(searchData);
  };

  const clearResults = () => {
    setSearchState(initialState);
  };

  return (
    <FlightSearchContext.Provider
      value={{
        ...searchState,
        setSearchResults,
        clearResults,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
}

export function useFlightSearchContext() {
  const context = useContext(FlightSearchContext);
  if (!context) {
    throw new Error("useFlightSearchContext must be used within FlightSearchProvider");
  }
  return context;
}
