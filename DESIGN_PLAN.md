# Redesign plan: anishpanthi.com.np

Written 30 October 2026, from a read-through of the code on branch `migration/nextjs-from-main` (commit `43982e0`). No code was changed while writing this plan.

Missing content is tracked in [TODO_CONTENT.md](TODO_CONTENT.md).

---

## 1. Diagnosis

### The short version

The words on the site are good. The packaging comes from a 2021 developer template. The About text is specific and human: the root-cause story, the magazine you refused to outsource, the patented turbine you are working around. All of it sits inside blue-to-violet gradients, a glass card, a spinning ring and a particle field that could belong to anyone. The site never looks like it belongs to an industrial engineer, and the most interesting thing you do (the turbine research) is a third card with no link, no image and the wrong icon.

### Top 5 problems, in order of damage

1. **The hero says nothing specific.** The first screen shows a rotating greeting in 10 languages, a typewriter that types "I am Anish Panthi", the label "Industrial Engineer", and the line "Sharing my story and resources on industrial engineering". The buttons say "Learn More" and "Educational Content". The research, the presidency and the magazine don't appear above the fold. The `<h1>` also starts empty and fills in one letter every 90 ms ([HeroText.tsx](app/components/HeroText.tsx)), so the most important text on the page is the last to render.

2. **The visual language is a template, and it isn't yours.** The same `#4facfe → #7c3aed` gradient shows up in about 40 places: the eyebrow labels, the CTAs, the social hovers, the photo ring and the scrollbar. Add the glass nav, the glass About card, the conic ring spinning forever, the colored glow shadows and the constellation canvas on every page, and this is the most recognisable "AI-generated portfolio" look around. Nothing in it points to engineering, Nepal, print design or you. The nav logo ([public/logo.png](public/logo.png)) is a glowing 3D mockup render in the same palette, 477 KB, and its text is unreadable at nav size.

3. **There is no typographic system.** The body font is `'Inter'`, but Inter is never loaded, so every visitor gets their OS default. Every heading is weight 800 or 900. Every section opens with the same tiny uppercase gradient label. There is no second typeface, no mono for the engineering details and no type scale, only one-off `clamp()` values in each file. Without type contrast, a page has no hierarchy, and that is most of what "feels off" means.

4. **The section order buries the best material.** The order is Hero, About (a card that also holds the CV button, a magazine button and a publication box), a logo grid of 16 tools, Featured Work, "Latest Blogs", then Contact. The research gets one unlinked card. The magazine card links to `/blog` and uses a `fa-wind` icon, while the wind turbine card uses `fa-book-open`, so the two icons are swapped. A visitor learns which software you have opened before they learn what you built.

5. **Engineering debt shows up in the experience.**
   - On desktop, [public/js/main.js](public/js/main.js) replaces the About text with `mainBio` from Sanity. It skips this on mobile. The two audiences read different bios, and the Sanity text goes in through `innerHTML`.
   - The "role" expand feature in the same file writes into `.skills-container`. That element no longer exists, so the feature is dead code.
   - Section widths jump around: the hero is 680 px, About 1000 px, Work 1100 px and Contact 700 px, all centered. The left edge moves on every section.
   - Content marked `.reveal` stays at `opacity: 0` until JavaScript runs. If the script fails or loads late, whole sections are invisible.
   - Font Awesome's full CDN stylesheet is loaded for about 8 icons. The Toolbox makes 16 requests to `api.iconify.design`. Two canvas animation loops run, and `hero.css` alone has 711 lines of `-v2` and `-v3` overrides.

### Category by category

| Area | What's wrong |
|---|---|
| **Hierarchy** | Everything has the same weight: centered headers, same-size cards, gradient labels everywhere. Nothing is primary. Research, the strongest story, is tertiary. |
| **Typography** | No webfont loads. 800 to 900 weights everywhere. Letter-spaced uppercase gradient eyebrows on every section. No serif, no mono, no scale. |
| **Spacing** | Sections use `padding: 80 to 100px 5%`, each with a different max-width. There is no shared grid or spacing scale. Cards have generous padding but the gaps between sections feel arbitrary. |
| **Color** | A dark `#0a0a0c` background with the blue-violet-pink gradient. The portrait has a white studio background and sits inside a spinning gradient ring on a near-black page, so it clashes on purpose. |
| **Hero clarity** | You can't tell from the first screen what you do, what you've done or what you want. The real current status ("looking for an HVAC or MEP internship") only appears deep in the About text and on the Journey page. |
| **Copy** | The bio is good. The microcopy is filler: "Engineer Profile", "Expertise", "What I Do", "Insights", "Latest Blogs", "Learn More", "Have a project in mind? I'd love to hear from you." That last one speaks to freelance clients, but you are a student looking for an internship. |
| **Section order** | Skills before Work. Research hidden. The publication is shown twice (in the About card and in Work). Contact asks the wrong question. |
| **Mobile** | The hero turns into a centered link-in-bio stack: a 140 px ring photo, 5 square icon buttons and 2 gradient pills. Desktop and mobile show different About text. The nav hides on scroll-down. Scroll reveals are turned off with `!important`, which is fine, but the reveal CSS remains. |
| **Performance** | Font Awesome CDN (render-blocking CSS plus webfonts), 16 external icon requests, a 477 KB PNG logo, a 22.8 MB PDF linked as a primary button, 27 MB of SOIES images served as plain `<img>` (one is 12000 x 9000), two `requestAnimationFrame` loops on desktop, and no `next/image` anywhere. |
| **Leftovers** | `app/page.module.css` (create-next-app styles), an empty `app/globals.css`, `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg` and `window.svg`, duplicate `favicon.svg` and `logo.png` at the repo root, and `public/js/work-logic.js` and `events-logic.js`, which no page references. |

### The mouse-reactive star background: remove it

It goes, on the home page (`hero-bg.js`) and on every subpage (`page-bg.js`). Four reasons:

- It carries the template palette.
- It runs an animation loop forever on desktop.
- It is already switched off on mobile, so most visitors never see it. That makes it decoration, not identity.
- It competes with the content for attention. A static blueprint grid in CSS does the atmosphere job at zero runtime cost.

---

## 2. AI-looking elements, and what replaces each

