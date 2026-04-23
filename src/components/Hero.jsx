import { Box, Container } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { tokens } from '../theme';

const Hero = () => {
  return (
    <Box
      component="section"
      id="top"
      sx={{
        borderBottom: `1px solid ${tokens.line}`,
        pt: { xs: '56px', md: '80px' },
        pb: { xs: '40px', md: '56px' },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, ${tokens.line} 1px, transparent 1px), linear-gradient(to bottom, ${tokens.line} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 70% 40%, #000 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 70% 40%, #000 20%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
            gap: { xs: '40px', md: '64px' },
            alignItems: 'start',
          }}
        >
          <Box>
            <Box
              sx={{
                fontFamily: tokens.mono,
                fontSize: 12,
                color: tokens.accent,
                letterSpacing: '0.04em',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                '&::before': {
                  content: '""',
                  width: 8,
                  height: 8,
                  background: tokens.accent,
                  borderRadius: '50%',
                  boxShadow: `0 0 12px ${tokens.accent}`,
                  animation: 'pulse 2s ease-in-out infinite',
                },
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
            >
              Available &middot; 1 slot open
            </Box>

            <Box
              component="h1"
              sx={{
                fontFamily: tokens.display,
                fontWeight: 600,
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                m: 0,
                mb: 3,
                maxWidth: '16ch',
                color: tokens.fg,
              }}
            >
              Turn your cloud into{' '}
              <Box component="span" sx={{ color: tokens.accent, fontStyle: 'italic', fontWeight: 500 }}>
                a real platform.
              </Box>
            </Box>

            <Box
              component="p"
              sx={{
                fontSize: 18,
                lineHeight: 1.55,
                color: tokens.fg2,
                maxWidth: '52ch',
                m: 0,
                mb: '36px',
              }}
            >
              I&rsquo;m Tomislav, a platform engineer and cloud architect based in Belgrade.
              I formalize <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>AWS environments</Box> into proper platforms with DevOps automation,
              and help teams adopt <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>LLMs and AI tooling</Box> as a company-wide standard.
            </Box>

            <Box sx={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <ScrollLink to="contact" spy smooth duration={500} offset={-70} style={{ textDecoration: 'none' }}>
                <Box
                  component="span"
                  sx={{
                    fontFamily: tokens.mono,
                    fontSize: 13,
                    padding: '12px 18px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: tokens.accent,
                    color: tokens.bg,
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    transition: 'background 120ms ease, color 120ms ease',
                    '&:hover': { background: tokens.fg, color: tokens.bg },
                  }}
                >
                  Send an inquiry &rarr;
                </Box>
              </ScrollLink>
              <ScrollLink to="services" spy smooth duration={500} offset={-70} style={{ textDecoration: 'none' }}>
                <Box
                  component="span"
                  sx={{
                    fontFamily: tokens.mono,
                    fontSize: 13,
                    padding: '12px 18px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: tokens.fg,
                    border: `1px solid ${tokens.line2}`,
                    cursor: 'pointer',
                    transition: 'border-color 120ms ease, color 120ms ease',
                    '&:hover': { borderColor: tokens.accent, color: tokens.accent },
                  }}
                >
                  See services
                </Box>
              </ScrollLink>
            </Box>
          </Box>

          {/* Terminal card */}
          <Box
            aria-hidden="true"
            sx={{
              background: tokens.bg2,
              border: `1px solid ${tokens.line}`,
              borderRadius: '8px',
              fontFamily: tokens.mono,
              fontSize: '12.5px',
              lineHeight: 1.65,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: '14px',
                py: '10px',
                borderBottom: `1px solid ${tokens.line}`,
                color: tokens.fg3,
                fontSize: 11,
              }}
            >
              <Box sx={{ display: 'flex', gap: '6px' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: tokens.bg3 }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: tokens.bg3 }} />
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: tokens.bg3 }} />
              </Box>
              <Box>~/cloud-lord / bash</Box>
            </Box>
            <Box sx={{ px: '18px', py: '16px', color: tokens.fg2 }}>
              <Box component="span" sx={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                <Box component="span" sx={{ color: tokens.accent }}>$</Box> whoami
              </Box>
              <Box component="span" sx={{ display: 'block' }}>tomislav ivanovic</Box>
              <Box component="span" sx={{ display: 'block', color: tokens.fg3 }}># platform eng &middot; cloud architect &middot; ai enablement</Box>
              <br />
              <Box component="span" sx={{ display: 'block' }}>
                <Box component="span" sx={{ color: tokens.accent }}>$</Box> stack --primary
              </Box>
              <Box component="span" sx={{ display: 'block' }}>aws &middot; hetzner &middot; terraform &middot; kubernetes</Box>
              <Box component="span" sx={{ display: 'block' }}>ansible &middot; kafka &middot; rabbitmq &middot; elk</Box>
              <br />
              <Box component="span" sx={{ display: 'block' }}>
                <Box component="span" sx={{ color: tokens.accent }}>$</Box> status
              </Box>
              <Box component="span" sx={{ display: 'block' }}>
                <Box component="span" sx={{ color: tokens.accent }}>&#9679; available</Box>, taking one engagement
              </Box>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  '&::after': {
                    content: '"▊"',
                    color: tokens.accent,
                    animation: 'blink 1s steps(1) infinite',
                    marginLeft: '2px',
                  },
                  '@keyframes blink': { '50%': { opacity: 0 } },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
