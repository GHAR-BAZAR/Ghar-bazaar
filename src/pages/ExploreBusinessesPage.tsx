import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Store, 
  SlidersHorizontal, 
  Map as MapIcon, 
  LayoutGrid, 
  ArrowRight,
  Sparkles,
  Phone,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BusinessCategory, Store as StoreType } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const ExploreBusinessesPage: React.FC = () => {
  const { stores } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedPinStore, setSelectedPinStore] = useState<StoreType | null>(null);

  const categories = [
    'All',
    'Street Food',
    'Home Kitchen',
    'Pickles & Spices',
    'Handicrafts & Art'
  ];

  const filteredStores = stores.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Simulated map coordinates for realistic Indian locations
  const simulatedCoordinates: Record<string, { x: number; y: number; district: string }> = {
    'maa-ki-rasoi': { x: 62, y: 38, district: 'Indirapuram (Ghaziabad)' },
    'sharma-ji-snacks': { x: 42, y: 32, district: 'Chandni Chowk (Old Delhi)' },
    'ghar-ka-achaar': { x: 78, y: 55, district: 'Boring Road (Patna)' },
    'sakhi-crafts': { x: 30, y: 48, district: 'Sanganer (Jaipur)' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200">
          <Store className="w-3.5 h-3.5 text-gold-500" />
          <span>Discover Authentic Local Bharat</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-forest-950">
          Explore Hyperlocal Businesses & Home Kitchens
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Support street food thelas, mothers cooking from their homes, and rural women artisan collectives. Order directly with zero intermediary markups.
        </p>
      </div>

      <DisclaimerBanner 
        featureName="Hyperlocal Map Discovery"
        backendNeeded="Google Maps Platform / OpenStreetMap Geocoding API and GPS geolocation services"
      />

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sand-200 shadow-soft space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by vendor name, food item, city or market (e.g. Samosa, Delhi, Patna)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-sand-50 rounded-2xl border border-sand-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-forest-600"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-sand-100 p-1 rounded-2xl border border-sand-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'grid'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                viewMode === 'map'
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Simulated Map</span>
            </button>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-forest-800 text-gold-300 shadow-sm'
                  : 'bg-sand-50 text-charcoal-700 hover:bg-sand-100 border border-sand-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SIMULATED MAP VIEW */}
      {viewMode === 'map' ? (
        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-forest-950 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-forest-700" />
                <span>Simulated Hyperlocal Radius Map</span>
              </h3>
              <p className="text-xs text-charcoal-500">
                Click any vendor marker on the interactive radar to view their profile.
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-900 rounded-lg">
              Simulated Radar View
            </span>
          </div>

          {/* Interactive Map Canvas Mockup */}
          <div className="relative h-96 sm:h-[450px] w-full rounded-2xl bg-sand-200/70 border border-sand-300 overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Grid Lines styling */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#174B38_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Central You Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
              <div className="w-4 h-4 rounded-full bg-blue-600 ring-8 ring-blue-400/30 animate-pulse" />
              <span className="text-[10px] font-bold bg-white/90 text-blue-900 px-2 py-0.5 rounded-md shadow mt-1">
                You Are Here (NCR)
              </span>
            </div>

            {/* Vendor Map Pins */}
            {stores.map(store => {
              const coords = simulatedCoordinates[store.id] || { x: 50, y: 40, district: store.city };
              const isSelected = selectedPinStore?.id === store.id;

              return (
                <div
                  key={store.id}
                  style={{ top: `${coords.y}%`, left: `${coords.x}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  onClick={() => setSelectedPinStore(store)}
                >
                  <div className={`p-2 rounded-2xl flex items-center gap-1.5 shadow-lg transition-all ${
                    isSelected 
                      ? 'bg-forest-800 text-white scale-110 ring-4 ring-gold-400' 
                      : 'bg-white text-forest-950 hover:bg-forest-50 hover:scale-105 border border-sand-300'
                  }`}>
                    <img 
                      src={store.logoUrl} 
                      alt={store.name} 
                      className="w-7 h-7 rounded-lg object-cover" 
                    />
                    <div className="text-left hidden sm:block">
                      <div className="font-bold text-[11px] truncate max-w-[110px]">{store.name}</div>
                      <div className="text-[9px] opacity-75">{coords.district}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pop-up Info Card on Map Pin Click */}
            {selectedPinStore && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-white p-4 rounded-2xl shadow-2xl border border-sand-300 z-30 animate-fade-in">
                <div className="flex items-start gap-3">
                  <img 
                    src={selectedPinStore.logoUrl} 
                    alt={selectedPinStore.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-sand-200" 
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-forest-950 truncate">{selectedPinStore.name}</h4>
                    <p className="text-[10px] text-charcoal-500 truncate">{selectedPinStore.location}</p>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-forest-900 mt-1">
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <span>{selectedPinStore.rating} ({selectedPinStore.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-sand-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700">Open & Taking Orders</span>
                  <Link
                    to={`/store/${selectedPinStore.id}`}
                    className="px-3 py-1 bg-forest-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-3 h-3 text-gold-300" />
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredStores.map(store => (
            <div 
              key={store.id}
              className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden hover:shadow-premium transition flex flex-col justify-between group"
            >
              <div>
                {/* Banner & Logo */}
                <div className="relative h-40 w-full overflow-hidden bg-forest-950">
                  <img 
                    src={store.bannerUrl} 
                    alt={store.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" 
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-forest-900/90 text-white text-[10px] font-bold rounded-lg backdrop-blur-xs">
                      {store.category}
                    </span>
                  </div>
                  {store.hygieneCertified && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-3 -mt-10 mb-2 relative z-10">
                    <img 
                      src={store.logoUrl} 
                      alt={store.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md bg-white" 
                    />
                    <div className="min-w-0 flex-1 pt-4">
                      <div className="flex items-center gap-1 text-gold-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        <span>{store.rating} ({store.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-forest-950 group-hover:text-forest-800 transition-colors leading-tight">
                    {store.name}
                  </h3>

                  <p className="text-xs text-charcoal-600 line-clamp-2">
                    {store.tagline}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-charcoal-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
                    <span className="truncate">{store.location}, {store.city}</span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA to Storefront */}
              <div className="p-5 pt-3 border-t border-sand-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-charcoal-400 block">Owner</span>
                  <span className="text-xs font-semibold text-charcoal-800">{store.ownerName}</span>
                </div>

                <Link
                  to={`/store/${store.id}`}
                  className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-300" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