| Element (where) | Why it reads as AI or template | Replacement |
|---|---|---|
| **About glass card** (`.about-glass-card`, [about.css](app/css/about.css)) | Frosted `backdrop-filter`, 28 px radius, huge soft shadow, gradient "ENGINEER PROFILE" label, chip tag cloud, two pill buttons and a nested publication box, all in one rounded rectangle. | No card. An editorial two-column spread on the page background. A captioned photo and a mono fact sheet sit in the narrow column, the bio is set as a lede plus body text in the wide column, with one pull quote in your own words. |
| **Spinning conic ring around the portrait** (`.hero-ring`) | An infinite gradient animation around a circle crop is the signature of template heroes. | A rectangular portrait on a paper plate, with crop marks and a figure caption ("Fig. 01"). In light mode, `mix-blend-mode: multiply` lets the white studio background melt into the paper. |
| **Gradient pill CTAs with colored glow** (`.hero-cta`) | The gradient fill, glow shadow and lift-on-hover combo. | A solid ink button with a 2 px radius and no shadow. Secondary actions are underlined text links with an arrow that moves 3 px on hover. |
| **Gradient-text eyebrow labels on every section** (`.section-label`, `.about-label`, `.gold-text`) | Same component everywhere, the same 3 px tracking, the same gradient. | A numbered section marker in mono ("01  Research"), in graphite with no gradient, set in a left column beside the heading. |
| **Icon-in-a-rounded-square work cards** (`.work-card` with `fa-users`, `fa-wind`, `fa-book-open`) | A generic icon grid. Here the icons are even mismatched. | A numbered index list. The two lead items get feature rows with real images (magazine cover, committee photo). No icons. |
| **Logo grid with brand-color hover and magnet effect** ([Toolbox.tsx](app/components/Toolbox.tsx)) | Logo walls say "I've heard of these". The magnet hover is a gimmick. It costs 16 external requests. | A plain-text tools list inside About, grouped by what you used each tool for, with honest levels in mono ("learning", "used for Vol. 11"). |
| **Rotating multilingual greeting and typewriter name** | A very common template trope. It delays the h1 and adds nothing. | A static `<h1>Anish Panthi</h1>` that renders on first paint. |
| **Glassmorphism nav** ([nav.css](app/css/nav.css)) | A blurred translucent bar. | A solid paper-colored bar with a hairline bottom border. |
| **Glowing 3D logo render** ([public/logo.png](public/logo.png)) | A mockup-generator look in the template palette. | A typographic wordmark, "Anish Panthi", in the display serif. No image. |
| **Centered everything** (hero, section headers, contact) | Centered stacks are the default output of a page generator. | Left-aligned, ragged-right text on a 12-column grid with deliberate asymmetry (narrow label column, wide content column). |
| **Gradient social icon squares** (`.social-icon:hover`) | The icon-button row from link-in-bio pages. | Text links in the footer and contact section ("LinkedIn", "GitHub", "Email"). No row of icons in the hero. |
| **"accent-bar" under page titles** (`page-common.css`) | A decorative gradient underline. | A full-width hairline rule, like the border of a drawing sheet. |
| **Form feedback** ("✓ Sent" on a green gradient, "Error!" on red) | Emoji-style tick and a shouty error. | Inline text below the button, inside an `aria-live` region: "Sent. I'll reply within [PLACEHOLDER: reply time]." |
| **Filler microcopy** ("Insights", "Expertise", "What I Do", "Learn More") | Labels that would fit any portfolio. | See the copy table in section 6. |

Checked and **not present**: no emoji bullets on the site (the only emoji is `📚` in a Sanity Studio preview, which visitors never see), and no "passionate about". The bio is the most human part of the site, so the plan keeps it almost word for word.

---

## 3. Design direction: "The drawing sheet"

The site should read like a well-made engineering document that someone with print-design taste laid out. That means a warm paper background, ink-black text, and one red accent used the way a reviewer uses a red pen. Headings are set in a calm editorial serif and the body in a plain grotesk. All the engineering detail goes in a monospace: figure numbers, dates, roles, specs. Each section is a sheet in a drawing set, with a number, a hairline rule, captioned figures and a small spec table. For atmosphere there is only a faint CSS blueprint grid behind the hero and SVG registration marks on figures. Nothing moves except what you touch: links underline, arrows nudge, and sections fade up 12 px once as you reach them. The two things you have actually made (a turbine study and a printed magazine) are both technical drawing and print, so the site's form tells the same story as its content.

The direction follows the system colour scheme. Light ("paper") is the default; dark ("blueprint at night") is the same layout with inverted tokens. There is no theme toggle in v1.

---

## 4. Design system

All tokens go in one file, `app/styles/tokens.css`. Plain CSS custom properties match the current codebase idiom: global CSS files, no Tailwind, no CSS-in-JS.

### 4.1 Color tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F4F1EA` | `#12110E` | Page background |
| `--paper-raised` | `#FBF9F4` | `#1A1915` | Figure plates, form fields |
| `--ink` | `#16150F` | `#ECE8DE` | Headings, body text, primary button |
| `--graphite` | `#5B584F` | `#A8A396` | Secondary text, mono labels (about 6:1 on paper) |
| `--pencil` | `#8A867B` | `#77736A` | Non-text only: grid, crop marks, disabled states. Never body text. |
| `--rule` | `#D9D4C7` | `#2C2A24` | Hairlines, borders |
| `--grid` | `rgb(22 21 15 / 0.045)` | `rgb(236 232 222 / 0.05)` | Blueprint grid lines |
| `--accent` | `#C8371D` | `#E8603F` | Markup red: links on hover, the status dot, the pull-quote rule, focus ring. About 4.6:1 on paper. |
| `--accent-strong` | `#A32C16` | `#F07A5C` | Accent hover and pressed |
| `--hatch` | `rgb(22 21 15 / 0.06)` | `rgb(236 232 222 / 0.07)` | Placeholder hatching |

Rules:
- One accent. Use it in no more than about 5% of any screen. No gradients anywhere except the grid's fade mask.
- In dark mode, the portrait plate stays light (`#ECE8DE`) so the white-background photo reads as a printed photo, not a hole.
- Dark mode is set with `@media (prefers-color-scheme: dark)` on `:root`. The portrait plate is the only exception.

### 4.2 Typography

Load all three families with `next/font/google`. They are self-hosted at build time, so there are no runtime requests and no layout shift. Before using `next/font`, read the Next 16 docs in `node_modules/next/dist/docs/` as [AGENTS.md](AGENTS.md) requires.

| Role | Family | Weights | Variable |
|---|---|---|---|
| Display (h1 to h3, lede, pull quote) | **Newsreader** (optical sizes) | 400, 500, plus 400 italic | `--font-display` |
| Text (body, UI) | **IBM Plex Sans** | 400, 500, 600 | `--font-text` |
| Mono (labels, captions, specs, dates) | **IBM Plex Mono** | 400, 500 | `--font-mono` |

Why these: Plex came out of an engineering company and reads as precise without being cold. Newsreader is an editorial serif that holds up at display size at regular weight, which is what makes it look designed rather than shouted.

**Type scale** (fluid, about 1.25 on mobile rising to about 1.333 on desktop):

