import { Box, Container } from '@mui/material';
import SectionHead from '../components/SectionHead';
import { tokens } from '../theme';

const STEPS = [
  {
    tag: 'step / 01 · week 0',
    title: 'Intro call',
    body: '30 minutes. You describe the stack and the pain. I tell you honestly whether I’m the right person, and who is, if not.',
  },
  {
    tag: 'step / 02 · week 1–2',
    title: 'Audit',
    body: 'Fixed price. I read your infra, your repos, your AWS bill. You get a written report: risks, wins, a prioritised plan.',
  },
  {
    tag: 'step / 03 · week 3–12',
    title: 'Implementation',
    body: 'Two-week iterations. Weekly demo, daily async updates, PRs reviewable by your team. Everything in code, nothing in my head.',
  },
  {
    tag: 'step / 04 · ongoing',
    title: 'Handoff',
    body: 'Docs and handoff: architecture overview, IaC walkthrough, a half-day session with your team. I stay on retainer for 30 days, after that you own it, cleanly.',
  },
];

const Process = () => (
  <Box
    component="section"
    id="process"
    sx={{
      py: { xs: '56px', md: '96px' },
      borderBottom: `1px solid ${tokens.line}`,
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
      <SectionHead
        tagNumber="03"
        tagLabel="process"
        title="How an engagement actually goes."
        subtitle="No surprises, no scope creep. Fixed-scope audit first, then implementation in clear two-week chunks."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          border: `1px solid ${tokens.line}`,
          borderRadius: '10px',
          overflow: 'hidden',
          background: tokens.bg,
        }}
      >
        {STEPS.map((step, idx) => (
          <Box
            key={step.title}
            sx={{
              p: '28px',
              borderRight: {
                xs: 'none',
                sm: idx % 2 === 1 ? 'none' : `1px solid ${tokens.line}`,
                md: idx < STEPS.length - 1 ? `1px solid ${tokens.line}` : 'none',
              },
              borderBottom: {
                xs: idx < STEPS.length - 1 ? `1px solid ${tokens.line}` : 'none',
                sm: idx < 2 ? `1px solid ${tokens.line}` : 'none',
                md: 'none',
              },
            }}
          >
            <Box
              sx={{
                fontFamily: tokens.mono,
                fontSize: 11,
                color: tokens.accent,
                letterSpacing: '0.04em',
                mb: '14px',
              }}
            >
              {step.tag}
            </Box>
            <Box
              component="h4"
              sx={{
                fontFamily: tokens.display,
                fontSize: 17,
                fontWeight: 600,
                m: 0,
                mb: '8px',
                letterSpacing: '-0.01em',
                color: tokens.fg,
              }}
            >
              {step.title}
            </Box>
            <Box
              component="p"
              sx={{ fontSize: '13.5px', color: tokens.fg2, m: 0, lineHeight: 1.55 }}
            >
              {step.body}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Process;
