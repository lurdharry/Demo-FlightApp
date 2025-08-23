export type CabinClass = "economy" | "premium_economy" | "business" | "first";
export type TripType = "oneway" | "roundtrip";
export type PassengerType = "adults" | "infants" | "children";

export type PassengerCount = Record<PassengerType, number>;

export interface Airport {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface AirportResponse {
  data: {
    navigation: {
      relevantFlightParams: Airport;
    };
    presentation?: {
      title: string;
      suggestionTitle: string;
      subtitle: string;
    };
  }[];
}

interface Carrier {
  id: number;
  name: string;
  logoUrl?: string;
  alternateId: string;
  allianceId: string;
}

interface FlightSegment {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      flightPlaceId: string;
      displayCode: string;
      name: string;
      type: string;
    };
    name: string;
    type: string;
  };
  departure: string; // ISO timestamp
  arrival: string; // ISO timestamp
  durationInMinutes: number;
  flightNumber: number;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
}

interface FlightLeg {
  id: string;
  origin: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
  };
  destination: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string; // ISO timestamp
  arrival: string; // ISO timestamp
  timeDeltaInDays: number;
  carriers: {
    operationType: string;
    marketing: Carrier[];
  };
  segments: FlightSegment[];
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco: {
    ecoContenderDelta: number;
  };
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FlightSearchResponse {
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: FlightItinerary[];
    destinationImageUrl: string;
  };
}

export interface BaseFlightParams {
  adults: number;
  children?: number;
  infants?: number;
  cabinClass?: CabinClass;
  returnDate?: string;
}

export interface FlightAPIParams extends BaseFlightParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
}

export interface FlightSearchParams extends BaseFlightParams {
  origin: string;
  destination: string;
  departDate: string;
  tripType?: TripType;
}

export interface SearchFormValues {
  origin: string;
  destination: string;
  tripType: TripType;
  departDate: Date;
  returnDate: Date;
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
}