| Token | Size | Line height | Use |
|---|---|---|---|
| `--step--2` | `0.75rem` | 1.4 | Mono labels, uppercase, `letter-spacing: 0.08em` |
| `--step--1` | `0.875rem` | 1.5 | Captions, meta, footer |
| `--step-0` | `clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)` | 1.6 | Body |
| `--step-1` | `clamp(1.2rem, 1.1rem + 0.4vw, 1.375rem)` | 1.45 | Lede paragraphs (display serif) |
| `--step-2` | `clamp(1.4rem, 1.25rem + 0.7vw, 1.75rem)` | 1.3 | h3, work item titles |
| `--step-3` | `clamp(1.75rem, 1.45rem + 1.3vw, 2.5rem)` | 1.15 | h2, pull quote |
| `--step-4` | `clamp(2.25rem, 1.7rem + 2.6vw, 3.75rem)` | 1.08 | Page titles on subpages |
| `--step-5` | `clamp(2.75rem, 1.9rem + 4.4vw, 5.5rem)` | 1.02 | Hero h1 only |

Rules:
- Display headings use weight 400 with `letter-spacing: -0.015em`. Nothing on the site goes above 600.
- Body measure is a maximum of `62ch`. Ledes are a maximum of `34ch`.
- Mono is for facts only: dates, roles, figure numbers, status. Never use it for sentences.
- Use sentence case for headings. Uppercase is only for `--step--2` mono labels.
- Use tabular numerals (`font-variant-numeric: tabular-nums`) in spec tables and index numbers.

### 4.3 Spacing and layout

**Spacing scale** (4 px base):

| `--space-1` | `--space-2` | `--space-3` | `--space-4` | `--space-5` | `--space-6` | `--space-7` | `--space-8` | `--space-9` | `--space-10` |
|---|---|---|---|---|---|---|---|---|---|
| 0.25rem | 0.5rem | 0.75rem | 1rem | 1.5rem | 2rem | 3rem | 4rem | 6rem | 8rem |

- **Section padding:** `--section-y: clamp(4rem, 2.5rem + 6vw, 8rem)` top and bottom.
- **Gutter:** `--gutter: clamp(1rem, 4vw, 2.5rem)`, which gives 16 px at phone width.
- **Container:** a single `.container` with `max-width: 75rem` (1200 px) plus gutters. Every section uses it, so the left edge never moves.
- **Grid:** 12 columns at 1024 px and up, 8 columns from 640 to 1023 px, 4 columns below 640 px. `column-gap: var(--space-5)`.
- **Breakpoints:** `40rem` (640), `64rem` (1024), `80rem` (1280).
- **Section anatomy (desktop):** a hairline rule across the full container, then a 3-column label rail (mono number and name) and a 9-column content area. Below 1024 px the rail stacks above the content.
- **Radius:** `0` for images and figures, `2px` for buttons and inputs. No pills.
- **Shadows:** none. Use borders (`1px solid var(--rule)`) and paper tone changes instead.

### 4.4 Atmosphere (CSS and SVG only)

- **Blueprint grid** (hero only): two `linear-gradient` grids, 24 px minor and 120 px major, in `--grid`, with a `mask-image: radial-gradient(...)` that fades them out toward the bottom right. This is the one gradient on the site.
- **Registration marks:** four L-shaped corner marks on figure plates, drawn with `::before` and `::after` plus `border` or a tiny inline SVG, in `--pencil`.
- **Figure captions:** mono, `--step--1`, in the format `Fig. 02  Caption text`.
- **Research schematic:** an abstract inline SVG of a rotor in plan view with dimension lines and a callout on the "center area". It must not show the patented geometry. Label it "Schematic, not to scale". It stays a placeholder plate until you approve a drawing (see TODO_CONTENT.md).
- **Noise and blur:** none. No `backdrop-filter`, no glows.

### 4.5 Motion rules

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | `120ms` | Color and underline changes on hover |
| `--dur-ui` | `200ms` | Menu open and close, arrow nudge |
| `--dur-reveal` | `500ms` | Scroll reveal |
| `--ease` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Everything |

Allowed:
- **Scroll reveal:** opacity 0 to 1 and `translateY(12px)` to 0, once per element. Stagger at most 3 children by 60 ms. Reveals are progressive enhancement only. Content is visible by default, and the hidden start state applies only under `html.reveal-ready` (set by the Reveal component once its observer exists, so nothing hides before hydration) **and** `@media (prefers-reduced-motion: no-preference)`.
- **Links:** `text-decoration-thickness` and `text-underline-offset` change, and the color moves to `--accent`.
- **Arrows (`→`):** `translateX(3px)` on hover of the parent.
- **Work rows:** the background tints to `--paper-raised` and the image scales to at most `1.02`.
- **Mobile menu:** a 200 ms opacity and translate slide.

Forbidden: infinite animations, typewriters, rotating text, parallax, cursor followers, magnet effects, canvas or WebGL, animated gradients, and scroll-jacking.

Under `prefers-reduced-motion: reduce`: no transforms at all. Color and opacity changes are instant. Smooth scrolling is off.

### 4.6 Components to build (shared primitives)

| Component | Purpose |
|---|---|
| `Container` | Max-width wrapper with gutters |
| `Section` | `<section>` with a hairline, a mono number and label rail, and a heading slot |
| `Figure` | An image on a plate with crop marks and a `Fig. NN` caption. It has a **placeholder mode**: a hatched plate at a set aspect ratio with crossed diagonals (like an empty drawing frame) and the placeholder text in mono. |
| `Placeholder` | Inline text placeholder. It renders `[PLACEHOLDER: ...]` in mono at 0.9em, graphite, on `--hatch`, with a 1 px dashed `--rule` border. It is styled to look like a deliberate drafting annotation, so the page still looks finished. |
| `SpecList` | A `<dl>` in two columns: mono key, text value. Used in the hero strip, research and about. |
| `Button` | Solid ink, or outline. 44 px minimum height. |
| `ArrowLink` | An underlined text link with a trailing `→`. |
| `Reveal` | A wrapper that adds `data-reveal`, plus one tiny shared IntersectionObserver that lives in a client component (it replaces the inline `<Script>`). |

**Placeholder rule:** every missing piece of content goes through `Placeholder` or `Figure placeholder`, never as loose text. That way `grep -rn "PLACEHOLDER:" app` lists exactly what is still missing. Sections whose entire content would be placeholders (testimonials) don't render until data exists.

---

## 5. Section-by-section layout

The new home page order:

0. Navigation
1. Hero
2. Research (`#research`)
3. Work (`#work`)
4. About (`#about`)
5. Writing (`#writing`)
6. Contact (`#contact`)
7. Footer

The "Skills & Tools" section is removed as a section. Its content moves into About as a tools list.

### 0. Navigation

