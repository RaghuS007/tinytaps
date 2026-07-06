# TinyTaps 👶✨

A free, safe, fullscreen play world for babies and toddlers (6–36 months).
7 play modes, no ads, no accounts, no tracking. Works offline as a PWA.

## Repo layout

```
public/            # static site → Cloudflare Pages
  index.html       # parent-facing landing page
  play.html        # the app (7 modes + parent menu)
  manifest.json    # PWA install
  sw.js            # offline service worker
  icon-192.png, icon-512.png, og-image.png
worker/            # presence counter → Cloudflare Worker
  presence.js      # Durable Object (WebSocket hibernation)
  wrangler.toml
```

## Deploy — one-time setup (~30 minutes)

### 0. Prerequisites
- Buy `tinytaps.com` on Cloudflare Registrar (at-cost, ~$10/yr): dash.cloudflare.com → Domain Registration.
- A GitHub account and `git` installed.
- Node.js 18+ for the worker CLI.

### 1. Push this repo to GitHub
```bash
cd tinytaps
git init && git add -A && git commit -m "TinyTaps v1"
git branch -M main
git remote add origin https://github.com/<you>/tinytaps.git
git push -u origin main
```

### 2. Deploy the site on Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
2. Build command: *(leave empty)*. Build output directory: `public`.
3. Deploy. You get `tinytaps.pages.dev` immediately.
4. **Custom domains** tab → add `tinytaps.com` and `www.tinytaps.com`. HTTPS is automatic.

### 3. Deploy the presence worker
```bash
npm install -g wrangler
cd worker
wrangler login
wrangler deploy
```
Note the URL it prints, e.g. `https://tinytaps-presence.<you>.workers.dev`.

### 4. Wire the counter into the site
- `public/play.html` → set `PRESENCE_URL = "wss://tinytaps-presence.<you>.workers.dev/ws"`
- `public/index.html` → set `PRESENCE_COUNT_URL = "https://tinytaps-presence.<you>.workers.dev/count"`
- Commit + push → Pages auto-redeploys.

If you skip step 3–4 entirely, everything still works — the counter simply never appears.

### 5. Verify
- Open the site on two phones → landing badge should say “2 little ones playing”.
- Chrome → menu → **Add to Home Screen** → relaunch → airplane mode → still plays.
- Share a WhatsApp message with the link → preview card image should appear.

## Costs
- Domain: ~$10/year. Everything else: $0 on Cloudflare free tiers
  (Pages: unlimited bandwidth; Workers: 100k requests/day; DO: SQLite-backed, included in free plan).
- If the counter ever exceeds free limits (a genuinely viral day), the site keeps
  working — only the badge disappears until quota resets.

## Privacy stance (keep this true)
- No analytics scripts, no cookies, no fingerprinting, no child data.
- The presence counter transmits nothing but an anonymous socket open/close.
- Child's name for celebrations is stored only in the device's localStorage.

## Updating the app
Edit `public/play.html`, bump `CACHE = 'tinytaps-v2'` in `sw.js` (so installed
PWAs pick up the new version), commit, push.
