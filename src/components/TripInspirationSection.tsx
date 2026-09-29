import React from 'react';
import { Sparkles, Calendar, MapPin, Check, ArrowRight, Compass } from 'lucide-react';
import { useData } from '../context/DataContext';

interface TripInspirationSectionProps {
  onPlanTripBooking: (town?: string) => void;
  onExploreMap: () => void;
}

export const TripInspirationSection: React.FC<TripInspirationSectionProps> = ({
  onPlanTripBooking,
  onExploreMap,
}) => {
  const { tripInspiration } = useData();

  return (
    <section id="trip-inspiration" className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customizable Trip Inspiration Module</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {tripInspiration.sectionTitle}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              {tripInspiration.sectionSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreMap}
              className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>View Route on Map</span>
            </button>
            <button
              onClick={() => onPlanTripBooking()}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Trip Stays</span>
            </button>
          </div>
        </div>

        {/* 3 Step Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tripInspiration.steps.map((step, idx) => (
            <div
              key={step.stepNumber || idx}
              className="bg-stone-800/90 rounded-2xl overflow-hidden border border-stone-700/80 shadow-lg flex flex-col justify-between group hover:border-amber-400/40 transition-all"
            >
              {/* Card Image */}
              {step.image && (
                <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
                  
                  {/* Step Badge */}
                  <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-semibold text-amber-300">
                    {step.badge || `Step ${idx + 1}`}
                  </div>

                  {step.recommendedTown && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-stone-200 bg-stone-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{step.recommendedTown}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  
                  {step.subtitle && (
                    <div className="text-xs font-medium text-amber-400/90 mb-3">
                      {step.subtitle}
                    </div>
                  )}

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {step.highlights && step.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-stone-700/60 mb-4">
                      {step.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-stone-400">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Base: <span className="text-white font-medium">{step.recommendedTown || 'Prom Coast'}</span>
                  </span>
                  <button
                    onClick={() => onPlanTripBooking(step.recommendedTown)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Find Stays</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Quiet Subtext Note */}
        <div className="mt-8 text-center text-[11px] text-stone-500">
          All 3 steps are fully customizable via the site’s Admin Panel to reflect any seasonal road trip or bespoke weekend itinerary.
        </div>

      </div>
    </section>
  );
};
