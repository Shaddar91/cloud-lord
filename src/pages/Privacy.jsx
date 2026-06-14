import { Container, Stack, Typography, Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import ControllerIdentityCard from '../components/privacy/ControllerIdentityCard';
import ConsentToggle from '../components/privacy/ConsentToggle';
import ForgetMeButton from '../components/privacy/ForgetMeButton';
import LastUpdated from '../components/privacy/LastUpdated';
import { tokens } from '../theme';
import { track, trackGoal, GOALS } from '../lib/tracking';

const onMailto = () => { track('Outbound', 'Email'); trackGoal(GOALS.OUTBOUND_EMAIL); };

const sectionH = {
  fontFamily: tokens.display,
  fontWeight: 600,
  fontSize: 22,
  letterSpacing: '-0.015em',
  m: '48px 0 14px',
  color: tokens.fg,
};

const paraSx = { color: tokens.fg2, m: '0 0 14px', maxWidth: '70ch' };
const ulSx = { color: tokens.fg2, pl: '20px', m: '0 0 14px', '& li': { my: '4px' } };

const DualCol = ({ label, body, cite }) => (
  <Box
    sx={{
      background: tokens.bg2,
      border: `1px solid ${tokens.line}`,
      borderRadius: '10px',
      p: '20px 22px',
      height: '100%',
    }}
  >
    <Box
      sx={{
        fontFamily: tokens.mono,
        fontSize: 11,
        color: tokens.fg3,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        mb: '10px',
      }}
    >
      {label}
    </Box>
    <Box sx={{ color: tokens.fg2, fontSize: '14.5px', mb: '8px' }}>{body}</Box>
    {cite && (
      <Box sx={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.fg3, mt: '8px' }}>
        {cite}
      </Box>
    )}
  </Box>
);

