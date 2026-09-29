import React, { createContext, useContext, useState, useEffect } from 'react';
import { Accommodation, PointOfInterest, TownGuide, AffiliateSettings, TripInspirationModule } from '../types';
import { ACCOMMODATIONS_DATA, POINTS_OF_INTEREST, TOWNS_DATA } from '../data/mockData';

interface DataContextType {
  accommodations: Accommodation[];
  pointsOfInterest: PointOfInterest[];
  towns: TownGuide[];
  affiliateSettings: AffiliateSettings;
  tripInspiration: TripInspirationModule;
  addAccommodation: (item: Accommodation) => void;
  updateAccommodation: (item: Accommodation) => void;
  deleteAccommodation: (id: string) => void;
  addPoi: (item: PointOfInterest) => void;
  updatePoi: (item: PointOfInterest) => void;
  deletePoi: (id: string) => void;
  updateAffiliateSettings: (settings: AffiliateSettings) => void;
  updateTripInspiration: (module: TripInspirationModule) => void;
  buildBookingUrl: (stay: Accommodation, checkIn?: string, checkOut?: string, guests?: number, rooms?: number) => string;
  buildRegionalSearchUrl: (destination: string, checkIn?: string, checkOut?: string, guests?: number, rooms?: number) => string;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
}

const STORAGE_KEYS = {
  STAYS: 'promcoast_stays_v1',
  POIS: 'promcoast_pois_v1',
  AFFILIATE: 'promcoast_affiliate_v1',
  TRIP_INSPIRATION: 'promcoast_trip_inspiration_v1',
};

const DEFAULT_AFFILIATE: AffiliateSettings = {
  affiliateId: '304142', // Standard Booking.com partner sample AID or customizable in admin
  labelPrefix: 'promcoast_stay',
  defaultCurrency: 'AUD',
  partnerProgramUrl: 'https://www.booking.com/affiliate-program/v2/index.html',
};

