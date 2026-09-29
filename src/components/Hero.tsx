import React, { useState, useRef } from 'react';
import { Search, Calendar, Users, MapPin, Sparkles, Play, Pause, ExternalLink } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { BookingSearchParams } from '../types';
import { useData } from '../context/DataContext';

interface HeroProps {
  onSearch: (params: BookingSearchParams) => void;
  onExploreMap: () => void;
}

const PREFERRED_REGIONS = [
  { id: 'all', label: 'All South Gippsland & Prom Coast', display: 'All Prom Coast' },
  { id: 'wilsons-prom', label: 'Wilsons Promontory', display: 'Wilsons Prom' },
  { id: 'sandy-point', label: 'Sandy Point', display: 'Sandy Point' },
  { id: 'fish-creek', label: 'Fish Creek', display: 'Fish Creek' },
  { id: 'foster', label: 'Foster', display: 'Foster' },
  { id: 'meeniyan', label: 'Meeniyan', display: 'Meeniyan' },
  { id: 'walkerville', label: 'Walkerville', display: 'Walkerville' },
  { id: 'inverloch', label: 'Inverloch', display: 'Inverloch' },
  { id: 'waratah-bay', label: 'Waratah Bay', display: 'Waratah Bay' },
  { id: 'venus-bay', label: 'Venus Bay', display: 'Venus Bay' },
];

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreMap }) => {
  const { buildRegionalSearchUrl } = useData();

  const [destinationInput, setDestinationInput] = useState<string>('All South Gippsland & Prom Coast');
  const [checkIn, setCheckIn] = useState<string>('2026-10-09');
  const [checkOut, setCheckOut] = useState<string>('2026-10-11');
  const [guests, setGuests] = useState<number>(2);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const handleSelectRegion = (regionLabel: string) => {
    setDestinationInput(regionLabel);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map label back to slug if matched
    const matched = PREFERRED_REGIONS.find(
      (r) => r.label.toLowerCase() === destinationInput.trim().toLowerCase() || r.id === destinationInput.trim().toLowerCase()
    );

    const destSlug = matched ? matched.id : destinationInput.trim();

    onSearch({
      destination: destSlug || 'all',
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      {/* Background Ocean Landscape Video with High-Res Fallback & Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={ASSETS.hero}
          className="w-full h-full object-cover object-center transform scale-105"
        >
          <source src="/videos/ocean_landscape.mp4" type="video/mp4" />
          <img
            src={ASSETS.hero}
            alt="Scenic ocean waves and coastline of Wilsons Promontory"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </video>
        
        {/* Measured dark scrim to ensure crystal clear contrast for headline and search engine */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/45" />

        {/* Video Play/Pause accessibility control */}
        <button
          onClick={toggleVideoPlayback}
          className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-300 hover:text-white border border-white/10 hover:border-white/30 transition-all opacity-70 hover:opacity-100 cursor-pointer text-xs flex items-center gap-1.5"
          title={isVideoPlaying ? "Pause background video" : "Play background video"}
          aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
        >
          {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
          <span className="hidden sm:inline text-[11px] pr-1">Ocean Motion</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-28">
        {/* Editorial Subheading */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>South Gippsland & Wilsons Promontory Victoria</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 text-balance">
            Where wild southern ocean meets rolling green hills.
          </h1>

          <p className="text-lg sm:text-xl text-stone-200 leading-relaxed font-normal mb-8 max-w-2xl">
            Discover turquoise quartz coves, ancient granite peaks, farm-to-table cellar doors, and curated coastal sanctuaries across the Prom Coast.
          </p>
        </div>

        {/* The One Master Search Engine */}
        <div className="mt-8 bg-stone-900/90 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-white/15 shadow-2xl max-w-5xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-stone-300">
            <span className="font-medium text-white flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Universal Stay & Region Finder</span>
            </span>
            <span className="text-stone-400 text-xs">
              Preferred Prom Coast regions · Open to search anywhere worldwide
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
            
            {/* Open Destination Input (Shows preferred regions + allows typing ANYWHERE) */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Destination or Region</span>
                </span>
                <span className="text-[10px] text-amber-300/80">Type or choose</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="prom-destinations"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  placeholder="e.g. Sandy Point, Fish Creek, or type any destination..."
                  className="w-full bg-stone-800/90 text-white placeholder:text-stone-400 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                />
                <datalist id="prom-destinations">
                  {PREFERRED_REGIONS.map((r) => (
                    <option key={r.id} value={r.label} />
                  ))}
                  <option value="Melbourne, Victoria" />
                  <option value="Mornington Peninsula, Victoria" />
                  <option value="Lorne, Great Ocean Road" />
                  <option value="Phillip Island, Victoria" />
                </datalist>
              </div>
            </div>

            {/* Check-In Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Check-in</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min="2026-09-29"
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-800/90 text-white border border-stone-700 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              />
            </div>

            {/* Check-Out Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Check-out</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-800/90 text-white border border-stone-700 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              />
            </div>

            {/* Guests & Action Button */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-stone-800/90 text-white border border-stone-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={6}>6+ Guests</option>
              </select>
            </div>

            {/* Preferred Region Quick Chips + Submit Button */}
            <div className="col-span-full pt-3 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
                <span className="text-[11px] text-stone-400 font-medium mr-1">Preferred Prom Coast:</span>
                {PREFERRED_REGIONS.slice(1, 8).map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => handleSelectRegion(region.label)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                      destinationInput === region.label
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 border-white/10'
                    }`}
                  >
                    {region.display}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Search Stays</span>
                </button>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
