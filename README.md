# Desh Website

Next.js landing page deployed to Cloudflare Workers with OpenNext.

Live Worker URL:

```txt
https://desh-website.vinayakvnair.workers.dev
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Cloudflare Preview

Build the OpenNext Worker bundle and run it locally with Wrangler:

```bash
npm run preview
```

## Deploy

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

The Worker configuration lives in `wrangler.jsonc`; the OpenNext adapter configuration lives in `open-next.config.ts`.
