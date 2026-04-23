import { Box } from '@mui/material';
import { tokens } from '../theme';

const SectionHead = ({ tagNumber, tagLabel, title, subtitle }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' },
      gap: { xs: '16px', sm: '64px' },
      mb: { xs: '40px', sm: '56px' },
      alignItems: 'start',
    }}
  >
    <Box
      sx={{
        fontFamily: tokens.mono,
        fontSize: 12,
        color: tokens.fg3,
        letterSpacing: '0.04em',
        pt: '8px',
      }}
    >
      <Box component="b" sx={{ color: tokens.accent, fontWeight: 500 }}>{tagNumber}</Box> / {tagLabel}
    </Box>
    <Box>
      <Box
        component="h2"
        sx={{
          fontFamily: tokens.display,
          fontWeight: 600,
          fontSize: 'clamp(28px, 3.2vw, 40px)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          m: 0,
          mb: '12px',
          maxWidth: '22ch',
          color: tokens.fg,
        }}
      >
        {title}
      </Box>
      <Box
        component="p"
        sx={{
          color: tokens.fg2,
          fontSize: 16,
          maxWidth: '58ch',
          m: 0,
        }}
      >
        {subtitle}
      </Box>
    </Box>
  </Box>
);

export default SectionHead;
