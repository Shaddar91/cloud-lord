import { Helmet } from 'react-helmet';
import { Element, Link } from 'react-scroll';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import logo from './assets/logo2.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    // other options...
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Helmet for SEO */}
      <Helmet>
        <title>Cloud Lord - Cloud Infrastructure, DevOps & AI Engineering</title>
        <meta name="description" content="Expert IT consultancy specializing in cloud infrastructure, DevOps automation, Kubernetes, AI/ML engineering, and Infrastructure as Code. AWS, Terraform, Docker, and more." />
        <meta name="keywords" content="cloud infrastructure, DevOps, AI engineering, machine learning, kubernetes, docker, terraform, AWS, ansible, cloud consulting, infrastructure as code, CI/CD, automation" />
        <meta property="og:title" content="Cloud Lord - Cloud Infrastructure & AI Engineering" />
        <meta property="og:description" content="Expert cloud infrastructure, DevOps, and AI engineering solutions" />
        <meta property="og:type" content="website" />
      </Helmet>

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Toolbar sx={{ padding: { xs: '0.5rem 1rem', md: '0.5rem 2rem' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={logo} alt="Cloud Lord Logo" style={{ height: '70px', marginRight: '1rem' }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #646cff 30%, #747bff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Cloud Lord
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(100, 108, 255, 0.1)',
                  color: '#646cff'
                }
              }}
            >
              <Link to="about" spy={true} smooth={true} duration={500} offset={-70} style={{ color: 'inherit', cursor: 'pointer' }}>
                About
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(100, 108, 255, 0.1)',
                  color: '#646cff'
                }
              }}
            >
              <Link to="services" spy={true} smooth={true} duration={500} offset={-70} style={{ color: 'inherit', cursor: 'pointer' }}>
                Services
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(100, 108, 255, 0.1)',
                  color: '#646cff'
                }
              }}
            >
              <Link to="contact" spy={true} smooth={true} duration={500} offset={-70} style={{ color: 'inherit', cursor: 'pointer' }}>
                Contact
              </Link>
            </Button>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com/in/tomislav-ivanovic-124b13115"
              target="_blank"
              sx={{ '&:hover': { color: '#646cff' } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/Shaddar91"
              target="_blank"
              sx={{ '&:hover': { color: '#646cff' } }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="App-content">
        <Element name="about" className="element">
          <About />
        </Element>
        <Element name="services" className="element" style={{ marginTop: '2rem' }}>
          <Services />
        </Element>
        <Element name="contact" className="element" style={{ marginTop: '2rem' }}>
          <Contact />
        </Element>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            marginTop: '4rem',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} Cloud Lord. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem', display: 'block' }}>
            Expert Cloud Infrastructure, DevOps & AI Engineering Solutions
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
