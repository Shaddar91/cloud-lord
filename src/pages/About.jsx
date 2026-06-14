import { Box, Container } from '@mui/material';
import SectionHead from '../components/SectionHead';
import { tokens } from '../theme';

const About = () => (
  <Box
    component="section"
    id="about"
    sx={{
      py: { xs: '56px', md: '96px' },
      borderBottom: `1px solid ${tokens.line}`,
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
      <SectionHead
        tagNumber="01"
        tagLabel="about"
        title="A platform engineer for the AWS work you haven't formalized yet."
        subtitle="Teams bring me in when their AWS has grown organically, when a migration or upgrade is overdue, or when leadership wants a real plan for how the company actually uses AI."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
          gap: { xs: '40px', md: '64px' },
        }}
      >
        <Box>
          <Box component="p" sx={{ fontSize: 16, lineHeight: 1.7, color: tokens.fg2, m: 0, mb: '20px' }}>
            <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>
              I work Infrastructure-as-Code, end to end.
            </Box>{' '}
            Every environment I touch leaves in Terraform or Pulumi with a CI pipeline and a handoff doc. Nothing clicked in a console, nothing secret to my head.
          </Box>
          <Box component="p" sx={{ fontSize: 16, lineHeight: 1.7, color: tokens.fg2, m: 0, mb: '20px' }}>
            My standard engagement is formalizing an AWS environment into a real platform: networking, accounts, IaC, CI/CD, observability, so your team stops firefighting and starts shipping. From there it extends into cloud migrations, AI adoption, or platform upgrades, depending on where you are.
          </Box>
          <Box component="p" sx={{ fontSize: 16, lineHeight: 1.7, color: tokens.fg2, m: 0 }}>
            I spent eight years inside platform teams before going independent. That&rsquo;s the lens I bring: infra that the people around it can actually read, own, and extend.
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1px',
            background: tokens.line,
            border: `1px solid ${tokens.line}`,
            borderRadius: '8px',
            overflow: 'hidden',
            alignSelf: 'start',
          }}
        >
          <Box sx={{ background: tokens.bg, p: '24px' }}>
            <Box
              sx={{
                fontFamily: tokens.display,
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: tokens.fg,
              }}
            >
              8<Box component="span" sx={{ color: tokens.accent, fontSize: 24, ml: '2px' }}>yr</Box>
            </Box>
            <Box
              sx={{
                fontFamily: tokens.mono,
                fontSize: 11,
                color: tokens.fg3,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                mt: '6px',
              }}
            >
              in production infra
            </Box>
          </Box>
          <Box sx={{ background: tokens.bg, p: '24px' }}>
            <Box
              sx={{
                fontFamily: tokens.display,
                fontSize: 36,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: tokens.fg,
              }}
            >
              0
            </Box>
            <Box
              sx={{
                fontFamily: tokens.mono,
                fontSize: 11,
                color: tokens.fg3,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                mt: '6px',
              }}
            >
              click-ops environments
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default About;
