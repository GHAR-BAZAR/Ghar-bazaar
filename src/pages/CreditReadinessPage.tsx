import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  IndianRupee, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Award,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOV_LOAN_SCHEMES } from '../data/mockData';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { LoanScheme } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const CreditReadinessPage: React.FC = () => {
  const { currentStore, transactions } = useApp();

  const [selectedScheme, setSelectedScheme] = useState<LoanScheme | null>(null);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<any | null>(null);

  // Consistency chart (30-day proof of business)
  const consistencyData = [
    { week: 'Week 1', sales: 9400, consistency: 95 },
    { week: 'Week 2', sales: 11200, consistency: 98 },
    { week: 'Week 3', sales: 13500, consistency: 100 },
    { week: 'Week 4', sales: 15800, consistency: 100 },
  ];

  const totalRecorded = transactions.reduce((acc, t) => acc + t.amount, 0);

  const handleEvaluateEligibility = () => {
    // Simulated calculation
    setEligibilityResult({
      score: 785,
      tier: 'Tier 1 - High Eligibility',
      recommendedScheme: 'PM SVANidhi (₹20,000 2nd Tranche)',
      maxSanctionAmount: 50000,
      interestRate: 'Subsidized 4.2% p.a.',
      reasons: [
        'Regular UPI daily transactions recorded over consecutive weeks',
        'High customer satisfaction score (4.8+ stars)',
        'Zero reported disputes or chargebacks',
        'Local municipality address verifiable via QR orders'
      ]
    });
    setShowEligibilityModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
            <span>Digital Footprint to Formal Credit</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            Credit Readiness & Micro-Loans
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl">
            Street vendors and home kitchens often lack audited balance sheets. Ghar Bazaar turns your daily sales and UPI receipts into an unalterable proof-of-business for collateral-free bank loans.
          </p>
        </div>

        <button
          onClick={handleEvaluateEligibility}
          className="px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-premium hover:shadow-glow transition transform active:scale-95"
        >
          <Award className="w-4 h-4 text-gold-300" />
          <span>Check Loan Eligibility (Demo)</span>
        </button>
      </div>

      <DisclaimerBanner 
        featureName="Credit Readiness and Loan Eligibility Assessment"
        backendNeeded="CIBIL / Experian MSME bureau APIs, Account Aggregator (Sahamati), and PM SVANidhi portal"
      />

      {/* Credit Score & Indicators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Credit Health Score Dial (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-forest-900 to-forest-950 text-white rounded-3xl p-6 sm:p-7 shadow-premium flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-forest-800 px-2.5 py-0.5 rounded-md">
              Ghar Bazaar Financial Health Score
            </span>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl font-black text-gold-300">785</span>
              <span className="text-xs text-sage-300 font-bold">/ 900</span>
            </div>

            <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Credit-Ready: Grade A (Very Low Default Risk)</span>
            </div>

            <p className="text-xs text-sage-200/80 mt-2 leading-relaxed">
              Calculated from 30-day UPI sales consistency, customer retention rate, and digital receipt generation.
            </p>
          </div>

          <div className="p-3.5 bg-forest-800/80 rounded-2xl border border-forest-700/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-sage-300">Estimated Credit Capacity:</span>
              <span className="font-bold text-white">Up to ₹50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sage-300">Eligibility Status:</span>
              <span className="font-bold text-emerald-400">Pre-Qualified for PM SVANidhi</span>
            </div>
          </div>
        </div>

        {/* 4 Pillar Indicators (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
          <h3 className="font-bold text-base text-forest-950">Underwriting Proof-of-Business Indicators</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-forest-950">
                <span>Daily Sales Velocity</span>
                <span className="text-emerald-700">98% Score</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Uninterrupted daily transaction flow recorded over past 4 consecutive weeks.
              </p>
            </div>

            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-forest-950">
                <span>Digital Payment Ratio</span>
                <span className="text-emerald-700">82% UPI</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Majority of order receipts settled directly into linked UPI bank account.
              </p>
            </div>

            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-forest-950">
                <span>Customer Retention</span>
                <span className="text-emerald-700">64% Repeat</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Demonstrates resilient local demand and loyal repeat neighbourhood buyers.
              </p>
            </div>

            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-1">
              <div className="flex items-center justify-between font-bold text-forest-950">
                <span>Hygiene & Location Verified</span>
                <span className="text-emerald-700">100% Pass</span>
              </div>
              <p className="text-[11px] text-charcoal-500">
                Storefront location tagged and customer feedback verified on Ghar Bazaar.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Sales Consistency Trend Chart */}
      <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-forest-950">30-Day Revenue Consistency Chart (Proof of Turnover)</h3>
            <p className="text-xs text-charcoal-500">Banks evaluate cash-flow predictability rather than real estate collateral</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            Unbroken Cashflow
          </span>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={consistencyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSalesProof" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#174B38" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#174B38" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBE4" />
              <XAxis dataKey="week" stroke="#75837A" fontSize={11} tickLine={false} />
              <YAxis stroke="#75837A" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}`} />
              <Tooltip 
                formatter={(val: any) => [`₹${val}`, 'Weekly Turnover']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dceee3', fontSize: '11px' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#174B38" fillOpacity={1} fill="url(#colorSalesProof)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Government Micro-Loan Schemes Section */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-forest-950">Supported Government & NBFC Micro-Credit Programs</h3>
          <p className="text-xs text-charcoal-500">Subsidized micro-credit available for street vendors, home kitchens, and women collectives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GOV_LOAN_SCHEMES.map(scheme => (
            <div 
              key={scheme.id}
              className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft flex flex-col justify-between hover:shadow-premium transition space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-200 inline-block">
                  {scheme.subsidy}
                </span>

                <h4 className="font-bold text-base text-forest-950 leading-snug">
                  {scheme.title}
                </h4>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-forest-900">
                    Up to ₹{scheme.maxAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-sand-100 text-xs">
                  {scheme.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-charcoal-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedScheme(scheme);
                  setShowEligibilityModal(true);
                }}
                className="w-full py-2.5 bg-sand-100 hover:bg-forest-800 hover:text-white text-forest-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Check Scheme Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Eligibility Simulation Modal */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-sand-200 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-sand-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-500" />
                <h3 className="font-bold text-lg text-forest-950">
                  Credit Evaluation Demo Report
                </h3>
              </div>
              <button 
                onClick={() => setShowEligibilityModal(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">Pre-Qualified Scheme:</span>
                <span className="font-black text-emerald-800">PM SVANidhi Tranche-2</span>
              </div>
              <div className="text-2xl font-black text-forest-950">
                ₹50,000 Sanction Capacity
              </div>
              <p className="text-xs text-charcoal-600">
                Based on your logged turnover of <strong>₹{totalRecorded}</strong> and consistent transaction history.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-charcoal-800">Positive Underwriting Highlights:</h5>
              <div className="space-y-1 text-charcoal-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified continuous operations for {currentStore.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Prompt digital payment behavior with zero customer chargebacks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Eligible for 7% interest subsidy directly credited by MoHUA</span>
                </div>
              </div>
            </div>

            {/* Prototype notice */}
            <div className="p-3 bg-sand-100 rounded-xl border border-sand-300 text-[11px] text-charcoal-600 leading-relaxed">
              <strong>Demo Information Only:</strong> This panel simulates a credit score assessment and does not submit an actual loan application or guarantee sanction. In production, this securely connects to Udyam Assist and partner banks (SBI, PNB, SIDBI).
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowEligibilityModal(false)}
                className="px-5 py-2.5 bg-forest-800 text-white rounded-xl text-xs font-bold"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
