import { Typography, Box, Paper, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const contactMethods = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      value: 'tomzi.iv@gmail.com',
      link: 'mailto:tomzi.iv@gmail.com'
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: 40 }} />,
      title: 'LinkedIn',
      value: 'Tomislav Ivanovic',
      link: 'https://www.linkedin.com/in/tomislav-ivanovic-124b13115'
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 40 }} />,
      title: 'GitHub',
      value: '@Shaddar91',
      link: 'https://github.com/Shaddar91'
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Location',
      value: 'Available for Remote Work',
      link: null
    }
  ];

  return (
    <Box sx={{
      padding: { xs: '1.5rem', md: '3rem' },
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      {/* Contact Header */}
      <Box sx={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '12px',
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
          Get In Touch
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto' }}>
          Ready to elevate your infrastructure? Let&apos;s discuss how we can help achieve your goals.
        </Typography>
      </Box>

      {/* Main Contact Section */}
      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '3rem 2rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '3rem'
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#646cff', fontWeight: 600, marginBottom: '2rem', textAlign: 'center' }}>
          Contact Information
        </Typography>

        <Grid container spacing={3}>
          {contactMethods.map((method, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: method.link ? 'pointer' : 'default',
                  '&:hover': method.link ? {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(100, 108, 255, 0.2)',
                    border: '1px solid rgba(100, 108, 255, 0.5)',
                  } : {}
                }}
                onClick={() => method.link && window.open(method.link, '_blank')}
              >
                <Box sx={{ color: '#646cff', marginBottom: '1rem' }}>
                  {method.icon}
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {method.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {method.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Additional Info */}
      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '2.5rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#646cff', fontWeight: 600, marginBottom: '1.5rem' }}>
          Let&apos;s Build Something Great
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'white', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Whether you need cloud infrastructure setup, DevOps automation, Kubernetes management, or AI engineering
          solutions, I&apos;m here to help. With expertise spanning AWS, Terraform, Docker, Kubernetes, and modern AI/ML
          technologies, I can deliver tailored solutions that meet your specific needs.
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Available for both short-term projects and long-term partnerships. Let&apos;s discuss how we can work together
          to achieve your infrastructure and automation goals.
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
