# FleetWise — Standalone PWA

A self-contained, installable Progressive Web App rebuild of **FleetWise**, with the
Base44 backend replaced by on-device storage and optional Anthropic AI. **No login** —
use the **“View as”** switch (top-right) to explore Driver, Manager and Admin.

## What's inside
- `index.html` · `app.css` · `app.js` — the whole app (vanilla JS, no build step)
- `manifest.webmanifest` · `sw.js` · `icons/` — PWA install + offline support

## Run it locally
Because service workers need http(s) (not `file://`), serve the folder:

```bash
# Python (any OS with Python 3)
cd FleetWise-PWA
python3 -m http.server 8080
# then open http://localhost:8080
```

or with Node: `npx serve .`

## Host it on the web (free)
Drag this folder onto **Netlify Drop** (app.netlify.com/drop), or push to a
**GitHub Pages** repo, or Cloudflare Pages / Vercel. It's all static files.

## AI features (Vehicle Audit, Damage Trends)
- **Demo mode (default):** realistic AI results generated locally — zero setup.
- **Real AI:** Settings → paste your **Anthropic API key** (stored only in your
  browser; calls go directly to Anthropic). Untick "Force demo mode".

## Data
Everything is stored in your browser (IndexedDB; falls back to in-memory if blocked).
Settings → Export / Reset demo data / Wipe everything. Nothing is uploaded.

## What was replaced (vs the Base44 original)
| Base44 | Replacement |
|---|---|
| `base44.entities.*` (DB) | IndexedDB store with the same list/filter/create/update/delete API |
| `base44.auth` (login) | Disabled; local role switcher (Driver/Manager/Admin) |
| `integrations.Core.InvokeLLM` | Anthropic API (your key) or local demo generator |
| `integrations.Core.UploadFile` | Local image resize → stored as data URL |
| `integrations.Core.SendEmail` | No-op (logged to console) |

## Notes
This is the **instant-test rebuild** covering the core flows: dashboards, the five
request forms (accident / incident / maintenance / tyre / breakdown), AI vehicle audit,
my requests, availability, fleet & vehicle management, audits, damage trends, reports,
search, notifications, chat and onboarding. It is not the full 37-page original, but
it reproduces FleetWise's purpose and is fully usable offline.
