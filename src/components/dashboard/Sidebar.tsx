import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Package, 
  Calculator, 
  IndianRupee, 
  Users2, 
  Star, 
  TrendingUp, 
  ExternalLink,
  Store,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentStore } = useApp();

  const navItems = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/generator', label: 'AI Store Generator', icon: Sparkles, badge: 'Voice' },
    { to: '/inventory', label: 'Inventory & Stock', icon: Package },
    { to: '/pricing', label: 'Pricing Assistant', icon: Calculator },
    { to: '/sales', label: 'Sales & UPI Tracker', icon: IndianRupee },
    { to: '/shg', label: 'SHG Management', icon: Users2, badge: 'SHG' },
    { to: '/reviews', label: 'Reviews & Feedback', icon: Star },
    { to: '/credit', label: 'Credit Readiness', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-forest-900 text-white shrink-0 hidden md:flex flex-col justify-between border-r border-forest-950 min-h-[calc(100vh-4rem)]">
      
      {/* Top Section */}
      <div className="p-4 space-y-6">
        
        {/* Active Store Card */}
        <div className="p-3 bg-forest-800/80 rounded-2xl border border-forest-700/60 flex items-center gap-3">
          <img 
            src={currentStore.logoUrl} 
            alt={currentStore.name} 
            className="w-10 h-10 rounded-xl object-cover border border-forest-600 shrink-0" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-sand-50 truncate leading-tight">
              {currentStore.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-sage-300 truncate">
                {currentStore.city}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-sage-400">
            Vendor Operations
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                    isActive
                      ? 'bg-forest-800 text-gold-300 shadow-sm border-l-4 border-gold-400'
                      : 'text-sage-200 hover:bg-forest-800/50 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] uppercase font-extrabold bg-gold-400 text-forest-950 rounded-md">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Storefront & Explore links */}
      <div className="p-4 border-t border-forest-800/60 space-y-2">
        <Link
          to={`/store/${currentStore.id}`}
          target="_blank"
          className="w-full py-2.5 px-3 bg-gold-400 hover:bg-gold-500 text-forest-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition"
        >
          <Store className="w-4 h-4" />
          <span>Open Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 ml-auto" />
        </Link>

        <Link
          to="/explore"
          className="w-full py-2 px-3 bg-forest-800/60 hover:bg-forest-800 text-sage-200 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore Local Sellers</span>
        </Link>

        <Link
          to="/"
          className="w-full py-1 text-center text-[11px] text-sage-400 hover:text-sage-200 transition flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

    </aside>
  );
};
