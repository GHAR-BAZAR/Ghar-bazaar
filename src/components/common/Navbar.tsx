import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Store as StoreIcon, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles, 
  Globe, 
  User, 
  ChevronDown,
  Layers,
  Search,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, Language } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    stores, 
    currentStoreId, 
    setCurrentStoreId, 
    currentStore, 
    userRole, 
    setUserRole, 
    userLanguage, 
    setUserLanguage,
    cartCount,
    isAuthenticated,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isStorefront = location.pathname.startsWith('/store/');
  const isDashboardArea = [
    '/dashboard', 
    '/generator', 
    '/inventory', 
    '/pricing', 
    '/sales', 
    '/shg', 
    '/reviews', 
    '/credit'
  ].some(path => location.pathname.startsWith(path));

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hinglish', label: 'Hinglish', native: 'Hinglish' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-gold-300 font-extrabold shadow-md group-hover:scale-105 transition-transform">
                <StoreIcon className="w-5 h-5 text-gold-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight text-forest-900 leading-none">
                  Ghar<span className="text-gold-500 font-semibold ml-1">Bazaar</span>
                </span>
                <span className="text-[10px] text-charcoal-500 font-medium tracking-wide">
                  Speak Once, Ready to Sell
                </span>
              </div>
            </Link>

            {/* In Vendor Mode: Quick Store Switcher */}
            {isDashboardArea && (
              <div className="relative hidden md:block ml-4">
                <button
                  onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-sand-100 hover:bg-sand-200 text-forest-900 rounded-xl border border-sand-300 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate max-w-[140px]">{currentStore.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
                </button>

                {storeDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-sand-200 py-2 z-50 animate-fade-in">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
                      Switch Demo Store
                    </div>
                    {stores.map(store => (
                      <button
                        key={store.id}
                        onClick={() => {
                          setCurrentStoreId(store.id);
                          setStoreDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sand-100 transition ${
                          currentStoreId === store.id ? 'bg-forest-50 font-bold text-forest-800' : 'text-charcoal-700'
                        }`}
                      >
                        <div>
                          <div>{store.name}</div>
                          <div className="text-[10px] text-charcoal-400">{store.category} • {store.city}</div>
                        </div>
                        {currentStoreId === store.id && <Check className="w-3.5 h-3.5 text-forest-800" />}
                      </button>
                    ))}
                    <div className="border-t border-sand-200 mt-2 pt-2 px-2">
                      <Link
                        to="/generator"
                        onClick={() => setStoreDropdownOpen(false)}
                        className="w-full py-1.5 px-2 text-xs text-center font-bold text-forest-800 bg-sand-100 hover:bg-forest-100 rounded-lg flex items-center justify-center gap-1.5 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                        <span>+ Generate New AI Store</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition ${
                location.pathname === '/' ? 'text-forest-800 font-semibold' : 'text-charcoal-600 hover:text-forest-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-sm font-medium transition flex items-center gap-1.5 ${
                location.pathname === '/explore' ? 'text-forest-800 font-semibold' : 'text-charcoal-600 hover:text-forest-800'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-gold-500" />
              <span>Explore Businesses</span>
            </Link>
            <a 
              href="/#how-it-works" 
              className="text-sm font-medium text-charcoal-600 hover:text-forest-800 transition"
            >
              How It Works
            </a>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition flex items-center gap-1 ${
                isDashboardArea ? 'text-forest-800 font-bold' : 'text-charcoal-600 hover:text-forest-800'
              }`}
            >
              <span>Vendor Dashboard</span>
            </Link>
          </div>

          {/* Right Tools & Role Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-sand-300 text-xs font-semibold text-charcoal-700 hover:bg-sand-100 transition"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-forest-700" />
                <span>{languages.find(l => l.code === userLanguage)?.native || 'हिन्दी'}</span>
                <ChevronDown className="w-3 h-3 text-charcoal-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-sand-200 py-1.5 z-50 animate-fade-in">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setUserLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-sand-100 transition ${
                        userLanguage === lang.code ? 'font-bold text-forest-800 bg-forest-50' : 'text-charcoal-700'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-charcoal-400">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Persona Switcher Pill */}
            <div className="hidden sm:flex items-center p-1 bg-sand-200 rounded-xl text-xs font-medium text-charcoal-600">
              <button
                onClick={() => {
                  setUserRole('vendor');
                  if (location.pathname === '/') navigate('/dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  userRole === 'vendor' ? 'bg-forest-800 text-white font-semibold shadow-sm' : 'hover:text-charcoal-900'
                }`}
              >
                Vendor
              </button>
              <button
                onClick={() => {
                  setUserRole('customer');
                  if (isDashboardArea) navigate(`/store/${currentStoreId}`);
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  userRole === 'customer' ? 'bg-forest-800 text-white font-semibold shadow-sm' : 'hover:text-charcoal-900'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setUserRole('shg_member');
                  navigate('/shg');
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  userRole === 'shg_member' ? 'bg-forest-800 text-white font-semibold shadow-sm' : 'hover:text-charcoal-900'
                }`}
              >
                SHG
              </button>
            </div>

            {/* Main CTA */}
            {isDashboardArea ? (
              <Link
                to={`/store/${currentStoreId}`}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-md transition"
              >
                <StoreIcon className="w-3.5 h-3.5 text-gold-300" />
                <span>View Storefront</span>
              </Link>
            ) : (
              <Link
                to="/generator"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition group"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-300 group-hover:rotate-12 transition-transform" />
                <span>Create My Store</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-600 hover:text-forest-800 hover:bg-sand-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sand-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between p-2 bg-sand-100 rounded-xl">
            <span className="text-xs font-semibold text-charcoal-600">Active View Mode:</span>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => {
                  setUserRole('vendor');
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className={`px-2 py-1 rounded-md ${userRole === 'vendor' ? 'bg-forest-800 text-white font-bold' : 'text-charcoal-700'}`}
              >
                Vendor
              </button>
              <button
                onClick={() => {
                  setUserRole('customer');
                  setMobileMenuOpen(false);
                  navigate('/explore');
                }}
                className={`px-2 py-1 rounded-md ${userRole === 'customer' ? 'bg-forest-800 text-white font-bold' : 'text-charcoal-700'}`}
              >
                Customer
              </button>
              <button
                onClick={() => {
                  setUserRole('shg_member');
                  setMobileMenuOpen(false);
                  navigate('/shg');
                }}
                className={`px-2 py-1 rounded-md ${userRole === 'shg_member' ? 'bg-forest-800 text-white font-bold' : 'text-charcoal-700'}`}
              >
                SHG
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/generator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-forest-800 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>AI Store Generator</span>
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-sand-200 text-forest-900 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <StoreIcon className="w-3.5 h-3.5 text-forest-800" />
              <span>Vendor Dashboard</span>
            </Link>
          </div>

          <div className="divide-y divide-sand-100 text-sm font-medium pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              Home Page
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              Explore Local Businesses
            </Link>
            <Link
              to={`/store/${currentStoreId}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              View Public Store ({currentStore.name})
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              Pricing Assistant Calculator
            </Link>
            <Link
              to="/credit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              Credit Readiness & Micro-Loans
            </Link>
            <Link
              to="/shg"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              SHG Collective Management
            </Link>
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-charcoal-800 hover:text-forest-800"
            >
              Login / Switch Mobile Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
