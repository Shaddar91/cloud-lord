import { Box, Container } from '@mui/material';
import { tokens } from '../theme';

const CHIPS = [
  'AWS platform engineering',
  'AWS and Hetzner',
  'Terraform',
  'Kubernetes',
  'CI/CD automation',
  'ELK observability',
  'Kafka and RabbitMQ',
  'LLM enablement',
  'Company-wide AI adoption',
  'MCP servers',
];

const ProofStrip = () => (
  <Box
    component="section"
    sx={{
      borderBottom: `1px solid ${tokens.line}`,
      py: '28px',
      background: tokens.bg2,
      overflow: 'hidden',
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
          gap: { xs: '16px', sm: '40px' },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            fontFamily: tokens.mono,
            fontSize: 11,
            color: tokens.fg3,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Known for
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            fontFamily: tokens.mono,
            fontSize: 12,
            color: tokens.fg2,
          }}
        >
          {CHIPS.map((chip) => (
            <Box
              key={chip}
              sx={{
                border: `1px solid ${tokens.line}`,
                px: '12px',
                py: '6px',
                borderRadius: '999px',
                color: tokens.fg2,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                '&::before': {
                  content: '""',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: tokens.accent,
                },
              }}
            >
              {chip}
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default ProofStrip;