- **Desktop:** a sticky top bar with a solid `--paper` background and a hairline bottom border that only appears after 8 px of scroll (a CSS class toggled by the existing `NavScroll`, renamed). Left: the wordmark "Anish Panthi" in Newsreader at `--step-1`. Right: `Research`, `Work`, `Writing`, `Library`, `About`, then a mono `CV ↓` link with the file size in its `title`.
- On the home page, Research, Work and About are anchors. On subpages they point to `/#research`, `/projects` and `/#about`. Writing goes to `/blog` and Library to `/library`. "Journey" moves to the footer and the About section as "Full timeline". **Don't change any URLs.**
- **Mobile:** the wordmark and a text button "Menu". When it opens, a full-height sheet slides down with the links in Newsreader at `--step-3`, left-aligned, with the CV link at the bottom. Keep the current focus return on Escape and the outside-click close.
- Stop hiding the nav on scroll-down. It is short and solid now, so it doesn't need to get out of the way.
- Delete the `<img src="/logo.png">` from the nav.

### 1. Hero

```
┌───────────────────────────────────────────────────────────────┐
│ [faint blueprint grid, fading to bottom-right]                │
│                                                               │
│ INDUSTRIAL ENGINEERING · THAPATHALI CAMPUS, IOE      ┌───────┐│
│                                                      │ Fig.01││
│ Anish Panthi                         (h1, step-5)    │portrait│
│                                                      │on paper│
│ Industrial Engineering student. I research a new     │ plate  ││
│ shape for an omnidirectional wind turbine, led SOIES │       ││
│ Nepal for a year, and designed its magazine from     └───────┘│
│ cover to print.                      (lede, step-2)  Fig. 01  │
│                                                      Anish    │
│ ■ Now: final year project, learning AutoCAD MEP,     Panthi,  │
│   looking for an HVAC or MEP internship. (mono)      [year]   │
│                                                               │
│ [ See the research ↓ ]   Download CV (PDF, 290 KB) →          │
│ ───────────────────────────────────────────────────────────── │
│ 20            │ Vol. 11          │ FYP              │ 8th     │
│ events led as │ Industrial Vision│ omnidirectional  │ semester│
│ President,    │ designed in      │ wind turbine     │ B.E. IE │
│ SOIES Nepal   │ InDesign         │                  │         │
└───────────────────────────────────────────────────────────────┘
```

- **Grid (desktop):** text in columns 1 to 7, portrait in columns 9 to 12, top-aligned with the h1 (not vertically centered). Spec strip across all 12 columns, split into 4 cells by hairlines.
- **Height:** natural, not `100vh`. The spec strip should land just above the fold on a 1366 x 768 laptop.
- **Portrait:** a 4:5 crop of the existing portrait (`/assets/placeholder.jpg`, which is a real photo, so rename it to `/images/anish-portrait.jpg`) via `next/image` with `priority`. In light mode `mix-blend-mode: multiply`, so the white background becomes paper. Crop marks on the corners. Caption: `Fig. 01  Anish Panthi, [PLACEHOLDER: year photo was taken]`.
- **Status line:** a 6 px `--accent` square (a "markup" dot, static, not pulsing) followed by mono text.
- **Spec strip:** these 4 facts already exist on the site. The big number or word is in Newsreader `--step-3`, the label in mono `--step--1`.
- **Mobile:** single column in this order: mono eyebrow, h1, lede, portrait (60% width, left-aligned, not centered), status, buttons stacked full-width (primary first), then the spec strip as a 2 x 2 grid. No social icons in the hero.
- **Removed:** the greeting carousel, typewriter, spinning ring, 5 social icons, scroll-down chevron, `<canvas id="hero-canvas">` and `hero-bg.js`.

### 2. Research (`#research`)

The section that does the most work for "engineer with taste".

```
──────────────────────────────────────────────────────────────────
01  RESEARCH     │ Changing the center of an omnidirectional
                 │ wind turbine                       (h2, step-3)
                 │
 SPEC (mono dl)  │ The question                       (h3 small)
 Role    3D design│ [PLACEHOLDER: the research question, 1 to 2
 Super-  Asst.    │  sentences, in plain words]
 visor   Prof.    │
         Suman    │ What I do
         Acharya  │ [PLACEHOLDER: your part of the work, 2 to 3
 Since   6th sem. │  sentences: what you model, in what software]
 Status  In       │
         progress,│ Where it stands
         FYP      │ [PLACEHOLDER: current stage and next
 Method  [PH]     │  milestone, 1 to 2 sentences]
 Tools   [PH]     │
──────────────────┴──────────────────────────────────────────────
 ┌──────────────────────────────────────────────────────────────┐
 │  Figure plate, 16:9, hatched placeholder until a render     │
 │  exists, or the abstract SVG schematic                      │
 └──────────────────────────────────────────────────────────────┘
 Fig. 02  [PLACEHOLDER: caption for CAD render, what it shows]
```

- **Left rail (columns 1 to 3):** section marker, then a `SpecList`. Already known: role "3D design", supervisor "Asst. Prof. Suman Acharya", since "6th semester (2025)", status "In progress, final year project". Placeholders: method and tools.
- **Content (columns 4 to 12):** the h2, then 3 short blocks with small h3s. Your bio paragraph about the patented design is the seed for "The question". Use it, but keep your own wording. Don't paraphrase it into something new.
- **Figure:** the full content width. It shows a placeholder plate until you provide a render or approve the abstract schematic.
- **Optional second figure** (only once you supply it): a small chart or table of results. If there are no results yet, show nothing. Don't add an empty chart.
- **Mobile:** the h2 first, then the spec list as a compact 2-column `dl`, then the blocks, then the figure at full width.
- **Data:** a new local file `app/data/research.ts`, typed like `projects.ts`. Keep `projects.ts` as it is. The research item there continues to feed `/projects`.

### 3. Work (`#work`)

```
──────────────────────────────────────────────────────────────────
02  WORK         │ Things I made or led                (h2)
─────────────────┼────────────────────────────────────────────────
 01              │ Industrial Vision Vol. 11       ┌──────────┐
 Publication     │ Coordinated the team and        │ cover    │
 2026            │ designed the whole issue,       │ image    │
                 │ print ready.                    └──────────┘
                 │ Coordinator and designer · Read the pieces →
─────────────────┼────────────────────────────────────────────────
 02              │ SOIES Nepal, 18th Executive     ┌──────────┐
 Leadership      │ Committee                       │ committee│
 2025 to 2026    │ 20 events, an MOU with Nebico,  │ photo    │
                 │ a proposal to the NPC.          └──────────┘
─────────────────┼────────────────────────────────────────────────
 03  Policy      │ Research partnership proposal to the NPC    →
 04  Web         │ SOIES Nepal website                         ↗
 05  Web         │ The Engineer's Library                      →
─────────────────┴────────────────────────────────────────────────
                                         All 14 projects →
```

