import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IndianRupee, 
  ShoppingBag, 
  Package, 
  Eye, 
  Plus, 
  QrCode, 
  ExternalLink, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Sparkles,
  Users2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { QRCodeModal } from '../components/common/QRCodeModal';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const VendorDashboard: React.FC = () => {
  const { 
    currentStore, 
    currentStoreProducts, 
    orders, 
    transactions, 
    recordSale,
    updateOrderStatus 
  } = useApp();

  const [showQR, setShowQR] = useState(false);
  const [showRecordSaleModal, setShowRecordSaleModal] = useState(false);
  const [saleAmount, setSaleAmount] = useState('');
  const [saleType, setSaleType] = useState<'Cash' | 'UPI'>('Cash');
  const [customerName, setCustomerName] = useState('');
  const [saleNote, setSaleNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute metrics
  const totalSales = transactions.reduce((acc, t) => acc + t.amount, 0);
  const todayOrders = orders.length;
  const activeProducts = currentStoreProducts.filter(p => p.status === 'available').length;
  const storeVisits = 482; // realistic mock traffic
  const outOfStockProducts = currentStoreProducts.filter(p => p.status !== 'available');

  // Chart data (weekly performance)
  const salesData = [
    { day: 'Mon', sales: 1250, orders: 8, upi: 800, cash: 450 },
    { day: 'Tue', sales: 1840, orders: 12, upi: 1200, cash: 640 },
    { day: 'Wed', sales: 1420, orders: 9, upi: 950, cash: 470 },
    { day: 'Thu', sales: 2100, orders: 15, upi: 1600, cash: 500 },
    { day: 'Fri', sales: 2850, orders: 19, upi: 2200, cash: 650 },
    { day: 'Sat', sales: 3400, orders: 24, upi: 2800, cash: 600 },
    { day: 'Sun', sales: 4100, orders: 29, upi: 3400, cash: 700 },
  ];

  const handleRecordDirectSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleAmount || Number(saleAmount) <= 0) return;

    recordSale({
      amount: Number(saleAmount),
      type: saleType,
      customerName: customerName || 'Walk-in Customer',
      note: saleNote || `Direct Counter Sale (${saleType})`,
    });

    setSaleAmount('');
    setCustomerName('');
    setSaleNote('');
    setShowRecordSaleModal(false);
    
    setToastMessage(`Recorded ₹${saleAmount} via ${saleType} successfully!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-forest-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-gold-400 animate-fade-in text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-gold-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner / Welcome */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Store Online & Discoverable</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            Namaste, {currentStore.ownerName}! 👋
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl">
            Here is your live business summary for <strong className="text-forest-900">{currentStore.name}</strong>. Share your QR code or accept new walk-in orders.
          </p>
        </div>

        {/* Quick View Live Storefront Button */}
        <div className="relative z-10 flex flex-wrap gap-2.5">
          <button
            onClick={() => setShowRecordSaleModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
          >
            <IndianRupee className="w-4 h-4" />
            <span>+ Record Sale</span>
          </button>

          <button
            onClick={() => setShowQR(true)}
            className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
          >
            <QrCode className="w-4 h-4 text-gold-300" />
            <span>Show QR Standee</span>
          </button>
        </div>
      </div>

      {/* Prototype notice */}
      <DisclaimerBanner 
        featureName="Vendor Dashboard metrics and charts"
        backendNeeded="real-time payment gateway webhooks (Paytm/PhonePe) and ONDC seller network adapters"
      />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Total Recorded Sales</span>
            <div className="w-8 h-8 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-forest-800" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-forest-950">₹{totalSales.toLocaleString('en-IN')}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24% from last week</span>
          </div>
        </div>

        {/* Today's Orders */}
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Today's Orders</span>
            <div className="w-8 h-8 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-gold-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-forest-950">{todayOrders}</span>
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500 font-medium">
            3 Active • 1 Delivered
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Active Menu Items</span>
            <div className="w-8 h-8 rounded-xl bg-sage-100 text-forest-800 flex items-center justify-center">
              <Package className="w-4 h-4 text-forest-800" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-forest-950">{activeProducts}</span>
          </div>
          <div className="mt-2 text-[11px] text-charcoal-500 font-medium">
            Total {currentStoreProducts.length} items listed
          </div>
        </div>

        {/* Store Visits */}
        <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Store Visits (QR + Web)</span>
            <div className="w-8 h-8 rounded-xl bg-sand-200 text-charcoal-700 flex items-center justify-center">
              <Eye className="w-4 h-4 text-charcoal-700" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-forest-950">{storeVisits}</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High discovery rate</span>
          </div>
        </div>

      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-soft">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
          Quick Actions for Vendor
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <Link
            to="/inventory"
            className="p-3 rounded-2xl border border-sand-200 bg-sand-50 hover:bg-forest-50 hover:border-forest-300 text-left transition group"
          >
            <Plus className="w-4 h-4 text-forest-800 mb-1 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-forest-950">Add Product</div>
            <div className="text-[10px] text-charcoal-500">New dish or item</div>
          </Link>

          <Link
            to="/inventory"
            className="p-3 rounded-2xl border border-sand-200 bg-sand-50 hover:bg-forest-50 hover:border-forest-300 text-left transition group"
          >
            <Package className="w-4 h-4 text-forest-800 mb-1 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-forest-950">Update Stock</div>
            <div className="text-[10px] text-charcoal-500">Toggle Sold Out</div>
          </Link>

          <button
            onClick={() => setShowQR(true)}
            className="p-3 rounded-2xl border border-sand-200 bg-sand-50 hover:bg-forest-50 hover:border-forest-300 text-left transition group"
          >
            <QrCode className="w-4 h-4 text-gold-600 mb-1 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-forest-950">Generate QR</div>
            <div className="text-[10px] text-charcoal-500">Print tent card</div>
          </button>

          <button
            onClick={() => setShowRecordSaleModal(true)}
            className="p-3 rounded-2xl border border-sand-200 bg-sand-50 hover:bg-forest-50 hover:border-forest-300 text-left transition group"
          >
            <IndianRupee className="w-4 h-4 text-emerald-700 mb-1 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-forest-950">Record Sale</div>
            <div className="text-[10px] text-charcoal-500">Cash or UPI log</div>
          </button>

          <Link
            to={`/store/${currentStore.id}`}
            target="_blank"
            className="p-3 rounded-2xl border border-sand-200 bg-sand-50 hover:bg-forest-50 hover:border-forest-300 text-left transition group"
          >
            <ExternalLink className="w-4 h-4 text-forest-800 mb-1 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-forest-950">View Storefront</div>
            <div className="text-[10px] text-charcoal-500">Live public view</div>
          </Link>
        </div>
      </div>

      {/* Charts & Inventory Alert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-forest-950">Weekly Sales Trend (₹)</h3>
              <p className="text-xs text-charcoal-500">UPI Digital vs Counter Cash Collection</p>
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

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUPI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#174B38" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#174B38" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E6B85C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E6B85C" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBE4" />
                <XAxis dataKey="day" stroke="#75837A" fontSize={11} tickLine={false} />
                <YAxis stroke="#75837A" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  formatter={(val: any) => [`₹${val}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #dceee3', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="upi" name="UPI" stroke="#174B38" fillOpacity={1} fill="url(#colorUPI)" strokeWidth={2} />
                <Area type="monotone" dataKey="cash" name="Cash" stroke="#E6B85C" fillOpacity={1} fill="url(#colorCash)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Alert / Out of Stock Box (1 Col) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sand-200 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-forest-950">Inventory Alerts</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Action Needed
              </span>
            </div>

            {outOfStockProducts.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All items are active and in stock!</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {outOfStockProducts.map(p => (
                  <div key={p.id} className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-charcoal-900 truncate">{p.name}</div>
                      <div className="text-[10px] text-amber-800 font-semibold uppercase mt-0.5">
                        Status: {p.status === 'sold_out' ? 'Sold Out' : 'Tomorrow Only'}
                      </div>
                    </div>
                    <Link
                      to="/inventory"
                      className="px-2.5 py-1 bg-white hover:bg-sand-100 text-forest-800 text-[10px] font-bold rounded-lg border border-sand-300 shrink-0 transition"
                    >
                      Restock
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3.5 bg-sand-100 rounded-2xl border border-sand-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-forest-900">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Voice Stock Update</span>
            </div>
            <p className="text-[11px] text-charcoal-500">
              Say <em>"Aaj ka gajar halwa khatam ho gaya"</em> in the AI Assistant to toggle status automatically.
            </p>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-sand-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-forest-950">Recent Customer Orders</h3>
            <p className="text-xs text-charcoal-500">Orders placed via WhatsApp storefront or counter QR</p>
          </div>
          <Link
            to="/sales"
            className="text-xs font-bold text-forest-800 hover:text-forest-900 flex items-center gap-1"
          >
            <span>View All Transactions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-sand-50/70 border-b border-sand-200 text-charcoal-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-5">Order ID</th>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-5">Items</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Payment</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-sand-50/50 transition">
                  <td className="py-3 px-5 font-mono font-bold text-forest-900">
                    {order.id}
                  </td>
                  <td className="py-3 px-5">
                    <div className="font-semibold text-charcoal-900">{order.customerName}</div>
                    <div className="text-[10px] text-charcoal-400">{order.deliveryType}</div>
                  </td>
                  <td className="py-3 px-5 text-charcoal-700">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td className="py-3 px-5 font-bold text-forest-900">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-5">
                    <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${
                      order.paymentMethod === 'UPI' ? 'bg-forest-100 text-forest-800' : 'bg-gold-100 text-gold-800'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Preparing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                      {order.status === 'Preparing' && <Clock className="w-3 h-3" />}
                      <span>{order.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    {order.status !== 'Delivered' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="px-2.5 py-1 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-[10px] font-semibold transition"
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Direct Sale Modal */}
      {showRecordSaleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-sand-200">
            <h3 className="font-bold text-lg text-forest-950 mb-1">Record Direct Counter Sale</h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Add a walk-in transaction to your ledger and credit history.
            </p>

            <form onSubmit={handleRecordDirectSale} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Sale Amount (₹)*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-charcoal-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 250"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-sand-50 rounded-xl border border-sand-300 text-sm font-bold text-forest-900 focus:outline-none focus:border-forest-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSaleType('Cash')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      saleType === 'Cash' 
                        ? 'bg-forest-800 text-white border-forest-800' 
                        : 'bg-white text-charcoal-700 border-sand-300'
                    }`}
                  >
                    💵 Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setSaleType('UPI')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      saleType === 'UPI' 
                        ? 'bg-forest-800 text-white border-forest-800' 
                        : 'bg-white text-charcoal-700 border-sand-300'
                    }`}
                  >
                    📱 UPI
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Customer Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Walk-in Customer"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 text-xs focus:outline-none focus:border-forest-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-charcoal-700 block mb-1">
                  Items or Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2x Special Thali"
                  value={saleNote}
                  onChange={(e) => setSaleNote(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 text-xs focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRecordSaleModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-sand-300 text-xs font-semibold text-charcoal-600 hover:bg-sand-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-md transition"
                >
                  Save Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Modal */}
      <QRCodeModal
        store={currentStore}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />

    </div>
  );
};
