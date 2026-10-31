# Content I need from you

This file lists everything the redesign in [DESIGN_PLAN.md](DESIGN_PLAN.md) needs that isn't in the repo yet. Nothing here will be made up. Until you supply an item, the site shows a clearly marked placeholder like `[PLACEHOLDER: research question, 1 to 2 sentences]`. The layout is designed to look finished with placeholders in place, so you can ship before every item is done.

To see which placeholders are still live in the code: `git grep -n "PLACEHOLDER:" app`

Updated 31 October 2026, after the build. To fill a placeholder, replace the whole `[PLACEHOLDER: ...]` text in the file listed below with your words.

Priority:
- **P1** blocks a good first impression. Do these first.
- **P2** makes the site noticeably stronger.
- **P3** is nice to have.

---

## 0. Live placeholders on the site right now

Each row is a marked placeholder that visitors can currently see. The item number points to the details further down.

| Where on the site | File to edit | Placeholder text | Item |
|---|---|---|---|
| Contact, big email line | `app/data/site.ts` (`email`) | public email address | D1, L1 |
| Contact, "I'm ..." line | `app/data/site.ts` (`availability`) | available from month and year. Write it so it reads after "I'm", e.g. "available from January 2027, in Kathmandu or remote" | D8, K1 |
| Contact form, success message | `app/data/site.ts` (`replyTime`) | usual reply time, e.g. 2 days | K2 |
| Hero portrait caption | `app/components/home/Hero.tsx` | year photo was taken | P1 |
| About photo caption (Fig. 03) | `app/components/home/About.tsx` | event, place and date of this photo | P4 |
| Research spec list | `app/data/research.ts` | method, short phrase | R3 |
| Research spec list | `app/data/research.ts` | software used on this project | R4 |
| Research spec list | `app/data/research.ts` | expected completion, month and year | R7 |
| Research, "The question" | `app/data/research.ts` | why the answer matters, 1 sentence | R1 |
| Research, "What I do" | `app/data/research.ts` | what you model, in which software, and who uses your models, 2 to 3 sentences | R2 |
| Research, "Where it stands" | `app/data/research.ts` | current stage and next milestone with a month, 1 to 2 sentences | R6 |
| Research, Fig. 02 image | `app/data/research.ts` (`figure`) | CAD render of your model, 16:9, only if sharing is allowed. Put the image in `public/images/` and replace the `placeholder` field with `src`, `alt`, `width`, `height` in `app/components/home/Research.tsx` | R10, D7 |
| Research, Fig. 02 caption | `app/data/research.ts` (`figure`) | what the render shows, under 15 words | R11 |

The placeholders in `app/styleguide/page.tsx` are samples on the design reference page. They're not missing content.

---

## 1. Decisions

| # | Question | Why it matters | Options |
|---|---|---|---|
| D1 | **Which email address should be public?** | The site has no visible email today, only a form. Contact is built around an email link. | Your address, or "form only" |
| D2 | **Which social links stay?** Now: LinkedIn and GitHub in Contact; all five (plus X, Facebook, Instagram) in the footer. Edit `primary` or remove entries in `app/data/site.ts`. | Five icon links read like a link-in-bio page. For internship recruiters, LinkedIn plus email is enough. | Recommended: LinkedIn and GitHub on the page; the others in the footer only, or dropped |
| D3 | **Is `panthia408-crypto` the GitHub account you want shown?** | The handle looks auto-generated. Recruiters may open it. | Keep, rename the account, or drop GitHub |
| D4 | **Is Sanity's `about` document newer than the bio on the site?** The old site swapped in its `mainBio` on desktop only. That swap is gone: everyone now sees the bio in `app/components/home/About.tsx`. The Sanity document and schema are untouched. | If the Sanity text is newer, paste it in and it replaces the local copy. | Local bio (recommended), or the Sanity bio |
| D5 | **Keep the old logo file (`public/logo.png`)?** | The site no longer uses it (the nav is a typographic wordmark and the favicon is a new AP monogram). The PNG stays in the repo unless you say delete. | Retire it (recommended), or keep it for social avatars only |
| D6 | **The 23 MB magazine PDF:** link it directly, or upload a compressed copy (target under 8 MB)? | On mobile data, 23 MB is a lot for one tap. The link will always show the size either way. | Provide a compressed PDF, or keep and label it |
| D7 | **May the site show a schematic of the turbine?** The original design is patented and your study is unpublished. | The research section can show an abstract "schematic, not to scale" SVG (a generic rotor outline with the center area called out) or nothing until you have approved renders. | Abstract schematic OK, nothing yet, or check with your supervisor first |
| D8 | **When are you available for an internship, and where?** | Used in the hero status line and the contact heading. | e.g. "from January 2027, Kathmandu or remote" |
| D9 | **Should the `/styleguide` page stay after launch** (as `noindex`) or be deleted? | It's a design reference for future edits. | Keep or delete |

