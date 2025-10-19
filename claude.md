# Cloud Lord - IT Consultancy Website

## 📍 Location
**Project Path**: `/home/shaddar/Documents/workspace/personal/react/mywebsite/cloud-lord/`
**Project Type**: React + Vite Single Page Application (SPA)
**Purpose**: Professional IT consultancy website showcasing cloud infrastructure, DevOps, and AI engineering services

## 🎯 Project Overview

Cloud Lord is a professional consultancy website built with React that showcases expertise in:
- Cloud Infrastructure (AWS, Hetzner)
- DevOps & Automation
- AI/ML Engineering
- Kubernetes & Container Orchestration
- Infrastructure as Code (Terraform)

## 🛠️ Tech Stack

### Core Technologies
- **React**: 18.2.0
- **Vite**: 5.0.8 (Build tool)
- **Material-UI**: 5.15.6 (Component library)
- **React Router DOM**: 6.21.3
- **React Helmet**: 6.1.0 (SEO)
- **React Scroll**: 1.9.0 (Smooth scrolling)

### Icon Libraries
- **Material-UI Icons**: @mui/icons-material
- **FontAwesome**: React FontAwesome integration
- **Iconify**: @iconify/react for additional logo icons

### Development Tools
- **ESLint**: Code quality and linting
- **Vite**: Fast development server and build tool

## 📂 Project Structure

```
cloud-lord/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ServiceCard.jsx  # Service offering card component
│   │   └── TechCard.jsx     # Technology icon card component
│   ├── pages/               # Page components
│   │   ├── About.jsx        # About section with company info
│   │   ├── Services.jsx     # Services and technology stack
│   │   └── Contact.jsx      # Contact information
│   ├── assets/              # Images and logos
│   │   ├── logo2.png        # Cloud Lord logo
│   │   ├── cool.png         # Background image
│   │   └── *.png/svg        # Technology logos
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Build output
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── index.html               # HTML entry point
```

## 🎨 Design & Features

### Responsive Design
- Mobile-first approach
- Responsive breakpoints for xs, sm, md screens
- Sticky navigation bar with smooth scrolling
- Dark theme with semi-transparent overlays

### Components

#### TechCard Component
Reusable component for displaying technology logos with:
- Support for multiple icon types (image, FontAwesome, Iconify)
- Hover effects and animations
- Title and description support
- PropTypes validation

**Location**: `src/components/TechCard.jsx`

#### ServiceCard Component
Feature-rich service cards with:
- Service title and icon
- Detailed description
- List of key capabilities
- Hover animations and visual feedback
- PropTypes validation

**Location**: `src/components/ServiceCard.jsx`

### Pages

#### About (`src/pages/About.jsx`)
- Hero section with company tagline
- Detailed company description
- 4 highlight cards (Cloud Native, Security First, DevOps Excellence, AI Engineering)
- Responsive grid layout

#### Services (`src/pages/Services.jsx`)
Comprehensive services page featuring:
- **4 Main Service Categories**:
  1. Cloud Infrastructure & DevOps
  2. AI & Machine Learning Engineering
  3. Container Orchestration
  4. Database & Data Engineering

- **Technology Stack Section**: 17 technology cards including:
  - Terraform, AWS, Docker, Kubernetes
  - Ansible, Helm, PostgreSQL, MySQL, Redis
  - Python, Node.js, Next.js
  - CI/CD, Vault, Hetzner, Vercel, IPFS

#### Contact (`src/pages/Contact.jsx`)
- Contact information cards (Email, LinkedIn, GitHub, Location)
- Clickable cards for external links
- Additional information about availability and services

### SEO Optimization
- React Helmet for meta tags
- Comprehensive page title and description
- Open Graph tags for social media sharing
- Keyword optimization for cloud, DevOps, AI engineering

## 🚀 Available Scripts

