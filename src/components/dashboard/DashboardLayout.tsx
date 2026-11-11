import React from 'react';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { useApp } from '../../context/AppContext';
import { Store, QrCode, Plus, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeModal } from '../common/QRCodeModal';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentStore } = useApp();
  const [showQR, setShowQR] = React.useState(false);

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col">
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 min-w-0 pb-20 md:pb-8">
          {/* Top Bar inside Dashboard */}
          <div className="bg-white border-b border-sand-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-16 sm:top-20 z-30 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h1 className="text-sm sm:text-base font-bold text-forest-900 truncate">
                {currentStore.name}
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sand-200 text-charcoal-700 hidden sm:inline-block">
                {currentStore.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQR(true)}
                className="px-3 py-1.5 bg-forest-50 hover:bg-forest-100 text-forest-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-forest-200 transition"
              >
                <QrCode className="w-3.5 h-3.5 text-gold-500" />
                <span>Store QR</span>
              </button>

              <Link
                to="/inventory"
                className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Link>

              <Link
                to={`/store/${currentStore.id}`}
                target="_blank"
                className="p-1.5 text-charcoal-500 hover:text-forest-800 rounded-lg hover:bg-sand-100 transition hidden sm:inline-block"
                title="Open Storefront in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Child Page Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <MobileBottomNav />

      {/* QR Code Modal */}
      <QRCodeModal
        store={currentStore}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </div>
  );
};
