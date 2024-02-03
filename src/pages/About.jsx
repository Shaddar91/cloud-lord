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
      color: 'green',
      borderRadius: '10px', // Optional: adds rounded corners
      maxWidth: '1100px', // Adjust the width as needed
      margin: '5rem', // Adjust space from top and auto for left and right margins
      marginLeft: '1', // Adjust space from top
    }}>
      <Typography variant="h4" gutterBottom>
        Cloud Lord
      </Typography>
      <Typography variant="body1" paragraph>
      Stands as a specialized consultancy, expertly catering to infrastructure needs with a commitment to security and Infrastructure as Code (IaC) standards. Services include:
      Cloud Solutions: Focused on AWS for robust, scalable cloud infrastructure.
      IaC Expertise: Employing Terraform and Pulumi for efficient, consistent infrastructure deployment.
      Container Orchestration: Skilled in Kubernetes management for streamlined container deployment.
      Migration Mastery: Proficient in transitioning systems to AWS, optimizing for high-traffic environments.
      Blockchain Specialization: Offering tailored services for blockchain projects, blending technical acumen with industry insights.
      </Typography>
      {/* Add more paragraphs as needed */}
      <Typography variant="body1
      " paragraph>
        We specialize in automating and enhancing development pipelines, ensuring
        that your software delivery is fast, reliable, and secure. Our team committed to tailoring cloud-based solutions
        that align with your business objectives, from startup scale-ups to
        enterprise migrations.
      </Typography>
      {/* ... */}
    </Box>
  );
};

export default About;
