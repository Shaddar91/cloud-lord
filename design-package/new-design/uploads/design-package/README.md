# Cloud Lord — Design Package

Everything you need to hand to **Claude Design** (`claude.ai/design`) to get redesign proposals for this site.

## What's in here

```
design-package/
├── README.md                  # this file
├── current-design.md          # full description of the site as it is today
├── claude-design-prompt.md    # copy-paste prompt for Claude Design
└── screenshots/
    ├── desktop-hero.png       # 1920x1080 — above the fold
    ├── desktop-full.png       # 1920x6500 — full scrollable page
    ├── mobile-hero.png        # 390x844 — mobile above the fold
    └── mobile-full.png        # 390x8500 — mobile full page
```

## How to use this (step by step)

1. Open `claude.ai/design` in your browser
2. Start a new design project
3. Open `claude-design-prompt.md`, copy the whole thing
4. Paste it into Claude Design
5. Upload all 4 screenshots from `screenshots/`
6. Let Claude Design propose 3 directions
7. Pick one, iterate until you like it
8. Export the chosen design as HTML
9. Come back to Claude Code and say:
   > "Port the HTML at `<path>` into my existing cloud-lord React+MUI components. Match the new design but keep the component structure."

## Regenerating screenshots

If you change the site and want fresh screenshots:

```bash
cd /home/shaddar/Documents/workspace/personal/react/mywebsite/cloud-lord
npm run dev &
sleep 3
cd design-package/screenshots
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=1920,1080 \
  --screenshot=desktop-hero.png http://localhost:5173
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=1920,6500 \
  --screenshot=desktop-full.png http://localhost:5173
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=390,844 \
  --screenshot=mobile-hero.png http://localhost:5173
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=390,8500 \
  --screenshot=mobile-full.png http://localhost:5173
kill $(lsof -ti:5173)
```