```bash
# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎯 Key Features

1. **Single Page Application**: Smooth navigation with react-scroll
2. **Responsive Design**: Works on mobile, tablet, and desktop
3. **Component-Based**: Modular, reusable components
4. **SEO Optimized**: Proper meta tags and semantic HTML
5. **Professional Design**: Modern dark theme with accent colors
6. **Icon Diversity**: Multiple icon libraries for comprehensive tech coverage
7. **Accessibility**: Proper ARIA labels and semantic structure
8. **Performance**: Optimized build with Vite

## 🎨 Design System

### Color Palette
- **Primary**: #646cff (Blue accent)
- **Background**: Black with rgba overlays
- **Text**: White with varying opacity
- **Borders**: White with 10-30% opacity

### Typography
- **Font Family**: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- **Heading Sizes**: h3 (About/Services), h4 (subsections), h5 (cards), h6 (taglines)

### Spacing
- **Container Max Width**: 1400px
- **Section Padding**: 2-3rem (desktop), 1.5rem (mobile)
- **Card Spacing**: 2-3rem gap
- **Border Radius**: 12px for cards/sections

## 🔧 Configuration

### Vite Config
- React plugin enabled
- ESLint integration
- Fast refresh for development

### ESLint Config
- React plugin
- React hooks rules
- React refresh plugin
- No unused variables
- Maximum 0 warnings

## 📦 Dependencies

### Production
- react, react-dom: Core React
- @mui/material, @mui/icons-material: Material-UI components and icons
- react-helmet: SEO meta tags
- react-router-dom: Client-side routing
- react-scroll: Smooth scrolling
- @fortawesome/*: FontAwesome icons
- @iconify/react: Additional icon library

### Development
- vite: Build tool
- @vitejs/plugin-react: Vite React plugin
- eslint: Code linting
- eslint-plugin-react*: React-specific ESLint rules

## 🔄 Integration with AI Automation System

This project can be integrated with the AI task automation system at:
`~/Documents/workspace/ai-task-automation/`

### Project Routing Keywords
For the orchestrator to route tasks to this project, use:
- "cloud-lord"
- "cloud lord website"
- "cloudlord"
- "consultancy website"

### Recommended Agent
- **Primary**: `frontend-engineer.md` for React/UI work
- **Secondary**: `task-executor.md` for general updates

## 📝 Common Tasks

### Adding New Service
1. Edit `src/pages/Services.jsx`
2. Add service object to `services` array
3. Include title, icon, description, and features

### Adding New Technology
1. Import technology logo/icon in `src/pages/Services.jsx`
2. Add `<TechCard>` component in Technology Stack section
3. Provide icon, title, and description

### Updating Contact Info
1. Edit `src/pages/Contact.jsx`
2. Modify `contactMethods` array
3. Update links and contact details

### Styling Changes
1. Global styles: `src/index.css`
2. App-specific: `src/App.css`
3. Component styles: Inline with Material-UI `sx` prop

## 🐛 Troubleshooting

### Build Fails
- Check `npm run lint` for ESLint errors
- Ensure all imports are valid
- Verify PropTypes are defined for all components

### Icons Not Showing
- Check icon import statements
- Verify icon library is installed
- Ensure correct icon name/path

### Responsive Issues
- Test breakpoints: xs (0px), sm (600px), md (900px), lg (1200px)
- Check Material-UI `sx` responsive syntax
- Verify media queries in CSS

## 🎯 Future Enhancements

Potential improvements:
- [ ] Add blog section for technical articles
- [ ] Portfolio/case studies page
- [ ] Testimonials section
- [ ] Contact form with backend integration
- [ ] Dark/light theme toggle
- [ ] Animation improvements (framer-motion)
- [ ] Performance monitoring (Web Vitals)
- [ ] Progressive Web App (PWA) features

## 📊 Performance

Current build metrics:
- **Bundle Size**: ~435 KB (143 KB gzipped)
- **CSS Size**: ~2.2 KB (0.91 KB gzipped)
- **Build Time**: ~3.7s
- **Assets**: 11 images (~3 MB total)

## 🔗 External Links

- LinkedIn: https://www.linkedin.com/in/tomislav-ivanovic-124b13115
- GitHub: https://github.com/Shaddar91

## 📅 Project Status

**Current Version**: 0.0.0 (Pre-release)
**Last Updated**: 2025-10-19
**Status**: ✅ Fully refactored and enhanced with AI engineering services

---

**Maintainer**: Cloud Lord / Tomislav Ivanovic
**Context File**: For AI agents working with this project
