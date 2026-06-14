import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Reusable technology card component
 */
const TechCard = ({ icon, title, description, iconType = 'image' }) => {
  const renderIcon = () => {
    if (iconType === 'image') {
      return (
        <img
          src={icon}
          alt={title}
          style={{
            width: '64px',
            height: '64px',
            objectFit: 'contain'
          }}
        />
      );
    }
    //For FontAwesome or Iconify components, render directly
    return icon;
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        maxWidth: '140px',
        minWidth: '120px',
        padding: '1rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '64px',
          marginBottom: '0.5rem',
        }}
      >
        {renderIcon()}
      </Box>
      {title && (
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            marginBottom: '0.25rem',
            color: 'white'
          }}
        >
          {title}
        </Typography>
      )}
      {description && (
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.75rem',
            lineHeight: 1.3
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

TechCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  iconType: PropTypes.oneOf(['fontawesome', 'iconify', 'image'])
};

TechCard.defaultProps = {
  iconType: 'image',
  title: '',
  description: ''
};

export default TechCard;
