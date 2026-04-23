import { Box, Container } from '@mui/material';
import SectionHead from '../components/SectionHead';
import { tokens } from '../theme';

const svcCardSx = {
  background: tokens.bg,
  border: `1px solid ${tokens.line}`,
  borderRadius: '10px',
  p: '28px',
  position: 'relative',
  transition: 'border-color 160ms ease, transform 160ms ease',
  '&:hover': { borderColor: tokens.accentDim },
};

const svcNumSx = {
  position: 'absolute',
  top: '20px',
  right: '24px',
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.fg3,
};

const svcTagSx = {
  fontFamily: tokens.mono,
  fontSize: 11,
  color: tokens.accent,
  letterSpacing: '0.04em',
  mb: '14px',
};

const svcHeadingSx = {
  fontFamily: tokens.display,
  fontSize: 22,
  fontWeight: 600,
  m: 0,
  mb: '10px',
  letterSpacing: '-0.015em',
  lineHeight: 1.15,
  color: tokens.fg,
};

const svcParaSx = {
  color: tokens.fg2,
  fontSize: '14.5px',
  m: 0,
  mb: '20px',
  lineHeight: 1.6,
};

const svcUlSx = {
  listStyle: 'none',
  p: 0,
  m: 0,
  fontFamily: tokens.mono,
  fontSize: '12.5px',
  color: tokens.fg2,
  display: 'grid',
  gap: '6px',
  '& li': {
    display: 'flex',
    gap: '10px',
    alignItems: 'baseline',
    '&::before': {
      content: '"▸"',
      color: tokens.accent,
      fontSize: 10,
    },
  },
};

