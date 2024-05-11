// React and MUI components
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// FontAwesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAws, faDocker } from '@fortawesome/free-brands-svg-icons';

// Iconify icons
import { Icon } from '@iconify/react';
import kubernetesIcon from '@iconify/icons-logos/kubernetes';
import ansibleIcon from '@iconify/icons-logos/ansible';
import redisIcon from '@iconify/icons-logos/redis';
import postgresIcon from '@iconify/icons-logos/postgresql';
import mysqlIcon from '@iconify/icons-logos/mysql';
import helmIcon from '@iconify/icons-logos/helm';

// Local assets
import whiteRustLogo from '../assets/rust.png'; // Path to your white Rust logo PNG
import terraformLogo from '../assets/terraform.png'; // Path to your Terraform logo PNG
import cicdLogo from '../assets/cicd.png'; // Path to your Terraform logo PNG
import pythonLogo from '../assets/python.png'; // Path to your Terraform logo PNG
import hetznerLogo from '../assets/hetzner.svg';
import ipfsLogo from '../assets/ipfs.png';
import nextjsLogo from '../assets/nextjs.png';
import nodeJsLogo from '../assets/nodejs.png';
import vaultLogo from '../assets/vault.png';
import vercelLogo from '../assets/vercel.png';

const Services = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      borderRadius: '10px',
      maxWidth: '1100px',
      margin: 'auto',
      gap: '2rem'
    }}>
      <Typography variant="h4" gutterBottom>
        Services
      </Typography>
      <Typography variant="body1" paragraph>
        Providing cutting-edge cloud solutions and DevOps services.
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        {/* Terraform */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={terraformLogo} alt="terraform" style={{ width: '79px', height: '64px' }} />
          <Typography variant="caption">Terraform</Typography>
          <Typography variant="body2">IAC</Typography>
        </Box>
        {/* AWS */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <FontAwesomeIcon icon={faAws} size="4x" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">AWS cloud services</Typography>
        </Box>
        {/* Docker */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <FontAwesomeIcon icon={faDocker} size="4x" />
          <Typography variant="caption">Docker</Typography>
          <Typography variant="body2">Container platform</Typography>
        </Box>
        {/* Kubernetes */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <Icon icon={kubernetesIcon} width="64" height="64" />
          <Typography variant="caption">Kubernetes</Typography>
          <Typography variant="body2"></Typography>
        </Box>
        {/* Ansible */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <Icon icon={ansibleIcon} width="64" height="64" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Ansible for VM automation</Typography>
        </Box>
        {/* Redis */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <Icon icon={redisIcon} width="64" height="64" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Redis In-memory data structure store</Typography>
        </Box>
        Rust
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={whiteRustLogo} alt="Rust" style={{ width: '79px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Rust</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <Icon icon={postgresIcon} width="64" height="64" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">PostgreSQL</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <Icon icon={mysqlIcon} width="64" height="64" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">MySQL</Typography>
        </Box>

        {/* Helm Icon */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px', margin: '10px' }}>
          <Icon icon={helmIcon} width="64" height="64" />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Kubernetes package manager</Typography>
        </Box>
        {/* cicd*/}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={cicdLogo} alt="cicd" style={{ width: '89px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">CICD</Typography>
        </Box>
        {/* python */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={pythonLogo} alt="python" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Python</Typography>
        </Box>
        {/*hetzner*/}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={hetznerLogo} alt="hetzner" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Hetzner Cloud</Typography>
        </Box>
        {/* ipfs */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={ipfsLogo} alt="ipfs" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Ipfs</Typography>
        </Box>
        {/* next */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={nextjsLogo} alt="nextJs" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">nextJS</Typography>
        </Box>
        {/* nodejs */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={nodeJsLogo} alt="nodeJS" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">nodeJS</Typography>
        </Box>
        {/* vault */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={vaultLogo} alt="vault" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Hashicorp Vault</Typography>
        </Box>
        {/* vercel */}
        <Box sx={{ textAlign: 'center', maxWidth: '120px' }}>
          <img src={vercelLogo} alt="vercel" style={{ width: '100px', height: '64px' }} />
          <Typography variant="caption"></Typography>
          <Typography variant="body2">Vercel</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Services;
