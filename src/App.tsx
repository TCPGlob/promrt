/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMap } from './components/InteractiveMap';
import { AccommodationGrid } from './components/AccommodationGrid';
import { BookingComExternalResults } from './components/BookingComExternalResults';
import { TripInspirationSection } from './components/TripInspirationSection';
import { BookingModal } from './components/BookingModal';
import { ContactModal } from './components/ContactModal';
import { ThingsToDoModal } from './components/ThingsToDoModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { DataProvider, useData } from './context/DataContext';
import { Accommodation, BookingSearchParams } from './types';
import { Sliders } from 'lucide-react';

const isCuratedRegion = (dest: string): boolean => {
  if (!dest) return true;
  const norm = dest.toLowerCase().trim();
  if (norm === 'all' || norm === 'all south gippsland & prom coast' || norm === '') return true;

  const curatedKeys = [
    'wilsons-prom',
    'wilsons prom',
    'wilsons promontory',
    'sandy-point',
    'sandy point',
    'fish-creek',
    'fish creek',
    'foster',
    'meeniyan',
    'walkerville',
    'inverloch',
    'waratah-bay',
    'waratah bay',
    'venus-bay',
    'venus bay',
    'tarwin-lower',
    'tarwin lower',
    'south gippsland',
    'prom coast'
  ];

  return curatedKeys.some((k) => norm.includes(k) || k.includes(norm));
};

function AppContent() {
  const { accommodations } = useData();

  const [selectedStay, setSelectedStay] = useState<Accommodation | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [searchParams, setSearchParams] = useState<BookingSearchParams>({
    destination: 'all',
    checkIn: '2026-10-09',
    checkOut: '2026-10-11',
    guests: 2,
  });

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open personalized booking modal with a specific stay or default to first featured stay
  const handleOpenBooking = (stay?: Accommodation) => {
    const targetStay = stay || accommodations[0];
    setSelectedStay(targetStay);
    setIsBookingModalOpen(true);
  };

  const handleHeroSearch = (params: BookingSearchParams) => {
    setSearchParams(params);
    const isCurated = isCuratedRegion(params.destination);

    if (isCurated) {
      if (params.destination && params.destination !== 'all') {
        setActiveRegionFilter(params.destination);
      } else {
        setActiveRegionFilter('all');
      }
      scrollToSection('stays');
    } else {
      // Non-curated destination (e.g. Melbourne, Sydney, Lorne, etc.)
      setActiveRegionFilter('all');
      setTimeout(() => {
        scrollToSection('external-booking-results');
      }, 150);
    }
  };

  const handleTownSelect = (townName: string) => {
    const isCurated = isCuratedRegion(townName);
    setSearchParams((prev) => ({ ...prev, destination: townName }));

    if (isCurated) {
      setActiveRegionFilter(townName.toLowerCase().replace(/\s+/g, '-'));
      scrollToSection('stays');
    } else {
      // For non-curated towns like Kongwak, Korumburra, Loch, Leongatha, etc.
      setActiveRegionFilter('all');
      setTimeout(() => {
        scrollToSection('external-booking-results');
      }, 150);
    }
  };

  const handleLocateStayOnMap = (stay: Accommodation) => {
    scrollToSection('map-section');
  };

  const handlePlanTripBooking = (town?: string) => {
    if (town) {
      handleTownSelect(town);
    } else {
      handleOpenBooking();
    }
  };

  const isNonCurated = !isCuratedRegion(searchParams.destination);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-950">
      
      {/* Top Bar navigation with all links from promcoast.com.au */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectTown={handleTownSelect}
        onSelectActivity={(activityId) => setSelectedActivityId(activityId)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section: The Single Main Search Engine with Video Background */}
        <div id="hero">
          <Hero
            onSearch={handleHeroSearch}
            onExploreMap={() => scrollToSection('map-section')}
          />
        </div>

        {/* Interactive South Gippsland & Prom Coast Map */}
        <InteractiveMap
          onSelectStay={(stay) => handleOpenBooking(stay)}
          selectedStayId={selectedStay?.id}
        />

        {/* The Master Curated Section Connecting All Regions with Tabs on the Right */}
        <AccommodationGrid
          accommodations={accommodations}
          onSelectStay={(stay) => handleOpenBooking(stay)}
          onLocateOnMap={handleLocateStayOnMap}
          selectedRegion={activeRegionFilter}
          onSelectRegion={(reg) => setActiveRegionFilter(reg)}
        />

        {/* Live Booking.com Results for Non-Curated Searches (Appears below Curated Regions) */}
        {isNonCurated && (
          <BookingComExternalResults
            searchParams={searchParams}
            onResetToCurated={() => {
              setSearchParams((prev) => ({ ...prev, destination: 'all' }));
              setActiveRegionFilter('all');
              scrollToSection('stays');
            }}
          />
        )}

        {/* Trip Inspiration Module: 3-Step Settings (Editable in Admin Panel) */}
        <TripInspirationSection
          onPlanTripBooking={handlePlanTripBooking}
          onExploreMap={() => scrollToSection('map-section')}
        />
      </main>

      {/* Floating Quick Admin Trigger */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-stone-900/90 hover:bg-stone-950 text-stone-200 hover:text-white px-3 py-2 rounded-full border border-stone-700/80 shadow-lg backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer group"
          title="Open Data & Booking.com Admin Panel"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span>Admin & Booking Settings</span>
        </button>
      </div>

      {/* Authoritative quiet footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Tailored Booking Concierge & Partner Engine Modal */}
      <BookingModal
        stay={selectedStay}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        defaultCheckIn={searchParams.checkIn}
        defaultCheckOut={searchParams.checkOut}
        defaultGuests={searchParams.guests}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Things To Do Guide Modal */}
      <ThingsToDoModal
        activityId={selectedActivityId}
        onClose={() => setSelectedActivityId(null)}
        onSelectTown={handleTownSelect}
        onExploreMap={() => scrollToSection('map-section')}
      />

      {/* Admin Management & Booking.com Setup Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