---

## 2. Research: omnidirectional wind turbine (P1)

This is the section that does the most work, and right now almost all of it is missing.

| Item | Exactly what to provide | Length or format | Where it shows |
|---|---|---|---|
| R1 | **Why the answer matters.** The question itself is already written from your bio ("What happens to an omnidirectional wind turbine's performance when the shape and ratio of its center area change?"). Check that wording, then add one sentence on why it matters. | 1 sentence | Research, "The question" |
| R2 | **Your part of the work.** What you model, in which software, and what you hand over to whom. | 2 to 3 sentences | Research, "What I do" |
| R3 | **Method.** e.g. CAD in SolidWorks, then CFD in ANSYS Fluent, then a scale prototype or wind tunnel test. Only what is true. | A short phrase for the spec list, plus 1 sentence if needed | Research spec list |
| R4 | **Tools used on this project.** | A comma list | Research spec list |
| R5 | **What you vary.** The parameters (shape, ratio) and roughly how many variants, if you can share that. | 1 sentence, or "not shareable yet" | Research, "The question" or "What I do" |
| R6 | **Where it stands now and the next milestone,** with a month. | 1 to 2 sentences | Research, "Where it stands" |
| R7 | **Expected completion date** of the final year project. | Month and year | Research spec list |
| R8 | **Team.** Other students on the project, if they want to be named. | Names, or "keep unnamed" | Research spec list |
| R9 | **Confirm supervisor name and title:** "Asst. Prof. Suman Acharya". | Yes or a correction | Research spec list, /projects |
| R10 | **CAD render or screenshot** of your model, only if sharing is allowed (see D7). | PNG or JPG, at least 2400 px wide, 16:9, plain background | Research, Fig. 02 |
| R11 | **A caption for R10.** What the image shows. | Under 15 words | Fig. 02 caption |
| R12 | **Results so far** (P3, only if any exist and can be shared): a small table of variant against a measured or simulated value. | CSV or a table in a message | An optional results figure. It isn't shown if empty. |
| R13 | **Any document:** proposal, poster, progress report or paper (P3). | PDF, plus whether it can be public | An optional "Read the proposal" link |

---

## 3. Photos (P1 and P2)

| Item | What exactly | Specs | Where |
|---|---|---|---|
| P1 (P1) | **The year the hero portrait was taken.** The current portrait (now `public/images/anish-portrait.jpg`) is a real photo and works well with the new design. | A year | Fig. 01 caption |
| P2 (P2) | **Optional better portrait:** natural light, plain or neutral background, from the chest up, looking at or slightly away from the camera. Not a passport-style crop. | JPG, at least 1600 x 2000 px (4:5) | Hero |
| P3 (P1) | **A higher-resolution original of the speech photo** (`public/files/about-speech.jpg` is only 49 KB and will look soft). | JPG, at least 1800 px wide | About, Fig. 03 |
| P4 (P1) | **The caption for the speech photo:** what event, where, when. Is it the National Planning Commission presentation? | Under 15 words | Fig. 03 caption |
| P5 (P2) | **A working photo:** you at a desk with CAD open, at the lab, or with the printed magazine. Anything that shows you doing the work. | JPG, at least 1800 px wide, 3:2 | About or Research |
| P6 (P2) | **A photo of the printed Industrial Vision Vol. 11** (a physical copy, open or stacked). | JPG, 3:2 | Work row 01 (the cover image is used until then) |
| P7 (P3) | **Screenshots** of the SOIES Nepal website and the Engineer's Library. | PNG, 1600 x 1000, desktop view | Work rows 04 and 05, and /projects |

---

## 4. Projects and metrics (P2)

Only real numbers. If you don't know one, leave it out. The layout doesn't need every metric.

| Item | Project | What to provide |
|---|---|---|
| M1 | **Industrial Vision Vol. 11** | Number of pages; number of contributors on the team; how many weeks from start to print; print run (copies), if known. You already have a launch date: 14 August 2026. |
| M2 | **SOIES Nepal presidency** | Members in the society or committee size; total attendees across the 20 events, if tracked; number of sponsors or partners. |
| M3 | **NPC proposal** | The date you presented at Singha Durbar (if different from the June 2026 submission), and the outcome so far ("under review" is a fine answer). |
| M4 | **Nebico MOU** | What the MOU covers in 1 sentence (internships, visits, research?). |
| M5 | **SOIES Nepal website** | Your exact role (built it alone, led a team?), launch month, and 1 sentence on what was hard. |
| M6 | **The Engineer's Library** | Number of resources or subjects; visits or users, if you have analytics; launch month. |
| M7 | **Industrial Vision Vol. 10** | Year, and the title of your piece (this answers the `// CHECK:` comment in `app/data/projects.ts`). |
| M8 | **Yathartha 2.0** | Confirm it was the second edition, and give the year (answers the second `// CHECK:` comment). |
| M9 | **This portfolio** | Nothing needed. |

