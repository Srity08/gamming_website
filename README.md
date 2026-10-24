# PlayHub: free browser games portal
Static HTML/CSS/JS site. No build step, no dependencies.

## Structure
- `index.html`, `category.html`, `game.html`: home, browse/search/filter, game view
- `about.html`, `contact.html`, `privacy.html`, `terms.html`: static pages
- `js/data/games.js`: **game catalogue + config** (the only file you edit to manage games)
- `js/components.js`: reusable header/footer/card/ad-slot helpers; `js/app.js`: page logic
- `css/styles.css`: styling; `games/`: self-hosted games (`dot-tap.html` is an original sample)

## Run locally
ES modules need HTTP (not `file://`):
`cd playhub && python3 -m http.server 8000`, then open http://localhost:8000

## Add / edit / remove games
Add, change or delete an object in `GAMES` (id, title, category, emoji, colors, description, embedUrl, plays, added).
- **Self-hosted game:** put it in `games/` and set `embedUrl: "games/yourgame.html"`.
- **Third-party game:** only with a licence/publisher agreement. Set `embedUrl` to the https URL and add its hostname to `CONFIG.allowedEmbedHosts`, then add that host to `frame-src` in the CSP `<meta>` of `game.html`.
- Empty `embedUrl` = shown as "Coming soon". No fake game is ever displayed.
- Real thumbnails: the card uses gradient + emoji; to use images, add a `thumbnail` field and render it in `card()` (`components.js`).

## High scores
A game reports a score with `parent.postMessage({type:"score", value:123}, "*")` and the catalogue entry sets `scoreSupport: true`. Scores are stored per device in localStorage. **Global leaderboards need a backend.**

## Needs external services / configuration
- Contact form: currently `mailto:`; replace email address, or use a form service.
- Ads: reserved `data-ad-slot` boxes; add your ad network script + update CSP. Privacy policy and consent banner must be updated (GDPR/CCPA).
- Premium membership: placeholder only; needs auth + payments (e.g. Stripe) and server.
- Legal pages are templates; get legal review.
- Sitemap/robots.txt, canonical URLs and per-game SEO pages (game pages use query strings, so consider prerendering) before launch.

## Deploy
Upload the folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3). Serve over HTTPS and set headers (CSP, X-Content-Type-Options, Referrer-Policy) at the host.
