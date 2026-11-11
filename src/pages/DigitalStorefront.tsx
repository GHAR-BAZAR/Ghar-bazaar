import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Share2, 
  QrCode, 
  Search, 
  Heart, 
  Check, 
  Clock, 
  ChevronRight,
  ArrowLeft,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CartDrawer } from '../components/common/CartDrawer';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { Product } from '../types';

export const DigitalStorefront: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { stores, products, reviews, cart, addToCart, updateCartQuantity, cartCount, cartTotal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  // Match store
  const store = stores.find(s => s.id === storeId) || stores[0];
  const storeProducts = products.filter(p => p.storeId === store.id);
  const storeReviews = reviews.filter(r => r.storeId === store.id);

  // Categories
  const categories = ['All', ...new Set(storeProducts.map(p => p.category))];

  // Filtered Products
  const filteredProducts = storeProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.hindiName && p.hindiName.includes(searchQuery));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesVeg = !vegOnly || p.isVeg;
    return matchesSearch && matchesCategory && matchesVeg;
  });

  const getProductCartQuantity = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: store.name,
        text: `Order fresh from ${store.name} on Ghar Bazaar!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToastText('Store link copied to clipboard!');
      setTimeout(() => setToastText(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 pb-24">
      
      {/* Toast Notification */}
      {toastText && (
        <div className="fixed top-6 right-6 z-50 bg-forest-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-gold-400 animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-gold-300" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Top Banner Navigation for Consumer */}
      <div className="bg-forest-900 text-white py-2 px-4 text-xs flex items-center justify-between">
        <Link to="/explore" className="text-sage-200 hover:text-white flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Browse other local sellers</span>
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsQROpen(true)}
            className="flex items-center gap-1 text-gold-300 hover:text-gold-200 font-semibold"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Store QR</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1 text-sage-200 hover:text-white"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Store Banner Hero */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden bg-forest-950">
        <img 
          src={store.bannerUrl} 
          alt={store.name} 
          className="w-full h-full object-cover opacity-85" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Store Header Info Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-sand-200 shadow-premium">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
            
            <div className="flex items-start gap-4">
              <img 
                src={store.logoUrl} 
                alt={store.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-forest-600 shadow-md shrink-0 bg-sand-100" 
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-black text-xl sm:text-2xl text-forest-950 leading-tight">
                    {store.name}
                  </h1>
                  {store.hygieneCertified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Hygiene Verified</span>
                    </span>
                  )}
                  {store.isSHG && (
                    <span className="px-2 py-0.5 bg-forest-50 text-forest-800 border border-forest-200 rounded-md text-[10px] font-extrabold">
                      Women SHG Collective
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-charcoal-600 font-medium">
                  {store.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest-700" />
                    <span>{store.location}, {store.city}</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-forest-900">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span>{store.rating} ({store.reviewCount} customer reviews)</span>
                  </span>
                  <span className="text-[11px] text-charcoal-400">
                    Est. {store.establishedYear}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <a
                href={`https://wa.me/${store.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${store.name}! I am browsing your storefront on Ghar Bazaar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsQROpen(true)}
                className="flex-1 sm:flex-none px-4 py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-sand-300 transition"
              >
                <QrCode className="w-4 h-4 text-forest-800" />
                <span>Scan QR / UPI</span>
              </button>
            </div>

          </div>

          {/* Vendor Story */}
          <div className="mt-5 pt-4 border-t border-sand-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-1">
              About The Vendor & Our Story
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              {store.story}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-sand-200 shadow-soft space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search items by name or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-sand-50 rounded-xl border border-sand-200 text-xs sm:text-sm focus:outline-none focus:border-forest-600"
              />
            </div>

            {/* Veg toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition shrink-0 ${
                vegOnly 
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800' 
                  : 'bg-sand-50 border-sand-300 text-charcoal-600'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${vegOnly ? 'bg-emerald-600 ring-2 ring-emerald-200' : 'bg-emerald-700'}`} />
              <span>Pure Veg Only</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-forest-800 text-white shadow-xs'
                    : 'bg-sand-100 hover:bg-sand-200 text-charcoal-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-forest-950">
              {selectedCategory === 'All' ? 'Full Menu & Catalog' : selectedCategory}
            </h3>
            <span className="text-xs text-charcoal-500 font-medium">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sand-200">
              <ShoppingBag className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
              <h4 className="font-bold text-charcoal-700">No items found matching your filters</h4>
              <p className="text-xs text-charcoal-400 mt-1">Try clearing search or veg filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map(product => {
                const qty = getProductCartQuantity(product.id);
                const isAvailable = product.status === 'available';

                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-premium transition group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative h-44 w-full bg-sand-200 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        
                        {/* Veg/Non-veg indicator */}
                        <div className="absolute top-2.5 left-2.5 p-1 bg-white/95 rounded-md shadow-sm">
                          <div className={`w-3 h-3 rounded-full ${product.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-2.5 right-2.5">
                          {product.status === 'available' ? (
                            <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-extrabold rounded-md shadow">
                              Fresh Made
                            </span>
                          ) : product.status === 'sold_out' ? (
                            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-extrabold rounded-md shadow">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-extrabold rounded-md shadow">
                              Tomorrow Only
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm sm:text-base text-forest-950 leading-snug">
                            {product.name}
                          </h4>
                        </div>

                        {product.hindiName && (
                          <p className="text-xs font-semibold text-forest-800">
                            {product.hindiName}
                          </p>
                        )}

                        <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {product.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-medium px-1.5 py-0.5 bg-sand-100 text-charcoal-600 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & Add to Cart button */}
                    <div className="p-4 pt-2 border-t border-sand-100 flex items-center justify-between">
                      <div>
                        <div className="text-base sm:text-lg font-black text-forest-950">
                          ₹{product.price}
                        </div>
                        <div className="text-[10px] text-charcoal-400">
                          per {product.unit}
                        </div>
                      </div>

                      {/* Add Button / Counter */}
                      {!isAvailable ? (
                        <span className="text-xs text-charcoal-400 font-semibold italic">
                          Unavailable
                        </span>
                      ) : qty > 0 ? (
                        <div className="flex items-center bg-forest-800 text-white rounded-xl p-1 shadow-sm">
                          <button
                            onClick={() => updateCartQuantity(product.id, qty - 1)}
                            className="p-1 hover:bg-forest-700 rounded-lg transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(product.id, qty + 1)}
                            className="p-1 hover:bg-forest-700 rounded-lg transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition transform active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5 text-gold-300" />
                          <span>Add to Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg text-forest-950">Customer Reviews & Ratings</h3>
              <p className="text-xs text-charcoal-500">Verified feedback from local neighborhood customers</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sand-100 rounded-xl text-sm font-bold text-forest-900">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span>{store.rating} / 5.0</span>
            </div>
          </div>

          <div className="divide-y divide-sand-200">
            {storeReviews.map(rev => (
              <div key={rev.id} className="py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-forest-950">{rev.customerName}</h5>
                    <div className="flex items-center gap-1 text-gold-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-charcoal-400">{rev.date}</span>
                </div>
                
                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.vendorReply && (
                  <div className="p-2.5 bg-forest-50 rounded-xl border border-forest-200 text-xs text-forest-900 font-medium ml-3">
                    <span className="font-bold block text-[10px] uppercase text-forest-800">Vendor Reply:</span>
                    {rev.vendorReply}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Bottom Cart Bar for Consumers */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto animate-fade-in">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-sm">
                {cartCount}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-emerald-100">Order in Progress</div>
                <div className="text-sm font-extrabold">₹{cartTotal} Total</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm bg-white/20 px-3 py-1.5 rounded-xl">
              <span>View Cart & WhatsApp Order</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        store={store}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* QR Code Standee Modal */}
      <QRCodeModal
        store={store}
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />

    </div>
  );
};
