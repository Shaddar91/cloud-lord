// Thin wrapper around Matomo's `window._paq` command queue.
// Safe to call before Matomo's JS loads: commands are queued and flushed
// the moment the tracker initializes (with user consent from ConsentBanner).
//
// Conversion events (D1-D5) call `track(category, action)` / `trackGoal(id)`.
// Goal IDs are placeholders — they are mapped to real Matomo-admin goals
// by the C35 Matomo wizard on the server side.

export function track(category, action, name, value) {
  if (typeof window === 'undefined') return;
  window._paq = window._paq || [];
  const cmd = ['trackEvent', category, action, name, value].filter(
    (x) => x !== undefined
  );
  window._paq.push(cmd);
}

export function trackGoal(goalId, value) {
  if (typeof window === 'undefined') return;
  window._paq = window._paq || [];
  const cmd = ['trackGoal', goalId, value].filter((x) => x !== undefined);
  window._paq.push(cmd);
}

// Placeholder goal IDs — operator remaps these in Matomo UI.
// TODO: map to real goal IDs after C35 Matomo wizard.
export const GOALS = {
  CONTACT_SUBMIT: 1,
  CV_DOWNLOAD: 2,
  OUTBOUND_GITHUB: 3,
  OUTBOUND_LINKEDIN: 4,
  OUTBOUND_EMAIL: 5,
};

export default { track, trackGoal, GOALS };
