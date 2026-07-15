# Golden Home Lloret

Premium luxury real estate website for **Golden Home Lloret** — exclusive villas and properties on the Costa Brava.

## Tech Stack

- React 19 + TypeScript + Vite
- TailwindCSS 4 + Framer Motion
- React Router 7 + React i18next (ES, CA, EN, FR)
- Zustand + Fuse.js + Swiper + React Hook Form

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build & Deploy

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host. SPA routing is configured via `vercel.json` and `netlify.toml`.

## Adding Properties

Create a new JSON file in `src/properties/` — no code changes required:

```
src/properties/villa-007.json
```

Each property must include: `id`, `slug`, `title`, `price`, `location`, translations, `images`, and all required fields. See existing files for the schema.

## Project Structure

```
src/
├── components/     # UI, layout, property, search components
├── pages/          # Route pages (lazy-loaded)
├── layouts/        # (via components/layout)
├── hooks/          # Custom React hooks
├── services/       # Property & blog data services
├── stores/         # Zustand state (favorites, compare, filters)
├── locales/        # i18n translation files
├── properties/     # Property JSON files (admin-friendly)
├── data/           # Blog posts, team, testimonials
├── types/          # TypeScript interfaces
└── utils/          # Formatters, constants
```

## Features

- Full i18n (Spanish, Catalan, English, French) with hreflang SEO
- Advanced local property search with Fuse.js
- Favorites, compare (up to 3), recently viewed
- Mortgage calculator & currency converter (EUR/USD/GBP)
- Dark mode, floating contact buttons
- Blog with Markdown support
- Schema.org, OpenGraph, sitemap, robots.txt
- Code splitting & lazy route loading

## Contact

**Golden Home Lloret**  
Av. Pau Casals 38, 17310 Lloret de Mar, Girona  
📞 +34 601 901 275  
🌐 [goldenhomelloret.es](https://goldenhomelloret.es)
