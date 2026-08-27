import { Box, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { tokens } from '../theme';
import { scrollToSection } from '../lib/scrollToSection';
import logo from '../assets/logo-crown-64.webp';

const navLinkSx = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: tokens.mono,
  fontSize: 13,
  color: tokens.fg2,
  cursor: 'pointer',
  transition: 'color 120ms ease',
  '&::before': {
    content: '"→"',
    color: tokens.fg3,
  },
  '&:hover': { color: tokens.accent },
};

const TopNav = () => {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: `color-mix(in oklab, ${tokens.bg} 85%, transparent)`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${tokens.line}`,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1200px !important', px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          <RouterLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: tokens.mono,
              fontSize: 13,
              letterSpacing: '0.02em',
              color: tokens.fg,
            }}
          >
            <img
              src={logo}
              alt="Cloud Lord"
              width={30}
              height={30}
              style={{
                width: 30,
                height: 30,
                objectFit: 'contain',
                filter: `drop-shadow(0 0 8px color-mix(in oklab, ${tokens.accent} 40%, transparent))`,
              }}
            />
            <span style={{ color: tokens.fg }}>cloud-lord</span>
            <span style={{ color: tokens.fg3, margin: '0 2px' }}>//</span>
            <span style={{ color: tokens.fg3 }}>t. ivanovic</span>
          </RouterLink>

          {onHome ? (
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                display: { xs: 'none', sm: 'flex' },
                gap: '28px',
                p: 0,
                m: 0,
              }}
            >
              <li>
                <Box component="a" href="/#about" onClick={scrollToSection('about')} sx={{ textDecoration: 'none' }}>
                  <Box component="span" sx={navLinkSx}>about</Box>
                </Box>
              </li>
              <li>
                <Box component="a" href="/#services" onClick={scrollToSection('services')} sx={{ textDecoration: 'none' }}>
                  <Box component="span" sx={navLinkSx}>services</Box>
                </Box>
              </li>
              <li>
                <Box component="a" href="/#process" onClick={scrollToSection('process')} sx={{ textDecoration: 'none' }}>
                  <Box component="span" sx={navLinkSx}>process</Box>
                </Box>
              </li>
              <li>
                <RouterLink to="/blog" style={{ textDecoration: 'none' }}>
                  <Box component="span" sx={navLinkSx}>blog</Box>
                </RouterLink>
              </li>
            </Box>
          ) : null}

          {onHome ? (
            <Box component="a" href="/#contact" onClick={scrollToSection('contact')} sx={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  fontFamily: tokens.mono,
                  fontSize: 12,
                  color: tokens.bg,
                  background: tokens.accent,
                  px: '14px',
                  py: '8px',
                  borderRadius: '4px',
                  letterSpacing: '0.02em',
                  cursor: 'pointer',
                  transition: 'background 120ms ease, color 120ms ease',
                  '&:hover': { background: tokens.fg, color: tokens.bg },
                }}
              >
                book intro &rarr;
              </Box>
            </Box>
          ) : (
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  fontFamily: tokens.mono,
                  fontSize: 13,
                  color: tokens.fg2,
                  '&:hover': { color: tokens.accent },
                }}
              >
                &larr; back to site
              </Box>
            </RouterLink>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TopNav;
