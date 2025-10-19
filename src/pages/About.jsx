import { Typography, Box, Grid, Paper } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';

const About = () => {
  const highlights = [
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Cloud Native',
      description: 'Expert in AWS, Hetzner Cloud, and modern cloud architectures'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Security First',
      description: 'Infrastructure solutions with security and compliance at the core'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'DevOps Excellence',
      description: 'Automated CI/CD pipelines for fast, reliable deployments'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: 'AI Engineering',
      description: 'Modern AI/ML solutions and intelligent automation systems'
    }
  ];

  return (
    <Box sx={{
      padding: { xs: '1.5rem', md: '3rem' },
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      {/* Hero Section */}
      <Box sx={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '12px',
      }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem'
          }}
        >
          Cloud Lord
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontWeight: 300
          }}
        >
          Expert IT Consultancy Specializing in Cloud Infrastructure, DevOps, and AI Engineering
        </Typography>
      </Box>

      {/* Main Description */}
      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '2.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#646cff', fontWeight: 600, marginBottom: '1.5rem' }}>
          Who Are We
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'white', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Cloud Lord is a specialized IT consultancy agency focused on creating robust, secure, and scalable
          infrastructure solutions following Infrastructure as Code (IaC) best practices. We combine deep expertise
          in cloud technologies, DevOps practices, and modern AI engineering to deliver solutions that drive
          business value.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: 'white', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Our approach emphasizes automation, security, and operational excellence. We help organizations
          modernize their infrastructure, implement efficient development pipelines, and leverage AI/ML
          technologies to stay competitive in today&apos;s rapidly evolving technology landscape.
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.8, fontSize: '1.05rem' }}>
          From startup scale-ups to enterprise migrations, we tailor cloud-based solutions that align with
          your business objectives, ensuring your infrastructure is fast, reliable, secure, and future-ready.
        </Typography>
      </Box>

      {/* Highlights Grid */}
      <Grid container spacing={3}>
        {highlights.map((highlight, index) => (
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
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(100, 108, 255, 0.2)',
                  border: '1px solid rgba(100, 108, 255, 0.5)',
                }
              }}
            >
              <Box sx={{ color: '#646cff', marginBottom: '1rem' }}>
                {highlight.icon}
              </Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, marginBottom: '0.75rem' }}>
                {highlight.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
                {highlight.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About;
