# Content checklist

What the site still needs from you, and what you've already answered. Nothing on the site is made up: anything unknown shows as a dashed `[PLACEHOLDER: ...]` note until you fill it.

To list what is still open in the code: `git grep -n "PLACEHOLDER:" app`

Updated 31 October 2026.

---

## Still open

### On the site now

| Where | File | What to provide |
|---|---|---|
| Research spec list, "Tools" | `app/data/research.ts` | The software you use for the turbine's CAD model and simulation, as a short comma list (e.g. "SolidWorks, ANSYS Fluent"). Replace the whole `[PLACEHOLDER: ...]` text. |

That's the only placeholder visitors can see. The ones in `app/styleguide/page.tsx` are samples on the design reference page.

### Worth adding later (nothing shows until you do)

| Item | What | Where it would go |
|---|---|---|
| Results | Once the turbine is fabricated and tested (due 15 Mangsir): a small table of vent variant against measured torque or power. Send it as a CSV or a message. | A results figure in the Research section, plus updating "Where it stands" |
| Fabricated turbine photo | A photo of the built turbine, at least 2400 px wide | Research, next to or in place of the CAD model |
| Testimonials | 1 to 3 short quotes (under 40 words) from your supervisor, a SOIES faculty advisor or a teammate, with their full name, role and written permission to publish | A small section after About |
| Industrial Vision Vol. 10 | The year, and the title of your piece | `app/data/projects.ts` (the two `// CHECK:` comments there) |
| Yathartha 2.0 | Confirm it was the second edition, and the year | `app/data/projects.ts` |
| ANSYS workshop dates | The SOIES site lists 31 December 2025 and the site uses that. Older SOIES text said 21 January to 9 February 2026. Correct it if you find out. | `app/data/soies-events.ts` |
| Library resources | Only Semester VI has links in Sanity. Add `note` documents in Sanity Studio for other semesters; the site picks them up within an hour. | Sanity Studio |
| Compressed magazine PDF | The issue is 23 MB. A copy under 8 MB would load much faster on mobile data. The link always shows the size, so this is optional. Compressing it properly needs a PDF tool (Acrobat, or Ghostscript), which this machine doesn't have. | Replace `public/files/industrial-vision-vol11.pdf` and update `magazinePdf.size` in `app/data/site.ts` |
| Google Search Console | Add the site and submit `https://anishpanthi.com.np/sitemap.xml` after deploying | Search Console |

---

## Resolved (31 October 2026)

| Question | Your answer | What changed |
|---|---|---|
| Public email | panthia408@gmail.com | Shown in Contact, footer, form error message and structured data |
| Availability | From 15 Mangsir, for 3 to 5 months | Contact reads "I'm available from 15 Mangsir (early December) for 3 to 5 months." |
| Research details | Design and simulation phase; fabricated and documented by 15 Mangsir; the aim is to see how changing the vent area and ratio affects torque, and so power generation | Research question, status, method, "Measuring" and "Due" rows rewritten from this |
| Turbine image | CAD model uploaded | Now Fig. 02 in Research (`public/images/turbine-cad.png`) |
| Photo captions | Not needed | Hero caption is just "Anish Panthi"; the About photo has no caption |
| Sharper speech photo | Uploaded four | The MechTRIX 2082 photo is now in About, resized to 2400 px (`public/images/anish-mechtrix-speech.jpg`). The old `public/files/about-speech.jpg` is kept but no longer used. |
| GitHub account | Keep `panthia408-crypto` | No change |
| Project metrics | Don't have them | Nothing added; the layout doesn't need them |
| Spelling, Semester VI subtitle, CV | "The rest are good" | Birat Tiwari kept as spelled; Semester VI left without a subtitle; CV unchanged |
| Nice-to-haves | "Whatever you think is best" | Old logo `public/logo.png` deleted (unused). Social links: LinkedIn and GitHub in Contact, all five in the footer. `/styleguide` kept as a hidden design reference (not indexed by search engines). The social card keeps the plain sans font. PDF compression skipped, see above. |
