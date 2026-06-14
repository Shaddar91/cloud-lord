# cloud-lord.com

Personal portfolio and IT-consultancy marketing site.

## Stack

- Vite 5 + React 18
- Material-UI 5
- react-router-dom 6

## Local development

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build -> dist/
npm run preview    # serve the built output locally
npm run lint       # eslint
```

## Configuration

Runtime configuration is supplied through Vite environment variables at build
time and is never committed to this repository. No endpoints, hosts, or
credentials are hardcoded in the source; unset variables degrade to safe,
same-origin or no-op defaults.
