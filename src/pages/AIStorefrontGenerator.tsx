import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Upload, 
  Mic, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Image as ImageIcon,
  Tag,
  DollarSign,
  Share2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';
import { VoiceRecorder } from '../components/common/VoiceRecorder';
import { BusinessCategory, Language, Product } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const AIStorefrontGenerator: React.FC = () => {
  const { createNewStore, userLanguage, userPhone } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Business details
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('Street Food');
  const [cityLocation, setCityLocation] = useState('Chandni Chowk, Delhi');
  const [ownerName, setOwnerName] = useState('Ram Prasad Sharma');
  const [prefLanguage, setPrefLanguage] = useState<Language>(userLanguage || 'hi');

  // Step 2: Product images
  const samplePhotoPresets = [
    {
      name: 'Desi Ghee Samosa',
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dal Makhani & Jeera Rice',
      url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Kulhad Wali Chai',
      url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tawa Phulka Pack',
      url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mango Pickle Jar',
      url: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80',
    }
  ];

  const [uploadedImages, setUploadedImages] = useState<string[]>([
    samplePhotoPresets[0].url,
    samplePhotoPresets[1].url,
    samplePhotoPresets[2].url
  ]);

  // Step 3: Voice Note
  const [voiceTranscript, setVoiceTranscript] = useState(
    'Hum pure desi ghee ke khasta samosa aur urad dal bedmi puri banate hain. Samosa 40 rupaye plate hai chutney ke saath aur bedmi subzi 80 rupaye ki plate hai. Roz subah taaza banta hai.'
  );

  // Step 4: AI Simulation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGenerationStage, setAiGenerationStage] = useState(0);
  const [generatedBrand, setGeneratedBrand] = useState<{
    name: string;
    tagline: string;
    story: string;
    products: Array<{
      name: string;
      hindiName: string;
      desc: string;
      price: number;
      cost: number;
      label: string;
      image: string;
    }>;
  } | null>(null);

  // Step 5: Publishing state
  const [publishedStoreId, setPublishedStoreId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle local image file uploads via standard input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newUrls: string[] = [];
      Array.from(files).slice(0, 5).forEach(file => {
        const url = URL.createObjectURL(file);
        newUrls.push(url);
      });
      setUploadedImages(prev => [...prev, ...newUrls].slice(0, 5));
    }
  };

  const addPresetImage = (url: string) => {
    if (uploadedImages.length < 5 && !uploadedImages.includes(url)) {
      setUploadedImages(prev => [...prev, url]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Run simulated AI reasoning
  const triggerAIGeneration = () => {
    setIsGenerating(true);
    setAiGenerationStage(1);

    setTimeout(() => setAiGenerationStage(2), 900);
    setTimeout(() => setAiGenerationStage(3), 1800);
    setTimeout(() => setAiGenerationStage(4), 2700);

    setTimeout(() => {
      // Produce realistic, context-aware AI results based on user input
      const brandNameGenerated = businessName.trim() 
        ? businessName 
        : category === 'Street Food' 
        ? 'Swad Desi Samosa Express' 
        : category === 'Home Kitchen'
        ? 'Annapurna Ghar Ki Rasoi'
        : 'Virasat Handmade Collectives';

      const taglineGenerated = category === 'Street Food'
        ? 'Har bite mein purani Dilli ka crispy swaad'
        : 'Ghar ka bana taaza bhojan, bina milaawat';

      const storyGenerated = `${ownerName} has been crafting authentic recipes in ${cityLocation}. Every batch is prepared daily using traditional ingredients and zero artificial preservatives.`;

      const aiProducts = [
        {
          name: 'Special Crispy Khasta Samosa (2 Pcs)',
          hindiName: 'देसी घी खस्ता समोसा',
          desc: 'Spiced potato filling with roasted cashews, served with mint-coriander and sweet saunth chutneys.',
          price: 40,
          cost: 16,
          label: 'Crispy & Fresh',
          image: uploadedImages[0] || samplePhotoPresets[0].url
        },
        {
          name: 'Royal Bedmi Puri & Rasedar Aloo Subzi',
          hindiName: 'शाही बेड़मी पूरी और रसेदार आलू',
          desc: 'Slow-simmered spicy potato curry served with 4 puffed urad dal puris.',
          price: 80,
          cost: 32,
          label: 'Breakfast Special',
          image: uploadedImages[1] || samplePhotoPresets[1].url
        },
        {
          name: 'Adrak Elaichi Masala Chai (Kulhad)',
          hindiName: 'अदरक इलायची कुल्हड़ चाय',
          desc: 'Brewed with real milk, crushed hill ginger and green cardamom.',
          price: 25,
          cost: 9,
          label: 'Customer Favorite',
          image: uploadedImages[2] || samplePhotoPresets[2].url
        }
      ];

      setGeneratedBrand({
        name: brandNameGenerated,
        tagline: taglineGenerated,
        story: storyGenerated,
        products: aiProducts
      });

      setIsGenerating(false);
      setCurrentStep(4);
    }, 3600);
  };

  // Step 5: Publish Store
  const handlePublishStore = () => {
    if (!generatedBrand) return;

    const storeId = createNewStore(
      {
        name: generatedBrand.name,
        tagline: generatedBrand.tagline,
        category: category,
        ownerName: ownerName,
        phone: userPhone || '+91 98734 11223',
        location: cityLocation,
        city: cityLocation.split(',')[1]?.trim() || 'India',
        story: generatedBrand.story,
        logoUrl: generatedBrand.products[0].image,
        bannerUrl: generatedBrand.products[1]?.image || generatedBrand.products[0].image,
      },
      generatedBrand.products.map(p => ({
        name: p.name,
        hindiName: p.hindiName,
        description: p.desc,
        price: p.price,
        costToProduce: p.cost,
        imageUrl: p.image,
        category: 'Signature Items',
        unit: 'serving',
        stockQuantity: 30,
        isVeg: true
      }))
    );

    setPublishedStoreId(storeId);
    setCurrentStep(5);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const storePublicUrl = publishedStoreId 
    ? `${window.location.origin}/store/${publishedStoreId}`
    : '';

  const copyUrl = () => {
    if (storePublicUrl) {
      navigator.clipboard.writeText(storePublicUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Wizard Header & Progress Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Voice-First AI Store Builder</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
              "Speak Once, Get a Ready-to-Sell Brand"
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Transform your thela, home kitchen or handmade crafts into a verified digital brand in 5 easy steps.
            </p>
          </div>

          <div className="text-xs font-bold px-3 py-1.5 bg-sand-200 text-forest-950 rounded-xl shrink-0 self-start sm:self-auto">
            Step {currentStep} of 5
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {[
            '1. Details', 
            '2. Photos', 
            '3. Voice Note', 
            '4. AI Branding', 
            '5. Publish & QR'
          ].map((title, idx) => {
            const stepNum = idx + 1;
            const isDone = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;
            return (
              <div key={idx} className="space-y-1.5">
                <div className={`h-2 rounded-full transition-all ${
                  isDone 
                    ? 'bg-emerald-600' 
                    : isCurrent 
                    ? 'bg-forest-800 ring-2 ring-forest-200' 
                    : 'bg-sand-200'
                }`} />
                <div className={`text-[10px] truncate hidden sm:block font-medium ${
                  isCurrent ? 'text-forest-950 font-bold' : 'text-charcoal-400'
                }`}>
                  {title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DisclaimerBanner 
        featureName="AI Storefront Generator"
        backendNeeded="Gemini 1.5 Multimodal Vision API, Whisper / Indic-Bhashini speech-to-text models, and ONDC registry"
      />

      {/* STEP 1: BUSINESS DETAILS */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6 animate-fade-in">
          <div>
            <h2 className="font-bold text-xl text-forest-950">Step 1: Your Business Profile</h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Tell us basic details. If you don't have a brand name yet, our AI will generate one from your voice!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-charcoal-800 block mb-1">
                Business Name <span className="text-charcoal-400 font-normal">(Optional - AI can generate)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sharma Ji Famous Snacks"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 text-xs sm:text-sm font-semibold text-forest-950 focus:outline-none focus:border-forest-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-800 block mb-1">
                Owner / Artisan Name*
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ram Prasad Sharma"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 text-xs sm:text-sm font-semibold text-forest-950 focus:outline-none focus:border-forest-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-800 block mb-1">
                Business Category*
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 text-xs sm:text-sm font-semibold text-forest-950 focus:outline-none focus:border-forest-600"
              >
                <option value="Street Food">Street Food (Thela / Food Cart)</option>
                <option value="Home Kitchen">Home Kitchen (Tiffin / Thali / Cloud)</option>
                <option value="Pickles & Spices">Pickles, Spices & Papads</option>
                <option value="Handicrafts & Art">Handicrafts & Art (Artisans / SHG)</option>
                <option value="Bakery & Sweets">Bakery & Traditional Mithai</option>
                <option value="Traditional Clothing">Traditional Clothing & Handloom</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-800 block mb-1">
                Location & Market*
              </label>
              <input
                type="text"
                placeholder="e.g. Chandni Chowk, Delhi"
                value={cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-sand-50 rounded-xl border border-sand-300 text-xs sm:text-sm font-semibold text-forest-950 focus:outline-none focus:border-forest-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-charcoal-800 block mb-2">
              Preferred Language for Voice & Customer Storefront
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { code: 'hi', label: 'हिन्दी (Hindi)' },
                { code: 'en', label: 'English' },
                { code: 'hinglish', label: 'Hinglish (Mix)' },
                { code: 'mr', label: 'मराठी (Marathi)' },
                { code: 'ta', label: 'தமிழ் (Tamil)' },
              ].map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setPrefLanguage(lang.code as Language)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    prefLanguage === lang.code
                      ? 'bg-forest-800 text-white border-forest-800 shadow-sm'
                      : 'bg-sand-50 text-charcoal-700 border-sand-300 hover:bg-sand-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition"
            >
              <span>Continue to Photos (Step 2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PRODUCT UPLOADS */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-xl text-forest-950">Step 2: Upload 3–5 Product Photos</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Our Multimodal Vision AI will examine your photos to suggest dish names and descriptions.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-forest-50 text-forest-800 rounded-lg border border-forest-200">
              {uploadedImages.length} / 5 photos selected
            </span>
          </div>

          {/* Photo Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-hidden border border-sand-300 aspect-square shadow-sm">
                <img src={img} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-lg opacity-90 hover:opacity-100 transition shadow"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-white font-mono">
                  Photo #{idx + 1}
                </div>
              </div>
            ))}

            {/* Empty upload slot */}
            {uploadedImages.length < 5 && (
              <label className="border-2 border-dashed border-sand-300 hover:border-forest-600 rounded-2xl aspect-square flex flex-col items-center justify-center p-2 text-center cursor-pointer bg-sand-50 hover:bg-forest-50/50 transition">
                <Upload className="w-6 h-6 text-forest-700 mb-1" />
                <span className="text-[11px] font-bold text-forest-900">Upload Photo</span>
                <span className="text-[9px] text-charcoal-400">or click below preset</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Preset Photos for 1-Click Convenience */}
          <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 space-y-2">
            <div className="text-xs font-bold text-forest-900 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-gold-500" />
              <span>Don't have photos handy? Click any authentic Indian demo dish to add:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {samplePhotoPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addPresetImage(preset.url)}
                  disabled={uploadedImages.includes(preset.url) || uploadedImages.length >= 5}
                  className="px-2.5 py-1.5 bg-white hover:bg-sand-100 disabled:opacity-50 text-charcoal-800 rounded-xl text-xs font-medium border border-sand-300 flex items-center gap-1.5 transition"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-forest-700" />
                  <span>+ {preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl border border-sand-300 text-xs font-semibold text-charcoal-600 hover:bg-sand-100 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              disabled={uploadedImages.length === 0}
              className="px-6 py-3 bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition"
            >
              <span>Continue to Voice Recording (Step 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VOICE ONBOARDING */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6 animate-fade-in">
          <div>
            <h2 className="font-bold text-xl text-forest-950">Step 3: Voice Onboarding</h2>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Press the microphone and speak in Hindi or English, or use the 1-click simulated voice notes below.
            </p>
          </div>

          <VoiceRecorder
            value={voiceTranscript}
            onTranscriptChange={(text) => setVoiceTranscript(text)}
          />

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2.5 rounded-xl border border-sand-300 text-xs font-semibold text-charcoal-600 hover:bg-sand-100 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={triggerAIGeneration}
              disabled={!voiceTranscript.trim() || isGenerating}
              className="px-7 py-3.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-premium hover:shadow-glow transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span>{isGenerating ? 'AI Generating Brand...' : 'Generate My Brand with AI ✨'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: AI BRAND GENERATION PREVIEW */}
      {(currentStep === 4 || isGenerating) && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6 animate-fade-in">
          
          {isGenerating ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-forest-50 border-4 border-forest-200 flex items-center justify-center mx-auto text-forest-800 animate-spin">
                <Sparkles className="w-10 h-10 text-gold-500" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-extrabold text-forest-950">
                  Synthesizing Your Digital Brand Identity...
                </h3>
                <div className="space-y-2 text-xs font-medium text-charcoal-600">
                  <div className={`p-2 rounded-xl transition ${aiGenerationStage >= 1 ? 'bg-forest-50 text-forest-900 font-bold' : 'opacity-40'}`}>
                    1. Analyzing voice acoustic tone and extracting menu items...
                  </div>
                  <div className={`p-2 rounded-xl transition ${aiGenerationStage >= 2 ? 'bg-forest-50 text-forest-900 font-bold' : 'opacity-40'}`}>
                    2. Examining uploaded food photos with Multimodal Vision...
                  </div>
                  <div className={`p-2 rounded-xl transition ${aiGenerationStage >= 3 ? 'bg-forest-50 text-forest-900 font-bold' : 'opacity-40'}`}>
                    3. Drafting bilingual descriptions in Hindi and English...
                  </div>
                  <div className={`p-2 rounded-xl transition ${aiGenerationStage >= 4 ? 'bg-forest-50 text-forest-900 font-bold' : 'opacity-40'}`}>
                    4. Computing suggested margins, pricing benchmarks, and labels...
                  </div>
                </div>
              </div>
            </div>
          ) : generatedBrand && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand-200 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    AI Brand Identity Generated
                  </span>
                  <h2 className="font-display font-black text-2xl text-forest-950 mt-1">
                    {generatedBrand.name}
                  </h2>
                  <p className="text-xs text-charcoal-600 italic">
                    "{generatedBrand.tagline}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerAIGeneration}
                    className="px-3 py-1.5 bg-sand-100 hover:bg-sand-200 text-charcoal-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* Story */}
              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 text-xs text-charcoal-700 leading-relaxed">
                <span className="font-bold text-forest-900 block mb-1">Generated Vendor Story:</span>
                {generatedBrand.story}
              </div>

              {/* Generated Products Catalog Preview */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-forest-950">
                  AI-Extracted Catalog, Descriptions & Fair Pricing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedBrand.products.map((item, idx) => (
                    <div key={idx} className="bg-sand-50 rounded-2xl border border-sand-200 overflow-hidden shadow-xs flex flex-col justify-between">
                      <div className="relative h-32">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-gold-400 text-forest-950 text-[10px] font-extrabold rounded-md shadow">
                          {item.label}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-forest-950">{item.name}</h4>
                          <p className="text-[11px] font-semibold text-forest-800">{item.hindiName}</p>
                          <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">{item.desc}</p>
                        </div>

                        <div className="pt-2 border-t border-sand-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-charcoal-400 block">Suggested Price:</span>
                            <span className="text-base font-extrabold text-forest-900">₹{item.price}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-charcoal-400 block">Est. Profit:</span>
                            <span className="text-xs font-bold text-emerald-700">
                              +₹{item.price - item.cost} ({Math.round(((item.price - item.cost) / item.price) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-sand-200">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-sand-300 text-xs font-semibold text-charcoal-600 hover:bg-sand-100 transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Adjust Voice</span>
                </button>

                <button
                  onClick={handlePublishStore}
                  className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold-300" />
                  <span>Publish Store & Generate QR Standee</span>
                </button>
              </div>
            </>
          )}

        </div>
      )}

      {/* STEP 5: STORE PUBLISHED & QR GENERATED */}
      {currentStep === 5 && publishedStoreId && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-premium text-center space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
              Mubarak Ho! Your Digital Store is Live! 🎉
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Customers can now scan your QR code or click your link to order directly on WhatsApp.
            </p>
          </div>

          {/* Generated QR Standee Preview Box */}
          <div className="p-6 bg-sand-50 rounded-3xl border-2 border-forest-300 inline-block shadow-soft">
            <QRCodeSVG 
              value={storePublicUrl}
              size={180}
              level="H"
              includeMargin={true}
            />
            <div className="mt-2 text-xs font-black text-forest-900 uppercase tracking-wider">
              Scan to Order & Pay
            </div>
            <div className="text-[10px] text-charcoal-500 font-mono mt-0.5">
              Powered by Ghar Bazaar
            </div>
          </div>

          {/* Copyable Store URL */}
          <div className="max-w-md mx-auto flex items-center bg-sand-100 rounded-xl p-1.5 border border-sand-300">
            <input 
              type="text" 
              readOnly 
              value={storePublicUrl} 
              className="bg-transparent text-xs text-charcoal-700 px-2 flex-1 focus:outline-none truncate font-mono"
            />
            <button
              onClick={copyUrl}
              className="px-3.5 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-gold-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Final Action Buttons */}
          <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate(`/store/${publishedStoreId}`)}
              className="py-3 px-4 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <ExternalLink className="w-4 h-4 text-gold-300" />
              <span>Open Public Storefront</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="py-3 px-4 bg-sand-200 hover:bg-sand-300 text-forest-950 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
            >
              <span>Go to Vendor Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