- **Feature rows (items 1 and 2):** the text in columns 4 to 8 and the image in columns 9 to 12. Whole-row link. Images via `next/image`: `/files/industrial-vision-vol11-cover.jpg` and the committee photo already used on `/projects`.
- **Index rows (items 3 to 5):** single-line rows with the number and category in mono, the title in Newsreader `--step-2`, and an arrow at the right (`↗` for external links).
- Every summary comes from [app/data/projects.ts](app/data/projects.ts), shortened where needed. Don't make up new claims. The NPC row links to `/soies`, and the website row links to `https://soiesnepal.org.np`.
- Pull "All 14 projects" from `projects.length`, not a hardcoded number.
- **Hover:** the row tints to `--paper-raised`, the title goes to `--accent`, the arrow nudges.
- **Mobile:** feature rows stack with the image on top (3:2), then number and category, title, summary. Index rows wrap the title under the number.
- **`/projects` page:** use the same row component. Keep the filter buttons (restyle them as mono text tabs with an underline for the active one) and the `#soies` anchor.

### 4. About (`#about`)

```
──────────────────────────────────────────────────────────────────
03  ABOUT        │ IE taught me to see everything as a system.
                 │                                    (h2, step-3)
 ┌────────────┐  │
 │ speech     │  │ I'm Anish, an Industrial Engineering student
 │ photo      │  │ in my 8th semester at Thapathali Campus.
 └────────────┘  │                           (lede, Newsreader)
 Fig. 03 [PH:    │
 where/when]     │ When something breaks, you don't patch the
                 │ surface... National Planning Commission...
 Studying  B.E.  │                                    (body)
  Industrial Eng.│ ┃ "A student magazine should be made by
  Thapathali,    │ ┃  students."              (pull quote)
  IOE, 2022 to   │
  now            │ During my term as president... We made it.
 Semester  8th   │
 Was  President, │ Next, I want to go deep into MEP...
  SOIES Nepal    │
 Learning AutoCAD│ ── Tools ────────────────────────────────
  MEP            │ Design and     Publishing      Web
 Looking for     │ simulation     InDesign        Next.js
  HVAC or MEP    │ SolidWorks     (Vol. 11)       Sanity
  internship     │ ANSYS          Photoshop       GitHub
                 │ AutoCAD        DaVinci Resolve Vercel
 Full timeline → │ AutoCAD MEP    PowerPoint, Word Cloudflare
                 │ (learning)     Excel           C (basics)
```

