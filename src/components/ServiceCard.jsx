import { Box, Typography, Paper } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Reusable service card component for displaying service offerings
 */
const ServiceCard = ({ title, description, icon, features = [] }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 30px rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Box sx={{ marginRight: '1rem', color: '#646cff' }}>
          {icon}
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{
          marginBottom: '1.5rem',
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: 1.7
        }}
      >
        {description}
      </Typography>

      {features.length > 0 && (
        <Box sx={{ marginTop: 'auto' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              marginBottom: '0.75rem',
              color: '#646cff'
            }}
          >
            Key Capabilities:
          </Typography>
          <Box component="ul" sx={{ margin: 0, paddingLeft: '1.25rem' }}>
            {features.map((feature, index) => (
              <Typography
                key={index}
                component="li"
                variant="body2"
                sx={{
                  marginBottom: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6
                }}
              >
                {feature}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  features: PropTypes.arrayOf(PropTypes.string)
};

ServiceCard.defaultProps = {
  features: []
};

export default ServiceCard;
