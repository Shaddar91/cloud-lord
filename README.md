# Cloud Lord - IT Consultancy Website

Professional IT consultancy website showcasing cloud infrastructure, DevOps, and AI engineering services.

## Tech Stack

- **React**: 18.2.0
- **Vite**: 5.0.8 (Build tool)
- **Material-UI**: 5.15.6 (Component library)
- **React Router DOM**: 6.21.3
- **React Helmet**: 6.1.0 (SEO)
- **React Scroll**: 1.9.0 (Smooth scrolling)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

## Running the Application

### Development Server

To run the development server:

```bash
npm run dev
```

The application will start on **http://localhost:5173**

**Note**: This project uses Vite, not Create React App. The command is `npm run dev` (NOT `npm start`).

### Production Build

To create a production build:

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint:

```bash
npm run lint
```

## Project Structure

```
cloud-lord/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components (About, Services, Contact)
│   ├── assets/              # Images and logos
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Build output (generated)
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── index.html               # HTML entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Quick Reference

**Starting the app**: `npm run dev`
**Access URL**: http://localhost:5173
**Build command**: `npm run build`

## Local dev

The contact form talks to the Blazar API (nonce + submit). By default it
points at the production endpoint `https://api.cloud-lord.com`. To point
at a Blazar instance running locally, copy `.env.example` to `.env.local`
and override the base URL:

```bash
cp .env.example .env.local
# then edit .env.local:
# VITE_API_BASE=http://localhost:3030
```

Vite picks up `.env.local` automatically on `npm run dev`.

Matomo tracking is consent-gated: the `<ConsentBanner>` must be accepted
before any `_paq` commands are flushed. Until Matomo's script is injected
(C35 wizard), `track()` / `trackGoal()` calls are queued safely in-memory.

---

Built with React + Vite
