# Case study evidence and implementation audit

Reviewed 19 November 2026. Scope: the ten existing `/work/[id]` pages. Existing routes, navigation, consent, and unrelated pages stay intact. `docs/seo-measurement.md` had an unrelated working change before this task and is not part of this edit.

## Baseline and design direction

The pages use `data/work-projects.ts`, `WorkProjectPageContent`, and a shared Next.js App Router route. Canonicals, project Open Graph images, CreativeWork and breadcrumb JSON-LD already exist. All ten routes are in the sitemap and robots allows public content. The current layout delays the product screenshot behind multiple text blocks, repeats short delivery lists, and has no contents navigation, explicit constraints, trade-offs, or future-work section. Two demos have empty implementation/challenge arrays.

Preserve Manrope, the existing blue accent, light surfaces, glass navigation, rounded image treatment, and current contact/booking actions. Use an editorial layout with an early product image, compact facts, a desktop contents rail, readable text columns, a lightweight HTML flow diagram where evidence supports one, decision comparisons, and clearly separated outcomes and proposed improvements. Design variance 5, motion 2, density 4: reading and evidence take priority over new animation. No new dependencies.

## Evidence rules

Local source establishes implementation, not sole authorship or deployment. First-person scope comes from the owner's supplied account and existing portfolio contribution records. New source observations are described as implementation details, not invented historical decisions or debugging stories. Website marketing claims are not developer outcomes. Proposed improvements are explicitly future work. No numerical performance, revenue, learner, patient, conversion, or adoption claims are carried into the new stories.

## Project evidence inventory

Paths below are relative to `C:/Users/aruna/Documents/code` unless noted.

| Project | Evidence inspected | Content boundary / missing evidence |
| --- | --- | --- |
| Transcendence | `persist/transcendence-project/frontend/package.json`, `app/page.tsx`, `components/unit/hooks/use-unit-motion.ts`, `components/landing/LandingLenis.tsx`, `components/loading/GlobalAssetLoaderGate.tsx`, `components/book-demo/hooks/use-book-demo-form.ts`; existing contribution record; public website | Describe public frontend, product presentation, shared motion and loading behavior. Do not claim ownership of holographic hardware, AI models, or all backend systems. Loader includes an intentional minimum duration; do not turn it into a measured speed improvement. |
| Proof Cohort | `personal/PROOFSPRINT/package.json`, `src/lib/public-programs.ts`, `src/lib/public-content.ts`, `src/app/programs/page.tsx`, `src/app/pricing/page.tsx`, `src/app/verify/[certificateId]/page.tsx`; existing contribution record; public catalog | Contribution remains public program/resources/pricing/certificate presentation. Explain anonymous catalog reads, availability state, shared fee configuration, and public verification as code observations. Older quoted prices conflict with current content; omit prices. Do not claim the whole learning/payment platform. |
| ChainReach.ai | `persist/chainreach/frontend/package.json`, `src/lib/api-base.ts`, `src/hooks/useAiChatCampaign.ts`, `src/hooks/useNegotiationChat.ts`; existing contribution record; public website | Explain role-specific frontend, API boundary, assistant loading/error states, and chat message deduplication/cleanup. Do not claim escrow contract development, payment safety, production scale, or audited cryptography. Private account workflows were not exercised. |
| Pivotal Physiocare | Existing portfolio contribution and feature records; `/image/pivotal-physiocare-thumbnail.png`; public website and service/contact navigation | No matching local source repository found in Documents/code, Documents, Desktop, or Downloads. Next.js is documented in the existing portfolio. Avoid invented CMS, database, booking backend, or measured conversions. Client clinical claims are not engineering results. |
| HeyClo / CLO AI | `persist/heyclo-landing/clo-landing-next/package.json`, `src/app/page.js`, `src/pages/HomePage.jsx`, `src/components/SmoothScroll.js`; existing contribution record; live website | Correct current case-study stack to Next.js, React, Framer Motion, Lenis. Framer Motion is a library, not proof of using the Framer site builder. Native scrolling is selected for touch/mobile/reduced motion; desktop Lenis has cleanup and fallback. Existing experience-page terminology is outside this task's scope. No historical Lighthouse scores asserted. |
| Sound Of Meme | Owner's supplied React/Redux Toolkit/Axios, playlist, debounced search and filtering account; `data/portfolio.ts`; existing case study and screenshot | No source repository or current first-party deployment URL verified. Treat as documented frontend work. Do not assert RTK Query, request cancellation, cache lifetimes, backend generation models, precise bundle reductions, or blog counts. |
| Samriddhi Interiors | Existing contribution record, screenshot, public website's services/gallery/contact structure | No matching local source found. Next.js/TypeScript/Framer Motion are documented, not re-established from a repository. No claims about form persistence, CRM integration, lead volume, client project counts, or clinical/business outcomes. |
| NursePhysioWala | Owner's Next.js App Router/Firebase Auth/Firestore account; conservative experience entry; public nursing/physiotherapy/service/request navigation; screenshot | No matching local source found. Existing case study overstates verified automatic allocation and operational scale. Limit to frontend/application foundation and public discovery/request presentation; private payment/allocation/admin behavior remains unverified. |
| Rey9 Living | `leads/rey9living/package.json`, `README.md`, `app/page.tsx`, `components/CostEstimator.tsx`, `components/MaterialStudio.tsx`, `components/Portfolio.tsx`, data modules and screenshots | Demo with local React state, static pricing factors, material preview, filtering/modal, WhatsApp link. No server pricing, persisted quotes, actual interiors commissions, or verified business testimonials. An independent HTTP request confirmed the existing demo URL returns 200 with the Rey9 Living title. |
| AI Case Calculator | `persist/aicasecalculater/aicasecalculator-main/package.json`, `app/page.js`, `lib/store.js`, `lib/api/apiClient.js`; existing contribution and archived sample-report screenshot; public demo | Current local application is newer than the archived report preview and has Redux Toolkit/Axios/auth and server modules. These do not establish ownership of all backend/AI work. Keep demo status and frontend contribution clear. Do not claim calibrated P10/P50/P90 estimates, validated legal outcomes, or a particular retrieval pipeline. |

