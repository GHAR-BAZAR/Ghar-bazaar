import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, IndianRupee, Calculator, Store } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentStore } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sand-300 py-1.5 px-2 flex items-center justify-around shadow-lg">
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) => `
          flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition ${
            isActive ? 'text-forest-800 font-bold' : 'text-charcoal-500'
          }
        `}
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span>Overview</span>
      </NavLink>

      <NavLink
        to="/inventory"
        className={({ isActive }) => `
          flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition ${
            isActive ? 'text-forest-800 font-bold' : 'text-charcoal-500'
          }
        `}
      >
        <Package className="w-5 h-5 mb-0.5" />
        <span>Inventory</span>
      </NavLink>

      <NavLink
        to="/sales"
        className={({ isActive }) => `
          flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition ${
            isActive ? 'text-forest-800 font-bold' : 'text-charcoal-500'
          }
        `}
      >
        <IndianRupee className="w-5 h-5 mb-0.5" />
        <span>Sales</span>
      </NavLink>

      <NavLink
        to="/pricing"
        className={({ isActive }) => `
          flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition ${
            isActive ? 'text-forest-800 font-bold' : 'text-charcoal-500'
          }
        `}
      >
        <Calculator className="w-5 h-5 mb-0.5" />
        <span>Pricing</span>
      </NavLink>

      <NavLink
        to={`/store/${currentStore.id}`}
        target="_blank"
        className="flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium text-forest-800"
      >
        <Store className="w-5 h-5 mb-0.5 text-gold-500" />
        <span>Storefront</span>
      </NavLink>
    </div>
  );
};
