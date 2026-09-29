import React, { useState } from 'react';
import { MapPin, Users, Bed, Bath, ArrowUpRight, Compass, Sparkles, Calendar, Check, ExternalLink } from 'lucide-react';
import { Accommodation } from '../types';
import { TOWNS_DATA } from '../data/mockData';

interface AccommodationGridProps {
  accommodations: Accommodation[];
  onSelectStay: (stay: Accommodation) => void;
  onLocateOnMap: (stay: Accommodation) => void;
  selectedRegion?: string;
  onSelectRegion?: (regionId: string) => void;
}

const REGION_TABS = [
  { id: 'all', label: 'All Regions' },
  { id: 'wilsons-prom', townName: 'Wilsons Promontory', label: 'Wilsons Prom' },
  { id: 'fish-creek', townName: 'Fish Creek', label: 'Fish Creek' },
  { id: 'sandy-point', townName: 'Sandy Point', label: 'Sandy Point' },
  { id: 'meeniyan', townName: 'Meeniyan', label: 'Meeniyan' },
  { id: 'foster', townName: 'Foster', label: 'Foster' },
  { id: 'walkerville', townName: 'Walkerville', label: 'Walkerville' },
  { id: 'inverloch', townName: 'Inverloch', label: 'Inverloch' },
];

export const AccommodationGrid: React.FC<AccommodationGridProps> = ({
  accommodations,
  onSelectStay,
  onLocateOnMap,
  selectedRegion = 'all',
  onSelectRegion,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedRegion);
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleTabChange = (regionId: string) => {
    setActiveTab(regionId);
    if (onSelectRegion) onSelectRegion(regionId);
  };

  // Find active region town info
  const activeTabMeta = REGION_TABS.find((r) => r.id === activeTab);
  const activeTownData = TOWNS_DATA.find(
    (t) => t.id === activeTab || (activeTabMeta?.townName && t.name.toLowerCase() === activeTabMeta.townName.toLowerCase())
  );

  // Filter accommodations by active region tab and property style
  const filteredAccommodations = accommodations.filter((stay) => {
    // Style filter
    if (selectedType !== 'all' && stay.type !== selectedType) return false;

    // Region tab filter
    if (activeTab === 'all') return true;

    if (activeTabMeta?.townName) {
      return stay.town.toLowerCase().includes(activeTabMeta.townName.toLowerCase());
    }

    return true;
  });

  const propertyTypes = [
    'all',
    'Luxury Eco Villa',
    'Coastal Beach House',
    'Boutique B&B',
    'Glamping & Farm Stay',
    'Lodge & Cottage',
  ];

  return (
    <section id="stays" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curated Header with Interactive Region Tabs at the Right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Curated Regional Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Prom Coast & Regional Havens
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              Connected sanctuaries across South Gippsland’s coastal dunes, artisan villages, and wilderness gateways.
            </p>
          </div>

          {/* Connected Region Tabs at the Right */}
          <div className="flex items-center gap-1.5 flex-wrap lg:justify-end bg-stone-200/80 p-1.5 rounded-xl border border-stone-300/80 shadow-xs">
            {REGION_TABS.map((tab) => {
              const count = tab.id === 'all'
                ? accommodations.length
                : accommodations.filter((s) => s.town.toLowerCase().includes((tab.townName || '').toLowerCase())).length;

              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-stone-800 text-amber-300' : 'bg-stone-300/80 text-stone-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Regional Snapshot (Connects what makes each region special) */}
        {activeTownData && activeTab !== 'all' && (
          <div className="mb-8 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                <img
                  src={activeTownData.image}
                  alt={activeTownData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Region: {activeTownData.name}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500 font-normal">Drive from Melbourne: {activeTownData.driveTimeMelbourne}</span>
                </div>
                <div className="font-serif font-bold text-lg text-stone-900 leading-tight">
                  {activeTownData.tagline}
                </div>
                <p className="text-xs text-stone-600 mt-1 max-w-2xl line-clamp-2">
                  {activeTownData.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <span className="text-xs text-stone-500 font-medium">To Prom Gate:</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {activeTownData.distanceToPromGate}
              </span>
            </div>
          </div>
        )}

        {/* Property Style Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-xs font-medium text-stone-500 mr-2 shrink-0">Filter Style:</span>
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === type
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-600 bg-white hover:text-stone-900 hover:bg-stone-200/60 border border-stone-200'
              }`}
            >
              {type === 'all' ? 'All Styles' : type}
            </button>
          ))}
        </div>

        {/* Accommodation Cards Grid */}
        {filteredAccommodations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((stay) => (
              <article
                key={stay.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white">
                      <span className="font-serif font-bold text-base tabular-nums">
                        ${stay.pricePerNight}
                      </span>
                      <span className="text-stone-300 text-xs font-normal"> / night AUD</span>
                    </div>

                    {/* Town Badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-800 shadow-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{stay.town}</span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-emerald-900/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-xs font-bold tabular-nums">
                      {stay.rating.toFixed(1)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-1">
                      {stay.type}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight group-hover:text-emerald-900 transition-colors">
                      {stay.name}
                    </h3>

                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {stay.tagline}
                    </p>

                    {/* Key Attributes */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                      <div className="flex items-center gap-1.5" title="Guests accommodated">
                        <Users className="w-3.5 h-3.5 text-stone-400" />
                        <span>Up to {stay.sleeps}</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Bedrooms">
                        <Bed className="w-3.5 h-3.5 text-stone-400" />
                        <span>{stay.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Bathrooms">
                        <Bath className="w-3.5 h-3.5 text-stone-400" />
                        <span>{stay.bathrooms} bath</span>
                      </div>
                    </div>

                    {/* Distance to Prom Gate */}
                    <div className="mt-3 text-[11px] text-stone-500 flex items-center justify-between bg-stone-50 p-2 rounded-lg border border-stone-100">
                      <span>Distance to Prom Gate:</span>
                      <span className="font-semibold text-stone-800">{stay.distanceToPromGate}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onLocateOnMap(stay)}
                    className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                    title="Locate stay on interactive map"
                    aria-label={`Locate ${stay.name} on map`}
                  >
                    <Compass className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectStay(stay)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer group/btn"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>Book Stay</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm mb-3">No accommodations matched the selected filter in this region.</p>
            <button
              onClick={() => { setActiveTab('all'); setSelectedType('all'); }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters to All Regions
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