const Privacy = () => (
  <Container maxWidth="md" sx={{ py: { xs: '56px', md: '72px' } }}>
    <Stack spacing={0}>
      {/* Top meta: Last updated + title + lede */}
      {/* F5 stub: real implementation by Component 45 */}
      <LastUpdated />
      <Typography
        component="h1"
        sx={{
          fontFamily: tokens.display,
          fontWeight: 600,
          fontSize: 'clamp(36px, 5vw, 56px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.05,
          m: '12px 0 16px',
          color: tokens.fg,
        }}
      >
        Privacy
      </Typography>
      <Box component="p" sx={{ fontSize: 17, color: tokens.fg2, maxWidth: '70ch', m: '0 0 40px' }}>
        I keep this site small and your data handling simple. This page tells you exactly what is collected, why, how long it sticks around, and how to make it stop. If anything here is unclear, write to me at the address in the box below &mdash; I read that mailbox personally.
      </Box>

      {/* ---- Section 1: Who runs this site ---- */}
      <Typography component="h2" sx={sectionH}>1. Who runs this site</Typography>
      {/* F5 stub: real implementation by Component 45 */}
      <ControllerIdentityCard />
      <Box component="p" sx={paraSx}>
        I am the data controller for everything on cloud-lord.com. There is no company behind this site, no co-controllers, and no third-party processors beyond the hosting provider described in Section 10.
      </Box>

      {/* ---- Section 2: What data is collected ---- */}
      <Typography component="h2" sx={sectionH}>2. What data is collected</Typography>
      <Box component="p" sx={paraSx}>
        When you visit with analytics consent enabled, a self-hosted Matomo instance records:
      </Box>
      <Box component="ul" sx={ulSx}>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Pageviews</Box> &mdash; which pages you opened and in what order</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Referrers</Box> &mdash; the link or search result that sent you here (if any)</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Country</Box> &mdash; derived from an anonymized IP (the last two bytes are stripped before storage)</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Device basics</Box> &mdash; screen size, browser name, operating system family</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Session duration</Box> &mdash; how long the visit lasted</li>
      </Box>
      <Box component="p" sx={paraSx}>That is the entire list.</Box>

      {/* ---- Section 3: What is NOT collected ---- */}
      <Typography component="h2" sx={sectionH}>3. What is NOT collected</Typography>
      <Box component="p" sx={paraSx}>
        To be explicit about what this site does <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>not</Box> do:
      </Box>
      <Box component="ul" sx={ulSx}>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No names, email addresses, or user accounts</Box> &mdash; there are no logins on cloud-lord.com</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No advertising trackers, pixels, or fingerprinting</Box></li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No cross-site tracking</Box> &mdash; analytics cookies are first-party only and scoped to this domain</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No data sold, shared, or handed to any third party</Box> &mdash; not advertisers, not data brokers, not &ldquo;analytics partners&rdquo;</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No heatmaps, session replay, or form analytics</Box> &mdash; these plugins are disabled on the Matomo server</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No tracking before you consent</Box> &mdash; nothing loads, no cookies are set, and no requests go to the analytics server until you accept the banner</li>
      </Box>

      {/* ---- Section 4: Cookies used ---- */}
      <Typography component="h2" sx={sectionH}>4. Cookies used</Typography>
      <Box component="p" sx={paraSx}>
        Only three cookies are set, all first-party, all from the analytics tool. They are set only after you click <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Accept</Box> on the consent banner.
      </Box>
      <Paper
        variant="outlined"
        sx={{
          background: 'transparent',
          border: `1px solid ${tokens.line}`,
          borderRadius: '8px',
          overflow: 'hidden',
          fontFamily: tokens.mono,
          my: '14px',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ background: tokens.bg2, color: tokens.fg3, fontFamily: tokens.mono, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Name</TableCell>
              <TableCell sx={{ background: tokens.bg2, color: tokens.fg3, fontFamily: tokens.mono, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Purpose</TableCell>
              <TableCell sx={{ background: tokens.bg2, color: tokens.fg3, fontFamily: tokens.mono, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Lifetime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ['_pk_id', "Persistent visitor ID — groups your visits so repeat visits don't count as new visitors", '13 months'],
              ['_pk_ses', 'Active session marker — tells Matomo the current visit is still ongoing', '30 minutes'],
              ['_pk_ref', 'Remembers which referrer brought you to the site originally', '6 months'],
            ].map(([name, purpose, lifetime]) => (
              <TableRow key={name}>
                <TableCell sx={{ color: tokens.fg, fontFamily: tokens.mono, fontSize: 13 }}>
                  <Box component="b">{name}</Box>
                </TableCell>
                <TableCell sx={{ color: tokens.fg2, fontFamily: tokens.mono, fontSize: 13 }}>{purpose}</TableCell>
                <TableCell sx={{ color: tokens.fg2, fontFamily: tokens.mono, fontSize: 13 }}>{lifetime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box component="p" sx={paraSx}>
        No other cookies are set by this site. If you clear these three in your browser, you are fully detached from any existing analytics record.
      </Box>

      {/* ---- Section 5: Legal basis ---- */}
      <Typography component="h2" sx={sectionH}>5. Legal basis</Typography>
      <Box component="p" sx={paraSx}>
        This site has visitors from both Serbia and the EU/EEA, so both legal frameworks apply. In both jurisdictions the basis is the same: your explicit consent, given through the banner.
      </Box>
      <Grid container spacing={2} sx={{ my: '14px' }}>
        <Grid item xs={12} md={6}>
          <DualCol
            label="Visitors in Serbia"
            body="Processing is based on your unambiguous consent under the Serbian Law on Personal Data Protection (Zakon o zaštiti podataka o ličnosti). You can withdraw that consent at any time using the controls in Section 7 below, and withdrawal is as easy as giving it."
            cite={<><Box component="b" sx={{ color: tokens.fg2, fontWeight: 500 }}>Art. 12 ZZPL</Box> &mdash; consent</>}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DualCol
            label="Visitors in the EU / EEA"
            body="Processing is based on your freely given, specific, informed, and unambiguous consent under the General Data Protection Regulation. The same withdrawal controls in Section 7 apply, and withdrawing consent does not affect the lawfulness of processing before the withdrawal."
            cite={<><Box component="b" sx={{ color: tokens.fg2, fontWeight: 500 }}>Art. 6(1)(a) GDPR</Box> &mdash; consent</>}
          />
        </Grid>
      </Grid>

      {/* ---- Section 6: Your rights ---- */}
      <Typography component="h2" sx={sectionH}>6. Your rights</Typography>
      <Box component="p" sx={paraSx}>
        Under both the GDPR and the Serbian ZZPL you have the right to:
      </Box>
      <Box component="ul" sx={ulSx}>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Access</Box> &mdash; ask what data, if any, is tied to your visitor ID</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Rectification</Box> &mdash; correct inaccurate data (unlikely to apply given how little is held)</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Deletion</Box> &mdash; ask that records tied to your visitor ID be removed</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Restriction</Box> &mdash; ask that processing of your records be paused</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Objection</Box> &mdash; object to the processing described on this page</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Data portability</Box> &mdash; receive your records in a machine-readable JSON export</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Withdrawal of consent</Box> &mdash; revoke your consent at any time</li>
      </Box>
      <Box component="p" sx={paraSx}>
        To exercise any of these, email{' '}
        <Box component="a" href="mailto:privacy@cloud-lord.com" data-track="mailto-click" onClick={onMailto} sx={{ color: tokens.accent, textDecoration: 'none', '&:hover': { color: tokens.fg } }}>
          <Box component="strong" sx={{ fontWeight: 500 }}>privacy@cloud-lord.com</Box>
        </Box>
        . Because the data is pseudonymous &mdash; tied to a cookie-held visitor ID rather than a name or email &mdash; I will ask you to include the value of your <Box component="code" sx={{ fontFamily: tokens.mono }}>_pk_id</Box> cookie in your request so the right records can be located. If you cannot provide it, GDPR Art. 11 and the equivalent provision in ZZPL apply: I am not required to collect extra identifying data just to answer the request, but clearing the <Box component="code" sx={{ fontFamily: tokens.mono }}>_pk_*</Box> cookies from your browser detaches you from any future session regardless.
      </Box>

      {/* ---- Section 7: Your choices ---- */}
      <Typography component="h2" id="choices" sx={sectionH}>7. Your choices</Typography>
      <Box component="p" sx={paraSx}>
        Enable or disable analytics at any time, and erase any data already collected about this browser.
      </Box>
      {/* F5 stub: real implementation by Component 45 */}
      <ConsentToggle />
      {/* F5 stub: real implementation by Component 45 */}
      <ForgetMeButton />
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', fontFamily: tokens.mono, fontSize: '11.5px', display: 'block', mt: '8px' }}
      >
        Your consent choice is recorded with a timestamp and can be changed at any time.
      </Typography>

      {/* ---- Section 8: Right to complain ---- */}
      <Typography component="h2" sx={sectionH}>8. Right to complain</Typography>
      <Box component="p" sx={paraSx}>
        If you believe your data has been handled improperly, you can complain to the supervisory authority for your jurisdiction.
      </Box>
      <Grid container spacing={2} sx={{ my: '14px' }}>
        <Grid item xs={12} md={6}>
          <DualCol
            label="If you are in Serbia"
            body="File with the Commissioner for Information of Public Importance and Personal Data Protection (Poverenik)."
            cite={
              <Box
                component="a"
                href="https://www.poverenik.rs/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: tokens.accent, textDecoration: 'none', '&:hover': { color: tokens.fg } }}
              >
                poverenik.rs &rarr;
              </Box>
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DualCol
            label="If you are in the EU / EEA"
            body="File with your national Data Protection Authority. The full list of EU/EEA DPAs is maintained by the European Data Protection Board."
            cite={
              <Box
                component="a"
                href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: tokens.accent, textDecoration: 'none', '&:hover': { color: tokens.fg } }}
              >
                edpb.europa.eu &rarr;
              </Box>
            }
          />
        </Grid>
      </Grid>
      <Box component="p" sx={paraSx}>
        Under GDPR Art. 77 and the ZZPL equivalent, the right to complain to a supervisory authority is unconditional and does not prejudice any other legal remedy available to you.
      </Box>

      {/* ---- Section 9: Retention periods ---- */}
      <Typography component="h2" sx={sectionH}>9. Retention periods</Typography>
      <Box component="ul" sx={ulSx}>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Raw analytics logs</Box> &mdash; deleted after <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>12 months</Box> (365 days). The Matomo server has an automatic deletion job that removes raw visit rows once they reach this age.</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Aggregated reports</Box> &mdash; retained for <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>24 months</Box>. These are anonymous traffic summaries (e.g., &ldquo;monthly pageviews per country&rdquo;) with no record-level detail.</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Consent records</Box> &mdash; retained for the duration of your consent plus <Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>2 years</Box>, so that a regulator asking &ldquo;did you actually have consent on date X&rdquo; can be answered.</li>
      </Box>
      <Box component="p" sx={paraSx}>After retention expires, records are permanently deleted from the analytics database.</Box>

      {/* ---- Section 10: Where the data lives ---- */}
      <Typography component="h2" sx={sectionH}>10. Where the data lives</Typography>
      <Box component="ul" sx={ulSx}>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Stored in Germany (EU/EEA)</Box> on self-operated infrastructure at Hetzner Online GmbH</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Single dedicated server</Box>, managed by me &mdash; no managed-analytics SaaS, no data-warehouse export</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>Encrypted backups</Box> to AWS S3 in the Frankfurt region (also EU/EEA), using local GPG encryption before upload so the storage provider never sees plaintext</li>
        <li><Box component="strong" sx={{ color: tokens.fg, fontWeight: 500 }}>No transfer to third parties</Box>, no transfer outside the EU/EEA, no processors beyond the infrastructure provider</li>
      </Box>

      {/* ---- Section 11: Last updated ---- */}
      <Typography component="h2" sx={sectionH}>11. Last updated</Typography>
      {/* F5 stub: real implementation by Component 45 */}
      <Box sx={{ mb: '6px' }}>
        <LastUpdated />
      </Box>
      <Box component="p" sx={paraSx}>
        Material changes to this page will be noted here with a new date. Trivial copy edits (typos, clarifications) do not bump the date.
      </Box>
    </Stack>
  </Container>
);

export default Privacy;
