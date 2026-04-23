import { useEffect, useState } from 'react';
import { Snackbar, Alert, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../theme';

const STORAGE_KEY = 'matomo-consent';

const ConsentBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timerId;
    const maybeOpen = () => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored === null) {
        timerId = window.setTimeout(() => setOpen(true), 500);
      }
    };
    maybeOpen();

    const onReopen = () => {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_e) { /* ignore */ }
      setOpen(true);
    };
    window.addEventListener('cloudlord:reopen-consent', onReopen);

    return () => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener('cloudlord:reopen-consent', onReopen);
    };
  }, []);

  const record = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_e) { /* ignore */ }
    if (typeof window !== 'undefined') {
      window._paq = window._paq || [];
      if (value === 'accepted') window._paq.push(['rememberConsentGiven']);
      else window._paq.push(['forgetConsentGiven']);
    }
    setOpen(false);
  };

  const onAccept = () => record('accepted');
  const onReject = () => record('rejected');

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ maxWidth: 520, width: { xs: 'calc(100% - 32px)', sm: 480 } }}
    >
      <Alert
        severity="info"
        role="dialog"
        aria-label="Cookie consent"
        icon={false}
        sx={{
          background: tokens.bg2,
          border: `1px solid ${tokens.line2}`,
          borderRadius: '10px',
          color: tokens.fg,
          fontFamily: tokens.body,
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          '& .MuiAlert-message': { width: '100%' },
        }}
        action={
          <IconButton
            aria-label="Reject cookies"
            size="small"
            onClick={onReject}
            sx={{ color: tokens.fg3, '&:hover': { color: tokens.accent } }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <Box
          sx={{
            fontFamily: tokens.mono,
            fontSize: 11,
            color: tokens.fg3,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            mb: '8px',
          }}
        >
          Privacy choice
        </Box>
        <Box sx={{ fontSize: '13.5px', color: tokens.fg2, lineHeight: 1.55, mb: '16px' }}>
          We use cookies to understand how this site is used. Data is stored on our own server and never shared with third parties.{' '}
          <Box
            component={RouterLink}
            to="/privacy"
            sx={{ color: tokens.accent, textDecoration: 'none', '&:hover': { color: tokens.fg } }}
          >
            Read the privacy policy &rarr;
          </Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <Box
            component="button"
            type="button"
            onClick={onReject}
            sx={{
              fontFamily: tokens.mono,
              fontSize: 13,
              padding: '10px 14px',
              background: 'transparent',
              color: tokens.fg,
              border: `1px solid ${tokens.line2}`,
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              transition: 'border-color 140ms ease, color 140ms ease',
              '&:hover, &:focus-visible': { borderColor: tokens.accent, color: tokens.accent, outline: 'none' },
            }}
          >
            Reject
          </Box>
          <Box
            component="button"
            type="button"
            onClick={onAccept}
            sx={{
              fontFamily: tokens.mono,
              fontSize: 13,
              padding: '10px 14px',
              background: 'transparent',
              color: tokens.fg,
              border: `1px solid ${tokens.line2}`,
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              transition: 'border-color 140ms ease, color 140ms ease',
              '&:hover, &:focus-visible': { borderColor: tokens.accent, color: tokens.accent, outline: 'none' },
            }}
          >
            Accept
          </Box>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default ConsentBanner;
