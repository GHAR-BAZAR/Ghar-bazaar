import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Download, Printer, Share2, Sparkles } from 'lucide-react';
import { Store } from '../../types';

interface Props {
  store: Store;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<Props> = ({ store, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const storeUrl = `${window.location.origin}/store/${store.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-sand-200 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-forest-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-gold-300 font-bold border border-forest-600">
              {store.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{store.name}</h3>
              <p className="text-xs text-sage-200">Customer Digital QR Standee</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-forest-700/60 transition text-sage-200 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Tent Card View */}
        <div className="p-6 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 border border-forest-200 rounded-full text-forest-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Scan to Order on WhatsApp & Pay UPI</span>
          </div>

          {/* QR Box */}
          <div className="bg-sand-50 p-6 rounded-2xl border-2 border-dashed border-forest-300 inline-block mx-auto shadow-inner">
            <QRCodeSVG 
              value={storeUrl}
              size={190}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: store.logoUrl,
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
            <div className="mt-2 text-xs font-bold text-forest-900 uppercase tracking-wider">
              UPI: {store.upiId}
            </div>
          </div>

          <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
            Place this QR at your counter, thela, or food packaging. Customers can scan without installing any app!
          </p>

          {/* Shareable Link Input */}
          <div className="flex items-center bg-sand-100 rounded-xl p-1.5 border border-sand-300">
            <input 
              type="text" 
              readOnly 
              value={storeUrl}
              className="bg-transparent text-xs text-charcoal-700 px-2 flex-1 focus:outline-none truncate font-mono"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-gold-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-4 bg-sand-200 hover:bg-sand-300 text-charcoal-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-forest-800" />
              <span>Print Counter Standee</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out our digital storefront and order fresh: ${storeUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
