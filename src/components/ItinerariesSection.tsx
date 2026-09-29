import React, { useState } from 'react';
import { Calendar, Compass, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { CURATED_ITINERARIES } from '../data/mockData';

interface ItinerariesSectionProps {
  onPlanTripBooking: () => void;
}

export const ItinerariesSection: React.FC<ItinerariesSectionProps> = ({ onPlanTripBooking }) => {
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>(CURATED_ITINERARIES[0].id);

  const activeItinerary = CURATED_ITINERARIES.find((it) => it.id === selectedItineraryId) || CURATED_ITINERARIES[0];

  return (
    <section id="itineraries" className="py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-800 mb-2">
              Trip Inspiration
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Curated Prom Coast Itineraries
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Take the guesswork out of your journey. Follow our field-tested day-by-day routes through South Gippsland.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex items-center gap-2 p-1 bg-stone-200/80 rounded-xl">
            {CURATED_ITINERARIES.map((it) => (
              <button
                key={it.id}
                onClick={() => setSelectedItineraryId(it.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedItineraryId === it.id
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {it.duration}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Itinerary Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
            <div>
              <div className="text-xs text-stone-500 flex items-center gap-2 mb-1">
                <span className="font-semibold text-amber-800 uppercase tracking-wider">{activeItinerary.duration}</span>
                <span aria-hidden="true">·</span>
                <span>Best for: {activeItinerary.forWhom}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {activeItinerary.title}
              </h3>
            </div>

            <button
              onClick={onPlanTripBooking}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-950 rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Book Stays for this Route</span>
            </button>
          </div>

          {/* Timeline Days */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-stone-200 before:z-0">
            {activeItinerary.days.map((dayItem, index) => (
              <div key={index} className="relative z-10 flex items-start gap-4 sm:gap-6">
                
                {/* Day circle */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-stone-900 text-amber-300 font-serif text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 shadow-xs">
                  {index + 1}
                </div>

                <div className="flex-1 bg-stone-50 rounded-xl p-5 border border-stone-200">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    {dayItem.day}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {dayItem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {dayItem.summary}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
