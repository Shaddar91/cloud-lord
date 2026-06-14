import { useEffect } from 'react';

// F2 (Component 44) will take this over; the stub mounts the Matomo tracker
// with `requireConsent` so that nothing ships to the analytics server until
// the user clicks Accept on the ConsentBanner.
// Matomo analytics host is supplied at build time via VITE_MATOMO_HOST
// (e.g. https://analytics.example.com); it is intentionally NOT hardcoded.
// When unset, tracking is a no-op — no tracker URL, no script injection.
const MATOMO_HOST = (import.meta.env.VITE_MATOMO_HOST || '').replace(/\/$/, '');
const SITE_ID = import.meta.env.VITE_MATOMO_SITE_ID || '1';
const TRACKER_URL = MATOMO_HOST ? `${MATOMO_HOST}/matomo.php` : '';
const SCRIPT_URL = MATOMO_HOST ? `${MATOMO_HOST}/matomo.js` : '';

const TrackingProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!MATOMO_HOST) return; //no analytics host configured → tracking disabled

    window._paq = window._paq || [];
    window._paq.push(['requireConsent']);
    window._paq.push(['setTrackerUrl', TRACKER_URL]);
    window._paq.push(['setSiteId', SITE_ID]);
    window._paq.push(['trackPageView']);

    try {
      const existing = localStorage.getItem('matomo-consent');
      if (existing === 'accepted') {
        window._paq.push(['rememberConsentGiven']);
      } else if (existing === 'rejected') {
        window._paq.push(['forgetConsentGiven']);
      }
    } catch (_e) { /* ignore storage errors */ }

    const already = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (!already) {
      const script = document.createElement('script');
      script.async = true;
      script.src = SCRIPT_URL;
      document.head.appendChild(script);
    }
  }, []);

  return <>{children}</>;
};

export default TrackingProvider;
