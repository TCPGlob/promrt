import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Filter,
  CheckCircle2,
  Building,
  BadgePercent
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { BookingSearchParams } from '../types';

interface PersonalizedBookingEngineProps {
  onSearchChange: (params: BookingSearchParams) => void;
  onOpenDirectLink: (url: string) => void;
}

export const PersonalizedBookingEngine: React.FC<PersonalizedBookingEngineProps> = ({
  onSearchChange,
  onOpenDirectLink,
}) => {
  const { buildRegionalSearchUrl, affiliateSettings } = useData();

  const [destination, setDestination] = useState<string>('all');
  const [checkIn, setCheckIn] = useState<string>('2026-10-09');
  const [checkOut, setCheckOut] = useState<string>('2026-10-11');
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [filterPetFriendly, setFilterPetFriendly] = useState<boolean>(false);
  const [filterFreeCancel, setFilterFreeCancel] = useState<boolean>(true);
  const [filterOceanView, setFilterOceanView] = useState<boolean>(false);

  // Generate customized Booking.com regional search link via context
  const generateLiveBookingComSearchUrl = () => {
    return buildRegionalSearchUrl(destination, checkIn, checkOut, guests, rooms);
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange({
      destination,
      checkIn,
      checkOut,
      guests,
      propertyType: propertyType !== 'all' ? propertyType : undefined,
    });
  };

  const handleLaunchPartnerEngine = () => {
    const url = generateLiveBookingComSearchUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Accommodation Engine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Personalised Regional Booking Concierge
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 leading-relaxed">
            Search our curated sanctuaries or access the live verified inventory of over 450 regional holiday houses, boutique B&Bs, and coastal retreats across South Gippsland.
          </p>
        </div>

        {/* The Personalised Engine Card */}
        <div className="bg-stone-800/90 backdrop-blur-md rounded-2xl border border-stone-700 p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleApplyFilter} className="space-y-6">
            
            {/* Top row: Destination, Dates, Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Destination / Town</span>
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-stone-900 text-white border border-stone-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">Entire Prom Coast & South Gippsland</option>
                  <option value="wilsons-prom">Wilsons Promontory & Tidal River</option>
                  <option value="sandy-point">Sandy Point & Shallow Inlet</option>
                  <option value="fish-creek">Fish Creek & Rail Trail</option>
                  <option value="foster">Foster (Prom Gateway)</option>
                  <option value="meeniyan">Meeniyan (Food & Wine Trail)</option>
                  <option value="walkerville">Walkerville & Cape Liptrap</option>
                  <option value="inverloch">Inverloch & Bunurong Coast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check-In</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min="2026-09-29"
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-stone-900 text-white border border-stone-700 rounded-lg px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check-Out</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-stone-900 text-white border border-stone-700 rounded-lg px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Party Size</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-900 text-white border border-stone-700 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                    <option value={6}>6+ Group</option>
                  </select>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full bg-stone-900 text-white border border-stone-700 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value={1}>1 Room</option>
                    <option value={2}>2 Rooms</option>
                    <option value={3}>3+ Rooms</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Quick Preference Filters */}
            <div className="pt-4 border-t border-stone-700 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="text-stone-400 font-medium flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preferences:</span>
                </span>
                
                <label className="flex items-center gap-1.5 cursor-pointer text-stone-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={filterFreeCancel}
                    onChange={(e) => setFilterFreeCancel(e.target.checked)}
                    className="rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-0"
                  />
                  <span>Free Cancellation</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-stone-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={filterOceanView}
                    onChange={(e) => setFilterOceanView(e.target.checked)}
                    className="rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-0"
                  />
                  <span>Ocean & Prom Views</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-stone-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={filterPetFriendly}
                    onChange={(e) => setFilterPetFriendly(e.target.checked)}
                    className="rounded border-stone-600 bg-stone-900 text-amber-500 focus:ring-0"
                  />
                  <span>Pet-Friendly</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-stone-200 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  Filter On-Site Stays
                </button>

                <button
                  type="button"
                  onClick={handleLaunchPartnerEngine}
                  className="w-1/2 sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <span>Query 450+ Live Rates</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </form>

          {/* Value Add Trust Bar */}
          <div className="mt-6 pt-5 border-t border-stone-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Booking.com secure SSL partner reservation engine</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Guaranteed price match with zero hidden booking commission</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Complimentary local Prom Coast arrival wine perk with partner hosts</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
