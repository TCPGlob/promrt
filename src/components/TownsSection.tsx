import React from 'react';
import { MapPin, Clock, ArrowRight, Car, Compass } from 'lucide-react';
import { TOWNS_DATA } from '../data/mockData';
import { TownGuide } from '../types';

interface TownsSectionProps {
  onSelectTownForStays: (townName: string) => void;
  onJumpToTownOnMap: (townId: string) => void;
}

export const TownsSection: React.FC<TownsSectionProps> = ({
  onSelectTownForStays,
  onJumpToTownOnMap,
}) => {
  return (
    <section id="towns" className="py-20 bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
            Townships & Villages
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            The Characters of South Gippsland
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
            Each town along the Prom Coast has its own distinct personality — from Fish Creek's eccentric art studios to Meeniyan's gourmet food scene and Sandy Point's unhurried surf breaks.
          </p>
        </div>

        {/* Towns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOWNS_DATA.map((town) => (
            <div
              key={town.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <img
                  src={town.image}
                  alt={town.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Distance badges */}
                <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-sm text-stone-200 px-3 py-1 rounded-md text-xs flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-amber-400" />
                    <span>{town.driveTimeMelbourne} Melb</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{town.distanceToPromGate} to Prom</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1">
                    {town.tagline}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                    {town.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {town.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
                      Key Highlights:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {town.bestKnownFor.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onJumpToTownOnMap(town.id)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-stone-400" />
                    <span>Show on Map</span>
                  </button>

                  <button
                    onClick={() => onSelectTownForStays(town.name)}
                    className="text-xs font-semibold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse Stays ({town.recommendedStaysCount}+)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
