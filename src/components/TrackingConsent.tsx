'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'jh_analytics_consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentState = 'granted' | 'denied';

function applyConsent(consent: ConsentState) {
  const payload = {
    analytics_storage: consent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  } as const;

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', payload);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'consent_update',
      ...payload,
    });
  }
}

export default function TrackingConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return (window.localStorage.getItem(CONSENT_KEY) as ConsentState | null) ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!consent) {
      return;
    }

    applyConsent(consent);
  }, [consent]);

  const handleDecision = (nextConsent: ConsentState) => {
    setConsent(nextConsent);
    try {
      window.localStorage.setItem(CONSENT_KEY, nextConsent);
    } catch {
      // Ignore storage failures (private mode / blocked storage), keep in-memory consent.
    }
    applyConsent(nextConsent);
  };

  if (consent) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-[220] mx-auto max-w-3xl rounded-2xl border border-zinc-800/80 bg-black/90 p-4 backdrop-blur-xl md:p-5">
      <p className="font-mono text-[11px] leading-relaxed uppercase tracking-[0.14em] text-zinc-300">
        We use cookies to improve your experience, analyze traffic, and personalize content. You can
        accept all cookies or reject non-essential cookies.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleDecision('granted')}
          className="min-h-10 rounded-full border border-lime-300/45 bg-lime-300/10 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-lime-200 transition-colors hover:bg-lime-300/20"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => handleDecision('denied')}
          className="min-h-10 rounded-full border border-zinc-700 px-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}
