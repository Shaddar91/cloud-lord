import { Typography, Box, Grid } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';

//Import components
import ServiceCard from '../components/ServiceCard';
import TechCard from '../components/TechCard';

//FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faDocker } from '@fortawesome/free-brands-svg-icons';

//Iconify icons
import { Icon } from '@iconify/react';
import kubernetesIcon from '@iconify/icons-logos/kubernetes';
import ansibleIcon from '@iconify/icons-logos/ansible';
import redisIcon from '@iconify/icons-logos/redis';
import postgresIcon from '@iconify/icons-logos/postgresql';
import mysqlIcon from '@iconify/icons-logos/mysql';
import helmIcon from '@iconify/icons-logos/helm';

//Local assets
import terraformLogo from '../assets/terraform.png';
import cicdLogo from '../assets/cicd.png';
import pythonLogo from '../assets/python.png';
import hetznerLogo from '../assets/hetzner.svg';
import ipfsLogo from '../assets/ipfs.png';
import nextjsLogo from '../assets/nextjs.png';
import nodeJsLogo from '../assets/nodejs.png';
import vaultLogo from '../assets/vault.png';
import vercelLogo from '../assets/vercel.png';

const Services = () => {
  const services = [
    {
      title: 'Cloud Infrastructure & DevOps',
      icon: <CloudIcon sx={{ fontSize: 48 }} />,
      description: 'Design, build, and manage robust cloud infrastructure with industry-leading DevOps practices. Expertise in AWS and Hetzner Cloud for scalable, secure, and cost-effective solutions.',
      features: [
        'AWS architecture design and implementation',
        'Multi-cloud infrastructure management',
        'Infrastructure as Code (Terraform, Pulumi)',
        'Kubernetes cluster setup and management',
        'CI/CD pipeline automation',
        'High-availability and disaster recovery'
      ]
    },
    {
      title: 'AI & Machine Learning Engineering',
      icon: <PsychologyIcon sx={{ fontSize: 48 }} />,
      description: 'Modern AI/ML solutions and intelligent automation systems. From LLM integration to custom AI agents and automated workflows.',
      features: [
        'LLM integration (Claude, GPT, open-source models)',
        'AI agent development and orchestration',
        'ML model deployment and serving',
        'AI-powered workflow automation',
        'Custom AI solution architecture'
      ]
    },
    {
      title: 'Website & Business Solutions',
      icon: <WebIcon sx={{ fontSize: 48 }} />,
      description: 'Full-stack web development solutions tailored to your business needs. From simple landing pages to complex web applications with authentication, CMS, and database integration.',
      features: [
        'Custom website design and development',
        'User authentication and login systems',
        'Content Management Systems (CMS)',
        'E-commerce and business platforms',
        'Responsive design for all devices',
        'Ongoing support and maintenance'
      ]
    },
    {
      title: 'Container Orchestration',
      icon: <CodeIcon sx={{ fontSize: 48 }} />,
      description: 'Expert Kubernetes management for streamlined container deployment, scaling, and operations. Implement modern microservices architectures with confidence.',
      features: [
        'Kubernetes cluster design and deployment',
        'Helm chart development and management',
        'Service mesh implementation',
        'Container security and compliance',
        'Auto-scaling and resource optimization',
        'Monitoring and observability setup'
      ]
    },
    {
      title: 'Database & Data Engineering',
      icon: <StorageIcon sx={{ fontSize: 48 }} />,
      description: 'Reliable database solutions and data infrastructure. From traditional RDBMS to modern distributed systems and caching layers.',
      features: [
        'PostgreSQL and MySQL optimization',
        'Redis caching strategies',
        'Database migration and replication',
        'Backup and recovery solutions',
        'Performance tuning and monitoring',
        'Data security and encryption'
      ]
    }
  ];

  return (
    <Box sx={{
      padding: { xs: '1.5rem', md: '3rem' },
      maxWidth: '1400px',
      margin: '0 auto',
    }}>
      {/* Services Header */}
      <Box sx={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '12px',
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
          Our Services
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto' }}>
          Comprehensive cloud infrastructure, DevOps, web development, and AI engineering solutions tailored to your business needs
        </Typography>
      </Box>

      {/* Service Cards */}
      <Grid container spacing={3} sx={{ marginBottom: '4rem' }}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ServiceCard
              title={service.title}
              icon={service.icon}
              description={service.description}
              features={service.features}
            />
          </Grid>
        ))}
      </Grid>

      {/* Technology Stack */}
      <Box sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '3rem 2rem',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: 'white', marginBottom: '2rem', fontWeight: 600 }}>
          Technology Stack
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          We leverage industry-leading technologies and tools to deliver robust, scalable solutions
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <TechCard
            icon={terraformLogo}
            title="Terraform"
            description="Infrastructure as Code"
            iconType="image"
          />
          <TechCard
            icon={<FontAwesomeIcon icon={faAws} size="4x" />}
            title="AWS"
            description="Cloud Platform"
            iconType="fontawesome"
          />
          <TechCard
            icon={<FontAwesomeIcon icon={faDocker} size="4x" />}
            title="Docker"
            description="Containerization"
            iconType="fontawesome"
          />
          <TechCard
            icon={<Icon icon={kubernetesIcon} width="64" height="64" />}
            title="Kubernetes"
            description="Container Orchestration"
            iconType="iconify"
          />
          <TechCard
            icon={<Icon icon={ansibleIcon} width="64" height="64" />}
            title="Ansible"
            description="Configuration Management"
            iconType="iconify"
          />
          <TechCard
            icon={<Icon icon={helmIcon} width="64" height="64" />}
            title="Helm"
            description="K8s Package Manager"
            iconType="iconify"
          />
          <TechCard
            icon={<Icon icon={postgresIcon} width="64" height="64" />}
            title="PostgreSQL"
            description="Relational Database"
            iconType="iconify"
          />
          <TechCard
            icon={<Icon icon={mysqlIcon} width="64" height="64" />}
            title="MySQL"
            description="Relational Database"
            iconType="iconify"
          />
          <TechCard
            icon={<Icon icon={redisIcon} width="64" height="64" />}
            title="Redis"
            description="In-Memory Data Store"
            iconType="iconify"
          />
          <TechCard
            icon={pythonLogo}
            title="Python"
            description="Backend & AI/ML"
            iconType="image"
          />
          <TechCard
            icon={nodeJsLogo}
            title="Node.js"
            description="JavaScript Runtime"
            iconType="image"
          />
          <TechCard
            icon={nextjsLogo}
            title="Next.js"
            description="React Framework"
            iconType="image"
          />
          <TechCard
            icon={cicdLogo}
            title="CI/CD"
            description="Automation Pipelines"
            iconType="image"
          />
          <TechCard
            icon={vaultLogo}
            title="Vault"
            description="Secrets Management"
            iconType="image"
          />
          <TechCard
            icon={hetznerLogo}
            title="Hetzner"
            description="Cloud Provider"
            iconType="image"
          />
          <TechCard
            icon={vercelLogo}
            title="Vercel"
            description="Deployment Platform"
            iconType="image"
          />
          <TechCard
            icon={ipfsLogo}
            title="IPFS"
            description="Distributed Storage"
            iconType="image"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
