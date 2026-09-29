import React, { useState } from 'react';
import { 
  Waves, 
  Mountain, 
  Utensils, 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { POINTS_OF_INTEREST } from '../data/mockData';
import { PointOfInterest, CategoryType } from '../types';

interface PoiSectionProps {
  onLocatePoi: (poi: PointOfInterest) => void;
  onFilterTownStays: (townName: string) => void;
}

export const PoiSection: React.FC<PoiSectionProps> = ({ onLocatePoi, onFilterTownStays }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'beach' | 'walk' | 'food' | 'attraction'>('all');

  const filteredPois = activeTab === 'all' 
    ? POINTS_OF_INTEREST 
    : POINTS_OF_INTEREST.filter((poi) => poi.category === activeTab);

  return (
    <section id="explore" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
              Discover South Gippsland
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Wild Coastlines, Ancient Peaks & Gourmet Trails
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Plan your adventures between pristine quartz beaches, lush rainforest cascades, and world-class regional food artisans.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Highlights
            </button>
            <button
              onClick={() => setActiveTab('beach')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'beach'
                  ? 'bg-white text-sky-900 shadow-xs'
                  : 'text-stone-600 hover:text-sky-900'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-sky-600" />
              <span>Beaches</span>
            </button>
            <button
              onClick={() => setActiveTab('walk')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'walk'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-stone-600 hover:text-amber-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-600" />
              <span>Walks & Hikes</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'food'
                  ? 'bg-white text-rose-900 shadow-xs'
                  : 'text-stone-600 hover:text-rose-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-rose-600" />
              <span>Food & Wine</span>
            </button>
            <button
              onClick={() => setActiveTab('attraction')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'attraction'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-stone-600 hover:text-purple-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-purple-600" />
              <span>Wildlife & Culture</span>
            </button>
          </div>
        </div>

        {/* POI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPois.map((poi) => (
            <article
              key={poi.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Photo with aspect-ratio 4:3 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={poi.image}
                  alt={poi.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Location indicator */}
                <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm text-stone-200 px-3 py-1 rounded-md text-xs flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{poi.town}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="text-xs text-stone-500 mb-2 flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider text-amber-800">
                      {poi.category === 'beach' ? 'Coastal Beach' : poi.category === 'walk' ? 'Trail & Hike' : poi.category === 'food' ? 'Food & Drink' : 'Attraction'}
                    </span>
                    {poi.durationOrTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{poi.durationOrTime}</span>
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                    {poi.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-3">
                    {poi.fullDesc}
                  </p>

                  {/* Highlights */}
                  {poi.highlights && (
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                      {poi.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Local Tip Box */}
                  {poi.tips && (
                    <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-stone-700 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-950">Local Insight: </span>
                        <span>{poi.tips}</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onLocatePoi(poi)}
                    className="text-xs font-semibold text-stone-700 hover:text-stone-950 hover:underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>View on Map</span>
                  </button>

                  <button
                    onClick={() => onFilterTownStays(poi.town)}
                    className="text-xs font-semibold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Stays in {poi.town}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
