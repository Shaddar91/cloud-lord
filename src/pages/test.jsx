import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faDocker, faKubernetes } from '@fortawesome/free-brands-svg-icons';
// ... Add additional imports for other brand icons as needed

const Services = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      minHeight: '100vh', // Adjust this value as needed
      gap: '20px',
    }}>
      <Typography variant="h2" gutterBottom>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        We provide cutting-edge cloud solutions and DevOps services.
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        {/* AWS Icon */}
        <FontAwesomeIcon icon={faAws} size="4x" />
        {/* Docker Icon */}
        <FontAwesomeIcon icon={faDocker} size="4x" />
        {/* Kubernetes Icon */}
        <FontAwesomeIcon icon={faKubernetes} size="4x" />
        {/* Add more FontAwesome icons as needed */}
      </Box>
    </Box>
  );
};

export default Services;
