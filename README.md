# Tanmay Ghai

Personal site: [portfolio.tanmayghai18.workers.dev](https://portfolio.tanmayghai18.workers.dev)

Astro static site, served as Cloudflare Worker assets.

## Content

Edit markdown in `src/content/`:

- `profile/` — name, links, and About copy
- `research/` — intro blurb (`kind: intro`) and papers (`kind: paper`)
- `writing/` — posts

Each list entry needs `title`, `url`, and `order` (higher = first).

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Local server (`astro dev --background` in Cursor) |
| `npm run build` | Write `dist/` |
| `npm run preview` | Build, then `wrangler dev` |
| `npm run deploy` | Build and deploy the Worker |
