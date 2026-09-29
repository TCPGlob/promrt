import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Compass, Calendar, Sliders, ExternalLink, MapPin, Sparkles, Mail } from 'lucide-react';
import { useData } from '../context/DataContext';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onSelectTown: (townName: string) => void;
  onSelectActivity: (activityId: string) => void;
  onOpenContact: () => void;
}

export const PROM_COAST_TOWNS = [
  'Bena',
  'Dumbalk',
  'Fish Creek',
  'Foster',
  'Kongwak',
  'Koonwarra',
  'Korumburra',
  'Leongatha',
  'Loch',
  'Meeniyan',
  'Mirboo North',
  'Poowong',
  'Port Franklin',
  'Port Welshpool',
  'Sandy Point',
  'Stony Creek',
  'Tarwin Lower',
  'Toora',
  'Venus Bay',
  'Walkerville',
  'Waratah Bay',
  'Yanakie',
  'Inverloch',
];

export const THINGS_TO_DO_MENU = [
  { id: 'top-10', icon: '⭐', label: "Top 10 must do's" },
  { id: 'beaches', icon: '🌊', label: 'Beaches, Swimming & Surfing' },
  { id: 'walking', icon: '🥾', label: 'Walking, Hiking & Cycling' },
  { id: 'scenic-drives', icon: '🚗', label: 'Scenic Drives & Road Trips' },
  { id: 'food-wine', icon: '🍷', label: 'Food, Wine & Local Produce' },
  { id: 'wildlife', icon: '🐨', label: 'Wildlife & Nature' },
  { id: 'history', icon: '🏛️', label: 'History & Heritage' },
  { id: 'fishing', icon: '🎣', label: 'Fishing, Boating & Water Activities' },
  { id: 'lookouts', icon: '🌅', label: 'Lookouts, Sunsets & Photography' },
  { id: 'family', icon: '👪', label: 'Family Things to Do' },
  { id: 'events', icon: '📅', label: "Events & What's On" },
  { id: 'arts', icon: '🎨', label: 'Arts, Markets & Towns' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  onSelectTown,
  onSelectActivity,
  onOpenContact,
}) => {
  const { buildRegionalSearchUrl, accommodations } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mobile accordion states
  const [mobileTownsOpen, setMobileTownsOpen] = useState(false);
  const [mobileAccomOpen, setMobileAccomOpen] = useState(false);
  const [mobileThingsOpen, setMobileThingsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleTownClick = (town: string) => {
    onSelectTown(town);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleActivityClick = (activityId: string) => {
    onSelectActivity(activityId);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const wilsonsPromUrl = buildRegionalSearchUrl('Wilsons Promontory, Victoria, Australia');
  const gippslandUrl = buildRegionalSearchUrl('Gippsland, Victoria, Australia');

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Desktop Navigation incorporating all links from promcoast.com.au */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            
            {/* 1. Home */}
            <button
              onClick={() => handleNavClick('hero')}
              className="hover:text-emerald-900 transition-colors cursor-pointer py-2 hover:underline underline-offset-4 decoration-amber-600/40"
            >
              Home
            </button>

            {/* 2. Prom Coast Towns (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('towns')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === 'towns' ? null : 'towns')}
                className="hover:text-emerald-900 transition-colors cursor-pointer py-2 flex items-center gap-1 group"
                aria-expanded={openDropdown === 'towns'}
              >
                <span>Prom Coast Towns</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-transform ${openDropdown === 'towns' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'towns' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-xl border border-stone-200 p-5 grid grid-cols-3 gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="col-span-full pb-2 mb-2 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-900 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Explore South Gippsland Hamlets & Towns</span>
                    </span>
                    <span className="text-[11px] text-stone-400">23 Regions</span>
                  </div>

                  {PROM_COAST_TOWNS.map((town) => (
                    <button
                      key={town}
                      onClick={() => handleTownClick(town)}
                      className="px-2.5 py-1.5 text-xs text-stone-700 hover:text-emerald-900 hover:bg-stone-50 rounded-lg text-left transition-colors cursor-pointer font-normal truncate"
                    >
                      {town}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Local Accommodation (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('accom')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === 'accom' ? null : 'accom')}
                className="hover:text-emerald-900 transition-colors cursor-pointer py-2 flex items-center gap-1 group"
                aria-expanded={openDropdown === 'accom'}
              >
                <span>Local Accommodation</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-transform ${openDropdown === 'accom' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'accom' && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      onOpenBooking();
                      setOpenDropdown(null);
                    }}
                    className="w-full px-3.5 py-2.5 text-xs text-stone-800 hover:bg-amber-50/80 hover:text-amber-900 rounded-xl text-left font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>🏆 A Prom Coast Favourite</span>
                  </button>

                  <a
                    href={wilsonsPromUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3.5 py-2.5 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900 rounded-xl text-left transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Wilsons Promontory National Park</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>

                  <a
                    href={gippslandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3.5 py-2.5 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900 rounded-xl text-left transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Greater Gippsland Stays</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>

                  <div className="border-t border-stone-100 my-1" />

                  <button
                    onClick={() => handleNavClick('stays')}
                    className="w-full px-3.5 py-2 text-xs text-emerald-800 hover:bg-emerald-50 rounded-xl text-left font-semibold transition-colors cursor-pointer"
                  >
                    Curated Prom Coast Sanctuaries ({accommodations.length})
                  </button>
                </div>
              )}
            </div>

            {/* 4. Things To Do (Mega Dropdown with Icons) */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('things')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => setOpenDropdown(openDropdown === 'things' ? null : 'things')}
                className="hover:text-emerald-900 transition-colors cursor-pointer py-2 flex items-center gap-1 group"
                aria-expanded={openDropdown === 'things'}
              >
                <span>Things To Do</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-transform ${openDropdown === 'things' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'things' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-white rounded-2xl shadow-xl border border-stone-200 p-5 grid grid-cols-2 gap-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="col-span-full pb-2 mb-1 border-b border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Experiences, Trails & Seasonal Highlights</span>
                    </span>
                    <span className="text-[11px] text-stone-400">12 Activities</span>
                  </div>

                  {THINGS_TO_DO_MENU.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleActivityClick(item.id)}
                      className="p-2.5 text-xs text-stone-800 hover:text-emerald-900 hover:bg-stone-50 rounded-xl text-left transition-colors flex items-center gap-2.5 cursor-pointer font-medium"
                    >
                      <span className="text-base shrink-0">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Prom Coast Map */}
            <button
              onClick={() => handleNavClick('map-section')}
              className="hover:text-emerald-900 transition-colors cursor-pointer py-2 hover:underline underline-offset-4 decoration-amber-600/40 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              <span>Prom Coast Map</span>
            </button>

            {/* 6. Contact Us */}
            <button
              onClick={onOpenContact}
              className="hover:text-emerald-900 transition-colors cursor-pointer py-2 hover:underline underline-offset-4 decoration-amber-600/40 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Contact Us</span>
            </button>

          </nav>

          {/* Action Zone: Admin trigger icon only, moved further to the right */}
          <div className="hidden lg:flex items-center ml-auto pl-4">
            <button
              onClick={onOpenAdmin}
              className="p-2.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-full transition-all cursor-pointer group"
              title="Open Admin & Booking.com Setup Panel"
              aria-label="Open Admin & Booking Settings"
            >
              <Sliders className="w-4 h-4 text-stone-600 group-hover:text-stone-900 group-hover:rotate-45 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Bar (visible on small screens) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg focus:outline-none cursor-pointer flex items-center gap-2 text-sm font-semibold"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span>Menu</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 rounded-full transition-colors cursor-pointer"
              title="Open Admin Settings"
              aria-label="Open Admin Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer with Accordions for Towns and Things To Do */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-3">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left py-2.5 text-sm font-semibold text-stone-900 border-b border-stone-100"
          >
            Home
          </button>

          {/* Prom Coast Towns Accordion */}
          <div className="border-b border-stone-100 pb-2">
            <button
              onClick={() => setMobileTownsOpen(!mobileTownsOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-stone-900"
            >
              <span>Prom Coast Towns ({PROM_COAST_TOWNS.length})</span>
              <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${mobileTownsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileTownsOpen && (
              <div className="grid grid-cols-2 gap-1.5 pt-2 pl-2">
                {PROM_COAST_TOWNS.map((town) => (
                  <button
                    key={town}
                    onClick={() => handleTownClick(town)}
                    className="p-1.5 text-xs text-stone-700 hover:text-emerald-900 hover:bg-stone-50 rounded-md text-left truncate"
                  >
                    {town}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Local Accommodation Accordion */}
          <div className="border-b border-stone-100 pb-2">
            <button
              onClick={() => setMobileAccomOpen(!mobileAccomOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-stone-900"
            >
              <span>Local Accommodation</span>
              <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${mobileAccomOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileAccomOpen && (
              <div className="space-y-1.5 pt-2 pl-2 text-xs">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="block w-full text-left py-1 text-amber-800 font-semibold"
                >
                  🏆 A Prom Coast Favourite
                </button>
                <a
                  href={wilsonsPromUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 text-stone-700 hover:text-stone-900"
                >
                  Wilsons Promontory National Park ↗
                </a>
                <a
                  href={gippslandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 text-stone-700 hover:text-stone-900"
                >
                  Greater Gippsland Stays ↗
                </a>
                <button
                  onClick={() => handleNavClick('stays')}
                  className="block w-full text-left py-1 text-emerald-800 font-semibold"
                >
                  Curated Stays & Sanctuaries
                </button>
              </div>
            )}
          </div>

          {/* Things To Do Accordion */}
          <div className="border-b border-stone-100 pb-2">
            <button
              onClick={() => setMobileThingsOpen(!mobileThingsOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-stone-900"
            >
              <span>Things To Do (12 Activities)</span>
              <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${mobileThingsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileThingsOpen && (
              <div className="space-y-1 pt-2 pl-2">
                {THINGS_TO_DO_MENU.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleActivityClick(item.id)}
                    className="w-full p-1.5 text-xs text-stone-700 hover:text-emerald-900 hover:bg-stone-50 rounded-md text-left flex items-center gap-2 truncate"
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Prom Coast Map */}
          <button
            onClick={() => handleNavClick('map-section')}
            className="block w-full text-left py-2.5 text-sm font-semibold text-stone-900 border-b border-stone-100"
          >
            Prom Coast Map
          </button>

          {/* Contact Us */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="block w-full text-left py-2.5 text-sm font-semibold text-stone-900 border-b border-stone-100"
          >
            Contact Us
          </button>

          {/* CTA Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-emerald-900 rounded-lg cursor-pointer shadow-xs"
            >
              Book Accommodation
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
            >
              Admin & Booking Settings
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
