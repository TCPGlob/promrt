import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Wine, 
  Check, 
  ExternalLink, 
  Phone, 
  Clock, 
  MessageSquare,
  Gift,
  Key
} from 'lucide-react';
import { Accommodation } from '../types';
import { useData } from '../context/DataContext';

interface BookingModalProps {
  stay: Accommodation | null;
  isOpen: boolean;
  onClose: () => void;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  stay,
  isOpen,
  onClose,
  defaultCheckIn = '2026-10-09',
  defaultCheckOut = '2026-10-11',
  defaultGuests = 2,
}) => {
  if (!isOpen || !stay) return null;

  const { buildBookingUrl, affiliateSettings } = useData();

  const [checkIn, setCheckIn] = useState<string>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<string>(defaultCheckOut);
  const [guests, setGuests] = useState<number>(defaultGuests);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'instant' | 'vip'>('instant');
  const [vipSubmitted, setVipSubmitted] = useState<boolean>(false);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 2;
  };

  const nights = calculateNights();
  const baseRate = stay.pricePerNight * nights;
  const cleaningFee = 85;
  const promoPerkValue = 45; // complimentary wine & cheese welcome
  const totalAud = baseRate + cleaningFee;

  // Build personalized Booking.com affiliate deep link from context
  const targetBookingUrl = buildBookingUrl(stay, checkIn, checkOut, guests, 1);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;
    setVipSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-8">
        
        {/* Header Bar */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">
              Personalised Prom Coast Stay Concierge
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
          
          {/* Property Identity Card */}
          <div className="flex flex-col sm:flex-row gap-5 pb-6 border-b border-stone-200">
            <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 bg-stone-100">
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1">
              <div className="text-xs text-stone-500 flex items-center gap-1.5 mb-1">
                <span className="font-semibold text-stone-800">{stay.town}</span>
                <span aria-hidden="true">·</span>
                <span>{stay.type}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-medium">★ {stay.rating} ({stay.reviewCount} reviews)</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                {stay.name}
              </h2>

              <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                {stay.tagline}
              </p>

              <div className="mt-3 flex items-center gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>{stay.distanceToPromGate} to Prom Gate</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>Max {stay.sleeps} Guests</span>
              </div>
            </div>
          </div>

          {/* Interactive Date & Guest Customizer */}
          <div className="py-6 border-b border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Check-In Date</span>
              </label>
              <input
                type="date"
                value={checkIn}
                min="2026-09-29"
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>Check-Out Date</span>
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-700" />
                <span>Number of Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                {Array.from({ length: stay.sleeps }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} Guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing & Local Host Perks Breakdown */}
          <div className="py-5 border-b border-stone-200">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span>${stay.pricePerNight} AUD × {nights} nights</span>
              <span className="font-mono tabular-nums font-medium">${baseRate} AUD</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span>Linen & departure cleaning</span>
              <span className="font-mono tabular-nums font-medium">${cleaningFee} AUD</span>
            </div>
            <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg mb-3">
              <span className="flex items-center gap-1.5 font-medium">
                <Gift className="w-4 h-4 text-emerald-700" />
                <span>Prom Coast Welcome Perk (Local Wine + Farmstead Cheese)</span>
              </span>
              <span className="font-semibold text-emerald-900">Included Free</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-100">
              <span>Estimated Total ({nights} nights)</span>
              <span className="font-serif text-lg text-stone-950 tabular-nums">${totalAud} AUD</span>
            </div>
          </div>

          {/* Tab Selector: Instant Booking.com vs VIP Concierge Hold */}
          <div className="pt-6">
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('instant')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'instant'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Option A: Instant Partner Booking</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vip')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'vip'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Option B: Local Concierge Hold</span>
              </button>
            </div>

            {/* TAB 1: Seamless Instant Booking.com Integration */}
            {activeTab === 'instant' && (
              <div className="space-y-4">
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-stone-800">
                  <div className="font-semibold text-amber-950 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Personalised Booking.com Partner Engine</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Your chosen dates ({checkIn} to {checkOut}), guest count ({guests}), and local perks are pre-configured. Clicking below securely loads the exact property reservation page on our official Booking.com partner system.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Free cancellation available on selected rooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Instant confirmation directly to your email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Best Price Guarantee & Prom Coast local concierge support</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={targetBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 text-sm font-semibold uppercase tracking-wider text-white bg-emerald-900 hover:bg-emerald-950 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer text-center"
                  >
                    <span>Reserve on Booking.com Partner Engine</span>
                    <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <p className="text-[11px] text-stone-400 text-center mt-2 flex items-center justify-center gap-1.5">
                    <span>Affiliate Partner ID: <code className="font-mono text-stone-300 font-semibold">{affiliateSettings.affiliateId}</code></span>
                    <span aria-hidden="true">·</span>
                    <span>No additional markup fees applied</span>
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: VIP Local Concierge Hold */}
            {activeTab === 'vip' && (
              <div>
                {!vipSubmitted ? (
                  <form onSubmit={handleVipSubmit} className="space-y-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-700">
                      <div className="font-semibold text-stone-900 mb-1">
                        Prefer tailored assistance or have custom requests?
                      </div>
                      <p>
                        Our South Gippsland local team will review live dates with the host, arrange complimentary wine hampers or firewood bundles, and hold the retreat for 24 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="sarah@example.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Mobile Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+61 400 000 000"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Special Requests / Notes (e.g. Pet travel, EV charging, Firewood)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your trip or special arrangements..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-950 rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Concierge Hold Request
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-emerald-950">
                      Concierge Request Received
                    </h3>
                    <p className="text-xs text-stone-600 max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-stone-900">{guestName}</span>. Your provisional hold request for <span className="font-semibold text-stone-900">{stay.name}</span> has been logged under reference <span className="font-mono font-bold text-stone-900">#PC-8921</span>. Our local coordinator will email you at <span className="font-semibold text-stone-900">{guestEmail}</span> within 2 hours with availability confirmation.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
