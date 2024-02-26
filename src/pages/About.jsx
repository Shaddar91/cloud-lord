import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const About = () => {
  return ( 
    <Box sx={{
      display: 'flex', // Enable flex container
      flexDirection: 'column', // Stack children vertically
      alignItems: 'flex-start', // Align children to the start of the container (left side)
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
      color: 'white',
      borderRadius: '10px', // Optional: adds rounded corners
      maxWidth: '2500px', // Adjust the width as needed
      margin: '1rem', // Adjust space from top and auto for left and right margins
      marginLeft: '1', // Adjust space from top
    }}>
      <Typography variant="h4" gutterBottom>
        Cloud Lord
      </Typography>
      <Typography variant="body1" paragraph>
        Is a specialized consultancy agency, specialized in creating infrastructure solutions with security in mind following IAC standards. Services include:
        Cloud Solutions: Professional in AWS for robust, scalable cloud infrastructure.
        IaC Expertise: Utilizing Terraform and Pulumi for efficient, consistent infrastructure deployment.
        Container Orchestration: Skilled in Kubernetes management for streamlined container deployment.
        Migration Mastery: Proficient in transitioning systems to AWS, optimizing for high-traffic environments.
        Blockchain Specialization: Providing customized services for blockchain projects.
      </Typography>
      {/* Add more paragraphs as needed */}
      <Typography variant="body1
      " paragraph>
        Specialize in automating and enhancing development pipelines, ensuring
        that your software delivery is fast, reliable, and secure. Tailoring cloud-based solutions
        that align with your business objectives, from startup scale-ups to
        enterprise migrations.
      </Typography>
      {/* ... */}
    </Box>
  );
};

export default About;
