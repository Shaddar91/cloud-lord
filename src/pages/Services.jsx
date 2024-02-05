// src/pages/Services.jsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faDocker } from '@fortawesome/free-brands-svg-icons';
import { Icon } from '@iconify/react';
import kubernetesIcon from '@iconify/icons-logos/kubernetes';

const Services = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white', // Updated for better visibility
      borderRadius: '10px',
      maxWidth: '1100px',
      margin: '5rem auto',
    }}>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <Typography variant="body1" paragraph>
        We provide cutting-edge cloud solutions and DevOps services.
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem', // Space between icons
      }}>
        <FontAwesomeIcon icon={faAws} size="4x" style={{ margin: '10px' }} />
        <FontAwesomeIcon icon={faDocker} size="4x" style={{ margin: '10px' }} />
        <Icon icon={kubernetesIcon} style={{ fontSize: '64px', margin: '10px' }} />
      </Box>
    </Box>
  );
};

export default Services;