---

## 5. Links (P1)

| Item | What to provide |
|---|---|
| L1 | The email address (see D1) |
| L2 | Confirm the LinkedIn URL: `https://www.linkedin.com/in/anish-panthi-057326281/` |
| L3 | Confirm or replace the GitHub URL (see D3) |
| L4 | Whether `https://soiesnepal.org.np` is the final domain for the SOIES site |
| L5 | Any public link for the NPC proposal or a news post about it (P3) |

---

## 6. CV (P1)

| Item | What to provide |
|---|---|
| C1 | **Is `public/files/Anish-Panthi-CV.pdf` current?** If not, send the updated PDF. One or two pages, text-based (not a scanned image), so recruiters' systems can read it. |
| C2 | The month it was last updated, so the site can show "CV, updated [month year]" |
| C3 | (P3) An MEP and HVAC-focused version, if you plan to send one to internship firms |

---

## 7. Tools: confirm the levels (P2)

The new layout lists tools as text with an honest note. Confirm or correct each one. These are the current labels from `Toolbox.tsx`:

| Tool | Current label | Your answer |
|---|---|---|
| AutoCAD | Intermediate | |
| AutoCAD MEP | Learning | |
| SolidWorks | Intermediate | |
| ANSYS | Intermediate | |
| Adobe InDesign | Magazine project | |
| Photoshop | (none) | |
| DaVinci Resolve | (none) | |
| Excel | Advanced, self-assessed | |
| PowerPoint, Word | (none) | |
| Next.js, Sanity, GitHub, Vercel, Cloudflare | (none) | |
| C | Basics | |

Also: for each tool, if there's **one thing you made with it**, give it in about 5 words (for example, "SolidWorks: turbine model, 2025"). This is optional, but it beats a skill level.

---

## 8. Testimonials (P3, hidden until provided)

The plan has room for 1 to 3 short quotes. The section doesn't render until at least one exists.

For each quote:
- the quote itself, under 40 words, in the person's own words
- their full name and role (for example, "Asst. Prof. Suman Acharya, Department of Industrial Engineering, Thapathali Campus")
- their **written permission** to publish it

Good sources: your research supervisor, a faculty advisor of SOIES Nepal, a magazine teammate, or a contact from Nebico or the job fair.

---

## 9. Contact microcopy (P2)

| Item | What to provide |
|---|---|
| K1 | Internship availability (see D8) |
| K2 | How quickly you usually reply, for the form's success message (for example "2 days") |
| K3 | Location line for the footer: is "Thapathali Campus, Kathmandu" right, or do you prefer your city or district? |

---

## 10. SEO (P3)

| Item | What to provide |
|---|---|
| S1 | Access to Google Search Console for `anishpanthi.com.np` (or confirm it isn't set up), so the sitemap can be submitted after launch |
| S2 | The phrases you want people to find you with (for example "Anish Panthi", "Industrial Engineering Thapathali", "SOIES Nepal president") |

---

## Already in the repo (no action needed)

The plan uses these as they are:
- About bio text
- The journey timeline and certificates
- The 14 project entries in `app/data/projects.ts`
- Both Industrial Vision pieces and their page images
- The magazine PDF and cover
- The SOIES committee photo and 58 event images
- The current CV
- The Formspree form endpoint

---

## 11. Things the build turned up (P2)

| Item | What to check or provide |
|---|---|
| B1 | **The speech photo.** The banner behind you looks like an engineering exhibition (possibly MechTRIX). Confirm the event, place and date for its caption (P4). |
| B2 | **Library, Semester VI subtitle.** It used to say "Current Semester", which is no longer true, so it now has none. Give it a subject-area subtitle like the others (e.g. "Industrial Methods" for V), or leave it blank. File: `app/data/library.ts`. |
| B3 | **SOIES team spelling.** `app/data/soies-events.ts` notes the SOIES site spells Birat Tiwari as "Tiwati". Confirm which is right. |
| B4 | **ANSYS workshop date.** `app/data/soies-events.ts` lists 31 December 2025, but older SOIES text says it ran 21 January to 9 February 2026. Confirm. |
| B5 | **Library content.** Only Semester VI has resources in Sanity (8 subjects). The other shelves say "Nothing yet". Add `note` documents in Sanity Studio when you have links; the site picks them up within an hour. |
| B6 | **OG image font.** The social card uses a plain sans because the image generator can't use the site's web fonts. If you want it in Newsreader, add a `Newsreader-Regular.ttf` to the repo and it can be wired in. |