## Search intent and topic map

This is a relevance map based on implementation, branded page inspection, and a small search-result review, not keyword-volume or ranking data. Branded case studies own portfolio evidence intent; service pages retain commercial hiring intent and guides retain tutorial intent.

| Route | Primary topic | Supporting / technical long-tail topic | Reader intent |
| --- | --- | --- | --- |
| transcendence | Transcendence frontend case study | Next.js immersive product website; GSAP/Lenis scroll coordination | Evaluate motion and public-product frontend work |
| proofcohort | Proof Cohort / ProofCohort development | Next.js Supabase public catalog; certificate verification interface | Understand education-product contribution |
| chainreach-ai | ChainReach.ai dashboard frontend | Next.js campaign workflow; AI assistant request states; negotiation chat | Evaluate API-driven product UI |
| pivotal-physiocare | Pivotal Physiocare website | Next.js physiotherapy website; local service discovery and inquiries | Assess healthcare business website work |
| heyclo-clo-ai | HeyClo / CLO AI landing page | Next.js Framer Motion; Lenis native-mobile fallback | Evaluate responsive product storytelling |
| sound-of-meme | Sound Of Meme React frontend | Redux Toolkit playlists; Axios song discovery; debounced search | Understand music application frontend experience |
| samriddhi-interiors | Samriddhi Interiors website | Next.js interiors portfolio; service navigation and consultation | Assess visual business-site implementation |
| nursephysiowala | NursePhysioWala frontend | Next.js Firebase healthcare marketplace; service request interface | Understand marketplace frontend scope |
| rey9-living | Rey9 Living website demo | React local-state estimator; material swatch UI | Explore interactive interiors prototype |
| ai-case-calculator | AI Case Calculator frontend demo | Legal report UI; Next.js Redux Toolkit Axios frontend | Assess interface design and contribution limits |

## Link and SEO reference review

Public pages inspected: https://transcendenceplatform.com/, https://www.proofcohort.in/, https://chainreach.ai/, https://www.pivotalphysiocare.com/, https://heyclo.com/, https://www.samriddhiinteriors.com/, https://nursephysiowala.in/, https://aicasecalculator-iota.vercel.app/. Web-tool retrieval may be cached; it is not a live workflow test. The non-www ProofCohort fetch failed; the www destination resolved. No project-specific public source link was established from the GitHub profile, so no guessed repository buttons are added.