- **Text:** the current bio in [app/page.tsx](app/page.tsx), kept almost word for word. It is the best copy on the site. Edits: split the first sentence out as the lede, lift "A student magazine should be made by students." into a pull quote (it stays in the paragraph too, or move it, but don't duplicate it visibly in both places), and make the h2 your own line "IE taught me to see everything as a system."
- **Left rail:** the speech photo (`/files/about-speech.jpg`, which is only 49 KB and will look soft, see TODO), its caption, a `SpecList` of facts already on the site, and a "Full timeline →" link to `/journey`.
- **Tools:** a 3-column text list, with groups and levels taken from the current `Toolbox` data. "Advanced, self-assessed" becomes just "advanced" or gets removed; you confirm the levels in TODO. No logos.
- **Removed from About:** the glass card, tag cloud, CV and magazine buttons (CV goes in the nav, hero and footer; the magazine goes in Work and Writing), the publication box, and the dead role-expansion feature.
- **Sanity:** stop the client-side `mainBio` swap in `main.js`. Render About on the server from local copy. Keep the `about` schema and its document untouched. Whether Sanity should become the source of the bio later is a decision for you, listed in TODO_CONTENT.md.
- **Mobile:** h2, lede, photo (full width, 3:2), body, pull quote, tools as one column with group headings, then the facts list.

### 5. Writing (`#writing`)

- **Layout:** the section rail and the h2 "Printed in Industrial Vision", then the two pieces side by side (columns 4 to 8 and 9 to 12, deliberately unequal widths). Each piece shows the first printed page as a thumbnail on a paper plate with crop marks, the mono kind ("Article", "President's message"), the title in Newsreader, the summary, and the credit line in mono.
- **Data:** the existing `pieces` in [app/data/iv11.ts](app/data/iv11.ts), unchanged. Keep the anchor links to `/blog#article` and `/blog#message`.
- **Below:** `All writing →` and `Industrial Vision Vol. 11, full issue (PDF, 23 MB) ↗`. Always state the size.
- **Mobile:** stacked. The thumbnail is capped at 70% width and left-aligned.

### 6. Contact (`#contact`)

```
──────────────────────────────────────────────────────────────────
05  CONTACT      │ Hiring an HVAC or MEP intern?        (h2)
                 │ I'm available [PLACEHOLDER: from month year].
                 │
                 │ [PLACEHOLDER: public email]  (Newsreader step-2,
                 │                               underlined link)
                 │ LinkedIn ↗   GitHub ↗   CV (PDF, 290 KB) ↓
                 │ ─────────────────────────────────────────────
                 │ Or write here           Name  [__________]
                 │ (mono label)            Email [__________]
                 │                         Message
                 │                         [____________________]
                 │                         [ Send ]
                 │                         (aria-live status line)
```

- Left-aligned in the content columns. The email link is the primary action and the form is the fallback.
- Keep Formspree (`https://formspree.io/f/mvzbkowo`) and the same field names (`user_name`, `user_email`, `message`). Move the submit logic from `main.js` into a small client component.
- **Labels are visible** above the fields, not just placeholders. Inputs use `--paper-raised`, a 1 px `--rule` border, a 2 px radius, and an `--accent` 2 px focus ring.
- **Status text:** "Sending…", then "Sent. I'll reply within [PLACEHOLDER: reply time]." or "That didn't go through. Email me at [email] instead." No color fills on the button.
- **Mobile:** the fields are full width and the button is full width.

### 7. Footer

- A hairline rule, then 3 columns of mono `--step--1` text:
  - "Anish Panthi" and "Thapathali Campus, Kathmandu"
  - Links: Email, LinkedIn, GitHub, CV, Full timeline (`/journey`), SOIES record (`/soies`). Facebook, X and Instagram appear only if you choose to keep them (see TODO).
  - "Built with Next.js and Sanity. Set in Newsreader and IBM Plex." and "© 2026 Anish Panthi"
- Render the footer from a shared `SiteFooter` component on every page. Delete the JS that copies the hero socials into the footer.
- **Mobile:** single column.

### 8. Subpages (shared shell)

Every subpage (`/projects`, `/journey`, `/library`, `/blog`, `/soies`) gets:
- the same `SiteNav` and `SiteFooter`, with no `<canvas id="bg-canvas">` and no `page-bg.js`
- a page header: a mono breadcrumb ("Work / All projects"), an h1 at `--step-4`, a lede at `--step-1`, and no separate hairline (every list below already opens with one, so a second rule doubled up)
- **`/journey`:** the timeline as a two-column table, with the year in mono on the left and the entry on the right, separated by hairlines. No dots or vertical line. Certificates become a plain list.
- **`/library`:** a restyle only. Keep the Sanity `note` data and how it behaves.
- **`/blog`:** keep the printed-page reader. Restyle the chrome only.
- **`/soies`:** `next/image` for all 58 images (one is 12000 x 9000 and 27 MB is too much), with lazy loading and `sizes`. Keep the data and the content.

---

## 6. Copy direction

### Voice

- **First person, plain, specific.** Write like you'd explain it to a smart friend at a tea shop. Short sentences. One idea per sentence.
- **Lead with the concrete noun:** a turbine, a magazine, 20 events, a proposal to the NPC. Not "solutions", "impact" or "initiatives".
- **Show the decision, not the adjective.** "I said no to hiring an editor and learned InDesign" beats "dedicated and resourceful".
- **Numbers as numerals:** 20 events, Vol. 11, 8th semester.
- **Ranges use "to":** "2025 to 2026", as the site already does. No en or em dashes.
- **Sentence case** for every heading and button.
- **No exclamation marks.** No emoji.

### Banned

- **Punctuation:** em-dashes (—) and en-dashes (–) anywhere in visible copy, alt text or metadata. There is one em-dash today, in the `/projects` metadata description.
- **Words:** passionate, driven, dedicated, innovative, cutting-edge, seamless, leverage, synergy, dynamic, elevate, empower, unlock, transform (as a buzzword), crafting, delve, showcase, world-class, journey (as a metaphor), "solutions", "impact" (as a noun with nothing after it).
- **Phrases:** "Learn more", "Get in touch", "Let's build something amazing", "Welcome to my portfolio", "I'd love to hear from you", "A selection of my…", "All rights reserved".

### Before and after (from the current site)

| Now | New |
|---|---|
| Rotating "Namaste / Hello / …" + "I am Anish Panthi" | **Anish Panthi** (static h1) |
| "Industrial Engineer" / "Sharing my story and resources on industrial engineering" | "Industrial Engineering student. I research a new shape for an omnidirectional wind turbine, led SOIES Nepal for a year, and designed its magazine from cover to print." |
| "Learn More" | "See the research" |
| "Educational Content" | (moved to Work) "The Engineer's Library" |
| "Engineer Profile" / "About Me" | "03 About" / "IE taught me to see everything as a system." |
| "Expertise" / "Skills & Tools" | "Tools" (inside About) |
| "What I Do" / "Featured Work" / "A selection of my projects, leadership, and research." | "02 Work" / "Things I made or led" |
| "Insights" / "Latest Blogs" | "04 Writing" / "Printed in Industrial Vision" |
| "Get In Touch" / "Have a project in mind? I'd love to hear from you." | "05 Contact" / "Hiring an HVAC or MEP intern? I'm available [PLACEHOLDER: from month year]." |
| "Send Message" / "✓ Sent" / "Error!" | "Send" / "Sent. I'll reply within [PLACEHOLDER: reply time]." / "That didn't go through. Email me at [email] instead." |
| "Read the Magazine" | "Industrial Vision Vol. 11, full issue (PDF, 23 MB)" |
| "View All Projects" | "All 14 projects" |
| Nav: "My Projects", "Journey", "Blog" | "Work", (footer) "Full timeline", "Writing" |
| "A.Panthi" | "Anish Panthi" |
| "© 2026 Anish Panthi. All rights reserved." | "© 2026 Anish Panthi" |

All other text (project summaries, timeline entries, bio paragraphs) stays as it is unless a task says otherwise. Don't rewrite facts. Tightening sentences is fine.

---

## 7. Rules for every task

1. **Sanity is additive only.** Never delete, rename or change the type of any schema file, document type or field under `studio/`. Never remove an entry from `studio/schemaTypes/index.js`. The unregistered schemas (`studio/hero.js`, `socials.js`, `timeline.js`, `schemaTypes/blog.js`) stay in the repo untouched. If a task needs new CMS data, add **new optional fields** or a **new document type**. Never write to, migrate or delete content in the Sanity dataset from code. Keep `projectId: 'e7hia29y'` and `dataset: 'production'`.
2. **Never delete content.** Text in `app/data/*.ts` and files in `public/files/` and `public/soies/` may be moved or reformatted but not removed. `// CHECK:` comments in `projects.ts` stay until you answer them.
3. **Never invent content.** Missing facts, numbers, quotes, dates, captions and images go through `Placeholder` or `Figure placeholder` with a description of what is needed. List any new placeholder in TODO_CONTENT.md.
4. **Next 16 is not the Next.js in training data.** Before using `next/font`, `next/image`, the metadata API, `next/og`, `sitemap.ts`, `robots.ts` or server data fetching, read the matching guide in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)).
5. **No new runtime dependencies** unless a task names them. Plain CSS in `app/styles/`. No Tailwind, no animation library, no icon font, no canvas, no WebGL, no 3D.
6. **Keep URLs and anchors stable:** `/projects`, `/projects#soies`, `/journey`, `/library`, `/blog`, `/blog#article`, `/blog#message`, `/soies`, `/files/*`.
7. **Copy rules (section 6) apply to every string,** including `alt`, `aria-label` and metadata.
8. **Each task ends with** `npm run lint` and `npm run build` passing, plus a manual check at 360 px, 768 px and 1366 px wide in both light and dark mode.
9. **Work on a branch** (`redesign/drawing-sheet`). The site will look mixed between Task 1 and Task 10. Don't deploy until Task 13 is done.
10. **One task per request.** Don't start the next task's work early.

---

## 8. Task list (one Copilot Agent request each)

Start each request with: *"Read AGENTS.md and DESIGN_PLAN.md sections 4, 6 and 7, plus the section named below. Do only Task N."*

### Progress

Build order (grouped): design system, hero, about, projects and writing, research, contact, navigation and footer with subpages, SEO, performance and accessibility, cleanup, then self-review. If work is interrupted, resume from the first unchecked box.

- [x] Task 1: Design tokens, fonts and base styles
- [x] Task 2: Shared primitives
- [x] Task 4: Hero
- [x] Task 7: About and tools
- [x] Task 6: Work on the home page and the /projects page
- [x] Task 8: Writing section and /blog chrome
- [x] Task 5: Research section
- [x] Task 9: Contact
- [x] Task 3: Navigation and footer
- [x] Task 10: Subpages shell (journey, library, soies)
- [x] Task 11: Sanity data layer (read only)
- [x] Task 12: SEO and metadata
- [x] Task 13: Performance and accessibility pass
- [x] Task 14: Cleanup
- [x] Phase 3: Self-review against this plan

### Task 1: Design tokens, fonts and base styles
- **Read:** sections 4.1 to 4.3 and 4.5.
- Create `app/styles/tokens.css` (all tokens, light and dark) and `app/styles/base.css` (reset, body, headings, links, focus-visible ring of 2 px `--accent` with a 3 px offset, `.container`, the 12/8/4 grid utility, `.sr-only`, `.skip-link`, and the reduced-motion block).
- Load Newsreader, IBM Plex Sans and IBM Plex Mono with `next/font/google` in [app/layout.tsx](app/layout.tsx) and expose them as CSS variables.
- Import the new styles in `layout.tsx` **after** the old ones, so new tokens win where they overlap. Don't delete old CSS yet.
- No inline script is needed for reveals: the `Reveal` component sets `html.reveal-ready` itself (changed during the build, see section 4.5).
- **Done when:** body text renders in IBM Plex Sans, there are no requests to Google Fonts at runtime, and the tokens switch with the OS dark mode.

