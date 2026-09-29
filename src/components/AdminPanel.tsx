import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  MapPin, 
  Check, 
  Download, 
  Upload, 
  HelpCircle, 
  ShieldCheck, 
  Bed, 
  Building,
  Key,
  Database,
  Compass,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Accommodation, PointOfInterest, CategoryType, AffiliateSettings, TripInspirationModule } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    accommodations,
    pointsOfInterest,
    affiliateSettings,
    tripInspiration,
    addAccommodation,
    updateAccommodation,
    deleteAccommodation,
    addPoi,
    updatePoi,
    deletePoi,
    updateAffiliateSettings,
    updateTripInspiration,
    resetToDefaults,
    exportDataJson,
    importDataJson,
    buildBookingUrl,
  } = useData();

  const [activeTab, setActiveTab] = useState<'stays' | 'pois' | 'affiliate' | 'tripInspiration' | 'backup'>('stays');

  // Trip Inspiration Form State
  const [tripForm, setTripForm] = useState<TripInspirationModule>(tripInspiration);
  const [tripSavedNotice, setTripSavedNotice] = useState<boolean>(false);

  // Edit Accommodation State
  const [editingStay, setEditingStay] = useState<Accommodation | null>(null);
  const [isAddingStay, setIsAddingStay] = useState<boolean>(false);

  // Edit POI State
  const [editingPoi, setEditingPoi] = useState<PointOfInterest | null>(null);
  const [isAddingPoi, setIsAddingPoi] = useState<boolean>(false);

  // Affiliate Config Form State
  const [aidInput, setAidInput] = useState<string>(affiliateSettings.affiliateId);
  const [labelInput, setLabelInput] = useState<string>(affiliateSettings.labelPrefix);
  const [currencyInput, setCurrencyInput] = useState<string>(affiliateSettings.defaultCurrency);
  const [affiliateSavedNotice, setAffiliateSavedNotice] = useState<boolean>(false);

  // Test Link Preview State
  const [testStayId, setTestStayId] = useState<string>(accommodations[0]?.id || '');
  const [testCheckIn, setTestCheckIn] = useState<string>('2026-10-09');
  const [testCheckOut, setTestCheckOut] = useState<string>('2026-10-11');
  const [testGuests, setTestGuests] = useState<number>(2);

  // Import JSON State
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Affiliate Save
  const handleSaveAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    updateAffiliateSettings({
      affiliateId: aidInput.trim(),
      labelPrefix: labelInput.trim(),
      defaultCurrency: currencyInput.trim(),
      partnerProgramUrl: affiliateSettings.partnerProgramUrl,
    });
    setAffiliateSavedNotice(true);
    setTimeout(() => setAffiliateSavedNotice(false), 3000);
  };

  // Handle Trip Inspiration Form Save
  const handleSaveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    updateTripInspiration(tripForm);
    setTripSavedNotice(true);
    setTimeout(() => setTripSavedNotice(false), 3000);
  };

  // Handle Accommodation Form Save
  const handleSaveStay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStay) return;

    if (isAddingStay) {
      addAccommodation(editingStay);
    } else {
      updateAccommodation(editingStay);
    }
    setEditingStay(null);
    setIsAddingStay(false);
  };

  // Start New Stay
  const handleStartAddStay = () => {
    const newId = `stay-${Date.now()}`;
    setEditingStay({
      id: newId,
      name: 'New Prom Coast Retreat',
      tagline: 'Scenic coastal holiday stay',
      town: 'Fish Creek',
      subregion: 'Prom Coast Hinterland',
      type: 'Luxury Eco Villa',
      pricePerNight: 350,
      rating: 9.5,
      reviewCount: 12,
      sleeps: 4,
      bedrooms: 2,
      bathrooms: 1,
      image: '/images/stay_coastal_villa_1790665632480.jpg',
      description: 'Describe this South Gippsland accommodation...',
      features: ['Ocean views', 'Fireplace', 'Modern kitchen'],
      distanceToPromGate: '25 mins drive',
      distanceToBeach: '10 mins drive',
      lat: -38.6853,
      lng: 146.0792,
      bookingComQuery: {
        destType: 'hotel',
        destId: newId,
        hotelName: 'New Prom Coast Retreat Fish Creek',
      },
      featured: false,
    });
    setIsAddingStay(true);
  };

  // Handle POI Save
  const handleSavePoi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPoi) return;

    if (isAddingPoi) {
      addPoi(editingPoi);
    } else {
      updatePoi(editingPoi);
    }
    setEditingPoi(null);
    setIsAddingPoi(false);
  };

  const handleStartAddPoi = () => {
    const newId = `poi-${Date.now()}`;
    setEditingPoi({
      id: newId,
      name: 'New South Gippsland Attraction',
      category: 'beach',
      town: 'Sandy Point',
      lat: -38.8340,
      lng: 146.1264,
      image: '/images/prom_squeaky_beach_1790665642630.jpg',
      shortDesc: 'A short description of this scenic spot.',
      fullDesc: 'Full in-depth description for visitors...',
      highlights: ['Scenic view', 'Great for families'],
      tips: 'Best visited at low tide.',
      durationOrTime: '1 - 2 hours',
    });
    setIsAddingPoi(true);
  };

  // Handle Export Download
  const handleDownloadBackup = () => {
    const json = exportDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `promcoast-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Import
  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importDataJson(importJsonText);
    if (success) {
      setImportStatus('Data successfully imported and saved!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus('Error: Invalid JSON format. Please check the structure.');
    }
  };

  // Get test stay for link tester
  const currentTestStay = accommodations.find((s) => s.id === testStayId) || accommodations[0];
  const generatedTestUrl = currentTestStay 
    ? buildBookingUrl(currentTestStay, testCheckIn, testCheckOut, testGuests, 1)
    : '';

  return (
    <div className="fixed inset-0 z-60 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-4">
        
        {/* Header Bar */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-serif text-lg font-bold">
                Prom Coast Partner & Content Control Center
              </h2>
              <div className="text-[11px] text-stone-400">
                Manage accommodations, interactive map coordinates, and Booking.com affiliate settings
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Close Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => { setActiveTab('stays'); setEditingStay(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stays' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bed className="w-3.5 h-3.5 text-emerald-700" />
            <span>Accommodations ({accommodations.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('pois'); setEditingPoi(null); }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pois' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Map Highlights & POIs ({pointsOfInterest.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'affiliate' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-sky-700" />
            <span>Booking.com Affiliate Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('tripInspiration')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tripInspiration' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Trip Inspiration (3-Step Module)</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'backup' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-stone-700" />
            <span>Data Sync & Backup</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          
          {/* TAB 1: ACCOMMODATIONS */}
          {activeTab === 'stays' && (
            <div>
              {!editingStay ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Managed Accommodations
                      </h3>
                      <p className="text-stone-500 text-xs">
                        All properties shown on the homepage, booking engines, and interactive map pins.
                      </p>
                    </div>

                    <button
                      onClick={handleStartAddStay}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Accommodation</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="py-2.5 px-3">Stay</th>
                          <th className="py-2.5 px-3">Town</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Night Rate</th>
                          <th className="py-2.5 px-3">Sleeps</th>
                          <th className="py-2.5 px-3">Map Coords</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {accommodations.map((stay) => (
                          <tr key={stay.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={stay.image}
                                  alt={stay.name}
                                  className="w-10 h-10 rounded-md object-cover bg-stone-100 shrink-0"
                                />
                                <div>
                                  <div className="font-semibold text-stone-900">{stay.name}</div>
                                  <div className="text-[11px] text-stone-400 line-clamp-1">{stay.tagline}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-medium text-stone-800">{stay.town}</td>
                            <td className="py-3 px-3">{stay.type}</td>
                            <td className="py-3 px-3 font-mono font-bold text-stone-900">${stay.pricePerNight} AUD</td>
                            <td className="py-3 px-3">{stay.sleeps} guests ({stay.bedrooms}b/{stay.bathrooms}b)</td>
                            <td className="py-3 px-3 font-mono text-[11px] text-stone-500">
                              {stay.lat.toFixed(3)}, {stay.lng.toFixed(3)}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => { setEditingStay(stay); setIsAddingStay(false); }}
                                  className="p-1.5 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors"
                                  title="Edit Property"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${stay.name}"?`)) {
                                      deleteAccommodation(stay.id);
                                    }
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                                  title="Delete Property"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* EDIT / ADD STAY FORM */
                <form onSubmit={handleSaveStay} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {isAddingStay ? 'Add New Accommodation' : `Edit: ${editingStay.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingStay(null)}
                      className="text-stone-500 hover:text-stone-800 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Accommodation Name</label>
                      <input
                        type="text"
                        required
                        value={editingStay.name}
                        onChange={(e) => setEditingStay({ ...editingStay, name: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Town / Location</label>
                      <select
                        value={editingStay.town}
                        onChange={(e) => setEditingStay({ ...editingStay, town: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      >
                        <option value="Fish Creek">Fish Creek</option>
                        <option value="Sandy Point">Sandy Point</option>
                        <option value="Foster">Foster</option>
                        <option value="Meeniyan">Meeniyan</option>
                        <option value="Walkerville">Walkerville</option>
                        <option value="Wilsons Promontory">Wilsons Promontory</option>
                        <option value="Inverloch">Inverloch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Property Type</label>
                      <select
                        value={editingStay.type}
                        onChange={(e) => setEditingStay({ ...editingStay, type: e.target.value as any })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      >
                        <option value="Luxury Eco Villa">Luxury Eco Villa</option>
                        <option value="Coastal Beach House">Coastal Beach House</option>
                        <option value="Boutique B&B">Boutique B&B</option>
                        <option value="Glamping & Farm Stay">Glamping & Farm Stay</option>
                        <option value="Lodge & Cottage">Lodge & Cottage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Nightly Rate ($ AUD)</label>
                      <input
                        type="number"
                        min="50"
                        required
                        value={editingStay.pricePerNight}
                        onChange={(e) => setEditingStay({ ...editingStay, pricePerNight: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingStay.tagline}
                        onChange={(e) => setEditingStay({ ...editingStay, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Image URL or Local Path</label>
                      <input
                        type="text"
                        value={editingStay.image}
                        onChange={(e) => setEditingStay({ ...editingStay, image: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Sleeps</label>
                        <input
                          type="number"
                          min="1"
                          value={editingStay.sleeps}
                          onChange={(e) => setEditingStay({ ...editingStay, sleeps: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Bedrooms</label>
                        <input
                          type="number"
                          min="1"
                          value={editingStay.bedrooms}
                          onChange={(e) => setEditingStay({ ...editingStay, bedrooms: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Bathrooms</label>
                        <input
                          type="number"
                          min="1"
                          value={editingStay.bathrooms}
                          onChange={(e) => setEditingStay({ ...editingStay, bathrooms: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Latitude (e.g. -38.705)</label>
                        <input
                          type="number"
                          step="0.0001"
                          required
                          value={editingStay.lat}
                          onChange={(e) => setEditingStay({ ...editingStay, lat: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-700 mb-1">Longitude (e.g. 146.095)</label>
                        <input
                          type="number"
                          step="0.0001"
                          required
                          value={editingStay.lng}
                          onChange={(e) => setEditingStay({ ...editingStay, lng: parseFloat(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingStay.description}
                      onChange={(e) => setEditingStay({ ...editingStay, description: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                    <label className="block font-semibold text-amber-950 mb-1">
                      Booking.com Target Name / Search Term
                    </label>
                    <p className="text-[11px] text-stone-600 mb-2">
                      This is the exact hotel title sent to Booking.com. When visitors book, Booking.com matches this title and credits your Affiliate ID.
                    </p>
                    <input
                      type="text"
                      value={editingStay.bookingComQuery.hotelName}
                      onChange={(e) => setEditingStay({
                        ...editingStay,
                        bookingComQuery: { ...editingStay.bookingComQuery, hotelName: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingStay(null)}
                      className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg font-semibold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Accommodation</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: POINTS OF INTEREST */}
          {activeTab === 'pois' && (
            <div>
              {!editingPoi ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        Points of Interest & Attractions
                      </h3>
                      <p className="text-stone-500 text-xs">
                        Pristine beaches, hiking trails, cellar doors, and attractions plotted on the South Gippsland map.
                      </p>
                    </div>

                    <button
                      onClick={handleStartAddPoi}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Point of Interest</span>
                    </button>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Town</th>
                          <th className="py-2.5 px-3">Coordinates</th>
                          <th className="py-2.5 px-3">Duration</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-stone-700">
                        {pointsOfInterest.map((poi) => (
                          <tr key={poi.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3 px-3 font-semibold text-stone-900">{poi.name}</td>
                            <td className="py-3 px-3 capitalize">
                              <span className="font-medium text-amber-800">{poi.category}</span>
                            </td>
                            <td className="py-3 px-3">{poi.town}</td>
                            <td className="py-3 px-3 font-mono text-stone-500 text-[11px]">
                              {poi.lat.toFixed(3)}, {poi.lng.toFixed(3)}
                            </td>
                            <td className="py-3 px-3 text-stone-500">{poi.durationOrTime || 'N/A'}</td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => { setEditingPoi(poi); setIsAddingPoi(false); }}
                                  className="p-1.5 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-md transition-colors"
                                  title="Edit POI"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete "${poi.name}"?`)) deletePoi(poi.id);
                                  }}
                                  className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                                  title="Delete POI"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* EDIT POI FORM */
                <form onSubmit={handleSavePoi} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {isAddingPoi ? 'Add New Point of Interest' : `Edit: ${editingPoi.name}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingPoi(null)}
                      className="text-stone-500 hover:text-stone-800 px-3 py-1 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Spot Name</label>
                      <input
                        type="text"
                        required
                        value={editingPoi.name}
                        onChange={(e) => setEditingPoi({ ...editingPoi, name: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Category</label>
                      <select
                        value={editingPoi.category}
                        onChange={(e) => setEditingPoi({ ...editingPoi, category: e.target.value as CategoryType })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      >
                        <option value="beach">Beach & Coast</option>
                        <option value="walk">Walk & Hike</option>
                        <option value="food">Food & Wine</option>
                        <option value="attraction">Attraction & Wildlife</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Town</label>
                      <input
                        type="text"
                        value={editingPoi.town}
                        onChange={(e) => setEditingPoi({ ...editingPoi, town: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Image URL or Local Path</label>
                      <input
                        type="text"
                        value={editingPoi.image}
                        onChange={(e) => setEditingPoi({ ...editingPoi, image: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Latitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={editingPoi.lat}
                        onChange={(e) => setEditingPoi({ ...editingPoi, lat: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Longitude</label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={editingPoi.lng}
                        onChange={(e) => setEditingPoi({ ...editingPoi, lng: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Short Description</label>
                    <input
                      type="text"
                      value={editingPoi.shortDesc}
                      onChange={(e) => setEditingPoi({ ...editingPoi, shortDesc: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingPoi.fullDesc}
                      onChange={(e) => setEditingPoi({ ...editingPoi, fullDesc: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Local Tip</label>
                    <input
                      type="text"
                      value={editingPoi.tips || ''}
                      onChange={(e) => setEditingPoi({ ...editingPoi, tips: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingPoi(null)}
                      className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Point of Interest</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: BOOKING.COM AFFILIATE SETUP */}
          {activeTab === 'affiliate' && (
            <div className="space-y-6">
              
              {/* Educational Explanation Box */}
              <div className="bg-stone-900 text-stone-200 p-5 rounded-xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>How Booking.com Affiliate Revenue & Tracking Works</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-xs">
                  Booking.com operates an affiliate programme where travel site creators earn commission (typically <b>25% to 40%</b> of Booking.com's margin on each booking).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-stone-400">
                  <div className="bg-stone-800/80 p-2.5 rounded-lg border border-stone-700">
                    <span className="font-semibold text-white block mb-0.5">1. Affiliate ID (AID)</span>
                    Your numeric identifier from Booking.com Partner Centre (e.g. <code>304142</code> or your account ID).
                  </div>
                  <div className="bg-stone-800/80 p-2.5 rounded-lg border border-stone-700">
                    <span className="font-semibold text-white block mb-0.5">2. Tracking Label</span>
                    Prefix attached to every click so your Booking.com reports show which specific villa or page converted.
                  </div>
                  <div className="bg-stone-800/80 p-2.5 rounded-lg border border-stone-700">
                    <span className="font-semibold text-white block mb-0.5">3. Cookie Attribution</span>
                    Standard 30-day attribution window. If a user explores and books, you receive commission automatically.
                  </div>
                </div>
              </div>

              {/* Affiliate Settings Form */}
              <form onSubmit={handleSaveAffiliate} className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Configure Your Booking.com Credentials
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Affiliate Partner ID (aid)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 304142 or 1234567"
                      value={aidInput}
                      onChange={(e) => setAidInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                    <div className="text-[11px] text-stone-500 mt-1">Found in your Booking.com partner portal.</div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Tracking Label Prefix (label)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. promcoast_stay"
                      value={labelInput}
                      onChange={(e) => setLabelInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                    <div className="text-[11px] text-stone-500 mt-1">Appears in your performance breakdown.</div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Default Currency
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="AUD"
                      value={currencyInput}
                      onChange={(e) => setCurrencyInput(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono"
                    />
                    <div className="text-[11px] text-stone-500 mt-1">Default currency for rates (AUD).</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {affiliateSavedNotice ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Settings saved! All on-site booking buttons updated immediately.</span>
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Affiliate Credentials</span>
                  </button>
                </div>
              </form>

              {/* LIVE LINK TESTER & PREVIEW */}
              <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    Live Booking Link Generator & Tester
                  </h4>
                  <span className="text-stone-400 text-[11px]">Real-time link simulator</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Select Property</label>
                    <select
                      value={testStayId}
                      onChange={(e) => setTestStayId(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                    >
                      {accommodations.map((s) => (
                        <option key={s.id} value={s.id}>{s.name} ({s.town})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={testCheckIn}
                      onChange={(e) => setTestCheckIn(e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={testCheckOut}
                      onChange={(e) => setTestCheckOut(e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Guests</label>
                    <select
                      value={testGuests}
                      onChange={(e) => setTestGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Generated Tracking URL:</label>
                  <div className="p-3 bg-stone-900 text-amber-300 font-mono text-[11px] rounded-lg break-all select-all border border-stone-800">
                    {generatedTestUrl}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-stone-500">
                    Contains <code>aid={affiliateSettings.affiliateId}</code>, <code>label={affiliateSettings.labelPrefix}_{currentTestStay?.id}</code>, dates & guests.
                  </div>
                  <a
                    href={generatedTestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-950 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Test Link in Booking.com</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                </div>
              </div>

            </div>
          )}

          {/* TAB: TRIP INSPIRATION (3-STEP MODULE SETTINGS) */}
          {activeTab === 'tripInspiration' && (
            <div className="space-y-6">
              
              <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm mb-1">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>3-Step Trip Inspiration Module Settings</span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Customize the headline, subtitle, and all 3 seasonal trip steps shown in the "Trip Inspiration" section on the homepage. Change any destination, highlights, and description to match current road-trip recommendations.
                </p>
              </div>

              <form onSubmit={handleSaveTrip} className="space-y-6">
                
                {/* Module Section Titles */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4 shadow-xs">
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    Section Headings
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Section Title</label>
                      <input
                        type="text"
                        required
                        value={tripForm.sectionTitle}
                        onChange={(e) => setTripForm({ ...tripForm, sectionTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">Section Subtitle</label>
                      <input
                        type="text"
                        required
                        value={tripForm.sectionSubtitle}
                        onChange={(e) => setTripForm({ ...tripForm, sectionSubtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Step Cards Config */}
                <div className="space-y-4">
                  {tripForm.steps.map((step, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                        <span className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white inline-flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span>Step {idx + 1} Configuration</span>
                        </span>
                        <span className="text-[11px] text-stone-400">Step {idx + 1} of 3</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Badge Text</label>
                          <input
                            type="text"
                            value={step.badge}
                            onChange={(e) => {
                              const newSteps = [...tripForm.steps];
                              newSteps[idx] = { ...newSteps[idx], badge: e.target.value };
                              setTripForm({ ...tripForm, steps: newSteps });
                            }}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Step Headline</label>
                          <input
                            type="text"
                            required
                            value={step.title}
                            onChange={(e) => {
                              const newSteps = [...tripForm.steps];
                              newSteps[idx] = { ...newSteps[idx], title: e.target.value };
                              setTripForm({ ...tripForm, steps: newSteps });
                            }}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Subtitle / Town Focus</label>
                          <input
                            type="text"
                            value={step.subtitle}
                            onChange={(e) => {
                              const newSteps = [...tripForm.steps];
                              newSteps[idx] = { ...newSteps[idx], subtitle: e.target.value };
                              setTripForm({ ...tripForm, steps: newSteps });
                            }}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium text-stone-700 mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={step.description}
                            onChange={(e) => {
                              const newSteps = [...tripForm.steps];
                              newSteps[idx] = { ...newSteps[idx], description: e.target.value };
                              setTripForm({ ...tripForm, steps: newSteps });
                            }}
                            className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <div>
                            <label className="block font-medium text-stone-700 mb-1">Recommended Base Town</label>
                            <input
                              type="text"
                              value={step.recommendedTown || ''}
                              onChange={(e) => {
                                const newSteps = [...tripForm.steps];
                                newSteps[idx] = { ...newSteps[idx], recommendedTown: e.target.value };
                                setTripForm({ ...tripForm, steps: newSteps });
                              }}
                              className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-stone-700 mb-1">Card Image Path / URL</label>
                            <input
                              type="text"
                              value={step.image || ''}
                              onChange={(e) => {
                                const newSteps = [...tripForm.steps];
                                newSteps[idx] = { ...newSteps[idx], image: e.target.value };
                                setTripForm({ ...tripForm, steps: newSteps });
                              }}
                              className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-stone-700 mb-1">
                          Key Highlights (comma-separated):
                        </label>
                        <input
                          type="text"
                          value={step.highlights ? step.highlights.join(', ') : ''}
                          onChange={(e) => {
                            const newSteps = [...tripForm.steps];
                            newSteps[idx] = {
                              ...newSteps[idx],
                              highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                            };
                            setTripForm({ ...tripForm, steps: newSteps });
                          }}
                          placeholder="e.g. Squeaky Beach quartz stroll, Mount Oberon summit, Wombat spotting"
                          className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-2">
                  {tripSavedNotice ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1.5 text-xs">
                      <Check className="w-4 h-4" />
                      <span>Trip inspiration updated! Changes are live on the homepage.</span>
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save 3-Step Trip Inspiration Module</span>
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* TAB 4: BACKUP & DATA SYNC */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              
              {/* Map Diagnostic */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                <h4 className="font-serif text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-800" />
                  <span>Map Coordinate Diagnostic Check</span>
                </h4>
                <p className="text-stone-600 mb-3 text-xs">
                  Verifies that all accommodation and POI pin coordinates fall inside the South Gippsland regional bounding box (Latitude -39.3° to -38.4°, Longitude 145.4° to 146.9°).
                </p>

                <div className="space-y-1.5">
                  {accommodations.map((stay) => {
                    const validLat = stay.lat >= -39.3 && stay.lat <= -38.4;
                    const validLng = stay.lng >= 145.4 && stay.lng <= 146.9;
                    const isValid = validLat && validLng;
                    return (
                      <div key={stay.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-stone-200 text-xs">
                        <span className="font-medium text-stone-900">{stay.name} ({stay.town})</span>
                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span>{stay.lat}, {stay.lng}</span>
                          {isValid ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Valid
                            </span>
                          ) : (
                            <span className="text-rose-600 font-semibold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Out of bounds
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Export / Import */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Export */}
                <div className="bg-white p-5 rounded-xl border border-stone-200 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-800" />
                      <span>Export Site Data (JSON)</span>
                    </h4>
                    <p className="text-stone-600 mb-4 text-xs leading-relaxed">
                      Download a single JSON file containing all your accommodations, points of interest, and affiliate settings for backup or migration to production.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadBackup}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-950 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import */}
                <div className="bg-white p-5 rounded-xl border border-stone-200">
                  <h4 className="font-serif text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-amber-700" />
                    <span>Import Site Data (JSON)</span>
                  </h4>
                  <p className="text-stone-600 mb-2 text-xs">
                    Paste JSON content below to restore or bulk-load data:
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Paste JSON here..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono text-[11px] mb-3"
                  />
                  {importStatus && (
                    <div className="text-xs font-medium text-emerald-700 mb-2">{importStatus}</div>
                  )}
                  <button
                    onClick={handleImportSubmit}
                    disabled={!importJsonText.trim()}
                    className="w-full py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Import & Overwrite Live Data
                  </button>
                </div>

              </div>

              {/* Reset to Factory Defaults */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900">Reset to Defaults</div>
                  <div className="text-stone-500 text-xs">
                    Revert all accommodations and POIs back to initial South Gippsland data.
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all data back to defaults?')) {
                      resetToDefaults();
                      alert('Data has been reset to defaults.');
                    }
                  }}
                  className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
