export type CategoryType = 'stay' | 'beach' | 'walk' | 'food' | 'town' | 'attraction';

export interface Amenity {
  id: string;
  label: string;
  iconName?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  tagline: string;
  town: string;
  subregion: string;
  type: 'Luxury Eco Villa' | 'Coastal Beach House' | 'Boutique B&B' | 'Glamping & Farm Stay' | 'Lodge & Cottage';
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  images?: string[];
  description: string;
  features: string[];
  distanceToPromGate: string;
  distanceToBeach: string;
  lat: number;
  lng: number;
  bookingComQuery: {
    destType: string;
    destId: string;
    hotelName: string;
  };
  featured?: boolean;
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: CategoryType;
  town: string;
  lat: number;
  lng: number;
  image: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  tips?: string;
  badgeText?: string;
  durationOrTime?: string;
}

export interface AffiliateSettings {
  affiliateId: string;
  labelPrefix: string;
  defaultCurrency: string;
  partnerProgramUrl?: string;
}

export interface BookingSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType?: string;
}

export interface TownGuide {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  driveTimeMelbourne: string;
  distanceToPromGate: string;
  bestKnownFor: string[];
  recommendedStaysCount: number;
}

export interface TripStep {
  stepNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommendedTown?: string;
  image?: string;
}

export interface TripInspirationModule {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: TripStep[];
}
