# Gear Deal Alerts

High-level MVP: watch console gear (SSD / headset / TV) for mock price drops, keep a local watchlist, and queue an **email alert stub**. Buy links are affiliate placeholders.

Pairs with [Console Gear Hub](https://github.com/hamzaakram007/console-gear-hub) — the hub compares; this watches and nudges buy timing.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- `localStorage` watchlist (no DB yet)
- `POST /api/alerts` stub (no real email / Discord send)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## MVP scope

- ~10 seed SKUs with mock prices + short history
- Watch / unwatch UI (localStorage)
- Drop % + “at target” badges
- Email alert stub API (`POST /api/alerts` — no real send)
- Affiliate disclosure + `example.com` placeholder deep links
- SEO basics: metadata, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD

## Not in MVP

- Live retailer scraping / APIs
- Real Resend / Discord delivery
- Auth, Pro plan, or SMS

## Deploy

Linked to Vercel team project `gear-deal-alerts`. Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://deals.neongulf.com
```

## License

Public repo under Hamza Akram.
