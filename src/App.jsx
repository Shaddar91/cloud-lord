// src/App.jsx
import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet for SEO
import { Element, Link } from 'react-scroll';
import About from './pages/About';
import Services from './pages/Services';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
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
        <title>Cloud Lord - Your Cloud Infrastructure Partner</title>
        <meta name="description" content="Cloud Lord provides expert cloud infrastructure and DevOps services tailored to your needs." />
        <meta name="keywords" content="cloud services, DevOps, cloud computing, infrastructure as code, terraform, kubernetes" />
      </Helmet>

      <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 1)', color: '#fff' }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ height: '80px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cloud Lord
          </Typography>
          <Button color="inherit">
            <Link to="about" spy={true} smooth={true} duration={500} style={{ color: '#fff' }}>About</Link>
          </Button>
          <Button color="inherit">
            <Link to="services" spy={true} smooth={true} duration={500} style={{ color: '#fff' }}>Services</Link>
          </Button>
          <IconButton color="inherit" href="https://www.linkedin.com/in/tomislav-ivanovic-124b13115" target="_blank">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" href="https://github.com/Shaddar91" target="_blank">
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="App-content">
        <Element name="about" className="element">
          <About />
        </Element>
        <Element name="services" className="element">
          <Services />
        </Element>
      </div>
    </ThemeProvider>
  );
}

export default App;
