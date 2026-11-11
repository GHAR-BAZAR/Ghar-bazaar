import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  KeyRound,
  RotateCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, Language } from '../types';

export const AuthPage: React.FC = () => {
  const { login, setUserRole, setUserLanguage, userRole, userLanguage, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9811245890');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole || 'vendor');
  const [selectedLang, setSelectedLang] = useState<Language>(userLanguage || 'hi');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      login(`+91 ${phoneNumber}`, selectedRole);
      setUserRole(selectedRole);
      setUserLanguage(selectedLang);

      if (selectedRole === 'vendor') {
        navigate('/dashboard');
      } else if (selectedRole === 'shg_member') {
        navigate('/shg');
      } else {
        navigate('/explore');
      }
    }, 600);
  };

  const handleAutoFillOtp = () => {
    setOtp('123456');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-premium space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 text-gold-300 flex items-center justify-center mx-auto shadow-md">
            <Store className="w-6 h-6 text-gold-300" />
          </div>
          <h2 className="font-display font-black text-2xl text-forest-950">
            Welcome to Ghar Bazaar
          </h2>
          <p className="text-xs text-charcoal-500">
            Sign in with your mobile number to access your storefront or manage orders.
          </p>
        </div>

        {/* STEP 1: Phone & Persona Selection */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            
            {/* User Persona Selector */}
            <div>
              <label className="font-bold text-charcoal-800 block mb-1.5">
                Select Your Profile Type*
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'vendor', label: '🏪 Vendor', sub: 'Thela / Kitchen' },
                  { role: 'customer', label: '🛍️ Customer', sub: 'Order Local' },
                  { role: 'shg_member', label: '👥 SHG', sub: 'Collective' },
                ].map(item => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role as UserRole)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      selectedRole === item.role
                        ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                        : 'bg-sand-50 text-charcoal-700 border-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedRole === item.role ? 'text-sage-200' : 'text-charcoal-400'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="font-bold text-charcoal-800 block mb-1">
                Indian Mobile Number*
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-charcoal-500 font-bold text-xs">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98112 45890"
                  className="w-full pl-12 pr-4 py-2.5 bg-sand-50 rounded-xl border border-sand-300 font-bold text-sm text-forest-950 focus:outline-none focus:border-forest-600"
                />
              </div>
              <span className="text-[10px] text-charcoal-400 mt-1 block">
                Demo default number pre-filled for convenience.
              </span>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="font-bold text-charcoal-800 block mb-1.5">
                Preferred App Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'en', label: 'English' },
                  { code: 'hinglish', label: 'Hinglish' },
                ].map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setSelectedLang(l.code as Language)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold border text-center transition ${
                      selectedLang === l.code
                        ? 'bg-forest-50 border-forest-600 text-forest-900 font-bold'
                        : 'bg-sand-50 border-sand-300 text-charcoal-600'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length < 10}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2 mt-4"
            >
              <span>{isLoading ? 'Sending Demo OTP...' : 'Get Demo OTP'}</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP Entry */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs animate-fade-in">
            <div className="text-center p-3 bg-sand-50 rounded-2xl border border-sand-200">
              <span className="text-charcoal-600">OTP sent to: </span>
              <span className="font-bold text-forest-950 font-mono">+91 {phoneNumber}</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-charcoal-800">Enter 6-Digit OTP*</label>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="text-[11px] font-bold text-forest-800 underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-gold-500" />
                  <span>Auto-fill (123456)</span>
                </button>
              </div>

              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="1 2 3 4 5 6"
                className="w-full text-center text-xl font-mono font-bold tracking-widest py-3 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600 text-forest-950"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Verifying...' : 'Verify & Enter Platform'}</span>
              <CheckCircle2 className="w-4 h-4 text-gold-300" />
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full py-2 text-center text-charcoal-500 hover:text-charcoal-800 text-xs font-semibold"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        {/* Security badge */}
        <div className="pt-2 text-center text-[10px] text-charcoal-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
          <span>Simulated local OTP verification • No SMS charges</span>
        </div>

      </div>
    </div>
  );
};
