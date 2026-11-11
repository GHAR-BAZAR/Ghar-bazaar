import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  onTranscriptChange: (text: string) => void;
  value: string;
  placeholder?: string;
}

export const VoiceRecorder: React.FC<Props> = ({ 
  onTranscriptChange, 
  value, 
  placeholder = "Describe your business, specialty items, prices, and secret recipes in Hindi or English..."
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [browserSupport, setBrowserSupport] = useState(true);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Default to Hindi-India with fallback

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          onTranscriptChange(value ? `${value} ${currentTranscript}` : currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setBrowserSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [value, onTranscriptChange]);

  const toggleRecording = () => {
    if (!browserSupport) {
      // Simulate recording if browser speech not supported
      if (!isRecording) {
        setIsRecording(true);
        setTimeout(() => {
          simulateDemoVoice('hi-1');
          setIsRecording(false);
        }, 3000);
      } else {
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Speech start error:', err);
        // Fallback simulation
        setIsRecording(true);
        setTimeout(() => {
          simulateDemoVoice('hi-1');
          setIsRecording(false);
        }, 3000);
      }
    }
  };

  const demoVoiceNotes = [
    {
      id: 'hi-1',
      title: '🎙️ Home Kitchen (Hindi)',
      sampleText: 'Mera naam Anjali Sharma hai. Hum Indirapuram mein rehte hain aur shuddh ghar ka bana khana banate hain. Hamari special Dal Makhani aur Rajma Chawal thali hai. Hum taaza chakki ke aate ke phulke banate hain pure desi ghee ke saath. Price thali ka 180 rupaye hai aur roz subah 11 baje se sham 9 baje tak order lete hain.'
    },
    {
      id: 'hi-2',
      title: '🎙️ Samosa Thela (Street Food)',
      sampleText: 'Hum Chandni Chowk mein 25 saal se Sharma Ji ke mashhoor khasta samosa aur bedmi puri bechte hain. Samosa mein kaju aur kishmish ki filling hoti hai aur saath mein teekhi hari chutney aur mithi sonth milti hai. Ek plate 40 rupaye ki hai. Kulhad wali adrak elaichi chai 25 rupaye ki hai.'
    },
    {
      id: 'hi-3',
      title: '🎙️ Mahila SHG Crafts',
      sampleText: 'Hamara Sakhi Mahila SHG collective hai Jaipur mein. Hum 18 gaon ki mahilayein milkar handmade sanganeri block print cotton tote bags aur terracota ke designer diye banate hain. Sab kuch natural colors se bana hai. Bags 350 rupaye ke hain aur diye ka set 240 rupaye ka hai.'
    }
  ];

  const simulateDemoVoice = (id: string) => {
    const selected = demoVoiceNotes.find(d => d.id === id);
    if (!selected) return;

    setActivePreset(id);
    setIsRecording(true);

    // Progressive typing effect to simulate voice dictation
    const fullText = selected.sampleText;
    let currentIdx = 0;
    onTranscriptChange('');

    const interval = setInterval(() => {
      currentIdx += 6;
      if (currentIdx >= fullText.length) {
        onTranscriptChange(fullText);
        setIsRecording(false);
        clearInterval(interval);
      } else {
        onTranscriptChange(fullText.slice(0, currentIdx));
      }
    }, 40);
  };

  return (
    <div className="space-y-4">
      {/* Mic Record Centerpiece */}
      <div className="bg-sand-50 p-6 rounded-3xl border-2 border-forest-200 text-center relative overflow-hidden">
        
        {isRecording && (
          <div className="absolute inset-0 bg-forest-800/5 backdrop-blur-xs flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 h-12">
              <span className="w-1.5 bg-forest-700 rounded-full sound-wave-bar" />
              <span className="w-1.5 bg-forest-700 rounded-full sound-wave-bar" />
              <span className="w-1.5 bg-forest-700 rounded-full sound-wave-bar" />
              <span className="w-1.5 bg-forest-700 rounded-full sound-wave-bar" />
              <span className="w-1.5 bg-forest-700 rounded-full sound-wave-bar" />
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center">
          <button
            type="button"
            onClick={toggleRecording}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-xl ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-100'
                : 'bg-forest-800 hover:bg-forest-900 text-white hover:scale-105'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8 text-gold-300" />}
          </button>

          <p className="mt-4 font-bold text-sm text-forest-950">
            {isRecording ? 'Listening... Speak in Hindi or English' : 'Tap to Record Your Business Story'}
          </p>
          <p className="text-xs text-charcoal-500 max-w-sm mt-1">
            Speak naturally: describe what you make, your ingredients, prices, and where you sell.
          </p>
        </div>
      </div>

      {/* Preset Indian Voice Note Simulators */}
      <div className="bg-white p-3.5 rounded-2xl border border-sand-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-charcoal-700">
          <span className="flex items-center gap-1.5 text-forest-900 font-bold">
            <Volume2 className="w-3.5 h-3.5 text-gold-500" />
            Quick Test: Simulated Voice Recordings
          </span>
          <span className="text-[10px] text-charcoal-400">1-Click Voice Simulation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {demoVoiceNotes.map(demo => (
            <button
              key={demo.id}
              type="button"
              onClick={() => simulateDemoVoice(demo.id)}
              className={`p-2.5 rounded-xl border text-left text-xs transition ${
                activePreset === demo.id
                  ? 'border-forest-600 bg-forest-50 font-bold text-forest-900 shadow-sm'
                  : 'border-sand-300 bg-sand-50/50 hover:bg-sand-100 text-charcoal-700'
              }`}
            >
              <div className="font-semibold truncate">{demo.title}</div>
              <div className="text-[10px] text-charcoal-400 mt-1 line-clamp-2">
                "{demo.sampleText.slice(0, 60)}..."
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Fallback & Live Transcription Preview */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-charcoal-800">
            Live Voice Transcript / Direct Text Fallback
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onTranscriptChange('')}
              className="text-xs text-charcoal-400 hover:text-red-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3.5 text-xs sm:text-sm bg-white rounded-2xl border border-sand-300 focus:outline-none focus:border-forest-600 focus:ring-2 focus:ring-forest-100 leading-relaxed text-charcoal-900"
        />
      </div>

    </div>
  );
};
