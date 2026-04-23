import { useEffect } from 'react';

// F2 (Component 44) will take this over; the stub mounts the Matomo tracker
// with `requireConsent` so that nothing ships to the analytics server until
// the user clicks Accept on the ConsentBanner.
const TRACKER_URL = 'https://4n4l.cloud-lord.com/matomo.php';
const SCRIPT_URL = 'https://4n4l.cloud-lord.com/matomo.js';
const SITE_ID = '1';

const TrackingProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
