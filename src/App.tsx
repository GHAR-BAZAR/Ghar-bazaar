import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { VendorDashboard } from './pages/VendorDashboard';
import { AIStorefrontGenerator } from './pages/AIStorefrontGenerator';
import { DigitalStorefront } from './pages/DigitalStorefront';
import { InventoryPage } from './pages/InventoryPage';
import { PricingAssistant } from './pages/PricingAssistant';
import { SalesPaymentsPage } from './pages/SalesPaymentsPage';
import { SHGManagementPage } from './pages/SHGManagementPage';
import { ExploreBusinessesPage } from './pages/ExploreBusinessesPage';
import { ReviewsRatingsPage } from './pages/ReviewsRatingsPage';
import { CreditReadinessPage } from './pages/CreditReadinessPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-sand-100 text-charcoal">
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              {/* Public Marketing & Discovery */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/explore" element={<ExploreBusinessesPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Public Customer Storefront */}
              <Route path="/store/:storeId" element={<DigitalStorefront />} />

              {/* Vendor & Operations Workspace (Dashboard Layout) */}
              <Route path="/dashboard" element={<DashboardLayout><VendorDashboard /></DashboardLayout>} />
              <Route path="/generator" element={<DashboardLayout><AIStorefrontGenerator /></DashboardLayout>} />
              <Route path="/inventory" element={<DashboardLayout><InventoryPage /></DashboardLayout>} />
              <Route path="/pricing" element={<DashboardLayout><PricingAssistant /></DashboardLayout>} />
              <Route path="/sales" element={<DashboardLayout><SalesPaymentsPage /></DashboardLayout>} />
              <Route path="/shg" element={<DashboardLayout><SHGManagementPage /></DashboardLayout>} />
              <Route path="/reviews" element={<DashboardLayout><ReviewsRatingsPage /></DashboardLayout>} />
              <Route path="/credit" element={<DashboardLayout><CreditReadinessPage /></DashboardLayout>} />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
