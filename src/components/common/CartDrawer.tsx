import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, QrCode, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Store } from '../../types';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  store: Store;
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<Props> = ({ store, isOpen, onClose }) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, recordSale } = useApp();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'Pickup' | 'Home Delivery'>('Pickup');
  const [showUPIScreen, setShowUPIScreen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  // Format WhatsApp message
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map(item => `• ${item.quantity}x ${item.product.name} (₹${item.product.price * item.quantity})`)
      .join('\n');

    const cleanVendorPhone = store.phone.replace(/[^0-9]/g, '');
    const message = 
`*New Order via Ghar Bazaar* 🛍️
*Store:* ${store.name}
-----------------------------
*Items Ordered:*
${itemsSummary}
-----------------------------
*Total Amount:* ₹${cartTotal}
*Order Type:* ${deliveryType}
*Customer Name:* ${customerName || 'Customer'}
*Customer Contact:* ${customerPhone || 'Not provided'}

_Please confirm acceptance and preparation time!_`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanVendorPhone || '919811245890'}?text=${encoded}`;

    // Record as pending order in context
    recordSale({
      amount: cartTotal,
      type: 'UPI',
      customerName: customerName || 'WhatsApp Customer',
      customerPhone: customerPhone,
      note: `WhatsApp Order (${deliveryType})`,
      items: cart.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price
      }))
    });

    window.open(waUrl, '_blank');
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
      onClose();
    }, 2000);
  };

  const handleSimulateUPIPayment = () => {
    recordSale({
      amount: cartTotal,
      type: 'UPI',
      customerName: customerName || 'Storefront Customer',
      customerPhone: customerPhone,
      note: `Online Storefront Order (${deliveryType})`,
      items: cart.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price
      }))
    });

    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      setOrderSuccess(false);
      setShowUPIScreen(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-sand-200 bg-forest-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-300" />
              <div>
                <h3 className="font-bold text-base sm:text-lg">Your Order Cart</h3>
                <p className="text-xs text-sage-200">{store.name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-forest-700 text-sage-200 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-forest-900">Order Placed Successfully!</h4>
                <p className="text-xs text-charcoal-600 max-w-xs mx-auto">
                  The vendor has received your order details. Notification sent!
                </p>
              </div>
            ) : showUPIScreen ? (
              <div className="text-center py-4 space-y-4">
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-300 inline-block">
                  <QRCodeSVG 
                    value={`upi://pay?pa=${store.upiId}&pn=${encodeURIComponent(store.name)}&am=${cartTotal}&cu=INR`}
                    size={180}
                  />
                  <p className="text-xs font-mono font-bold text-forest-900 mt-2">
                    {store.upiId}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-forest-900 text-lg">Scan & Pay ₹{cartTotal}</h4>
                  <p className="text-xs text-charcoal-500 mt-1">
                    Scan with Google Pay, PhonePe, Paytm or BHIM UPI
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSimulateUPIPayment}
                    className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <span>Simulate Payment Completed (Demo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowUPIScreen(false)}
                    className="w-full mt-2 py-2 text-xs text-charcoal-500 hover:text-charcoal-800 font-medium"
                  >
                    Back to Order Summary
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-sand-200 text-charcoal-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-charcoal-700">Your cart is empty</h4>
                <p className="text-xs text-charcoal-400 max-w-xs mx-auto">
                  Add some delicious items from {store.name}'s freshly prepared catalog.
                </p>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="divide-y divide-sand-200">
                  {cart.map(item => (
                    <div key={item.product.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.product.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                          <h4 className="text-sm font-semibold text-charcoal-900 truncate">
                            {item.product.name}
                          </h4>
                        </div>
                        <p className="text-xs text-charcoal-500 font-medium mt-0.5">
                          ₹{item.product.price} / {item.product.unit}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-sand-100 rounded-lg border border-sand-300 p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded text-charcoal-600 hover:bg-white transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-forest-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded text-charcoal-600 hover:bg-white transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[50px]">
                        <p className="text-sm font-bold text-forest-900">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 space-y-3 mt-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-forest-900">
                    Your Contact & Delivery
                  </h5>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('Pickup')}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition ${
                        deliveryType === 'Pickup'
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-white text-charcoal-700 border-sand-300'
                      }`}
                    >
                      Self Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('Home Delivery')}
                      className={`py-2 px-3 rounded-lg font-medium border text-center transition ${
                        deliveryType === 'Home Delivery'
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-white text-charcoal-700 border-sand-300'
                      }`}
                    >
                      Home Delivery
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2 bg-white rounded-lg border border-sand-300 focus:outline-none focus:border-forest-600"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number (e.g. 98112 00000)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs p-2 bg-white rounded-lg border border-sand-300 focus:outline-none focus:border-forest-600"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Buttons */}
          {cart.length > 0 && !orderSuccess && !showUPIScreen && (
            <div className="p-4 sm:p-5 border-t border-sand-200 bg-sand-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-charcoal-600">Total Payable:</span>
                <span className="text-xl font-extrabold text-forest-900">₹{cartTotal}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </button>

                <button
                  onClick={() => setShowUPIScreen(true)}
                  className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <QrCode className="w-4 h-4 text-gold-300" />
                  <span>Pay Now with UPI QR</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