Primary guidance: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [CreativeWork vocabulary](https://schema.org/CreativeWork). Use visible, helpful text and matching schema. No special AI schema, guaranteed indexing, rankings, citation claims, or rich-result promises. Retain CreativeWork for the authored case study rather than implying Arun owns every underlying software product.

## Information needed for deeper claims

- Public source links or reviewable snapshots for Sound Of Meme, NursePhysioWala, Pivotal Physiocare, and Samriddhi Interiors.
- Permission-cleared screenshots of private dashboard, playlist, and booking workflows.
- Which newer AI Case Calculator modules Arun personally implemented, and a deployment/version match for the archived report preview.
- Measured before/after performance artifacts, if numerical outcomes are wanted.
- Verified dates/team contributions and authentic debugging history if those details should be added.

Missing evidence does not block the rewrite; affected sections stay scoped and shorter.

## Implementation delivered

- Added a typed, project-specific story for all ten routes in `data/case-studies.ts`. Each has goals, constraints, evaluation criteria, implementation, decisions/trade-offs, challenges, outcomes, lessons, proposed improvements, useful questions, and evidence boundaries.
- Replaced the old brief delivery lists with an editorial case-study layout: early dimensioned screenshot, contribution/technology facts, author link, visible breadcrumbs, desktop contents rail, native mobile contents disclosure, and nine anchored sections.
- Added semantic HTML flows for the five source-backed interactions: Transcendence inquiry, Proof Cohort catalog, ChainReach assistant, HeyClo scroll initialization, and Rey9 estimator. No invented diagrams for projects lacking implementation evidence.
- Retained all URLs, existing imagery, the alternating work listing, blue/Manrope styling, and project/contact actions. Related projects, services, and guides remain explicitly selected.
- Reconciled shared listing/summary claims with the new stories. Corrected HeyClo's Framer site-builder wording to Next.js/Framer Motion; removed unsupported Sound Of Meme numerical results and NursePhysioWala allocation claims. Demo status remains explicit.
- Kept unique metadata and social images, replaced generic project keyword combinations with relevant topics, and extended CreativeWork with the visible headline, summary, category, and topics. JSON-LD escapes `<`; visible content and schema agree. No FAQ rich-result promises or model-ownership markup.
- Removed superseded case-study arrays from shared project data to prevent contradictory old descriptions from returning. Updated dependent card labels and the homepage's actual case-study count.
- Excluded the existing ignored `output/` folder from TypeScript. An old preview source copy there was incorrectly participating in the production type check.

## Verification results

- `npm run build`: passed; all ten `/work/[id]` routes statically generated. The route reports 247 B page JavaScript and 115 kB first-load JavaScript, including shared application code. These are build outputs, not field performance scores or before/after improvements.
- `npm run lint`: passed with existing warnings in unrelated UI components (hook dependencies and an existing raw image). The production build also completed type checking.
- `node scripts/check-seo-data.cjs`: passed, including exact case-study coverage, unique metadata, source-image dimensions, demo labels, schema/content agreement, and the existing factual project index.
- `node scripts/check-seo.cjs http://localhost:3000`: passed on the final production build. All 44 sitemap pages returned 200 with unique metadata, canonical/OG agreement, inherited indexability, one H1, valid JSON-LD, and correct redirect/404 behavior. Case-study section targets, descriptive content-image alt text, and unique IDs were checked.
- `node scripts/check-internal-links.cjs`: passed across 44 public pages, with no broken targets, missing fragments, or orphan pages; maximum crawl depth is two.
- Browser review covered every case study at the actual desktop viewport (1280 px, 1274 px content area) and real pages embedded at 360, 390, and 768 px. The browser's viewport override did not change its viewport, so temporary fixed-width iframe previews were used instead of claiming device emulation. Every checked page had one H1, nine story sections, and no horizontal document overflow. Hero images loaded on all ten desktop and 390 px views.
- Reviewed desktop/mobile screenshot contact sheets, the technical reading layout, and a source-backed flow diagram. Checked keyboard opening of the mobile contents and keyboard navigation to sections; the target receives focus. Opening the mobile header menu left the main content's offset unchanged. Existing work-list navigation still opens the case study.
- Production browser console review returned no errors. Source/image loading and static markup were checked; private third-party workflows were not exercised.
- No dependencies or client-side case-study scripts added. No Lighthouse installation was available, so no Lighthouse, field Core Web Vitals, ranking, conversion, or accessibility certification score is claimed.
- Temporary responsive-review HTML was removed. Screenshots and compact browser results are retained under ignored `output/case-study-review/`; the unrelated pre-existing `docs/seo-measurement.md` change was left intact.

The remaining evidence requests above are for deeper future claims, not prerequisites for these implemented pages. Physical-device testing, authenticated source-product flows, and measured field performance remain outside this verification pass.
