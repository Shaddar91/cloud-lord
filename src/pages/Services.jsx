// src/pages/Services.jsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Services = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'green',
      borderRadius: '10px',
      maxWidth: '1100px',
      margin: '5rem auto',
      marginLeft: '1rem',
    }}>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <Typography variant="body1" paragraph>
        {/* Add your services content here */}
      </Typography>
      {/* ... */}
    </Box>
  );
};

export default Services;
