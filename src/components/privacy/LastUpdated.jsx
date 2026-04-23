import { Typography } from '@mui/material';
import { tokens } from '../../theme';

/* F5 stub: real implementation by Component 45 */
const LastUpdated = () => (
  <Typography
    variant="caption"
    sx={{
      fontFamily: tokens.mono,
      fontSize: 11,
      color: tokens.fg3,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      display: 'block',
    }}
  >
    Last updated &middot; 2026-04-23
  </Typography>
);

export default LastUpdated;
