# Verification — 2 October 2026

- Clean repository cloned from the existing master branch; original commit remains recoverable.
- Reviewed 17 public Devpost project pages, 36 registrations over two pages, seven achievements, and available event pages. Added the extra DemandRadar event referenced by its submission.
- Validated 37 unique event IDs/URLs and 17 unique submission URLs, award evidence, dates, local images, and deadline ordering. Graphiques has one event with two builds. Missing DemandRadar dates stay null.
- Browser rendered all 37 event sections and 17 project links. Traversed all 13 map regions: 37 castles, 37 unique stops.
- Tested viewport widths 1440, 1280, 768, 390 and 320 pixels: no heading, paragraph, tag, button or select overflow detected. Inspected desktop and mobile screenshots.
- Tested PRESS START, region selection, keyboard Enter on a castle and keyboard reveal of dialogue. Checked optional SFX default and accessible button labels. No browser console errors on the production build.
- Type checking, production build and static export succeeded. Static export uses optimized local thumbnails without a server image dependency.
- Updated pixel social poster, canonical metadata, robots and sitemap. Removed generic Devpost logo thumbnails that did not depict a project.
- Reviewed 81 distinct outgoing URLs; 80 responded successfully after retries. AI Content Engine’s event URL returns HTTP 410 Gone, retained as provenance with an explicit unavailable-source note.
- npm dependency audit: zero known vulnerabilities after a compatible Next patch update and PostCSS override. Existing Next 15 architecture retained.
- Reduced-motion behavior reviewed in code: MotionConfig and explicit ambient animation branches, CSS animation suppression, non-smooth scrolling, instant dialogue/progress. An OS-level reduced-motion browser session was not simulated.
- Both production domains are attached to the existing Vercel Journey project, with ownership verified. DNS still needs the exact records in deployment.md; apex HTTPS/www verification is pending DNS propagation.
