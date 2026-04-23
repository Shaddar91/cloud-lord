import { createTheme } from '@mui/material/styles';

// Design tokens from design-package/new-design HANDOFF §3.
// oklch values are preserved as CSS custom properties for sx-level use.
// MUI palette entries are approximate hex for the parts of MUI that do not
// accept oklch (alerts, buttons default states).
export const tokens = {
  bg: 'oklch(16% 0.012 250)',
  bg2: 'oklch(20% 0.014 250)',
  bg3: 'oklch(24% 0.016 250)',
  line: 'oklch(30% 0.014 250)',
  line2: 'oklch(38% 0.018 250)',
  fg: 'oklch(96% 0.005 250)',
  fg2: 'oklch(78% 0.01 250)',
  fg3: 'oklch(58% 0.012 250)',
  accent: 'oklch(80% 0.14 180)',
  accentDim: 'oklch(55% 0.09 180)',
  warn: 'oklch(78% 0.14 60)',
  mono: `'JetBrains Mono', ui-monospace, monospace`,
  display: `'Inter Tight', 'Inter', system-ui, sans-serif`,
  body: `'Inter', system-ui, sans-serif`,
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5ad6cf', // accent teal approximation for MUI defaults
      contrastText: '#1a1f23',
    },
    secondary: {
      main: '#e6b26a', // warn approximation for destructive actions
    },
    background: {
      default: '#1a1f23',
      paper: '#222930',
    },
    text: {
      primary: '#f3f4f5',
      secondary: '#c0c4c7',
      disabled: '#8a8f93',
    },
    divider: '#3a4046',
  },
  typography: {
    fontFamily: tokens.body,
    h1: {
      fontFamily: tokens.display,
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: tokens.display,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: tokens.display,
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: tokens.display,
      fontWeight: 600,
    },
    h5: {
      fontFamily: tokens.display,
      fontWeight: 600,
    },
    h6: {
      fontFamily: tokens.display,
      fontWeight: 600,
    },
    body1: { fontSize: 15, lineHeight: 1.6 },
    body2: { fontSize: 14, lineHeight: 1.6 },
    button: {
      fontFamily: tokens.mono,
      fontSize: 13,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontFamily: tokens.mono,
      fontSize: 11,
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.bg,
          color: tokens.fg,
          fontFamily: tokens.body,
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
        },
        '::selection': {
          background: tokens.accent,
          color: tokens.bg,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          fontFamily: tokens.mono,
          fontSize: 13,
          borderRadius: 4,
          textTransform: 'none',
          padding: '10px 16px',
        },
      },
    },
  },
});

export default theme;
