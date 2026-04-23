// Contract D5: well-defined contact-form submit handler.
// Component 42 (E14) will swap the mailto fallback for a Blazar POST.
//
// Signature:
//   submitInquiry({ interests, email, message }) -> Promise<{ ok, mode }>
// Current implementation opens the user's mail client (matches the design
// reference). Future Blazar-backed revision will fetch
// `https://api.cloud-lord.com/nonce` and POST to
// `https://api.cloud-lord.com/contact` instead.

export async function submitInquiry({ interests = [], email, message }) {
  if (!email || !message) {
    return { ok: false, mode: 'validation', error: 'email and message are required' };
  }

  const subject =
    interests.length > 0
      ? `Inquiry: ${interests.slice(0, 3).join(' · ')}${interests.length > 3 ? ' + more' : ''}`
      : 'Inquiry from cloud-lord.com';

  const bodyLines = [
    'Interests:',
    interests.length > 0 ? interests.map((i) => `  - ${i}`).join('\n') : '  (none selected)',
    '',
    `From: ${email}`,
    '',
    'Message:',
    message,
    '',
    '---',
    'Sent from cloud-lord.com',
  ];

  const mailto =
    'mailto:engineering@cloud-lord.com' +
    '?subject=' +
    encodeURIComponent(subject) +
    '&body=' +
    encodeURIComponent(bodyLines.join('\n'));

  if (typeof window !== 'undefined') {
    window.location.href = mailto;
  }

  return { ok: true, mode: 'mailto' };
}

export default submitInquiry;
