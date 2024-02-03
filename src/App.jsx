import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'; // Ensure this imports your global styles
import logo from './assets/logo2.png';
const theme = createTheme({
  palette: {
    primary: {
      main: '#000103',
    },
    // ... other options
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 1)' /* Or any color you prefer */ }}>
          <Toolbar>
          <img src={logo} alt="Logo" style={{ height: '80px' }} position="centar" /> {/* Logo added here */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cloud Lord
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/about">About</Button>
          </Toolbar>
        </AppBar>
        
        {/* The main content area below AppBar */}
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}


export default App;