### Task 2: Shared primitives
- **Read:** section 4.6.
- Build `Container`, `Section`, `Figure` (with placeholder mode and crop marks), `Placeholder`, `SpecList`, `Button`, `ArrowLink` and `Reveal` in `app/components/ui/`, with their CSS in `app/styles/components.css`.
- `Reveal` uses one shared IntersectionObserver in a client component, and content stays visible without JS.
- Add a temporary `app/styleguide/page.tsx` that shows every primitive, including both placeholder types, in light and dark. Add `robots: { index: false }`.
- **Done when:** the style guide renders correctly at 360 px and 1366 px, and placeholders look intentional.

### Task 3: Navigation and footer
- **Read:** sections 5.0 and 5.7.
- Rebuild [SiteNav.tsx](app/components/SiteNav.tsx) to section 5.0. Keep the Escape and outside-click logic and `aria-expanded`/`aria-controls`.
- Simplify `NavScroll` so it only toggles a `scrolled` class and no longer hides the nav.
- Create `SiteFooter.tsx` and use it on all 6 pages. Remove the `.footer-social-grid` JS copy and the per-page footer markup.
- Social links live in one array in `app/data/site.ts`, with inline SVG or text. No Font Awesome.
- **Done when:** the nav and footer are identical on every page, the mobile menu works by keyboard, and the logo PNG is no longer referenced.

### Task 4: Hero
- **Read:** section 5.1.
- Replace the hero in [app/page.tsx](app/page.tsx) and delete `HeroText.tsx`.
- Copy the portrait to `public/images/anish-portrait.jpg`. **Keep** `public/assets/placeholder.jpg` until Task 12 moves the OG image.
- Use `next/image` with `priority` for the portrait. Add the blueprint grid in CSS and the spec strip from `SpecList`.
- Remove `<canvas id="hero-canvas">`, the `hero-bg.js` `<Script>`, the hero social icons and the scroll chevron.
- **Done when:** the h1 is in the server HTML (check with View Source), there is no layout shift, and the mobile order matches section 5.1.

### Task 5: Research section
- **Read:** section 5.2.
- Create `app/data/research.ts`, typed, with the known facts plus `Placeholder` strings for each item in TODO_CONTENT.md under "Research".
- Build `#research` with `SpecList`, 3 text blocks and a `Figure` in placeholder mode (16:9).
- Optionally add the abstract SVG schematic behind a `showSchematic: false` flag in `research.ts`, so you can approve it before it ships.
- **Done when:** the section looks finished with every placeholder still in place.

### Task 6: Work on the home page and the /projects page
- **Read:** section 5.3.
- Build `WorkRow` (feature and index variants) and use it for the 5 home items, reading from `projects.ts`.
- Use `next/image` for the cover and committee photo.
- Restyle [ProjectsList.tsx](app/components/ProjectsList.tsx) and `/projects` with the same rows and mono filter tabs. Keep `#soies`.
- Remove the old Work section, the `fa-*` icons and the inline `WebkitLineClamp` styles.
- **Done when:** the projects count is computed, and all links resolve (internal and external).

### Task 7: About and tools
- **Read:** section 5.4.
- Rebuild `#about` as the two-column spread, with the pull quote and the facts `SpecList`.
- Move the tool data from [Toolbox.tsx](app/components/Toolbox.tsx) into `app/data/tools.ts` (keep the names and labels) and render it as a text list. Delete `Toolbox.tsx`.
- Remove the `#skills` section, the glass card, the tag cloud and the publication box.
- Remove the `syncSite` and `renderAbout` logic from the home page by no longer loading `main.js` there. Contact moves out in Task 9, so check nothing else depends on it.
- **Don't touch** `studio/about.js`.
- **Done when:** desktop and mobile show the same About text, and there are no requests to `api.iconify.design`.

### Task 8: Writing section and /blog chrome
- **Read:** section 5.5.
- Rebuild the home `#writing` using `pieces` from `iv11.ts` and `Figure`. Update [LatestWriting.tsx](app/components/LatestWriting.tsx), or replace it.
- Restyle the `/blog` page header and chrome to the subpage shell. Keep `PageReader` behaviour and the `#article` and `#message` anchors.
- Show the PDF size on every PDF link.
- **Done when:** both pieces render with real printed-page thumbnails, and `/blog` has no canvas.

### Task 9: Contact
- **Read:** section 5.6.
- Build `ContactForm.tsx` as a client component that posts to the same Formspree endpoint with the same field names. Visible labels, an `aria-live` status region and the new microcopy.
- Add the email link (as a placeholder), LinkedIn, GitHub and CV.
- Delete `public/js/main.js` once nothing loads it.
- **Done when:** a real test submission arrives, the error state shows the fallback email, and the form is fully keyboard operable.

### Task 10: Subpages shell (journey, library, soies)
- **Read:** section 5.8.
- Build a `PageHeader` component and apply it to `/journey`, `/library` and `/soies` (`/projects` and `/blog` were done in Tasks 6 and 8).
- Restyle the journey timeline as a two-column table and the certificates as a list.
- Restyle the library. Keep `library-logic.js` working for now (Task 11 moves it).
- `/soies`: switch every `<img>` to `next/image` with `sizes`, and lazy-load below the fold.
- Remove every `<canvas id="bg-canvas">` and every `page-bg.js` `<Script>`.
- **Done when:** no page loads `page-bg.js` or `hero-bg.js`, and `/soies` transfers under 3 MB on first load at 360 px.

### Task 11: Sanity data layer (read only)
- **Read:** the data fetching docs in `node_modules/next/dist/docs/`.
- Create `app/lib/sanity.ts`, a plain `fetch` to `https://e7hia29y.api.sanity.io/v2021-10-21/data/query/production` with time-based revalidation, following the Next 16 docs. No new dependency.
- Port the library's GROQ query from `public/js/library-logic.js` to a server component with **the same query and fields**, so the library renders on the server. Delete `library-logic.js` after the server version matches the old output.
- **No schema changes.** No writes.
- **Done when:** `/library` shows the same items as before with JavaScript disabled.

### Task 12: SEO and metadata
- **Read:** the metadata, `next/og`, sitemap and robots docs.
- Set `metadataBase` and a title template (`%s · Anish Panthi`) and rewrite every page's `description` to the copy rules (no dashes, no buzzwords).
- Generate a 1200 x 630 OG image with `next/og`: name, one-line role and the blueprint grid. No photo is required.
- Add `app/sitemap.ts`, `app/robots.ts` (exclude `/styleguide`), and JSON-LD `Person` on the home page (name, url, `alumniOf` Thapathali Campus, `sameAs` with the kept social links).
- Replace `/favicon.svg` with a simple "AP" monogram SVG in ink and accent. Remove the `logo.png` references from metadata if there are any.
- **Done when:** the build passes and the OG image renders at `/opengraph-image`.

