import { Box, Card } from '@mui/material';
import { tokens } from '../../theme';

/* F5 stub: real implementation by Component 45 */
const ControllerIdentityCard = () => (
  <Card
    component="dl"
    aria-label="Data controller"
    sx={{
      background: tokens.bg2,
      border: `1px solid ${tokens.line}`,
      borderRadius: '10px',
      p: '22px 26px',
      mx: 0,
      mb: '40px',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '10px 32px',
      fontFamily: tokens.mono,
      fontSize: 13,
      boxShadow: 'none',
    }}
  >
    <Box component="dt" sx={{ color: tokens.fg3, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 11, pt: '2px' }}>
      Operated by
    </Box>
    <Box component="dd" sx={{ m: 0, color: tokens.fg }}>Tomislav Ivanović</Box>
    <Box component="dt" sx={{ color: tokens.fg3, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 11, pt: '2px' }}>
      Based in
    </Box>
    <Box component="dd" sx={{ m: 0, color: tokens.fg }}>Serbia</Box>
    <Box component="dt" sx={{ color: tokens.fg3, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 11, pt: '2px' }}>
      Contact
    </Box>
    <Box component="dd" sx={{ m: 0, color: tokens.fg }}>
      <Box
        component="a"
        href="mailto:privacy@cloud-lord.com"
        data-track="mailto-click"
        sx={{ color: tokens.accent, textDecoration: 'none', '&:hover': { color: tokens.fg } }}
      >
        privacy@cloud-lord.com
      </Box>
    </Box>
  </Card>
);

export default ControllerIdentityCard;
