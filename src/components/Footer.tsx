import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenAdmin, onOpenContact }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-serif text-xl font-bold tracking-tight text-white block">
              promcoast<span className="text-amber-400">.com.au</span>
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              The independent regional travel and accommodation guide for South Gippsland and Wilsons Promontory, Victoria, Australia.
            </p>
            <div className="text-[11px] text-stone-500 pt-2">
              Acknowledging the Traditional Custodians of Gunaikurnai and Bunurong Country upon which we explore.
            </div>
          </div>

          {/* Stays & Booking */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Accommodation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('stays')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Eco Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stays')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coastal Beach Houses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stays')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Boutique Country B&Bs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('stays')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Glamping & Farm Stays
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Regional Booking Concierge</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Explorer */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Explore The Coast
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('map-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive South Gippsland Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Squeaky Beach & Prom Walks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('towns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fish Creek Art & Galleries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('towns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Meeniyan Pizzeria & Wine Trail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trip-inspiration')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3-Step Prom Coast Escape
                </button>
              </li>
              {onOpenContact && (
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-white transition-colors cursor-pointer text-amber-300 font-medium"
                  >
                    Contact Prom Coast ✉
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Partner & Booking Integrity */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-xs mb-3">
              Booking Integrity
            </h4>
            <div className="space-y-2 text-stone-400 text-xs leading-relaxed">
              <p>
                Prom Coast operates in verified partnership with Booking.com B.V. to provide live real-time rates and instant reservations.
              </p>
              <div className="flex items-center gap-1.5 text-stone-300 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Markup Guarantee</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-2">
                Questions or host inquiries? Contact our team at <span className="text-stone-300">concierge@promcoast.com.au</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-3">
          <div>
            &copy; {new Date().getFullYear()} promcoast.com.au. All rights reserved. South Gippsland, Victoria.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              Admin & Partner Portal
            </button>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Host Your Property</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
