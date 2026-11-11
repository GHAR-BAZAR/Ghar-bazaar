import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Mic, 
  QrCode, 
  ShoppingBag, 
  TrendingUp, 
  Users2, 
  Calculator, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Store, 
  Smartphone,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { currentStore, stores } = useApp();

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs sm:text-sm font-semibold shadow-xs">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Next-Gen Hyperlocal Commerce for Bharat</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-forest-950 tracking-tight leading-[1.12]">
                Your Business <br className="hidden sm:inline" />
                <span className="text-forest-800 underline decoration-gold-400 decoration-wavy decoration-2">
                  Deserves to Be Seen.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Turn your thela, home kitchen or handmade products into a digital business in minutes. 
                <span className="font-semibold text-forest-900 ml-1">
                  "Speak once, get a ready-to-sell brand."
                </span>
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/generator"
                  className="w-full sm:w-auto px-7 py-4 bg-forest-800 hover:bg-forest-900 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-premium hover:shadow-glow transition-all transform hover:-translate-y-0.5 group"
                >
                  <Sparkles className="w-5 h-5 text-gold-300 group-hover:rotate-12 transition-transform" />
                  <span>Create My Store Free</span>
                  <ArrowRight className="w-4 h-4 text-gold-300" />
                </Link>

                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-sand-50 text-forest-900 border border-sand-300 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition shadow-soft"
                >
                  <Store className="w-5 h-5 text-forest-700" />
                  <span>Explore Local Businesses</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-sand-200 text-left">
                <div>
                  <div className="font-black text-xl sm:text-2xl text-forest-900">3 Mins</div>
                  <div className="text-xs text-charcoal-500 font-medium">From Voice to Storefront</div>
                </div>
                <div>
                  <div className="font-black text-xl sm:text-2xl text-forest-900">0%</div>
                  <div className="text-xs text-charcoal-500 font-medium">Platform Commission</div>
                </div>
                <div>
                  <div className="font-black text-xl sm:text-2xl text-forest-900">₹0</div>
                  <div className="text-xs text-charcoal-500 font-medium">Setup Cost for Vendors</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px]">
                
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-forest-200 to-gold-200 rounded-[48px] blur-xl opacity-60 transform -rotate-3" />

                {/* Smartphone Device Frame */}
                <div className="relative bg-charcoal-900 p-3.5 rounded-[44px] shadow-2xl border-4 border-charcoal-800">
                  {/* Speaker notch */}
                  <div className="w-24 h-4 bg-charcoal-800 rounded-full mx-auto mb-2" />

                  {/* Screen Content */}
                  <div className="bg-sand-50 rounded-[32px] overflow-hidden border border-sand-300 shadow-inner">
                    
                    {/* Header Image */}
                    <div className="relative h-28 overflow-hidden">
                      <img 
                        src={currentStore.bannerUrl} 
                        alt={currentStore.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 text-white">
                        <span className="text-[10px] uppercase font-bold bg-gold-400 text-forest-950 px-2 py-0.5 rounded-md">
                          Verified Local
                        </span>
                        <h4 className="text-sm font-bold truncate drop-shadow">{currentStore.name}</h4>
                      </div>
                    </div>

                    {/* Catalog Teaser */}
                    <div className="p-3 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-charcoal-500 font-medium">
                        <span>⭐ {currentStore.rating} ({currentStore.reviewCount} reviews)</span>
                        <span className="text-emerald-700 font-bold">Open Now</span>
                      </div>

                      {/* Sample Product item */}
                      <div className="p-2 bg-white rounded-xl border border-sand-200 flex items-center justify-between gap-2 shadow-xs">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-forest-950 truncate">Dal Makhani Thali</p>
                          <p className="text-[10px] text-charcoal-500">Fresh homemade pure desi ghee</p>
                          <p className="text-xs font-black text-forest-800 mt-0.5">₹180</p>
                        </div>
                        <button className="px-2.5 py-1 bg-forest-800 text-gold-300 rounded-lg text-[11px] font-bold shrink-0">
                          Add +
                        </button>
                      </div>

                      <div className="p-2 bg-white rounded-xl border border-sand-200 flex items-center justify-between gap-2 shadow-xs">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-forest-950 truncate">Tawa Phulka (Pack of 5)</p>
                          <p className="text-[10px] text-charcoal-500">100% whole wheat chakki atta</p>
                          <p className="text-xs font-black text-forest-800 mt-0.5">₹60</p>
                        </div>
                        <button className="px-2.5 py-1 bg-forest-800 text-gold-300 rounded-lg text-[11px] font-bold shrink-0">
                          Add +
                        </button>
                      </div>

                      {/* CTA bar inside phone */}
                      <div className="pt-1">
                        <Link
                          to={`/store/${currentStore.id}`}
                          className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Order on WhatsApp (Instant)</span>
                        </Link>
                      </div>

                    </div>
                  </div>

                  {/* Home indicator bar */}
                  <div className="w-24 h-1 bg-charcoal-700 rounded-full mx-auto mt-2" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            Frictionless Onboarding
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-950">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600">
            Designed for first-time digital vendors, hawkers, and women self-help groups. No coding, no complicated forms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload Product Photos',
              desc: 'Take 3–5 quick photos from your mobile camera of your dishes, snacks, jars, or handicrafts.',
              icon: ShoppingBag,
            },
            {
              step: '02',
              title: 'Speak in Your Language',
              desc: 'Press the mic and record a 60-second voice note in Hindi or English describing what you make and sell.',
              icon: Mic,
            },
            {
              step: '03',
              title: 'Generate Digital Store',
              desc: 'AI instantly crafts your brand name, punchy tagline, English/Hindi descriptions, and smart pricing.',
              icon: Sparkles,
            },
            {
              step: '04',
              title: 'Share QR & Start Selling',
              desc: 'Print your QR standee for your thela, share on WhatsApp, and receive direct customer orders and UPI.',
              icon: QrCode,
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft hover:shadow-premium transition-all relative group"
              >
                <div className="text-3xl font-black text-sand-300 group-hover:text-gold-400 transition-colors mb-4">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-forest-800" />
                </div>
                <h3 className="font-bold text-lg text-forest-950 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PLATFORM CORE FEATURES */}
      <section className="bg-sand-200/50 py-16 border-y border-sand-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-800 bg-white px-3 py-1 rounded-full border border-sand-300">
              Complete Ecosystem
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-950">
              Everything an Offline Vendor Needs to Scale
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600">
              Purpose-built tools designed for street commerce, home kitchens, and rural artisanal clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'AI-Powered Branding',
                desc: 'Generate logos, catchy taglines, bilingual product labels, and packaging concepts automatically.',
                icon: Sparkles,
                link: '/generator'
              },
              {
                title: 'Voice-First Management',
                desc: 'Speak updates like "Kachori khatam ho gayi" to update inventory without typing.',
                icon: Mic,
                link: '/generator'
              },
              {
                title: 'Smart Inventory',
                desc: 'One-click toggles for Available, Sold Out, or Tomorrow Only. Syncs instantly to customer storefronts.',
                icon: ShoppingBag,
                link: '/inventory'
              },
              {
                title: 'Fair Pricing Assistant',
                desc: 'Input ingredient, labour, and packaging costs. Calculate real profit margins and competitive prices.',
                icon: Calculator,
                link: '/pricing'
              },
              {
                title: 'Digital Payments & Tracking',
                desc: 'Record cash and UPI sales seamlessly. Real-time daily ledger and revenue breakdown charts.',
                icon: TrendingUp,
                link: '/sales'
              },
              {
                title: 'SHG Cooperative Hub',
                desc: 'Manage women collective members, shared inventory, pooled orders, and transparent member payouts.',
                icon: Users2,
                link: '/shg'
              },
              {
                title: 'Customer Reviews',
                desc: 'Build trust with verified star ratings and customer praise. Reply with AI polite responses in Hindi.',
                icon: Star,
                link: '/reviews'
              },
              {
                title: 'Credit Readiness',
                desc: 'Turn daily digital sales logs into creditworthiness for PM SVANidhi, MUDRA, and bank micro-loans.',
                icon: ShieldCheck,
                link: '/credit'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={idx}
                  to={feature.link}
                  className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-forest-800 text-gold-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-forest-950 mb-2 group-hover:text-forest-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-sand-100 flex items-center text-xs font-bold text-forest-800 gap-1 group-hover:gap-2 transition-all">
                    <span>Try Feature</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. REAL IMPACT SECTION (Women Entrepreneurs & Micro-Sellers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 rounded-3xl sm:rounded-[40px] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="px-3 py-1 bg-forest-800 text-gold-300 rounded-full text-xs font-bold border border-forest-700 inline-flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-gold-300 text-gold-300" /> Real Grassroots Impact
              </span>

              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Empowering India's Unsung Entrepreneurs
              </h2>

              <p className="text-sm sm:text-base text-sage-200 leading-relaxed font-normal">
                Over 63 million micro-enterprises drive India's economy, yet 90% remain unsearchable online. Ghar Bazaar bridges this digital divide with voice-first identity, zero-commission storefronts, and formal credit readiness.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-forest-800/80 rounded-2xl border border-forest-700/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gold-300">72%</div>
                  <div className="text-xs text-sage-200 mt-1">Women-led home kitchens & SHG artisan sellers</div>
                </div>
                <div className="p-4 bg-forest-800/80 rounded-2xl border border-forest-700/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gold-300">+48%</div>
                  <div className="text-xs text-sage-200 mt-1">Average monthly sales increase after QR ordering</div>
                </div>
              </div>
            </div>

            {/* Testimonial / Story Card */}
            <div className="bg-white text-charcoal rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 border border-sand-300">
              <div className="flex items-center gap-3.5">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&auto=format&fit=crop&q=80" 
                  alt="Anjali Sharma" 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-forest-200" 
                />
                <div>
                  <h4 className="font-bold text-base text-forest-950">Anjali Sharma</h4>
                  <p className="text-xs text-charcoal-500">Founder, Maa Ki Rasoi (Ghaziabad)</p>
                  <div className="flex text-gold-400 mt-0.5">⭐⭐⭐⭐⭐</div>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-charcoal-700 italic leading-relaxed border-l-4 border-gold-400 pl-3">
                "Pehle sirf aas-paas ke 4 padosi jante the. Ghar Bazaar par sirf 2 minute voice note bolkar mera storefront aur QR ban gaya. Aaj daily 35+ office workers WhatsApp par thali order karte hain!"
              </blockquote>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-forest-900 border-t border-sand-200">
                <span>Verified Vendor on Ghar Bazaar</span>
                <Link to="/store/maa-ki-rasoi" className="text-forest-800 underline flex items-center gap-1">
                  View Anjali's Store <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-forest-950">
          Ready to Turn Your Business Digital?
        </h2>
        <p className="text-sm sm:text-base text-charcoal-600 max-w-xl mx-auto">
          No credit card, no app download required. Just your phone and voice.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/generator"
            className="w-full sm:w-auto px-8 py-4 bg-forest-800 hover:bg-forest-900 text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-premium transition"
          >
            <Sparkles className="w-5 h-5 text-gold-300" />
            <span>Launch My Store Now</span>
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-4 bg-sand-200 hover:bg-sand-300 text-forest-950 rounded-2xl font-bold text-sm sm:text-base transition"
          >
            <span>Open Vendor Demo Console</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
