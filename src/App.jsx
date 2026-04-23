import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Element } from 'react-scroll';
import { Box } from '@mui/material';

import theme, { tokens } from './theme';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import ConsentBanner from './components/ConsentBanner';
import Hero from './components/Hero';
import ProofStrip from './components/ProofStrip';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

const HomePage = () => (
  <>
    <Hero />
    <ProofStrip />
    <Element name="about">
      <About />
    </Element>
    <Element name="services">
      <Services />
    </Element>
    <Element name="process">
      <Process />
    </Element>
    <Element name="contact">
      <Contact />
    </Element>
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Cloud Lord &mdash; Infrastructure consultancy</title>
        <meta
          name="description"
          content="Platform engineering, cloud architecture, and AI enablement. AWS specialization, Terraform, Kubernetes, and company-wide LLM adoption, run by Tomislav Ivanović."
        />
        <meta name="keywords" content="AWS platform engineering, Terraform, Kubernetes, DevOps, cloud migration, Hetzner, Matomo analytics, GDPR, LLM enablement, AI adoption" />
        <meta property="og:title" content="Cloud Lord &mdash; Infrastructure consultancy" />
        <meta property="og:description" content="Formalize your AWS into a real platform. DevOps automation and AI enablement, run independently from Belgrade." />
        <meta property="og:type" content="website" />
      </Helmet>

      <BrowserRouter>
        <Box
          sx={{
            minHeight: '100vh',
            background: tokens.bg,
            color: tokens.fg,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TopNav />
          <Box component="main" sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </Box>
          <Footer />
          <ConsentBanner />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
