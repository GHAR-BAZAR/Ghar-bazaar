import React, { useState } from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Smartphone, 
  Banknote, 
  Calendar,
  CheckCircle2,
  X,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const SalesPaymentsPage: React.FC = () => {
  const { currentStore, transactions, recordSale } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New transaction modal inputs
  const [saleAmount, setSaleAmount] = useState('');
  const [saleType, setSaleType] = useState<'Cash' | 'UPI'>('UPI');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [saleNote, setSaleNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute metrics
  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
  const upiTransactions = transactions.filter(t => t.type === 'UPI');
  const cashTransactions = transactions.filter(t => t.type === 'Cash');
  const upiTotal = upiTransactions.reduce((sum, t) => sum + t.amount, 0);
  const cashTotal = cashTransactions.reduce((sum, t) => sum + t.amount, 0);
  const upiPercent = totalRevenue > 0 ? Math.round((upiTotal / totalRevenue) * 100) : 0;

  // Chart data
  const paymentBreakdownData = [
    { name: 'UPI Digital', value: upiTotal, color: '#174B38' },
    { name: 'Counter Cash', value: cashTotal, color: '#E6B85C' },
  ];

  const dailyTrendData = [
    { day: 'Mon', UPI: 850, Cash: 400 },
    { day: 'Tue', UPI: 1200, Cash: 640 },
    { day: 'Wed', UPI: 950, Cash: 470 },
    { day: 'Thu', UPI: 1600, Cash: 500 },
    { day: 'Fri', UPI: 2200, Cash: 650 },
    { day: 'Sat', UPI: 2800, Cash: 600 },
    { day: 'Sun', UPI: 3400, Cash: 700 },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleRecordNewSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleAmount || Number(saleAmount) <= 0) return;

    recordSale({
      amount: Number(saleAmount),
      type: saleType,
      customerName: customerName || 'Counter Customer',
      customerPhone: customerPhone,
      note: saleNote || `Manual Entry (${saleType})`,
    });

    setToastMessage(`₹${saleAmount} sale recorded via ${saleType}!`);
    setSaleAmount('');
    setCustomerName('');
    setCustomerPhone('');
    setSaleNote('');
    setIsModalOpen(false);

    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulateExport = () => {
    setToastMessage('Exported monthly ledger CSV to downloads!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-forest-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-gold-400 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-gold-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
            <IndianRupee className="w-3.5 h-3.5 text-forest-700" />
            <span>Digital Ledger & Bookkeeping</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            Sales & Digital Payments
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Track daily cash and QR payments in one place. Consistent digital logs build creditworthiness for micro-loans.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateExport}
            className="px-4 py-2.5 bg-sand-100 hover:bg-sand-200 text-charcoal-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-sand-300 transition"
          >
            <Download className="w-3.5 h-3.5 text-forest-800" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-gold-300" />
            <span>+ Record New Sale</span>
          </button>
        </div>
      </div>

      <DisclaimerBanner 
        featureName="Sales & Payments ledger"
        backendNeeded="live UPI Switch integration (NPCI / Setu / Razorpay) and Bharat BillPay APIs"
      />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Total Recorded Revenue</span>
          <div className="text-2xl sm:text-3xl font-black text-forest-950 mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Across all {transactions.length} sales</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">UPI Digital QR</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-800">
              {upiPercent}% Share
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-forest-800 mt-2">
            ₹{upiTotal.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500">
            {upiTransactions.length} digital transactions
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Counter Cash</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800">
              {100 - upiPercent}% Share
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gold-600 mt-2">
            ₹{cashTotal.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500">
            {cashTransactions.length} cash collections
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-500">Registered UPI ID</span>
          <div className="text-sm font-mono font-bold text-forest-900 truncate mt-2">
            {currentStore.upiId}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold">
            ✓ Linked to primary bank
          </div>
        </div>

      </div>

      {/* Visual Charts: Daily Trend & UPI vs Cash */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Revenue Trend (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-forest-950">Daily Sales Trend (₹)</h3>
              <p className="text-xs text-charcoal-500">Comparative breakdown by channel</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-forest-800">
                <span className="w-3 h-3 rounded-sm bg-forest-800" /> UPI
              </span>
              <span className="flex items-center gap-1.5 text-gold-600">
                <span className="w-3 h-3 rounded-sm bg-gold-400" /> Cash
              </span>
            </div>
          </div>

          <div className="h-60 sm:h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBE4" />
                <XAxis dataKey="day" stroke="#75837A" fontSize={11} tickLine={false} />
                <YAxis stroke="#75837A" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  formatter={(val: any) => [`₹${val}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dceee3', fontSize: '11px' }}
                />
                <Bar dataKey="UPI" fill="#174B38" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Cash" fill="#E6B85C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Mode Donut (1 col) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-base text-forest-950">Cash vs UPI Ratio</h3>
            <p className="text-xs text-charcoal-500">Digital adoption rate</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`₹${val}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dceee3', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-sand-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-charcoal-700">
                <span className="w-2.5 h-2.5 rounded-full bg-forest-800" /> UPI Digital
              </span>
              <span className="font-bold text-forest-900">₹{upiTotal} ({upiPercent}%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-charcoal-700">
                <span className="w-2.5 h-2.5 rounded-full bg-gold-400" /> Counter Cash
              </span>
              <span className="font-bold text-charcoal-800">₹{cashTotal} ({100 - upiPercent}%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Transaction History Ledger */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        
        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by customer name, order note, or Txn ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-sand-50 rounded-xl border border-sand-200 text-xs focus:outline-none focus:border-forest-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-sand-50 rounded-xl border border-sand-200 text-xs font-semibold text-charcoal-800 focus:outline-none"
            >
              <option value="all">All Modes ({transactions.length})</option>
              <option value="UPI">UPI Transactions Only</option>
              <option value="Cash">Cash Transactions Only</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-sand-50/70 border-b border-sand-200 text-charcoal-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5">Txn ID</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Notes / Items</th>
                <th className="py-3 px-5">Mode</th>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-sand-50/50 transition">
                  <td className="py-3 px-5 font-mono font-bold text-forest-900">
                    {txn.id}
                  </td>
                  <td className="py-3 px-5">
                    <div className="font-semibold text-charcoal-900">{txn.customerName}</div>
                    {txn.customerPhone && (
                      <div className="text-[10px] text-charcoal-400 font-mono">{txn.customerPhone}</div>
                    )}
                  </td>
                  <td className="py-3 px-5 text-charcoal-700">
                    {txn.note}
                  </td>
                  <td className="py-3 px-5">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] inline-flex items-center gap-1 ${
                      txn.type === 'UPI' 
                        ? 'bg-forest-100 text-forest-800' 
                        : 'bg-gold-100 text-gold-800'
                    }`}>
                      {txn.type === 'UPI' ? <Smartphone className="w-3 h-3" /> : <Banknote className="w-3 h-3" />}
                      <span>{txn.type}</span>
                    </span>
                  </td>
                  <td className="py-3 px-5 text-charcoal-500 text-[11px]">
                    {txn.timestamp}
                  </td>
                  <td className="py-3 px-5 text-right font-black text-sm text-forest-950">
                    +₹{txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Record New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-sand-200">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200 mb-4">
              <h3 className="font-bold text-base text-forest-950">Record New Transaction</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordNewSale} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Sale Amount (₹)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-charcoal-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 180"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-sand-50 rounded-xl border border-sand-300 font-bold text-sm text-forest-900 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Payment Method*</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSaleType('UPI')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      saleType === 'UPI' 
                        ? 'bg-forest-800 text-white border-forest-800' 
                        : 'bg-white text-charcoal-700 border-sand-300'
                    }`}
                  >
                    📱 UPI (QR Scan)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaleType('Cash')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      saleType === 'Cash' 
                        ? 'bg-forest-800 text-white border-forest-800' 
                        : 'bg-white text-charcoal-700 border-sand-300'
                    }`}
                  >
                    💵 Cash (Counter)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Customer Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Bhai"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Mobile Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. 98112 33445"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Order Notes / Items Sold</label>
                <input
                  type="text"
                  placeholder="e.g. 1x Special Thali + 1x Halwa"
                  value={saleNote}
                  onChange={(e) => setSaleNote(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-sand-300 font-semibold text-charcoal-600 hover:bg-sand-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold shadow-md"
                >
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
