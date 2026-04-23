import { useEffect, useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { tokens } from '../../theme';

/* F5 stub: real implementation by Component 45 */
const ConsentToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem('matomo-consent');
      setEnabled(value === 'accepted');
    } catch (_e) { /* ignore */ }
  }, []);

  const onChange = (e) => {
    const next = e.target.checked;
    setEnabled(next);
    try {
      localStorage.setItem('matomo-consent', next ? 'accepted' : 'rejected');
    } catch (_e) { /* ignore */ }
    if (typeof window !== 'undefined') {
      window._paq = window._paq || [];
      window._paq.push([next ? 'rememberConsentGiven' : 'forgetConsentGiven']);
    }
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1200);
  };

  return (
    <Box
      sx={{
        background: tokens.bg2,
        border: `1px solid ${tokens.line}`,
        borderRadius: '10px',
        p: '24px 26px',
        my: '18px',
      }}
    >
      <Box
        sx={{
          fontFamily: tokens.mono,
          fontSize: 11,
          color: tokens.fg3,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          mb: '14px',
        }}
      >
        // Analytics
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          mb: '8px',
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: tokens.mono, fontSize: '13.5px', color: tokens.fg }}>
            {enabled ? 'Analytics enabled (cookies on)' : 'Analytics disabled (no tracking)'}
          </Typography>
          <Typography sx={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.fg3, mt: '4px' }}>
            {enabled ? 'Matomo cookies are set on this browser.' : 'No cookies are being set.'}
          </Typography>
        </Box>
        <Switch
          checked={enabled}
          onChange={onChange}
          inputProps={{ 'aria-label': 'Analytics consent toggle' }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: tokens.mono,
          fontSize: 11,
          color: tokens.accent,
          minHeight: 14,
          opacity: savedFlash ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        Saved
      </Typography>
      <Typography
        sx={{ fontFamily: tokens.mono, fontSize: '11.5px', color: tokens.fg3, mt: '12px', lineHeight: 1.5 }}
      >
        Your consent choice is recorded with a timestamp and can be changed or withdrawn at any time using the control above.
      </Typography>
    </Box>
  );
};

export default ConsentToggle;
