// Contract D5: well-defined contact-form submit handler.
// Component 42 (E14): wires Contact form to Blazar.
//
// Flow:
//   1. GET  /nonce    -> { nonce }       (server HMAC, 5-min TTL)
//   2. POST /contact  with { ...fields, nonce }
//
// Server behaviors:
//   - 2xx: treated as accepted.
//   - Any non-2xx (204 silent-reject, 4xx, 5xx): treated as silent success
//     client-side. The user must NEVER see an error from this path so
//     bots/abusers cannot distinguish a block from a delivery.

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

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
    name = '',
    email,
    subject,
    message,
    interests = [],
    company_address = '',
    website_url = '',
    phone_alt = '',
    fax = '',
  } = fields;

  if (!email || !message) {
    return { ok: false, mode: 'validation', error: 'email and message are required' };
  }

  //Derive subject from interests if caller didn't pass one explicitly.
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
    company_address,
    website_url,
    phone_alt,
    fax,
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

  //Any 2xx → accepted. Anything else (204, 4xx, 5xx) → silent success.
  //The user must NEVER see an error from this path.
  if (res.status >= 200 && res.status <= 299) {
    const data = await res.json().catch(() => ({}));
    return { ok: true, mode: 'sent', data };
  }

  if (typeof console !== 'undefined') {
    console.warn(`contact submit: unexpected status ${res.status}, treating as silent success`);
  }
  return { ok: true, mode: 'silent' };
}

export default submitInquiry;