const DEFAULT_TRIP_INSPIRATION: TripInspirationModule = {
  sectionTitle: 'Curated 3-Step Prom Coast Escape',
  sectionSubtitle: 'An effortlessly balanced long-weekend itinerary through Victoria’s wild south.',
  steps: [
    {
      stepNumber: 1,
      badge: 'Step 1 · Friday Arrival & Coast',
      title: 'Ocean Horizons & Sunset Dunes',
      subtitle: 'Unwind at Shallow Inlet & Sandy Point',
      description: 'Check into your coastal sanctuary, wander the quiet dunes of Sandy Point, and watch kite surfers race the sunset across the glass-calm waters of Shallow Inlet.',
      highlights: ['Sunset walk on Waratah Bay', 'Fish Creek Hotel local pub feast', 'Stargazing under dark coastal skies'],
      recommendedTown: 'Sandy Point',
      image: '/images/prom_squeaky_beach_1790665642630.jpg'
    },
    {
      stepNumber: 2,
      badge: 'Step 2 · Saturday Full Day',
      title: 'The Great Prom Wilderness',
      subtitle: 'Quartz Beaches & Mount Oberon Summit',
      description: 'Spend an unforgettable full day inside Wilsons Promontory National Park. Listen to the whistling white sands of Squeaky Beach before hiking to the granite pinnacle of Mount Oberon.',
      highlights: ['Squeaky Beach quartz stroll', 'Mount Oberon 360° summit views', 'Tidal River kangaroo and wombat spotting'],
      recommendedTown: 'Wilsons Promontory',
      image: '/images/hero_prom_coast_1790665620983.jpg'
    },
    {
      stepNumber: 3,
      badge: 'Step 3 · Sunday Hinterland & Food',
      title: 'Gourmet Trails & Art Villages',
      subtitle: 'Meeniyan Bakeries & Fish Creek Galleries',
      description: 'Wind through rolling green dairy pastures to Meeniyan for artisan sourdough and wood-fired pizza, then explore the eccentric bronze sculptors and bookshops of Fish Creek.',
      highlights: ['Meeniyan Pantry & Cellar regional tastings', 'Fish Creek art galleries & bookstores', 'Walkerville Lime Kilns historic coastal cove'],
      recommendedTown: 'Fish Creek',
      image: '/images/culinary_gippsland_1790665651898.jpg'
    }
  ]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const sanitizeImagePath = (url: string): string => {
  if (typeof url === 'string' && url.includes('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/images/');
  }
  return url;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STAYS);
      if (saved) {
        const parsed: Accommodation[] = JSON.parse(saved);
        return parsed.map((s) => ({
          ...s,
          image: sanitizeImagePath(s.image),
        }));
      }
    } catch (e) {
      console.error('Error reading stays from storage', e);
    }
    return ACCOMMODATIONS_DATA;
  });

  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POIS);
      if (saved) {
        const parsed: PointOfInterest[] = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          image: sanitizeImagePath(p.image),
        }));
      }
    } catch (e) {
      console.error('Error reading POIs from storage', e);
    }
    return POINTS_OF_INTEREST;
  });

  const [tripInspiration, setTripInspiration] = useState<TripInspirationModule>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRIP_INSPIRATION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading trip inspiration from storage', e);
    }
    return DEFAULT_TRIP_INSPIRATION;
  });

  const [towns] = useState<TownGuide[]>(TOWNS_DATA);

  const [affiliateSettings, setAffiliateSettings] = useState<AffiliateSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AFFILIATE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading affiliate settings from storage', e);
    }
    return DEFAULT_AFFILIATE;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STAYS, JSON.stringify(accommodations));
    } catch (e) {
      console.error('Error saving stays', e);
    }
  }, [accommodations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POIS, JSON.stringify(pointsOfInterest));
    } catch (e) {
      console.error('Error saving POIs', e);
    }
  }, [pointsOfInterest]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AFFILIATE, JSON.stringify(affiliateSettings));
    } catch (e) {
      console.error('Error saving affiliate settings', e);
    }
  }, [affiliateSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRIP_INSPIRATION, JSON.stringify(tripInspiration));
    } catch (e) {
      console.error('Error saving trip inspiration', e);
    }
  }, [tripInspiration]);

  // CRUD for Accommodations
  const addAccommodation = (item: Accommodation) => {
    setAccommodations((prev) => [item, ...prev]);
  };

  const updateAccommodation = (item: Accommodation) => {
    setAccommodations((prev) => prev.map((s) => (s.id === item.id ? item : s)));
  };

  const deleteAccommodation = (id: string) => {
    setAccommodations((prev) => prev.filter((s) => s.id !== id));
  };

  // CRUD for POIs
  const addPoi = (item: PointOfInterest) => {
    setPointsOfInterest((prev) => [item, ...prev]);
  };

  const updatePoi = (item: PointOfInterest) => {
    setPointsOfInterest((prev) => prev.map((p) => (p.id === item.id ? item : p)));
  };

  const deletePoi = (id: string) => {
    setPointsOfInterest((prev) => prev.filter((p) => p.id !== id));
  };

  const updateAffiliate = (settings: AffiliateSettings) => {
    setAffiliateSettings(settings);
  };

  const updateTripInspiration = (module: TripInspirationModule) => {
    setTripInspiration(module);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.STAYS);
    localStorage.removeItem(STORAGE_KEYS.POIS);
    localStorage.removeItem(STORAGE_KEYS.AFFILIATE);
    localStorage.removeItem(STORAGE_KEYS.TRIP_INSPIRATION);
    setAccommodations(ACCOMMODATIONS_DATA);
    setPointsOfInterest(POINTS_OF_INTEREST);
    setAffiliateSettings(DEFAULT_AFFILIATE);
    setTripInspiration(DEFAULT_TRIP_INSPIRATION);
  };

  // URL Generators
  const buildBookingUrl = (
    stay: Accommodation,
    checkIn: string = '2026-10-09',
    checkOut: string = '2026-10-11',
    guests: number = 2,
    rooms: number = 1
  ): string => {
    const aid = affiliateSettings.affiliateId || '304142';
    const label = `${affiliateSettings.labelPrefix}_${stay.id}`;
    
    // If the stay has a specific Booking.com hotel slug or hotel ID
    const query = stay.bookingComQuery?.hotelName || `${stay.name}, ${stay.town}, Victoria, Australia`;
    
    const params = new URLSearchParams({
      ss: query,
      checkin: checkIn,
      checkout: checkOut,
      group_adults: guests.toString(),
      no_rooms: rooms.toString(),
      selected_currency: affiliateSettings.defaultCurrency || 'AUD',
      aid: aid,
      label: label,
    });

    return `https://www.booking.com/searchresults.html?${params.toString()}`;
  };

  const buildRegionalSearchUrl = (
    destination: string,
    checkIn: string = '2026-10-09',
    checkOut: string = '2026-10-11',
    guests: number = 2,
    rooms: number = 1
  ): string => {
    const aid = affiliateSettings.affiliateId || '304142';
    const label = `${affiliateSettings.labelPrefix}_search_${destination.replace(/\s+/g, '_').toLowerCase()}`;
    
    let destLabel = destination;
    if (destination === 'all' || !destination) destLabel = 'South Gippsland, Victoria, Australia';
    else if (destination === 'wilsons-prom') destLabel = 'Wilsons Promontory, Victoria, Australia';
    else if (destination === 'sandy-point') destLabel = 'Sandy Point, Victoria, Australia';
    else if (destination === 'fish-creek') destLabel = 'Fish Creek, Victoria, Australia';
    else if (destination === 'foster') destLabel = 'Foster, Victoria, Australia';
    else if (destination === 'meeniyan') destLabel = 'Meeniyan, Victoria, Australia';
    else if (destination === 'walkerville') destLabel = 'Walkerville, Victoria, Australia';
    else if (destination === 'inverloch') destLabel = 'Inverloch, Victoria, Australia';
    else if (destination === 'waratah-bay') destLabel = 'Waratah Bay, Victoria, Australia';
    else if (destination === 'venus-bay') destLabel = 'Venus Bay, Victoria, Australia';

    const params = new URLSearchParams({
      ss: destLabel,
      checkin: checkIn,
      checkout: checkOut,
      group_adults: guests.toString(),
      no_rooms: rooms.toString(),
      selected_currency: affiliateSettings.defaultCurrency || 'AUD',
      aid: aid,
      label: label,
    });

    return `https://www.booking.com/searchresults.html?${params.toString()}`;
  };

  // Export / Import
  const exportDataJson = (): string => {
    return JSON.stringify(
      {
        accommodations,
        pointsOfInterest,
        affiliateSettings,
        tripInspiration,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.accommodations)) {
        setAccommodations(data.accommodations);
      }
      if (Array.isArray(data.pointsOfInterest)) {
        setPointsOfInterest(data.pointsOfInterest);
      }
      if (data.affiliateSettings && data.affiliateSettings.affiliateId) {
        setAffiliateSettings(data.affiliateSettings);
      }
      if (data.tripInspiration && data.tripInspiration.steps) {
        setTripInspiration(data.tripInspiration);
      }
      return true;
    } catch (e) {
      console.error('Failed to import data JSON', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        accommodations,
        pointsOfInterest,
        towns,
        affiliateSettings,
        tripInspiration,
        addAccommodation,
        updateAccommodation,
        deleteAccommodation,
        addPoi,
        updatePoi,
        deletePoi,
        updateAffiliateSettings: updateAffiliate,
        updateTripInspiration,
        buildBookingUrl,
        buildRegionalSearchUrl,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
