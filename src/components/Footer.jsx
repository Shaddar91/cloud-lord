import { Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { tokens } from '../theme';
import { track, trackGoal, GOALS } from '../lib/tracking';

const linkSx = {
  color: tokens.fg2,
  fontFamily: tokens.mono,
  fontSize: 12,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': { color: tokens.accent },
};

const Footer = () => {
  const openPrivacySettings = (e) => {
    e.preventDefault();
    // Clear stored consent so the banner re-shows via ConsentBanner's logic.
    try {
      localStorage.removeItem('matomo-consent');
      localStorage.removeItem('cl_consent_v1');
    } catch (_err) { /* ignore storage errors */ }
    window.dispatchEvent(new CustomEvent('cloudlord:reopen-consent'));
  };

  const onLinkedin = () => { track('Outbound', 'LinkedIn'); trackGoal(GOALS.OUTBOUND_LINKEDIN); };
  const onGithub = () => { track('Outbound', 'GitHub'); trackGoal(GOALS.OUTBOUND_GITHUB); };
  const onEmail = () => { track('Outbound', 'Email'); trackGoal(GOALS.OUTBOUND_EMAIL); };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${tokens.line}`,
        py: 4,
        fontFamily: tokens.mono,
        fontSize: 12,
        color: tokens.fg3,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Box>&copy; {new Date().getFullYear()} cloud-lord.com &middot; built and hosted by t. ivanovic &middot; Belgrade</Box>
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Box
              component="a"
              href="https://www.linkedin.com/in/tomislav-ivanovic-124b13115"
              target="_blank"
              rel="noopener noreferrer"
              data-track="linkedin-click"
              onClick={onLinkedin}
              sx={linkSx}
            >
              linkedin
            </Box>
            <Box
              component="a"
              href="https://github.com/Shaddar91"
              target="_blank"
              rel="noopener noreferrer"
              data-track="github-click"
              onClick={onGithub}
              sx={linkSx}
            >
              github
            </Box>
            <Box
              component="a"
              href="mailto:engineering@cloud-lord.com"
              data-track="mailto-click"
              onClick={onEmail}
              sx={linkSx}
            >
              email
            </Box>
            <Box component={RouterLink} to="/privacy" sx={linkSx}>
              privacy
            </Box>
            <Box
              component="a"
              href="/privacy#choices"
              onClick={openPrivacySettings}
              sx={linkSx}
            >
              privacy settings
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
