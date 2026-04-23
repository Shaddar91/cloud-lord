// Contract D5: well-defined contact-form submit handler.
// Component 42 (E14): wires Contact form to Blazar.
//
// Flow:
//   1. GET  /nonce    -> { nonce }       (server HMAC, 5-min TTL)
//   2. POST /contact  with { ...fields, nonce }
//
// Server behaviors:
//   - 200/201: submission accepted, mail queued.
//   - 204: silent reject (honeypot hit or per-IP/global rate limit).
//          Treated as "ok" client-side so we never reveal the block.
//   - 4xx/5xx: surfaced as an error for the UI.

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.cloud-lord.com';

export async function fetchNonce() {
  const res = await fetch(`${API_BASE}/nonce`, {
    method: 'GET',
    credentials: 'omit',
  });
  if (!res.ok) throw new Error(`nonce fetch failed: ${res.status}`);
  const data = await res.json();
  if (!data || !data.nonce) throw new Error('nonce fetch: missing nonce in response');
  return data.nonce;
}

export async function submitInquiry(fields = {}) {
  const {
    name,
    email,
    subject,
    message,
    honeypot,
    interests = [],
  } = fields;

  if (!email || !message) {
    return { ok: false, mode: 'validation', error: 'email and message are required' };
  }

  // Derive subject from interests if caller didn't pass one explicitly.
  const derivedSubject =
    subject ||
    (interests.length > 0
      ? `Inquiry: ${interests.slice(0, 3).join(' · ')}${interests.length > 3 ? ' + more' : ''}`
      : 'Inquiry from cloud-lord.com');

  const nonce = await fetchNonce();

  const payload = {
    name,
    email,
    subject: derivedSubject,
    message,
    interests,
    honeypot,
    nonce,
  };

  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      'x-nonce': nonce,
    },
    body: JSON.stringify(payload),
  });

  // Silent-reject path: honeypot or rate-limit. Server answers 204.
  if (res.status === 204) {
    return { ok: true, mode: 'silent' };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`submit failed: ${res.status} ${text}`);
  }

  const data = await res.json().catch(() => ({}));
  return { ok: true, mode: 'sent', data };
}

export default submitInquiry;
