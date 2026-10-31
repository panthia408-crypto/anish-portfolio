# anishpanthi.com.np

Personal site of Anish Panthi. Next.js 16 (App Router, Cache Components) with a read-only Sanity dataset for the MEP learning log.

The design and the reasoning behind it are in [DESIGN_PLAN.md](DESIGN_PLAN.md). Content still to be supplied is in [TODO_CONTENT.md](TODO_CONTENT.md).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `app/styles/tokens.css` | Every color, type size, space and motion value. Change the look here. |
| `app/styles/` | Base styles, shared components, nav and footer, home, subpages, /soies |
| `app/components/ui/` | Primitives: Section, Figure, Placeholder, SpecList, links, Reveal |
| `app/components/home/` | Home page sections, in page order |
| `app/data/` | Site content: facts, projects, research, journey, tools, writing, SOIES events |
| `app/lib/` | Sanity fetch (read only, cached hourly) and page metadata helper |
| `studio/` | Sanity Studio schemas. Extend only; never rename or delete. |
| `public/files/` | CV, magazine PDF and printed pages |

## Placeholders

Missing content is written as `[PLACEHOLDER: what is needed]` in the data files and renders as a dashed drafting note. To list what is still open:

```bash
git grep -n "PLACEHOLDER:" app
```

## Screenshots

```bash
node scripts/screenshots.mjs ./shots http://localhost:3000            # every page at 375, 768, 1440 px
node scripts/screenshots.mjs ./shots http://localhost:3000 --dark     # same, dark mode
```

The script also reports horizontal overflow and console errors.