### Task 13: Performance and accessibility pass
- Remove the Font Awesome `<link>` and `preconnect` from `layout.tsx`, and make sure no `fa-` classes remain anywhere.
- Audit every remaining `<img>` and convert it to `next/image` or give it explicit `width`/`height` and `loading="lazy"`.
- Check: one h1 per page, a logical heading order, a skip link that targets `#main-content` on every page, 44 px touch targets, no horizontal scroll at 320 px, AA contrast in both themes, the focus ring visible on every interactive element, and the reduced-motion behaviour from section 4.5.
- Run Lighthouse on mobile for `/` and `/soies`.
- **Done when:** Lighthouse mobile scores at least 95 for Performance and 100 for Accessibility and SEO on `/`, at least 90 for Performance on `/soies`, and CLS is under 0.05. Write the scores into the PR description.

### Task 14: Cleanup
- **Before deleting each file, grep to prove nothing references it.**
- Delete the unused files in `app/css/` (all of it, once every page imports from `app/styles/`), `app/page.module.css`, the empty `app/globals.css`, `public/js/hero-bg.js`, `page-bg.js`, `work-logic.js` and `events-logic.js` (if still unreferenced), `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg` and `window.svg`, and the repo-root `favicon.svg` and `logo.png` duplicates.
- Keep `public/logo.png` only if you want it kept (see TODO).
- Remove `app/styleguide/` or keep it `noindex`, whichever you prefer.
- **Never touch `studio/`.**
- Grep for `—`, `–`, "Learn More", "passionate", `backdrop-filter`, `linear-gradient(135deg` and `fa-`, and fix anything that's left.
- **Done when:** the build passes, every page looks unchanged from Task 13, and `grep -rn "PLACEHOLDER:" app` matches the open items in TODO_CONTENT.md.

---

## 9. Build notes (31 October 2026)

What changed from the plan while building, and why.

| Plan said | Built | Why |
|---|---|---|
| Reveals gated by `html.js`, set by an inline script | Gated by `html.reveal-ready`, set by the `Reveal` component | Content stays visible until hydration has actually happened, not just until JS starts. No inline script needed. |
| Mobile portrait at about 60% width | 52% | On a 412 px phone the portrait was the LCP element and rendered late; at 52% the lede becomes LCP and paints at first paint. |
| Hairline under each subpage header | No separate rule | Every list below a header already opens with a hairline; two rules stacked looked like a mistake. |
| Nav "Work" is an anchor on the home page | Always `/projects` | One predictable target. The home Work section links to it too. |
| Newsreader with optical sizes, italic preloaded | Upright only, italic as a separate face, no preload | Cut preloaded fonts from 333 KB to about 110 KB. Italic is used in two places. |
| JSON-LD `alumniOf` | `affiliation` | Anish is a current student, not an alumnus. |
| Optional turbine schematic SVG | Not drawn | The design is patented and the study unpublished. Waits for decision D7. |
| "Journey" page title | "Timeline" (URL stays `/journey`) | Copy rules ban "journey" as a metaphor. |
| Library rendered by a client script | Server component, same GROQ query, cached for an hour | Works without JavaScript and avoids the browser-side Sanity request. |
| Footer component per page | `SiteNav` and `SiteFooter` in the root layout | One copy, active link from the URL. |
| Font Awesome removed in Task 13, legacy CSS in Task 14 | Both done as soon as nothing used them | The legacy CSS was the biggest render-blocking cost. |

Tried and reverted: `experimental.inlineCss` (no LCP change), Plex Mono without preload (added layout shift).

### Results

Lighthouse 12, mobile profile, production build on a local machine (runs vary by about 5 points with machine load):

| Route | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 83 to 91 | 100 | 100 | 100 |
| `/projects` | 90 | 100 | 100 | 100 |
| `/library` | 93 | 100 | 100 | 100 |
| `/journey` | 88 | 100 | 100 | 100 |
| `/soies` | 80 to 89 | 100 | 100 | 100 |
| `/blog` | 81 to 83 | 100 | 100 | 100 |

CLS is 0 to 0.007 everywhere. What holds Performance under 90 on some runs is LCP of about 3.5 s under Lighthouse's simulated slow 4G, driven by the shared React and Next runtime plus the web fonts.

Also verified: AA contrast for every text token pair in both themes, no horizontal scroll at 320 px, one h1 per page, no skipped heading levels, alt text on every image, a visible focus ring on every interactive element in a logical tab order, Escape and focus return on the mobile menu and page reader, reduced motion leaves nothing hidden, the contact form posts the same fields to the same endpoint (tested against a mocked endpoint, so no real message was sent), and no console errors on any page.

## 10. Changes after launch review (31 October 2026)

| Change | Detail |
|---|---|
| Palette | The warm cream and markup red read too close to an AI product's look. Now: cool drafting white `#f4f5f2`, ink `#121417`, blueprint-blue accent `#2350a8` (dark mode `#7aa2e3`), blue-tinted grid. All text pairs are AA or better (lowest 6.2:1). |
| Library removed | `/library` and its code are gone; `/library` and `/library.html` redirect to `/#learning`. Sanity `note` content and schema untouched. |
| MEP learning log | New additive Sanity type `learningEntry` (`studio/schemaTypes/learning.js`). Home section "04 Learning" reads the newest 8 entries, cached for an hour. Sections renumbered: Writing 05, Contact 06. |
| Motion | One `ScrollAnimator` in the root layout replaces per-component observers. Variants: fade-up, photo wipe with settle, plot wipe (CAD model), hairline draw, staggered lists. Implemented as keyframes with backwards fill so hover effects are never delayed. The clip sits on the image, not the observed element, because Chrome never reports a fully clipped element as intersecting. On-load animations are transform-only to stay off the main thread. Reduced motion skips all of it. |
| /soies | Stats strip from data, sticky month rail, adaptive photo layouts, hover hint, lightbox with fade, crossfade, swipe and a photo counter. |
| /projects | Per-type counts strip and an accent bar on hover. |
| Nav | Home added; Library replaced by Learning. Footer credit line removed. |

Lighthouse mobile after these changes: home 86 to 90, /soies 86, accessibility, best practices and SEO 100.

### Pages instead of one long landing page

Research, About and Learning were anchors on the home page, so the nav never left it and "Home" stayed marked as current. They are now pages: `/research`, `/about` and `/learning`, alongside `/projects` (Work) and `/blog` (Writing). The home page keeps the hero, short teasers for Research, About and Learning (latest three entries) that link out, the work highlights, the writing pair and Contact. The nav marks the current section by URL; Work also covers `/soies`, About also covers `/journey`. `/library` now redirects to `/learning`.

