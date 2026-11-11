import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Heart, Sparkles, Phone, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-sand-200 border-t border-forest-900 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-gold-300 font-extrabold shadow">
                <Store className="w-5 h-5 text-gold-300" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white">
                Ghar<span className="text-gold-400 font-semibold ml-1">Bazaar</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-sage-200/80 leading-relaxed max-w-sm">
              Empowering India's thela vendors, home kitchens, women artisans, and Self-Help Groups (SHGs) with voice-first digital storefronts, instant QR ordering, fair pricing, and credit-readiness.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="px-2.5 py-1 bg-forest-900/80 text-gold-300 rounded-lg border border-forest-800/80 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Voice-First AI
              </span>
              <span className="px-2.5 py-1 bg-forest-900/80 text-emerald-300 rounded-lg border border-forest-800/80 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ONDC-Ready Architecture
              </span>
              <span className="px-2.5 py-1 bg-forest-900/80 text-sage-300 rounded-lg border border-forest-800/80">
                PM SVANidhi Aligned
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Platform</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-200">
              <li>
                <Link to="/generator" className="hover:text-white transition flex items-center gap-1">
                  AI Store Generator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="hover:text-white transition">
                  Inventory Manager
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition">
                  Fair Pricing Calculator
                </Link>
              </li>
              <li>
                <Link to="/sales" className="hover:text-white transition">
                  Sales & UPI Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & SHG */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Cooperative & Credit</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-200">
              <li>
                <Link to="/shg" className="hover:text-white transition">
                  SHG Member Ledger
                </Link>
              </li>
              <li>
                <Link to="/credit" className="hover:text-white transition">
                  Credit Readiness Score
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition">
                  Explore Local Sellers
                </Link>
              </li>
              <li>
                <Link to="/store/maa-ki-rasoi" className="hover:text-white transition flex items-center gap-1">
                  Sample Storefront <ArrowUpRight className="w-3 h-3 text-gold-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Vernacular & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Support & Vernacular</h4>
            <p className="text-xs text-sage-300/80">
              Available in हिन्दी, Hinglish, Marathi, Tamil, and English. Designed for low-bandwidth networks and low-end smartphones.
            </p>
            <div className="pt-2 text-xs text-sage-200 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Helpline: 1800-GHAR-BAZAAR</span>
              </div>
              <p className="text-[11px] text-sage-400">Toll-free voice assistance for vendors</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-300/70 gap-4">
          <p>© {new Date().getFullYear()} Ghar Bazaar. Built for Indian Micro-Entrepreneurs with pride.</p>
          <div className="flex items-center gap-1 text-gold-400/90 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Digital India & Hyperlocal Sellers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
