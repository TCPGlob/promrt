import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Compass, 
  MapPin, 
  Home, 
  Waves, 
  Mountain, 
  Utensils, 
  Calendar,
  X,
  Layers,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Map as MapIcon
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { TOWNS_DATA } from '../data/mockData';
import { Accommodation, PointOfInterest, CategoryType } from '../types';

interface InteractiveMapProps {
  onSelectStay: (stay: Accommodation) => void;
  selectedStayId?: string | null;
}

type FilterCategory = 'all' | CategoryType;

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bgClass: string }> = {
  stay: { label: 'Stays', color: '#065f46', bgClass: 'bg-emerald-700' },
  beach: { label: 'Beaches', color: '#0284c7', bgClass: 'bg-sky-600' },
  walk: { label: 'Walks & Hikes', color: '#b45309', bgClass: 'bg-amber-700' },
  food: { label: 'Food & Wine', color: '#be123c', bgClass: 'bg-rose-700' },
  town: { label: 'Towns', color: '#1c1917', bgClass: 'bg-stone-900' },
  attraction: { label: 'Attractions', color: '#6d28d9', bgClass: 'bg-purple-700' },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectStay, selectedStayId }) => {
  const { accommodations, pointsOfInterest, towns } = useData();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedItem, setSelectedItem] = useState<{ type: 'stay' | 'poi' | 'town'; data: any } | null>(null);
  const [selectedTownFilter, setSelectedTownFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapMode, setMapMode] = useState<'leaflet' | 'schematic'>('leaflet');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy any existing instance if remounting
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [-38.82, 146.08],
        zoom: 10,
        minZoom: 8,
        maxZoom: 16,
        scrollWheelZoom: false,
      });

      // Standard OSM tiles (most reliable across all browsers & iframes)
      const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      });

      tileLayer.addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;

      // Invalidate size after paint to ensure zero grey-tile or zero-height issues
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          setMapLoaded(true);
        }
      }, 300);

      // Handle ResizeObserver
      const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
        map.remove();
        mapInstanceRef.current = null;
      };
    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
    }
  }, [mapMode]);

  // Update Markers whenever filters, search, or data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. Accommodations
    if (activeCategory === 'all' || activeCategory === 'stay') {
      accommodations.forEach((stay) => {
        if (selectedTownFilter !== 'all' && stay.town.toLowerCase() !== selectedTownFilter.toLowerCase()) return;
        if (searchQuery && !stay.name.toLowerCase().includes(searchQuery.toLowerCase()) && !stay.description.toLowerCase().includes(searchQuery.toLowerCase())) return;

        const iconHtml = `
          <div class="custom-map-pin flex items-center justify-center w-8 h-8 rounded-full bg-emerald-800 text-white shadow-md border-2 border-white ring-1 ring-emerald-950/20 cursor-pointer" title="${stay.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-leaflet-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([stay.lat, stay.lng], { icon: customIcon });
        marker.on('click', () => {
          setSelectedItem({ type: 'stay', data: stay });
          map.panTo([stay.lat, stay.lng]);
        });

        marker.bindTooltip(`<b>${stay.name}</b><br>$${stay.pricePerNight}/night`, { direction: 'top', offset: [0, -12] });
        markersGroup.addLayer(marker);
      });
    }

    // 2. Points of Interest
    pointsOfInterest.forEach((poi) => {
      if (activeCategory !== 'all' && poi.category !== activeCategory) return;
      if (selectedTownFilter !== 'all' && !poi.town.toLowerCase().includes(selectedTownFilter.toLowerCase())) return;
      if (searchQuery && !poi.name.toLowerCase().includes(searchQuery.toLowerCase()) && !poi.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())) return;

      const conf = CATEGORY_CONFIG[poi.category] || CATEGORY_CONFIG.attraction;
      
      let svgInner = '';
      if (poi.category === 'beach') {
        svgInner = '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>';
      } else if (poi.category === 'walk') {
        svgInner = '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>';
      } else if (poi.category === 'food') {
        svgInner = '<path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v4a3 3 0 0 0 3 3v13"/>';
      } else {
        svgInner = '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>';
      }

      const iconHtml = `
        <div class="custom-map-pin flex items-center justify-center w-7 h-7 rounded-full text-white shadow-md border-2 border-white ring-1 ring-black/10 cursor-pointer" style="background-color: ${conf.color};" title="${poi.name}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgInner}</svg>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-div-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: customIcon });
      marker.on('click', () => {
        setSelectedItem({ type: 'poi', data: poi });
        map.panTo([poi.lat, poi.lng]);
      });

      marker.bindTooltip(`<b>${poi.name}</b><br><span style="text-transform: capitalize;">${poi.category}</span>`, { direction: 'top', offset: [0, -12] });
      markersGroup.addLayer(marker);
    });

    // 3. Towns
    if (activeCategory === 'all' || activeCategory === 'town') {
      towns.forEach((town) => {
        if (selectedTownFilter !== 'all' && town.name.toLowerCase() !== selectedTownFilter.toLowerCase()) return;
        if (searchQuery && !town.name.toLowerCase().includes(searchQuery.toLowerCase())) return;

        const iconHtml = `
          <div class="custom-map-pin flex items-center justify-center w-8 h-8 rounded-lg bg-stone-900 text-amber-400 shadow-lg border-2 border-white cursor-pointer" title="${town.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M6 18h12"/><path d="M4 18V9l8-6 8 6v9"/><path d="M10 12h4"/></svg>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-leaflet-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        const marker = L.marker([town.lat, town.lng], { icon: customIcon });
        marker.on('click', () => {
          setSelectedItem({ type: 'town', data: town });
          map.panTo([town.lat, town.lng]);
        });

        marker.bindTooltip(`<b>Town: ${town.name}</b>`, { direction: 'top', offset: [0, -12] });
        markersGroup.addLayer(marker);
      });
    }
  }, [accommodations, pointsOfInterest, towns, activeCategory, selectedTownFilter, searchQuery, mapMode]);

  // Recenter map helper
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([-38.82, 146.08], 10);
    mapInstanceRef.current.invalidateSize();
    setSelectedTownFilter('all');
  };

  const handleTownClick = (townId: string) => {
    setSelectedTownFilter(townId);
    if (!mapInstanceRef.current) return;
    
    if (townId === 'all') {
      handleRecenter();
      return;
    }

    const town = towns.find((t) => t.id === townId);
    if (town) {
      mapInstanceRef.current.setView([town.lat, town.lng], 12);
      mapInstanceRef.current.invalidateSize();
      setSelectedItem({ type: 'town', data: town });
    }
  };

  return (
    <section id="map-section" className="py-16 bg-stone-100 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Interactive Regional Explorer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              South Gippsland Map & Guide
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl">
              Live interactive mapping for {accommodations.length} accommodations, {pointsOfInterest.length} regional highlights, and {towns.length} towns.
            </p>
          </div>

          {/* Quick Town Quick-Nav */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-stone-500 mr-1">Jump to:</span>
            {[
              { id: 'all', label: 'All Region' },
              { id: 'wilsons-prom', label: 'The Prom' },
              { id: 'sandy-point', label: 'Sandy Point' },
              { id: 'fish-creek', label: 'Fish Creek' },
              { id: 'foster', label: 'Foster' },
              { id: 'meeniyan', label: 'Meeniyan' },
              { id: 'walkerville', label: 'Walkerville' },
            ].map((town) => (
              <button
                key={town.id}
                onClick={() => handleTownClick(town.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedTownFilter === town.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-200'
                }`}
              >
                {town.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-2 bg-white rounded-xl border border-stone-200 shadow-xs">
          
          {/* Functional Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({accommodations.length + pointsOfInterest.length + towns.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('stay')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'stay'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-emerald-900 hover:bg-emerald-50'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>Stays ({accommodations.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('beach')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'beach'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-sky-900 hover:bg-sky-50'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-sky-600" />
              <span>Beaches</span>
            </button>

            <button
              onClick={() => setActiveCategory('walk')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'walk'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-amber-900 hover:bg-amber-50'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-600" />
              <span>Hikes</span>
            </button>

            <button
              onClick={() => setActiveCategory('food')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'food'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-rose-900 hover:bg-rose-50'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-rose-600" />
              <span>Food & Wine</span>
            </button>
          </div>

          {/* Quick Search & Reset Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search spots on map..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-48"
            />

            <button
              onClick={handleRecenter}
              className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              title="Recenter Map"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recenter</span>
            </button>
          </div>
        </div>

        {/* Map Container + Overlay Detail Card */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-md bg-stone-200 min-h-[520px] h-[550px] sm:h-[620px]">
          
          {/* Leaflet DOM container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-full z-0 min-h-[520px]" 
            style={{ width: '100%', height: '100%' }}
          />

          {/* Floating Selected Detail Card (when user clicks pin) */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[420px] z-500 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-stone-200 shadow-xl transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 p-1.5 text-stone-400 hover:text-stone-700 rounded-md hover:bg-stone-100 transition-colors"
                aria-label="Close detail"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                  <img
                    src={selectedItem.data.image}
                    alt={selectedItem.data.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  {/* Clean unboxed metadata */}
                  <div className="text-xs text-stone-500 mb-1 flex items-center gap-1.5 truncate">
                    <span className="font-semibold uppercase tracking-wider text-amber-800">
                      {selectedItem.type === 'stay' ? 'Accommodation' : selectedItem.data.category || 'Town Guide'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedItem.data.town || selectedItem.data.name}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight truncate">
                    {selectedItem.data.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                    {selectedItem.data.tagline || selectedItem.data.shortDesc || selectedItem.data.description}
                  </p>

                  {selectedItem.type === 'stay' && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="font-serif font-bold text-base text-stone-900 tabular-nums">
                          ${selectedItem.data.pricePerNight}
                        </span>
                        <span className="text-stone-500"> / night</span>
                      </div>

                      <button
                        onClick={() => onSelectStay(selectedItem.data as Accommodation)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Stay</span>
                      </button>
                    </div>
                  )}

                  {selectedItem.type !== 'stay' && selectedItem.data.highlights && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-stone-500 truncate">
                      <span>Highlight:</span>
                      <span className="font-medium text-stone-700 truncate">{selectedItem.data.highlights[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Map Legend Overlay */}
          <div className="absolute top-4 right-4 z-400 bg-white/95 backdrop-blur-md rounded-lg p-2.5 border border-stone-200 shadow-sm hidden sm:block text-xs">
            <div className="font-semibold text-stone-800 mb-1.5 text-[11px] uppercase tracking-wider">Map Pins</div>
            <div className="space-y-1 text-stone-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-800 inline-block" />
                <span>Accommodations ({accommodations.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
                <span>Beaches & Coast</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block" />
                <span>Walks & Trails</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-700 inline-block" />
                <span>Food & Wine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-900 inline-block" />
                <span>Towns</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
