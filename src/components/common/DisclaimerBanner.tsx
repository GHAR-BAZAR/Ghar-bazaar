import React, { useState } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';

interface Props {
  featureName?: string;
  backendNeeded?: string;
}

export const DisclaimerBanner: React.FC<Props> = ({ 
  featureName = 'This feature', 
  backendNeeded = 'an AI LLM/Vision pipeline, live Banking/UPI APIs, or government databases'
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sand-200/80 border border-sand-300 rounded-xl p-3 sm:p-3.5 mb-6 text-xs sm:text-sm text-charcoal-700 flex items-start justify-between gap-3 shadow-sm">
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-forest-700 mt-0.5 shrink-0" />
        <div>
          <span className="font-semibold text-forest-900">Prototype Demonstration: </span>
          <span>
            {featureName} utilizes high-fidelity client-side simulation. In production, this securely connects to {backendNeeded}. No real funds or personal data are transmitted.
          </span>
        </div>
      </div>
      <button 
        onClick={() => setDismissed(true)}
        className="text-charcoal-400 hover:text-charcoal-700 p-0.5 rounded transition"
        title="Dismiss note"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
