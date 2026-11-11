import React, { useState } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  Sparkles, 
  PieChart as PieIcon, 
  HelpCircle, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const PricingAssistant: React.FC = () => {
  // Input states
  const [dishName, setDishName] = useState('Special Dal Makhani & Jeera Rice Thali');
  const [ingredientsCost, setIngredientsCost] = useState<number>(1200);
  const [labourHours, setLabourHours] = useState<number>(3);
  const [hourlyLabourRate, setHourlyLabourRate] = useState<number>(100);
  const [packagingCost, setPackagingCost] = useState<number>(250);
  const [fuelAndOverhead, setFuelAndOverhead] = useState<number>(200);
  const [unitsProduced, setUnitsProduced] = useState<number>(25);
  const [targetMarginPercent, setTargetMarginPercent] = useState<number>(35);

  // Computations
  const totalLabourCost = labourHours * hourlyLabourRate;
  const totalProductionCost = ingredientsCost + totalLabourCost + packagingCost + fuelAndOverhead;
  const costPerUnit = unitsProduced > 0 ? Math.round(totalProductionCost / unitsProduced) : 0;
  
  // Suggested price based on target margin: price = cost / (1 - margin)
  const suggestedPrice = costPerUnit > 0 ? Math.round(costPerUnit / (1 - targetMarginPercent / 100)) : 0;
  const profitPerUnit = suggestedPrice - costPerUnit;
  const totalEstimatedProfit = profitPerUnit * unitsProduced;
  const actualMarginPercent = suggestedPrice > 0 ? Math.round((profitPerUnit / suggestedPrice) * 100) : 0;

  // Pie chart breakdown
  const costBreakdownData = [
    { name: 'Raw Ingredients', value: ingredientsCost, color: '#174B38' },
    { name: 'Artisan Labour', value: totalLabourCost, color: '#A8C6A0' },
    { name: 'Eco Packaging', value: packagingCost, color: '#E6B85C' },
    { name: 'Fuel & Gas', value: fuelAndOverhead, color: '#252A27' },
  ];

  const presets = [
    { label: '25% Budget Friendly', margin: 25 },
    { label: '35% Recommended', margin: 35 },
    { label: '45% Premium Handcrafted', margin: 45 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
          <Calculator className="w-3.5 h-3.5 text-forest-700" />
          <span>Fair Micro-Enterprise Pricing Calculator</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
          Intelligent Pricing & Margin Assistant
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-2xl">
          Many home kitchens and vendors undervalue their own labour and fuel costs. Input your true costs below to compute fair selling prices and maintain sustainable profits.
        </p>
      </div>

      <DisclaimerBanner 
        featureName="Pricing Assistant benchmarks and market intelligence"
        backendNeeded="a live RAG pipeline ingesting hyperlocal wholesale APMC mandi rates and competitor street prices"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cost Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-sand-200 shadow-soft space-y-5">
          <div className="border-b border-sand-200 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-base text-forest-950">1. Production Batch Costs</h3>
            <span className="text-xs text-charcoal-400 font-medium">Batch size: {unitsProduced} units</span>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Dish / Item Name */}
            <div>
              <label className="font-bold text-charcoal-800 block mb-1">Product / Dish Name</label>
              <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 font-semibold text-forest-950 focus:outline-none focus:border-forest-600"
              />
            </div>

            {/* Batch Units */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-charcoal-800 block mb-1">
                  Batch Output (Number of Units Produced)*
                </label>
                <input
                  type="number"
                  min="1"
                  value={unitsProduced}
                  onChange={(e) => setUnitsProduced(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 font-bold text-forest-900 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">
                  Raw Ingredients Cost for Batch (₹)*
                </label>
                <input
                  type="number"
                  value={ingredientsCost}
                  onChange={(e) => setIngredientsCost(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 font-bold text-forest-900 focus:outline-none focus:border-forest-600"
                />
              </div>
            </div>

            {/* Labour inputs */}
            <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-3">
              <div className="font-bold text-forest-950 flex items-center justify-between">
                <span>Cooking & Artisan Labour (Don't work for free!)</span>
                <span className="text-forest-800 font-extrabold">Total: ₹{totalLabourCost}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-charcoal-600 block mb-1">Time Spent (Hours)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={labourHours}
                    onChange={(e) => setLabourHours(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-sand-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-charcoal-600 block mb-1">Hourly Fair Wage (₹/hr)</label>
                  <input
                    type="number"
                    value={hourlyLabourRate}
                    onChange={(e) => setHourlyLabourRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-sand-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Packaging and Overhead */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-charcoal-800 block mb-1">
                  Packaging & Containers (₹)*
                </label>
                <input
                  type="number"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">
                  LPG Gas, Oil & Utilities (₹)*
                </label>
                <input
                  type="number"
                  value={fuelAndOverhead}
                  onChange={(e) => setFuelAndOverhead(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Target Margin Slider */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-charcoal-800">
                  Target Profit Margin: <span className="text-forest-800 text-sm font-extrabold">{targetMarginPercent}%</span>
                </label>
                <div className="flex gap-1.5">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTargetMarginPercent(p.margin)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition ${
                        targetMarginPercent === p.margin
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-sand-100 text-charcoal-600 border-sand-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={targetMarginPercent}
                onChange={(e) => setTargetMarginPercent(Number(e.target.value))}
                className="w-full accent-forest-800 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Pricing Outputs & Visualization (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recommendation Output Card */}
          <div className="bg-gradient-to-br from-forest-900 to-forest-950 text-white rounded-3xl p-6 sm:p-7 shadow-premium space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-gold-400 text-forest-950 rounded-md">
              AI Suggested Selling Price
            </span>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-gold-300">
                ₹{suggestedPrice}
              </span>
              <span className="text-xs text-sage-200 font-semibold">/ per unit</span>
            </div>

            <p className="text-xs text-sage-200/90 leading-relaxed">
              Produces a healthy <strong className="text-white">{actualMarginPercent}% profit margin</strong> while covering all ingredients, packaging, and your personal labour wage.
            </p>

            <div className="pt-4 border-t border-forest-800 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-forest-800/80 rounded-2xl border border-forest-700/60">
                <span className="text-[10px] text-sage-300 block">Total Cost / Unit</span>
                <span className="text-lg font-bold text-white">₹{costPerUnit}</span>
              </div>
              <div className="p-3 bg-forest-800/80 rounded-2xl border border-forest-700/60">
                <span className="text-[10px] text-sage-300 block">Net Profit / Unit</span>
                <span className="text-lg font-bold text-emerald-400">+₹{profitPerUnit}</span>
              </div>
            </div>

            <div className="pt-1 text-center">
              <span className="text-xs font-semibold text-gold-300">
                Total Batch Net Profit: ₹{totalEstimatedProfit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Cost Distribution Chart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sand-200 shadow-soft space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-forest-950">
              Batch Cost Breakdown (Total: ₹{totalProductionCost})
            </h4>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`₹${val}`, 'Cost']}
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dceee3', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {costBreakdownData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-charcoal-600 truncate">{item.name}:</span>
                  <span className="font-bold text-forest-950 ml-auto">₹{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Local Market Benchmark Comparison */}
          <div className="bg-sand-50 rounded-3xl p-5 border border-sand-200 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-forest-900 font-bold">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>Hyperlocal NCR Benchmark (Simulation)</span>
            </div>
            <p className="text-charcoal-600 text-[11px] leading-relaxed">
              Competitor home kitchens in Ghaziabad & Delhi charge between <strong>₹160 – ₹210</strong> for similar pure ghee thalis. Your suggested price of <strong>₹{suggestedPrice}</strong> is competitively positioned for strong repeat customer volume.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