const Services = () => (
  <Box
    component="section"
    id="services"
    sx={{
      py: { xs: '56px', md: '96px' },
      borderBottom: `1px solid ${tokens.line}`,
      background: tokens.bg2,
    }}
  >
    <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
      <SectionHead
        tagNumber="02"
        tagLabel="services"
        title="What I do, and what I lead with."
        subtitle="AWS platform engineering is the core. Migrations, automation, and AI enablement build on top of it."
      />

      {/* hero row: 2fr wide card + 1fr aside */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: '20px',
        }}
      >
        <Box
          sx={{
            ...svcCardSx,
            background: `linear-gradient(180deg, color-mix(in oklab, ${tokens.accent} 4%, ${tokens.bg}) 0%, ${tokens.bg} 70%)`,
            borderColor: tokens.accentDim,
            p: '36px',
          }}
        >
          <Box sx={svcNumSx}>01 / primary</Box>
          <Box sx={svcTagSx}>&#9632; aws platform engineering</Box>
          <Box component="h3" sx={{ ...svcHeadingSx, fontSize: 30 }}>
            Formalize your AWS into a real platform: networking, accounts, IaC, CI/CD.
          </Box>
          <Box component="p" sx={{ ...svcParaSx, fontSize: 16 }}>
            The work most teams hire me for. I take an AWS environment that grew organically and turn it into a versioned, reviewable platform: account structure, VPC and networking, Terraform or Pulumi modules, pipelines, and observability sized for your team.
          </Box>
          <Box component="ul" sx={svcUlSx}>
            <li>Multi-account AWS architecture, landing zones</li>
            <li>Terraform, modular and reviewable</li>
            <li>CI pipelines: GitHub Actions, Jenkins, CircleCI, Bitbucket</li>
            <li>Observability: Prometheus, Grafana, ELK stack</li>
            <li>Secrets and access: SSM / Vault, IAM baselines</li>
          </Box>
        </Box>

        <Box
          sx={{
            background: tokens.bg,
            border: `1px solid ${tokens.line}`,
            borderRadius: '10px',
            p: '28px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              fontFamily: tokens.mono,
              fontSize: 11,
              color: tokens.fg3,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              mb: '18px',
            }}
          >
            // Core stack
          </Box>
          <Box
            component="h4"
            sx={{
              fontFamily: tokens.display,
              fontSize: 20,
              fontWeight: 600,
              m: 0,
              mb: '8px',
              letterSpacing: '-0.01em',
              color: tokens.fg,
            }}
          >
            What I actually use day-to-day.
          </Box>
          <Box component="p" sx={{ fontSize: 14, color: tokens.fg2, m: 0, mb: '20px' }}>
            Short list on purpose. I go deep on these, not wide on every logo.
          </Box>
          <Box sx={{ display: 'grid', gap: '10px', mt: 'auto' }}>
            {[
              ['Cloud', 'AWS · Hetzner'],
              ['IaC', 'Terraform · Ansible'],
              ['Orchestration', 'Kubernetes · Helm'],
              ['Observability', 'Prometheus · Grafana · ELK'],
              ['Messaging', 'Kafka · RabbitMQ'],
              ['AI', 'Claude · OpenAI · Whisper · ChromaDB · MCP'],
            ].map(([label, value], idx) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  py: '10px',
                  borderTop: idx === 0 ? 'none' : `1px solid ${tokens.line}`,
                  fontFamily: tokens.mono,
                  fontSize: 12,
                  pt: idx === 0 ? 0 : '10px',
                }}
              >
                <Box component="b" sx={{ color: tokens.fg, fontWeight: 500 }}>{label}</Box>
                <Box component="span" sx={{ color: tokens.fg3 }}>{value}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* lower row: 3 smaller cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: '20px',
          mt: '20px',
        }}
      >
        <Box sx={svcCardSx}>
          <Box sx={svcNumSx}>02</Box>
          <Box sx={svcTagSx}>&#9632; automation &amp; devops</Box>
          <Box component="h3" sx={svcHeadingSx}>CI/CD and IaC that your team can read, review, and own.</Box>
          <Box component="p" sx={svcParaSx}>Pipelines, release flows, deployment strategies, and IaC modules designed to be reviewable, not a black box only I can touch.</Box>
          <Box component="ul" sx={svcUlSx}>
            <li>GitHub Actions &middot; Jenkins &middot; CircleCI &middot; Bitbucket</li>
            <li>Terraform modules, reusable across teams</li>
            <li>Ansible for configuration and golden images</li>
          </Box>
        </Box>

        <Box sx={svcCardSx}>
          <Box sx={svcNumSx}>03</Box>
          <Box sx={svcTagSx}>&#9632; cloud migration</Box>
          <Box component="h3" sx={svcHeadingSx}>Move to AWS without rewriting your company mid-flight.</Box>
          <Box component="p" sx={svcParaSx}>Phased migrations off legacy providers or on-prem, with a paved path: accounts, networking, data, CI, in a sequence that keeps you shipping.</Box>
          <Box component="ul" sx={svcUlSx}>
            <li>Discovery &amp; sequencing plan</li>
            <li>Data migration &middot; Postgres &middot; MySQL</li>
            <li>Messaging &amp; streaming (Kafka &middot; RabbitMQ)</li>
          </Box>
        </Box>

        <Box sx={svcCardSx}>
          <Box sx={svcNumSx}>04</Box>
          <Box sx={svcTagSx}>&#9632; ai enablement</Box>
          <Box component="h3" sx={svcHeadingSx}>Secure LLM enablement and company-wide AI adoption standards.</Box>
          <Box component="p" sx={svcParaSx}>I&rsquo;m not an ML engineer. I set up the models, tooling, and processes the right way: securely, with guardrails, and with standards your whole company can actually follow. I track the AI space closely and usually sit 6 to 8 months ahead of what lands in the mainstream, so what you adopt today still holds up next quarter.</Box>
          <Box component="p" sx={svcParaSx}>I also run my own custom agentic framework (a paradigm beyond LangChain / LangGraph) when a project needs deeper control than off-the-shelf tooling gives. That includes MCP servers, both existing and custom-built, to wire models into your real systems.</Box>
          <Box component="ul" sx={svcUlSx}>
            <li>Models: Claude, OpenAI, Whisper</li>
            <li>Vector and retrieval: ChromaDB, Ory / Lumen stack</li>
            <li>LangChain, LangGraph, or custom agent framework</li>
            <li>MCP servers, existing or custom</li>
            <li>Company-wide usage standards and guardrails</li>
            <li>Secure integration into engineering workflow</li>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Services;
