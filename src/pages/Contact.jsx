import { useEffect, useRef, useState } from 'react';
import { Box, Container, Alert, CircularProgress } from '@mui/material';
import { tokens } from '../theme';
import submitInquiry from '../lib/contactSubmit';
import { track, trackGoal, GOALS } from '../lib/tracking';

const INTERESTS = [
  'Platform level-up / upgrade',
  'Automation (CI/CD, IaC)',
  'Cloud migration',
  'DevOps / cloud architecture',
  'Kubernetes platforms',
  'Data pipelines & messaging (Kafka / RabbitMQ)',
  'AI systems & integration',
  'Company-wide AI adoption & standards',
  'SIEM / security tooling',
  'Other / not sure yet',
];

const labelSx = {
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.fg3,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  mb: '14px',
  display: 'block',
};

const inputSx = {
  width: '100%',
  background: tokens.bg,
  border: `1px solid ${tokens.line}`,
  borderRadius: '6px',
  padding: '12px 14px',
  color: tokens.fg,
  fontFamily: tokens.body,
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 140ms ease',
  '&:focus': { borderColor: tokens.accent },
};

const Contact = () => {
  const [interests, setInterests] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { severity, text }
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const showStatus = (severity, text) => {
    setStatus({ severity, text });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStatus(null), 5000);
  };

  const resetForm = () => {
    setInterests([]);
    setEmail('');
    setMessage('');
    setHp('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (hp) {
      // Client-side honeypot short-circuit. Server will also silently drop.
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const result = await submitInquiry({
        email,
        message,
        interests,
        honeypot: hp,
      });
      if (result && result.ok) {
        // D1: contact-submit conversion event (queued into _paq; fires
        // once Matomo init + consent land).
        track('Contact', 'Submit');
        trackGoal(GOALS.CONTACT_SUBMIT);
        showStatus('success', 'Thanks — your inquiry is on its way. I reply within one business day.');
        resetForm();
      } else {
        showStatus('error', (result && result.error) || 'Something went wrong, please try again later.');
      }
    } catch (err) {
      // Network or 5xx — generic message, no internals leaked.
      showStatus('error', 'Something went wrong, please try again later.');
      if (typeof console !== 'undefined') {
        // eslint-disable-next-line no-console
        console.error('contact submit failed:', err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{ py: { xs: '56px', md: '96px' } }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' },
            gap: { xs: '40px', md: '64px' },
            alignItems: 'center',
          }}
        >
          <Box>
            <Box
              component="h2"
              sx={{
                fontFamily: tokens.display,
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                m: 0,
                mb: '20px',
                maxWidth: '14ch',
                color: tokens.fg,
              }}
            >
              Need someone who can turn your cloud into{' '}
              <Box component="span" sx={{ color: tokens.accent, fontStyle: 'italic', fontWeight: 500 }}>
                a platform?
              </Box>
            </Box>
            <Box component="p" sx={{ fontSize: 16, color: tokens.fg2, m: 0, mb: '28px', maxWidth: '48ch' }}>
              Tick what you&rsquo;re thinking about, add a few lines, and send it over. Inquiries go to{' '}
              <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>
                engineering@cloud-lord.com
              </Box>
              . I reply within one business day.
            </Box>

            <Box
              sx={{
                background: tokens.bg2,
                border: `1px solid ${tokens.line}`,
                borderRadius: '10px',
                p: '28px',
                fontFamily: tokens.mono,
                fontSize: 13,
              }}
            >
              {[
                ['inquiries', <Box component="a" href="mailto:engineering@cloud-lord.com" data-track="mailto-click" onClick={() => { track('Outbound', 'Email'); trackGoal(GOALS.OUTBOUND_EMAIL); }} sx={{ color: tokens.fg, '&:hover': { color: tokens.accent } }} key="e">engineering@cloud-lord.com</Box>],
                ['personal', <Box component="a" href="mailto:tomislav@cloud-lord.com" data-track="mailto-click" onClick={() => { track('Outbound', 'Email'); trackGoal(GOALS.OUTBOUND_EMAIL); }} sx={{ color: tokens.fg, '&:hover': { color: tokens.accent } }} key="p">tomislav@cloud-lord.com</Box>],
                ['linkedin', <Box component="a" href="https://www.linkedin.com/in/tomislav-ivanovic-124b13115" target="_blank" rel="noopener noreferrer" data-track="linkedin-click" onClick={() => { track('Outbound', 'LinkedIn'); trackGoal(GOALS.OUTBOUND_LINKEDIN); }} sx={{ color: tokens.fg, '&:hover': { color: tokens.accent } }} key="l">/in/tomislav-ivanovic</Box>],
                ['github', <Box component="a" href="https://github.com/Shaddar91" target="_blank" rel="noopener noreferrer" data-track="github-click" onClick={() => { track('Outbound', 'GitHub'); trackGoal(GOALS.OUTBOUND_GITHUB); }} sx={{ color: tokens.fg, '&:hover': { color: tokens.accent } }} key="g">@Shaddar91</Box>],
                ['based in', <span key="b" style={{ color: tokens.fg }}>Belgrade, Serbia · CET</span>],
                ['works with', <span key="w" style={{ color: tokens.fg }}>Anywhere, any timezone</span>],
              ].map(([label, node], idx) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    py: '12px',
                    borderTop: idx === 0 ? 'none' : `1px solid ${tokens.line}`,
                    pt: idx === 0 ? 0 : '12px',
                  }}
                >
                  <Box component="b" sx={{ color: tokens.fg3, fontWeight: 400 }}>{label}</Box>
                  <Box component="span">{node}</Box>
                </Box>
              ))}
              <Box
                sx={{
                  mt: '20px',
                  pt: '20px',
                  borderTop: `1px solid ${tokens.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: tokens.mono,
                  fontSize: 12,
                  color: tokens.fg2,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: tokens.accent, boxShadow: `0 0 10px ${tokens.accent}` }} />
                Available now &middot; taking one engagement
              </Box>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              background: tokens.bg2,
              border: `1px solid ${tokens.line}`,
              borderRadius: '10px',
              p: { xs: '20px', md: '32px' },
            }}
          >
            {/* Honeypot — visually hidden, screen-reader hidden, tab-skipped */}
            <Box
              component="input"
              type="text"
              name="company"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: '-10000px',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
              }}
            />
            <Box component="label" sx={labelSx}>// What are you thinking about?</Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: '10px',
                mb: '24px',
              }}
            >
              {INTERESTS.map((value) => {
                const checked = interests.includes(value);
                return (
                  <Box
                    component="label"
                    key={value}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      border: `1px solid ${checked ? tokens.accentDim : tokens.line}`,
                      borderRadius: '6px',
                      fontFamily: tokens.mono,
                      fontSize: '12.5px',
                      color: checked ? tokens.fg : tokens.fg2,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'border-color 140ms ease, color 140ms ease, background 140ms ease',
                      background: checked ? `color-mix(in oklab, ${tokens.accent} 6%, transparent)` : 'transparent',
                      '&:hover': { borderColor: tokens.line2, color: tokens.fg },
                    }}
                  >
                    <Box
                      component="input"
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleInterest(value)}
                      sx={{
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        width: 14,
                        height: 14,
                        border: `1px solid ${tokens.line2}`,
                        borderRadius: '3px',
                        background: checked ? tokens.accent : tokens.bg,
                        display: 'grid',
                        placeItems: 'center',
                        m: 0,
                        cursor: 'pointer',
                        flexShrink: 0,
                        '&:checked': { borderColor: tokens.accent },
                      }}
                    />
                    {value}
                  </Box>
                );
              })}
            </Box>

            <Box component="label" sx={labelSx}>// Your email</Box>
            <Box sx={{ mb: '16px' }}>
              <Box
                component="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                sx={inputSx}
              />
            </Box>

            <Box component="label" sx={labelSx}>// What&rsquo;s the situation?</Box>
            <Box sx={{ mb: '16px' }}>
              <Box
                component="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A few sentences about the stack, the team size, and what's broken or planned."
                required
                sx={{ ...inputSx, minHeight: 110, lineHeight: 1.55, resize: 'vertical' }}
              />
            </Box>

            {status && (
              <Box sx={{ mb: '12px' }}>
                <Alert severity={status.severity} variant="outlined" sx={{ fontFamily: tokens.body, fontSize: 13 }}>
                  {status.text}
                </Alert>
              </Box>
            )}

            <Box
              component="button"
              type="submit"
              data-track="contact-submit"
              disabled={submitting}
              sx={{
                width: '100%',
                fontFamily: tokens.mono,
                fontSize: 13,
                padding: '13px 18px',
                background: tokens.accent,
                color: tokens.bg,
                border: 'none',
                borderRadius: '6px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                transition: 'background 140ms ease, opacity 140ms ease',
                mt: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                '&:hover': { background: submitting ? tokens.accent : tokens.fg },
                '&:disabled': { cursor: 'not-allowed' },
              }}
            >
              {submitting && <CircularProgress size={16} thickness={5} sx={{ color: tokens.bg }} />}
              {submitting ? 'Sending…' : 'Send inquiry →'}
            </Box>
            <Box
              sx={{
                fontFamily: tokens.mono,
                fontSize: 11,
                color: tokens.fg3,
                mt: '12px',
                textAlign: 'center',
              }}
            >
              Sent to engineering@cloud-lord.com &middot; reply within 1 business day
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
