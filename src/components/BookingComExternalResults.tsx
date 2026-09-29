import React from 'react';
import { ExternalLink, Calendar, Users, MapPin, Building, Home, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { BookingSearchParams } from '../types';
import { useData } from '../context/DataContext';

interface BookingComExternalResultsProps {
  searchParams: BookingSearchParams;
  onResetToCurated?: () => void;
}

export const BookingComExternalResults: React.FC<BookingComExternalResultsProps> = ({
  searchParams,
  onResetToCurated,
}) => {
  const { affiliateSettings, buildRegionalSearchUrl } = useData();

  const destination = searchParams.destination || 'Selected Destination';
  const checkIn = searchParams.checkIn || '2026-10-09';
  const checkOut = searchParams.checkOut || '2026-10-11';
  const guests = searchParams.guests || 2;

  // Generate Booking.com Affiliate URLs for different categories
  const masterSearchUrl = buildRegionalSearchUrl(destination, checkIn, checkOut, guests);
  
  // Custom deep link with hotel/apartment filters
  const hotelsUrl = `${masterSearchUrl}&nflt=ht_id%3D204`; // hotels
  const apartmentsUrl = `${masterSearchUrl}&nflt=ht_id%3D201`; // apartments & holiday homes
  const luxuryUrl = `${masterSearchUrl}&nflt=class%3D4%3Bclass%3D5`; // 4 & 5 star

  return (
    <section id="external-booking-results" className="py-16 bg-gradient-to-b from-stone-100 via-sky-50/50 to-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Notice Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-200 shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003b95]/10 text-[#003b95] text-xs font-bold tracking-wide uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#006ce4] animate-pulse" />
                <span>Live Partner Search Results · Booking.com</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                Available Stays & Hotels in &ldquo;<span className="text-[#003b95]">{destination}</span>&rdquo;
              </h2>

              <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
                You searched for a destination outside our handpicked South Gippsland collection. Below is the live Booking.com inventory matching your exact travel dates.
              </p>

              {/* Trip details pill */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-700">
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  <MapPin className="w-3.5 h-3.5 text-[#006ce4]" />
                  <span className="font-medium">{destination}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>{checkIn} to {checkOut}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              </div>
            </div>

            {/* Direct Booking Action Box */}
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 flex flex-col justify-between shrink-0 lg:w-80">
              <div className="space-y-1.5 mb-4 text-xs text-stone-600">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span>Free cancellation on most rooms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Instant confirmation & 24/7 support</span>
                </div>
              </div>

              <a
                href={masterSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#003b95] hover:bg-[#002b6e] text-white rounded-xl font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>View All Results on Booking.com</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

        {/* 3 Result Category Showcases for the Destination */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Top Rated Hotels & Lodges */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#003b95] flex items-center justify-center mb-4">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-1">
                Verified Hotels
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-2">
                Hotels & Inns in {destination}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Full-service accommodations with daily breakfast, on-site dining, and 24-hour reception.
              </p>
            </div>

            <a
              href={hotelsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#006ce4] hover:text-[#003b95] transition-colors"
            >
              <span>Browse Hotels ({destination})</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Private Holiday Rentals & Coastal Homes */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Home className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
                Private Rentals
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-2">
                Holiday Homes & Apartments
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Self-contained beach houses, modern lofts, and scenic family retreats with private kitchens.
              </p>
            </div>

            <a
              href={apartmentsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#006ce4] hover:text-[#003b95] transition-colors"
            >
              <span>Browse Holiday Rentals</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Boutique & Luxury Retreats */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
                High-End Escapes
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-2">
                4-Star & 5-Star Boutique Stays
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                Exceptional customer ratings, spa facilities, design architecture, and premium locations.
              </p>
            </div>

            <a
              href={luxuryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#006ce4] hover:text-[#003b95] transition-colors"
            >
              <span>Browse Luxury Stays</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Back to curated South Gippsland collection toggle */}
        {onResetToCurated && (
          <div className="text-center pt-2">
            <button
              onClick={onResetToCurated}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
            >
              <span>Return to Curated South Gippsland Collection</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
