# Whole-site SEO, AIO and GEO audit

**Audit only — 23 October 2026 (UTC).** Repository: `portfolio_arun_acharya`. Canonical production origin: [www.arunacharya1603.in](https://www.arunacharya1603.in/).

The companion [page-by-page-audit.csv](page-by-page-audit.csv) contains **42 public content pages and 51 fields per page**, including actual rendered metadata, headings, link counts, source paths, recommendations and measurement requirements. Non-content routes and URL variants are inventoried separately below.

## 1. Decision summary

No site-wide crawling or canonicalization blocker was found in the production sample. All 42 discovered public content URLs returned **HTTP 200**, contained meaningful primary text in initial HTML, and declared the intended self-canonical URL. Titles and descriptions were unique across the sample. This establishes technical eligibility, **not Google indexing, rankings or impressions**.

The highest-value work is not more keyword variants or more schema:

1. Verify an external identity problem: search-accessible LinkedIn profile data links to an old portfolio URL that now returns a page titled **“Minhal Ahmed | Full-Stack Web Development Student.”**
2. Review the existing, unpublished internal-linking improvements. Production still has one orphan content page, `/locations`, and a weakly linked `/blog` hub. These issues have local changes addressing them; they must not be reported as newly fixed or deployed.
3. Describe the contribution rather than the whole product. The case-study metadata generator currently derives “credited work” from product features. That can overstate responsibility, especially for ProofCohort.
4. Give each project its own defensible search intent. HeyClo is not just “CLO AI”; Transcendence needs a product/category qualifier; AI Case Calculator is a generic name and a demo.
5. Support numeric claims and implementation narratives with dated, approved evidence. Specificity and accurate attribution offer a better basis for useful search results than repeated brand spellings.

There is **no evidence here that another hostname switch, removing Search Console properties, adding city pages, or requesting indexing repeatedly would solve a current problem**. Keep the established HTTPS/www canonical.

### Evidence labels

- **[R] Repository / installed-runtime evidence:** source and local data read during this audit; in-memory metadata evaluation using installed TypeScript; exact installed Next.js metadata implementation. Not a fresh build.
- **[L] Live web evidence:** direct, read-only HTTP checks or identified public web research. Search-provider extracts can be stale; they are not a controlled Google rank report.
- **[V] Validation required:** a plausible impact or issue requiring production/account/owner verification.
- **[U] Unknown:** no authoritative evidence available. Never interpreted as zero, passing, failing or not indexed.

Priorities: **P1** = address first because of identity, attribution, discovery or measurement importance; **P2** = material page-quality/implementation improvement; **P3** = hygiene or lower-risk clarification. No P0 outage or global indexing block was demonstrated. Priority is not a predicted ranking increase. Confidence describes the evidence for the finding, not certainty of SEO uplift.

### Scope and audit integrity

Only these two documentation files were created:
- `docs/seo/whole-site-seo-audit.md`
- `docs/seo/page-by-page-audit.csv`

Existing application changes were read, not edited. No dependencies, metadata, configuration, content, environment settings or external properties were changed. No build, deployment, commit, push, URL submission or indexing request was performed. No contact form or deliberately failing Sentry endpoint was invoked. No production analytics test events were sent.

The SEO/GEO playbook informed the factual-identity and answerability review; the site-structure skill informed the small-site link graph and hub analysis. Claims in a playbook were not treated as search-engine guarantees. Current official guidance and this repository's evidence take precedence.

## 2. Architecture, business context and evidence sources

| Area | Verified observation | Evidence / boundary |
|---|---|---|
| Framework | Next.js **14.1.4**, React 18 family, TypeScript | `package.json`, lockfile and installed `node_modules/next/package.json`; exact installed Next version verified |
| Router | App Router for all discovered content and endpoints | `app/`; `pages/_document.tsx` is a residual document wrapper, not a second set of public content routes |
| Layouts | Root layout plus Sentry test-page layout | `app/layout.tsx`, `app/sentry-example-page/layout.tsx`; no other nested layouts, templates or loading files discovered |
| Dynamic pages | Three finite registries, 27 actual instances | `/work/[id]` (10), `/services/[slug]` (9), `/blog/[slug]` (8); each exports `generateStaticParams` |
| Storage | Local typed arrays and hard-coded JSX | `data/work-projects.ts`, `data/seo-content.ts`, `data/service-proposals.ts`, `data/portfolio.ts`, `data/seo.ts`, `data/project-guides.ts`; no content CMS/database/API dependency discovered |
| Delivery | Vercel observed in live response headers | Canonical origin set in `lib/site.ts`; deployment/project settings were not inspected or changed |
| Runtime | Public content is server-renderable; all sampled main text is in HTML | No client-only gate on primary public content found; actual deployed static/ISR classification cannot be established from source alone |
| Configuration | Three redirect rules, image configuration, no custom rewrites found | `next.config.mjs`; no middleware, route groups, catch-all or parallel routes discovered |
| Authentication | No private/authenticated portfolio routes discovered | Auth features described in showcased products are not portfolio application routes |
| Conversion | Contact, service-proposal and cost-planner inquiries | `ProjectInquiryForm`, `ServiceProposalForm`, `WebsiteCostPlanner`, `lib/submit-project-inquiry.ts`; success event implementation inspected, delivery not tested |
| Endpoint storage | Node contact endpoint sends email; local-file fallback exists | `app/api/contact-submissions/route.ts`, `lib/send-contact-email.ts`; not an SEO landing page or proof that hosting permits persistent writes |
| Error handling | Global error boundary, framework not-found behavior, per-registry `notFound()` | `app/global-error.jsx` and dynamic page files; missing-route HTTP checks below |

**Positioning:** Arun Acharya is presented as an India-based independent frontend/Next.js developer with UI/UX and selected full-stack capabilities. Target readers are founders, service businesses and product teams; employers also use the portfolio. The commercial outcome is a **qualified project inquiry**, not maximizing visits from people looking to use a client's product.

The active homepage is `components/portfolio/HomePage.tsx`, reached through `components/StudioPortfolio.tsx`. Legacy cinematic/Three.js components elsewhere are not sufficient evidence that the current homepage depends on a canvas. Only the proof-metrics data import remains relevant to that path.

### Exact-version documentation

The version-14 website documentation is useful, but currently represents later 14.x documentation. This audit additionally fetched the **official v14.1.4 release-tagged sources**, rather than applying Next.js 15/16 metadata-streaming assumptions:

- [Next.js 14.1.4 metadata guide](https://github.com/vercel/next.js/blob/v14.1.4/docs/02-app/01-building-your-application/06-optimizing/04-metadata.mdx)
- [Next.js 14.1.4 generateMetadata reference](https://github.com/vercel/next.js/blob/v14.1.4/docs/02-app/02-api-reference/04-functions/generate-metadata.mdx)
- [Next.js 14.1.4 notFound reference](https://github.com/vercel/next.js/blob/v14.1.4/docs/02-app/02-api-reference/04-functions/not-found.mdx)

These document shallow metadata merging, absolute titles and automatic noindex from `notFound()`. Installed `node_modules/next/dist/lib/metadata/resolve-metadata.js` was also inspected for the exact `robots` override behavior.

### Methods and limitations

The production content crawl completed at **2026-10-23T17:39:37.303Z**. Additional redirect, missing-route, demo and image checks were performed later in the same audit. The 42-URL set was enumerated from all discovered page files and local registries, reconciled with the live sitemap, then fetched as initial HTML. HTML parsing excluded scripts/styles when checking visible text, headings and links; JSON-LD was parsed separately.

This was an actual production HTTP crawl, **not** a browser rendering audit, Googlebot crawl, comprehensive external-link crawl or full schema-validator run. All image bytes used for inspection remained in memory. No generated crawl files were saved outside the two permitted reports.

Local metadata was evaluated in memory for all 42 routes using the installed compiler, with UI imports stubbed; it was not a framework production build. All source title/description outputs matched the live sample **except ProofCohort's local naming change**. Body content and link differences remain substantial.

The existing `.next` directory was not treated as a reliable completed production build. No new build was run because it would write additional files. Interactive menu states, every planner selection, visual contrast, focus order, real-user performance and origin logs remain untested.

The Search Console connector returned a subscription/payment-required error before site reports could be read. No authenticated Search Console or analytics report was obtained. Historical screenshots supplied in the conversation do not establish current URL states.

## 3. Exhaustive route inventory

### 3.1 Public content instances

All entries below are **public pages intended to be indexable**, based on source, sitemap and live eligibility checks. “Indexable” is not “indexed.” Every route has one CSV row.

| URL | Source route | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Owner identity and hiring entry point |
| `/about` | `app/about/page.tsx` | Biography and contribution identity |
| `/work` | `app/work/page.tsx` | Project discovery hub |
| `/experience` | `app/experience/page.tsx` | Career timeline and ownership |
| `/services` | `app/services/page.tsx` | Engagement selection hub |
| `/process` | `app/process/page.tsx` | Delivery and collaboration expectations |
| `/pricing` | `app/pricing/page.tsx` | Starting budgets and scope comparison |
| `/faq` | `app/faq/page.tsx` | Hiring questions and answers |
| `/blog` | `app/blog/page.tsx` | Editorial index |
| `/blog/author/arun-acharya` | `app/blog/author/arun-acharya/page.tsx` | Author identity and evidence |
| `/locations` | `app/locations/page.tsx` | Remote collaboration scope |
| `/resources` | `app/resources/page.tsx` | Planning hub and tool discovery |
| `/tools/website-cost-planner` | `app/tools/website-cost-planner/page.tsx` | Interactive package selection |
| `/contact` | `app/contact/page.tsx` | Inquiry conversion |
| `/privacy` | `app/privacy/page.tsx` | Privacy and analytics explanation |
| `/work/transcendence` | `app/work/[id]/page.tsx` | Holographic platform frontend implementation |
| `/work/proofcohort` | `app/work/[id]/page.tsx` | Project-based learning public-site development |
| `/work/chainreach-ai` | `app/work/[id]/page.tsx` | Web3 creator/brand campaign interfaces |
| `/work/pivotal-physiocare` | `app/work/[id]/page.tsx` | Healthcare service-site development |
| `/work/heyclo-clo-ai` | `app/work/[id]/page.tsx` | HeyClo animated landing-page implementation |
| `/work/sound-of-meme` | `app/work/[id]/page.tsx` | AI music-product frontend and performance |
| `/work/samriddhi-interiors` | `app/work/[id]/page.tsx` | Interior-services website development |
| `/work/nursephysiowala` | `app/work/[id]/page.tsx` | Healthcare booking and practitioner workflows |
| `/work/rey9-living` | `app/work/[id]/page.tsx` | Interior website demo |
| `/work/ai-case-calculator` | `app/work/[id]/page.tsx` | Legal-tech interface demo |
| `/services/landing-pages` | `app/services/[slug]/page.tsx` | Focused promotional-page service |
| `/services/frontend-development` | `app/services/[slug]/page.tsx` | Frontend implementation service |
| `/services/small-business-websites` | `app/services/[slug]/page.tsx` | Multi-page business-site service |
| `/services/frontend-revamp` | `app/services/[slug]/page.tsx` | Existing-site improvement service |
| `/services/ui-ux-design` | `app/services/[slug]/page.tsx` | Flow and interface planning service |
| `/services/api-development` | `app/services/[slug]/page.tsx` | Backend/API service |
| `/services/web-apps-saas` | `app/services/[slug]/page.tsx` | Full-stack workflow delivery |
| `/services/performance-optimization` | `app/services/[slug]/page.tsx` | Measured frontend optimization |
| `/services/product-mvp-development` | `app/services/[slug]/page.tsx` | Validation-oriented first build |
| `/blog/physiotherapy-website-booking-brief` | `app/blog/[slug]/page.tsx` | Patient-journey website planning |
| `/blog/saas-dashboard-development-scope` | `app/blog/[slug]/page.tsx` | Role/state/API scoping guide |
| `/blog/react-nextjs-performance-audit-brief` | `app/blog/[slug]/page.tsx` | Buyer performance-audit checklist |
| `/blog/small-business-website-cost-and-scope` | `app/blog/[slug]/page.tsx` | Website budget and scope education |
| `/blog/frontend-revamp-checklist` | `app/blog/[slug]/page.tsx` | Redesign preservation checklist |
| `/blog/ui-ux-before-rebuild` | `app/blog/[slug]/page.tsx` | Design-before-build rationale |
| `/blog/api-development-for-startup-web-apps` | `app/blog/[slug]/page.tsx` | API planning education |
| `/blog/landing-page-vs-website-vs-web-app` | `app/blog/[slug]/page.tsx` | Project-type comparison |

### 3.2 Templates, utilities, redirects and fallbacks

| Route / pattern | Classification | Evidence and actual instances |
|---|---|---|
| `/work/[id]` | Dynamic content template, not an additional URL | Ten instances enumerated above from `workProjects`; invalid IDs return 404 |
| `/services/[slug]` | Dynamic content template | Nine instances from `seoServicePages`, matched to `serviceProposals`; invalid/missing data calls `notFound()` |
| `/blog/[slug]` | Dynamic content template | Eight instances from `seoBlogPosts`; author route is a separate static page |
| `/sentry-example-page` | Public, intentionally non-indexable test page | `page.jsx` exports noindex/nofollow/nocache; blocked in robots; no action triggered during audit |
| `/api/contact-submissions` | API endpoint | POST-only submission workflow, forced dynamic Node runtime; no page metadata required; not invoked |
| `/api/sentry-example-api` | API/test utility | GET handler deliberately throws; not invoked to avoid creating an error event |
| `/llms.txt` | Plain-text utility | `app/llms.txt/route.ts`; supplemental summary, not a content landing page |
| `/robots.txt` | Crawl-control utility | `app/robots.ts`; live 200 |
| `/sitemap.xml` | Discovery utility | `app/sitemap.ts`; live 200, exactly 42 content URLs |
| `/manifest.webmanifest` | App manifest utility | `app/manifest.ts`; live 200 |
| `/reviews` | Redirect | Permanent 308 to `/work`, verified live |
| `/github` | External redirect | Permanent 308 to the configured GitHub profile, verified live |
| `/locations/bengaluru`, `/locations/mumbai`, `/locations/delhi`, `/locations/dubai`, `/locations/london`, `/locations/new-york`, `/locations/toronto`, `/locations/sydney` | Eight redirect instances | Explicit regex rule to `/locations`; London sampled live at 308, the other seven verified in config, not individually fetched |
| `http://…`, non-www hostname, trailing-slash variants | Redirect/duplicate variants | Sampled production behavior below; not extra landing pages |
| Query variants such as `/work/proofcohort?audit=canonical` | Parameterized duplicate | 200 with query-free canonical; no query-driven content registry found |
| Invalid dynamic slug, arbitrary unknown path | Error/fallback | Sampled 404s; no indexable content instance |
| `app/global-error.jsx` | Error boundary, not a routable page | Sentry capture and error UI; not deliberately triggered |
| `pages/_document.tsx` | Framework wrapper, not a URL | No public Pages Router page discovered |
| Files under `public/`, favicons/icons, fonts, Next chunks, `/_next/image` | Assets/framework utility | Not omitted SEO pages; no dedicated OG-image route discovered |

No unenumerated CMS records, private app pages, pagination series, localized page variants, route groups or catch-all page instances were found. This does not rule out undisclosed Vercel aliases or externally configured rewrites; deployment configuration and logs were unavailable.

### 3.3 Sitemap and robots

**[R+L]** Sitemap coverage matches all 42 discovered canonical public content routes. It excludes API/test routes and redirects. All listed pages returned 200, not a redirect or noindex. The eight articles have explicit modification dates; other entries omit lastmod. This is preferable to manufacturing a fresh date on every request. `priority` and `changefreq` values are not a way to force prioritization or ranking; Google documents which sitemap fields it uses. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

**[R+L]** Robots allows public pages, blocks `/api/` and `/sentry-example-page`, and advertises the www sitemap. No Googlebot-specific public-content block was found. A permissive file does not prove every bot can pass a hosting firewall; verify Googlebot access in URL Inspection and logs if symptoms persist.

### 3.4 Canonical and status checks

| Tested request | Actual response | Interpretation |
|---|---|---|
| HTTP non-www ProofCohort path | 308 to HTTPS non-www path | Protocol normalization |
| HTTPS non-www ProofCohort with query | 308 to HTTPS www, preserving path/query | Host consolidation works in sample |
| HTTP www ProofCohort | 308 to HTTPS www | Protocol normalization |
| HTTPS www ProofCohort with trailing slash | 308 to slashless path | Consistent page URL format |
| HTTPS www ProofCohort with query | 200, clean self-canonical without query | Duplicate variant consolidated by canonical |
| Invalid work/blog/service slug | 404; robots noindex; inherited homepage canonical in fallback | Not soft-404 content; homepage canonical is fallback hygiene, not a reason valid pages fail |
| Arbitrary unknown path | 404; first parsed robots tag index/follow; inherited home canonical | Status is correct; fallback directive consistency merits low-priority inspection, not a global indexing alarm |
| `/reviews`, `/locations/london`, `/github` | Expected 308 destinations | Do not attempt to index redirecting source URLs |

The HTTP non-www path can involve two hops (protocol, then hostname); this is not an observed loop. Internal links in the content crawl already use the final host. There is no evidence justifying a domain migration merely to remove this one extra legacy-entry hop.

A Search Console **“Page with redirect”** exclusion is expected for the redirecting version. A failed validation can mean Google still sees the intentionally retained redirect. **“Alternate page with proper canonical”** can likewise be correct. The action is to inspect the exact excluded URL and the intended final canonical, not remove working redirects or make both hosts indexable. Google explains these classifications in the [Page Indexing report documentation](https://support.google.com/webmasters/answer/7440203).

Keeping both www and non-www URL-prefix Search Console properties does not create duplicate websites; properties are reporting scopes. A verified Domain property can aggregate variants if the owner later chooses, but no property change is required by this audit.

## 4. Effective metadata and rendering

### What works

**[R+L]** All 42 pages have unique rendered titles/descriptions, a single intended canonical, OG title/description/URL/type/locale/site name/image, Twitter large-image metadata, and `lang="en"`. The CSV records the exact values; no page passed merely because a metadata object existed.

`createPageMetadata` emits an absolute title, so the root `%s | Arun Acharya` template does not append the name twice. It emits a complete OG object rather than relying on nested inheritance. Canonicals/social URLs consistently use production www, not localhost or preview URLs. Work pages use article OG type and project screenshots; other pages primarily share the site social image. Blog publication/modification values derive from the content registry.

There are no translated page variants, so absence of hreflang is not a defect. `en_US` in OG and `en` in HTML are not evidence of geographic targeting to the US or an indexing problem. No client-injected title utility or conflicting manual SEO head tags were found; the root's manual head elements serve theme/llms/JSON-LD purposes.

All 42 main sections and one H1 per page were found in initial HTML. Primary content is not locked behind animation or canvas. Client boundaries for consent, smooth scrolling, forms and the planner do not make the entire document client-only. The planner's default state is present; alternate selections depend on JavaScript, while detailed package information is available on service pages.

### The metadata defect: inherited robots directives are cleared

**[R+L]** `lib/seo.ts:createPageMetadata` always includes a `robots` key, with `undefined` for ordinary pages. The exact installed 14.1.4 merger processes that key and overwrites the root robots value. The live 42-page sample consequently emits **no robots or googlebot meta tag** and no X-Robots-Tag.

Absence means default index/follow, **not noindex**. The concrete loss is the root's explicit preview configuration, including `max-image-preview:large`. Proposed remedy F07: omit the robots property entirely unless intentionally overriding, or merge the intended full policy. Do not add contradictory robot tags manually. Test final HTML and retain deliberate test-page exclusions.

### Relevance, not merely tag presence

The title factory `${shortName} Case Study by Arun Acharya` is unique but not equally useful for every product. “CLO AI” omits the more distinctive HeyClo name; “Transcendence” lacks category context; two demos are labeled case studies. The description says “credited work … including” then inserts `features.slice(0, 2)`, which describes product capabilities rather than necessarily Arun's work. F03 is a semantic accuracy issue, not a missing-tag issue.

Descriptions can become lengthy, but there is no universal character cutoff that proves failure. Write concise, accurate summaries first; inspect actual search snippets by query. Meta-keyword variants do not establish rankings. Do not create extra ProofCohort URLs for capitalization/spacing variants.

## 5. Internal links and architecture

### Reproducible graph definition

Nodes are the 42 canonical content paths. Edges are HTML `<a href>` links resolving to one of those paths on www or non-www. Repeated anchors are counted separately for anchor-instance totals, while incoming/outgoing page counts deduplicate source/target pairs. Self-links/fragments are excluded from cross-page edges; nofollow is excluded. Breadth-first traversal starts at `/`.

“Contextual” means inside `<main>` excluding the shared Start Project CTA. It includes cards and related-content modules; it is **not a claim that every counted link is editorial prose**. Header/footer links remain in the full graph. JavaScript-only states, CSS visibility, external backlinks and bots' actual crawl choices are not captured. Word counts include main-section CTAs and cards, exclude scripts/styles, and are not quality targets.

| Live production measure | Result |
|---|---:|
| Internal anchor instances, including self/fragment links | 1,185 |
| Cross-page anchor instances to known content nodes | 1,077 |
| Unique directed source-target pairs | 674 |
| Contextual cross-page anchor instances | 267 |
| Public content pages with no incoming source page | 1: `/locations` |
| Maximum homepage depth among reachable pages | 2 |
| Broken/unknown internal page destinations discovered | 0 |
| Missing referenced fragment IDs discovered | 0 |
| Noncanonical-host internal anchors discovered | 0 |
| Narrow generic-anchor match set | 9: six “Explore this service”, three “Explore package” |

Nine generic anchors are 3.4% of contextual anchor instances, **not** a keyword-anchor ratio or authority score. No arbitrary exact-match percentage is recommended.

Every case is linked from `/work`. Homepage features ChainReach, HeyClo, Sound Of Meme and ProofCohort, so those cases are depth one. Other cases are depth two. Live incoming-source counts vary sharply: ProofCohort 23 and Transcendence 22, versus Samriddhi 2 and the two demos 1 each. This reflects default related-item selection and content references, not measured PageRank or relevance.

`/blog` has one incoming source page, `/resources`, and depth two. `/locations` is in the sitemap but unreachable from homepage HTML links. Header/footer links explain the 41 incoming-source pages on several hubs; they should not be described as 41 independent editorial endorsements.

### Existing local improvements versus production

| Area | Production evidence | Already present locally — not applied by this audit |
|---|---|---|
| Blog discovery | No Blog navbar item; weak hub ingress | `components/SiteHeader.tsx` adds Blog; `app/blog/[slug]/page.tsx` adds return/context links |
| Remote collaboration | `/locations` has zero incoming pages | `app/about/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx` contain links |
| Service hub | Six service destinations, repeated anchors | `components/portfolio/ServicePages.tsx` adds remaining specialist services and descriptive anchors |
| Project relevance | Related links concentrated on early registry items | `data/work-projects.ts`, `data/seo-content.ts`, `components/portfolio/WorkPages.tsx` use explicit related work/services/guides |
| Experience | Three entries, no contextual case links in sampled HTML | `data/portfolio.ts` and `ExperiencePage.tsx` contain expanded entries and workSlug links |
| Process/about/support pages | Limited contextual next steps | Local links connect planning resources, hiring FAQ and work evidence |

F02 proposes review and later verification of these existing changes; it does **not** authorize publication. No current local build/link graph was run, so expected local improvements are not presented as measured production counts.

The current small-site architecture is already shallow. Keep the work, service and guide hubs; do not create extra category/location layers solely for keywords. For missing opportunities, add a contextual link where a reader needs that next step: patient-journey article → Pivotal/Nurse, dashboard-scoping article → ChainReach, performance guide → Sound Of Meme. These mappings are already represented in the local registries. JSON-LD breadcrumbs exist broadly; visible breadcrumb navigation on deep pages would be a usability enhancement, not a missing crawl prerequisite.

## 6. Individual case-study opportunity analysis

All ten case-study URLs were inspected separately. Product sources corroborate **what a product is**, not automatically who built it. Arun's role statements below are **repository-documented claims [R]**, not independently verified contracts or client endorsements. All suggested titles are proposals, not changes made.

Targeted public searches covered product names, known domains and selected case-study/developer combinations. This is a discovery sample, not a localized Google SERP census. No positions, volumes, keyword difficulty, traffic or backlink totals were measured. A returned result establishes a competing interpretation or source, not its stable rank.

### 6.1 Transcendence — `/work/transcendence`

**Identity and audience.** The official [Transcendence site](https://transcendenceplatform.com/) describes holographic experiences, UNIT hardware and TRS software. The generic word has many unrelated meanings. Category-qualified searches are more defensible than trying to own “transcendence.”

**Documented work.** Frontend Engineer; source describes website/product experiences, UNIT/TRS surfaces, dashboard UI, motion and loading behavior using Next.js/TypeScript and related frontend tooling. This does not establish authorship of holographic hardware, AI models or the complete TRS backend.

**Direction and query themes.** Primary: “Transcendence Platform frontend engineering case study.” Support: product + portfolio/developer, UNIT/TRS interface implementation, holographic-product website design, Next.js motion/loading decisions. Exact-brand navigation belongs primarily to the official product. The search sample also surfaced a [Corpvance Transcendence case study](https://www.corpvance.com/projects/transcendence); only its indexed extract was available, not a full content comparison.

**Useful independent contribution.** Show one approved UNIT/TRS screen with responsibilities annotated and one concrete motion-versus-load trade-off. Proposed title direction: “Transcendence Platform: Holographic Frontend Case Study.” Distinguish personal implementation from any studio/team case study; do not assume those pages are duplicates or cross-canonicalize without comparison. Link frontend/performance services according to the actual work, not every service.

**Priority/confidence/measurement:** P1 / high identity finding, medium competitive interpretation. F03–F05; use exact-brand+platform/frontend query groups and owner-approved scope evidence. Cross-site content relationship requires owner verification.

### 6.2 ProofCohort / Proof Cohort — `/work/proofcohort`

**Identity and audience.** [ProofCohort's official website](https://www.proofcohort.in/) presents project-based learning and career proof. Joined/spaced branding is recognizable, while “PROOF cohort” also occurs in unrelated research literature, including a [published physiology paper](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2021.650758/pdf). Do not target those academic meanings.

**Documented work.** The contribution summary identifies public-facing programs, resources, pricing, artwork and certificate guidance. The project feature list also mentions student dashboards/tasks; its presence does not establish that Arun personally implemented all those features. The current metadata generator nevertheless uses that list to describe “credited work.”

**Direction and query themes.** Primary: ProofCohort public-site development case study. Support: Proof Cohort portfolio/developer, education-platform website implementation, program/resource navigation, certificate-guidance UX. Official admissions, credential verification and sign-in queries are a better fit for the product site.

**Useful independent contribution.** Define “Proof Cohort (ProofCohort)” naturally once, then use consistent normal branding. Explain a program-to-resource or certificate-guidance journey with approved screenshots and explicit scope exclusions. Keep `/work/proofcohort` as the single URL. The existing local spaced-name change is already enough to introduce the alias; repeated lowercase/capitalized variations do not promise ranking.

**Priority/confidence/measurement:** P1 / high. F03–F04. Confirm contribution scope, then inspect the deployed title/description and GSC queries matching both spaced/joined spellings. No measured demand or rank is asserted.

### 6.3 ChainReach.ai — `/work/chainreach-ai`

**Identity and audience.** The official [platform terms](https://chainreach.ai/terms-of-service) describe a creator/brand campaign platform with Web3-related features. The specific name is less ambiguous in the sample than “Transcendence,” but this is not a quantified competitiveness assessment.

**Documented work.** Frontend Developer; brand/creator/admin dashboards, campaign acceptance and negotiation, AI-assisted interface flows, and API integration. Distinguish implementing an AI interface from building its underlying model or smart contracts.

**Direction and query themes.** Primary: ChainReach.ai frontend/dashboard implementation. Support: ChainReach developer/portfolio/case study, multi-role campaign UI, negotiation workflow UX, frontend state/API integration. Official campaign/signup/support pages serve exact-brand task intent better than a portfolio.

**Useful independent contribution.** Publish a redacted role/action/state matrix and one failed/loading/permission-state decision from genuine work. Use role-specific metadata rather than generic AI/Web3 product features. This case can substantiate frontend services; it cannot alone substantiate full-stack/API authorship. Reduce broad ChainReach emphasis on unrelated owner pages if it distracts from overall identity; actual keyword cannibalization requires query data.

**Priority/confidence/measurement:** P1 / high scope risk, medium query opportunity. F03–F05. Validate roles and review brand+dashboard/frontend queries and answer attribution.

### 6.4 Pivotal Physiocare — `/work/pivotal-physiocare`

**Identity and audience.** The [official practice website](https://www.pivotalphysiocare.com/) supports the physiotherapy/home-care category and Greater Noida/Noida context. Patient treatment or clinic-booking searches should primarily resolve there.

**Documented work.** Frontend/full-stack website role, responsive care/service presentation, practitioner proof, enquiry paths and local coverage structure. Clinic claims such as 5,000+ patients and a 4.9 rating appear in product material; they are **not measured developer-created outcomes or independently verified clinical facts**.

**Direction and query themes.** Primary: Pivotal Physiocare website development case study. Support: Pivotal website developer/portfolio, physiotherapy website enquiry design, service-to-booking-request journey, Next.js healthcare-site implementation. Do not compete for medical advice through the portfolio.

**Useful independent contribution.** Annotate the information → practitioner → enquiry journey and distinguish a request from a confirmed booking. Label client-supplied business claims and their date/source, or remove them if approval is unavailable. A website case-study entity is more accurate than automatically classifying the clinic site as software.

**Priority/confidence/measurement:** P1 / high. F04–F06. Client approval and website-development query performance, not patient-outcome or clinical-ranking promises.

### 6.5 HeyClo / CLO AI — `/work/heyclo-clo-ai`

**Identity and audience.** The [official HeyClo site](https://heyclo.com/) describes a relationship assistant. A separate [CLO3D AI feature](https://support.clo3d.com/hc/en-us/articles/49470720823449-CLO-AI-Chat-History-Feature) appeared for “CLO AI,” demonstrating a genuine alternate entity. The live portfolio title/H1 currently leads with “CLO AI,” making the distinctive HeyClo association less prominent.

**Documented work.** Frontend / Framer Developer, animated landing-page implementation, scrolling/responsiveness/loading. The stack is Framer/Lenis-related; do not relabel it as Next.js implementation. The repository's Lighthouse claim needs a dated artifact and test conditions.

**Direction and query themes.** Primary: “HeyClo (CLO AI) Framer landing-page case study.” Support: HeyClo developer/portfolio, animated product-page design implementation, Framer motion/performance trade-offs. Official usage/pricing/account questions naturally favor the product website.

**Why it may already appear below the official site.** The user's reported ranking was **not independently verified**. The case has indexable HTML, the product name, a relevant canonical URL, an official-site link and a distinct contribution narrative. Those are plausible relevance/discovery ingredients, not proof of Google's reasoning. Appearing after the official product can be the correct result for navigational intent; the objective is useful exposure to people evaluating the implementation.

**Useful independent contribution.** Make HeyClo and the shipped version/timeframe explicit, and show one motion/responsiveness decision with evidence. Proposed title: “HeyClo (CLO AI): Framer Landing Page Case Study.” Use approved screenshots of the version worked on, since the official product can evolve.

**Priority/confidence/measurement:** P1 / high naming issue, low confidence about the cause of a specific rank. F03–F05/F14. GSC page-filtered queries for HeyClo, CLO AI and implementation modifiers; current controlled SERP observation if required.

### 6.6 Sound Of Meme — `/work/sound-of-meme`

**Identity and audience.** The [official music-generator page](https://soundofmeme.com/music-generator) and [developer-supplied App Store listing](https://apps.apple.com/us/app/sound-of-meme/id6737062886) support AI music creation. These sources do not prove Arun's engineering role.

**Documented work.** Lead Frontend Developer; React/Redux architecture, music player and generation interfaces, plus a claimed approximate bundle reduction from 8 MB to 2 MB. No before/after build artifact was available to establish metric definition or causation. The registry does not currently contain an official external URL.

**Direction and query themes.** Primary: Sound Of Meme React music-product/performance case study. Support: Sound Of Meme frontend developer/portfolio, music-player state management, lazy loading/code splitting, React bundle optimization. “Free AI music generator” primarily expects an operational product, not a portfolio.

**Useful independent contribution.** Supply a measurement note defining bundle/build/transfer size, dates and comparable conditions; explain one player-state or lazy-loading trade-off. Confirm that today's official site is the same product/version before adding a link. Do not convert a bundle claim into a claimed ranking, speed or revenue increase.

**Priority/confidence/measurement:** P1 / high evidence gap. F04–F05/F14. Metric verification and product+React/performance query themes; documented implementation outcomes only.

### 6.7 Samriddhi Interiors — `/work/samriddhi-interiors`

**Identity and audience.** The linked [Samriddhi Interiors website](https://www.samriddhiinteriors.com/) describes the client business. Search also surfaced a similarly named [Samriddhi Interio business](https://www.samriddhiinterio.com/). Do not merge these entities or infer a local address from name similarity.

**Documented work.** Freelance Frontend Developer; service/category presentation, portfolio sections and consultation-oriented website implementation. “200+ projects” and “8+ years” are client-business statements, not Arun's software delivery totals.

**Direction and query themes.** Primary: Samriddhi Interiors website development portfolio. Support: exact client/domain + developer/case study, interior-design service website UX, portfolio taxonomy, Next.js/Framer Motion implementation where the recorded stack applies. The official business should answer interior-project service inquiries.

**Useful independent contribution.** Identify the exact client domain, show how service categories and completed interior work were organized, and annotate a consultation entry path. Attribute business metrics to approved client copy. Category overlap with Rey9 is manageable: shipped client site versus clearly labeled interface demo.

**Priority/confidence/measurement:** P1 / high attribution issue, medium ambiguity interpretation. F03–F06/F14. Approved scope/claims and brand+website-development queries.

### 6.8 NursePhysioWala — `/work/nursephysiowala`

**Identity and audience.** Official [physiotherapy service](https://nursephysiowala.in/services/physiotherapy) and [professional onboarding](https://nursephysiowala.in/for-professionals) pages corroborate patient/practitioner audiences.

**Documented work.** Founder and Frontend Developer; patient booking, practitioner dashboards and administrator allocation/manual override workflows. Founder status is stated in the registry; independent ownership evidence was not obtained. A shorter “Frontend Developer” label elsewhere is not automatically contradictory.

**Direction and query themes.** Primary: NursePhysioWala booking-platform implementation/founder case study. Support: product + developer/portfolio, patient/practitioner dashboard UI, healthcare allocation workflow, recorded Next.js/Firebase implementation. Clinical service intent belongs on the official site.

**Useful independent contribution.** Explain allocation states, manual override and the exact frontend/server boundary with anonymized sample data. Show what was implemented versus designed or integrated. Do not expose patient information, invent medical outcomes or treat clinic trust signals as software results.

**Priority/confidence/measurement:** P2 / high content opportunity; ownership verification remains external. F04–F05/F14. Booking-product engineering queries, correct founder attribution and relevant inquiries.

### 6.9 Rey9 Living — `/work/rey9-living`

**Identity and audience.** The [linked demo](https://rey9living.vercel.app/) returned 200 with a modular-kitchens/interiors title. The exact-name search sample did not provide a reliable independent brand history; this is **not evidence of no demand or non-indexing**.

**Documented work.** A demo with generic Developer role, empty stack/how/challenge arrays and one broad contribution statement. The visible template already says Project overview when challenges are absent, but metadata still says Case Study.

**Direction and query themes.** Primary: Rey9 Living interiors-website UI prototype. Support: Rey9 portfolio/development demo, modular-kitchen website interface, materials/estimate UI only if that authored work is confirmed. It is not currently a substantiated production-success story.

**Useful independent contribution.** Align metadata and external CTA with demo status; add actual responsibility, verified tooling and one materials/estimate interaction decision if evidence exists. Keep the useful demo URL instead of inventing a client relationship or auto-noindexing it because it is short.

**Priority/confidence/measurement:** P2 / high. F03/F05/F06. Owner evidence, demo disclosure and relevant interface/prototype queries.

### 6.10 AI Case Calculator — `/work/ai-case-calculator`

**Identity and audience.** The [linked demo](https://aicasecalculator-iota.vercel.app/) returned 200 and describes legal case valuation. Searches also surfaced a separate [BetterClaims calculator page](https://www.betterclaims.com/claim/offers/c2.4/index.php?click_id=9fe85d0bd056f0c70de3e4ceb82a8fdd&offer=c2.4&xtm_offer=c2.4), so the descriptive phrase is not a unique brand. This comparison uses the search-accessible page extract; direct retrieval of its clean URL was unavailable.

**Documented work.** Developer/demo, sparse implementation detail, empty stack/how/challenge arrays and sample valuation/report presentation. The repository does not validate legal accuracy, an AI model or production settlement outcomes.

**Direction and query themes.** Primary: legal-tech case-calculator UI prototype. Support: AI Case Calculator portfolio/demo, legal-intake/report interface design, sample valuation UI implementation. “Calculate my settlement” is a different, higher-stakes intent that the portfolio should not promise to satisfy.

**Useful independent contribution.** Label sample/demo status conspicuously, describe input/error/report states and limitations, and distinguish UI work from any unverified backend/model. Proposed title direction: “AI Case Calculator: Legal-Tech UI Prototype.” Avoid fabricated technology keywords and results.

**Priority/confidence/measurement:** P2 / high scope/ambiguity finding. F03/F05. Demo disclosures and implementation-query relevance; legal/product claims require qualified owner verification.

## 7. Every other public page: intent and usefulness

The following is deliberately page-specific. Common metadata and crawl behavior is recorded in the CSV rather than repeated as a superficial “pass.” All proposed work remains unapplied.

### `/`

**Intent/audience:** Arun Acharya developer / Next.js freelancer portfolio; founders, hiring managers, business owners.

**Evidence:** Specific title but generic hero; 11+ products and 15+ clients are repository claims without supporting records; four visible capabilities differ from six schema services.

**Proposed remedy:** Keep the current canonical and identity title; make the hero supporting sentence explicitly identify Arun and his frontend/Next.js scope, substantiate counters, and align schema with four visible capabilities.

**Priority/confidence:** P1 / high. **Finding IDs:** F04 F06 F08. **Measure:** Name+expertise query/page performance and qualified inquiries; schema-to-visible-content comparison.

### `/about`

**Intent/audience:** Arun Acharya background and credited work; prospective clients and employers.

**Evidence:** Clear named H1 and role links; schema mentions all ten products as SoftwareApplication while the page features five; body concentrates on ChainReach.

**Proposed remedy:** Match mentions to visible evidence and appropriate types; describe actual responsibility boundaries and link the relevant dated experience rather than increasing keyword repetition.

**Priority/confidence:** P2 / high. **Finding IDs:** F06 F08. **Measure:** URL Inspection and name-query page distribution; compare entity claims against visible biography.

### `/work`

**Intent/audience:** Arun Acharya portfolio projects / frontend case studies; buyers checking relevant experience.

**Evidence:** All ten cases are crawlable; cards mix shipped work and demos, and some case labels omit category or recognizable product aliases.

**Proposed remedy:** Keep ten direct links; identify demo status and category in card copy and use HeyClo (CLO AI) consistently; do not add product-name URL duplicates.

**Priority/confidence:** P2 / high. **Finding IDs:** F03 F05. **Measure:** All ten targets remain one click from hub; project-modifier queries and qualified inquiry journeys.

### `/experience`

**Intent/audience:** Arun Acharya engineering experience; hiring managers and clients.

**Evidence:** Live HTML shows three project entries without contextual case-study links; local data has expanded entries and workSlug links.

**Proposed remedy:** Review existing local timeline and linked contributions for dates and role accuracy; after separately authorized publication verify relevant case links appear in HTML.

**Priority/confidence:** P1 / high. **Finding IDs:** F02 F04. **Measure:** Compare local versus deployed entry list and links; employer/name queries; manual evidence approval.

### `/services`

**Intent/audience:** Hire Arun / frontend and website services; buyers selecting a service.

**Evidence:** Live hub links six of nine service pages with repeated Explore this service anchors; local specialist links and named anchors cover all nine.

**Proposed remedy:** Review already-present local hub coverage and publish only under separate authorization; keep service distinctions explicit rather than making nine near-identical pitches.

**Priority/confidence:** P1 / high. **Finding IDs:** F02 F08. **Measure:** Nine unique service destinations from hub; service-query landing-page distribution.

### `/process`

**Intent/audience:** Arun project process / development handover; qualified prospects.

**Evidence:** Readable steps but largely promises rather than an example of milestone acceptance; local guide/FAQ links are not in live snapshot.

**Proposed remedy:** Keep concise steps and add an approved sample acceptance checklist or handover outline; verify the local resources/FAQ links when later published.

**Priority/confidence:** P2 / medium. **Finding IDs:** F02 F08. **Measure:** Process-to-contact journeys and whether inquiries contain required scope inputs.

### `/pricing`

**Intent/audience:** Arun website pricing / development packages; budget-qualified clients.

**Evidence:** Three starting packages have currency labels and scope links; live anchors repeat Explore package; price registries are separate from detailed proposal packages.

**Proposed remedy:** Use named package links already present locally; reconcile data/seo.ts summary prices and data/service-proposals.ts comparable package scope before any price edit.

**Priority/confidence:** P2 / high. **Finding IDs:** F02 F08. **Measure:** Cross-check matching scopes, displayed currency and minimum prices; qualified inquiries, not raw visits.

### `/faq`

**Intent/audience:** Arun availability / pricing / remote work FAQ; prospective clients.

**Evidence:** Readable FAQ and matching FAQPage; no live contextual incoming links under this methodology; local remote-collaboration link exists.

**Proposed remedy:** Retain useful answers, validate availability and price claims against current business policy, and use approved contextual links; do not expect Google FAQ rich results.

**Priority/confidence:** P2 / high. **Finding IDs:** F02 F06. **Measure:** Answer accuracy and navigation tests; hiring-query performance; no FAQ-rich-result KPI.

### `/blog`

**Intent/audience:** Website planning and frontend implementation guides; founders planning development work.

**Evidence:** Only one discovered live incoming page (/resources); H1 calls articles Practical SEO content rather than stating reader value.

**Proposed remedy:** Verify existing local Blog navigation and article return links after authorized release; recast index intro around project planning and implementation guidance.

**Priority/confidence:** P1 / high. **Finding IDs:** F02 F09. **Measure:** Blog depth becomes one via nav; all eight articles retain crawlable links; editorial-query impressions.

### `/blog/author/arun-acharya`

**Intent/audience:** Arun Acharya articles and expertise; readers checking author experience.

**Evidence:** ProfilePage links stable Person; visible intro says so Google can understand and labels Author entity / Project authority; featured projects selected by array position.

**Proposed remedy:** Replace search-engine-facing explanation with a concise reader-facing bio and select project evidence relevant to the actual articles; maintain same Person ID.

**Priority/confidence:** P2 / high. **Finding IDs:** F09. **Measure:** Human review of bio and supporting case links; author-query URL Inspection and page performance.

### `/locations`

**Intent/audience:** India-based remote web developer; international and indian clients.

**Evidence:** Live page has zero incoming links but is in sitemap; it explicitly describes service markets, not local offices.

**Proposed remedy:** Verify already-added local links from contact, FAQ and about; keep a single useful remote-work page and the city redirects; do not manufacture office pages.

**Priority/confidence:** P1 / high. **Finding IDs:** F02. **Measure:** At least two appropriate contextual sources after authorized release; reachable depth; URL Inspection canonical/index state.

### `/resources`

**Intent/audience:** Website planning resources / cost and scope; founders comparing scope.

**Evidence:** Lists all eight articles, overlapping /blog, but has a distinct cost-planner lead section.

**Proposed remedy:** Keep this page focused on planning actions and the cost tool; keep /blog as editorial index; avoid duplicating both intros or canonicalizing genuinely different hubs together.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08. **Measure:** Compare resources vs blog query intent, clicks into planner and qualified briefs.

### `/tools/website-cost-planner`

**Intent/audience:** Website cost and scope planner INR USD; clients preparing a budget and brief.

**Evidence:** Default scope and labels are in initial HTML; changing package/currency requires JavaScript; price content also exists on service URLs.

**Proposed remedy:** Keep canonical unparameterized and service pages as full crawlable price references; validate all nine selections and currency assumptions in a future UI QA session, not by generating duplicate pages.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08 F12. **Measure:** Read-only UI QA of all states; genuine submitted briefs and consented lead tracking; no fake leads.

### `/contact`

**Intent/audience:** Contact Arun Acharya developer; qualified prospects.

**Evidence:** HTML includes a labelled inquiry form and next steps; delivery endpoint was deliberately not exercised; local remote-work link not live.

**Proposed remedy:** Retain short conversion copy; verify local remote-work link later and audit delivery/log evidence from a genuine inquiry, not test submissions to production.

**Priority/confidence:** P1 / medium. **Finding IDs:** F02 F12. **Measure:** Genuine successful submissions versus delivered emails and consented generate_lead; spam/failure exclusion.

### `/privacy`

**Intent/audience:** Arun portfolio privacy policy; visitors checking data handling.

**Evidence:** Purpose-appropriate readable copy; no route-specific JSON-LD is necessary; live analytics admin settings were not accessible.

**Proposed remedy:** Keep policy synchronized with actual consent, retention and analytics settings; no content expansion or noindex needed purely because it is not a sales page.

**Priority/confidence:** P3 / medium. **Finding IDs:** F12. **Measure:** Owner verifies policy against GA4 settings and retention process; no ranking KPI.

### `/services/landing-pages`

**Intent/audience:** Hire landing page developer; founders launching one offer.

**Evidence:** Specific packages and outcomes; shares broad conversion language with business websites; existing HeyClo evidence is more specific than generic claims.

**Proposed remedy:** State one-offer boundaries and link HeyClo's verified landing-page scope as evidence; distinguish implementation deliverables from promised conversion lifts.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08 F04. **Measure:** Landing-page hire queries and qualified inquiries; compare with small-business service overlap.

### `/services/frontend-development`

**Intent/audience:** React / Next.js frontend freelancer; teams with design or backend already defined.

**Evidence:** Clear frontend intent; local hub link exists but live six-card hub omits this exact service; strongest proof is role-based interfaces.

**Proposed remedy:** Surface local specialist link later; state API/design prerequisites and reference documented ChainReach/Transcendence frontend boundaries.

**Priority/confidence:** P2 / high. **Finding IDs:** F02 F08. **Measure:** Hub coverage; frontend hire query-page mapping and proposals matched to scope.

### `/services/small-business-websites`

**Intent/audience:** Small business website developer; service businesses.

**Evidence:** Strong packages; naturally overlaps pricing and website cost guide; healthcare/interiors proof exists but no measured lead uplift.

**Proposed remedy:** Keep transactional focus, use Pivotal/Samriddhi site-journey evidence and explain content ownership, enquiry setup and exclusions instead of generic conversion promises.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08 F04. **Measure:** Business-website service queries vs informational cost-guide queries; qualified leads.

### `/services/frontend-revamp`

**Intent/audience:** Frontend revamp / redesign freelancer; owners of existing products.

**Evidence:** Appropriate preserve-what-works positioning; broad UX/performance language overlaps two other services.

**Proposed remedy:** Specify audit-to-revamp acceptance checks including URL preservation and rollback; link the revamp checklist and refer performance-only requests to that service.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08. **Measure:** Query overlap with UI/UX and performance services; intent-matched inquiry routing.

### `/services/ui-ux-design`

**Intent/audience:** UI UX design / Figma-to-React help; founders needing clarity before development.

**Evidence:** Distinct design packages but generalized claims; portfolio evidence mostly implementation, not published research or usability results.

**Proposed remedy:** Show an approved flow/design artifact and exact design-versus-build deliverables; avoid implying user research or measured usability improvements without evidence.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08 F04. **Measure:** Design-specific query engagement, scope-qualified inquiries, artifact provenance review.

### `/services/api-development`

**Intent/audience:** API development support for startup apps; founders needing backend work.

**Evidence:** Service claims APIs/auth/backend; cited portfolio evidence frequently describes frontend API integration, which is not equivalent backend authorship.

**Proposed remedy:** Explicitly distinguish integration from backend implementation; add a sanitized endpoint/auth contract only from work actually authored, or narrow service proof accordingly.

**Priority/confidence:** P1 / high. **Finding IDs:** F04 F08. **Measure:** Owner evidence review before claims; API-vs-integration query distribution and qualified proposals.

### `/services/web-apps-saas`

**Intent/audience:** Web app and SaaS developer; teams commissioning production workflows.

**Evidence:** Broad workflow scope shares language with MVP; multi-role frontend examples alone do not prove complete backend ownership.

**Proposed remedy:** Define production workflow scope and backend dependencies; separate proven frontend work from full-stack examples such as documented NursePhysioWala responsibilities.

**Priority/confidence:** P1 / medium. **Finding IDs:** F04 F08. **Measure:** Role/scope validation; SaaS transactional query-page matching and project fit.

### `/services/performance-optimization`

**Intent/audience:** React Next.js performance optimization freelancer; owners with slow interfaces.

**Evidence:** Only two live contextual incoming sources; Sound Of Meme claim lacks measurement artifacts; service promises should remain diagnostic, not guaranteed scores.

**Proposed remedy:** Use repeatable, approved before/after evidence and maintain contextual case/guide links already mapped locally; distinguish audit deliverables from universal score guarantees.

**Priority/confidence:** P2 / high. **Finding IDs:** F02 F04 F11. **Measure:** Incoming link review; same-condition metric comparison when authorized; performance-service inquiries.

### `/services/product-mvp-development`

**Intent/audience:** MVP developer for founders; early-stage founders.

**Evidence:** Only two live incoming sources; generic overlap with SaaS and prototypes; useful package scopes already present.

**Proposed remedy:** Make hypothesis, first workflow, exclusions and handover explicit; link only cases that demonstrate the promised scope and label prototypes accurately.

**Priority/confidence:** P2 / medium. **Finding IDs:** F02 F05 F08. **Measure:** MVP versus SaaS query separation and inquiries with testable scope.

### `/blog/physiotherapy-website-booking-brief`

**Intent/audience:** Physiotherapy website design brief; healthcare practice owners.

**Evidence:** Useful four-section guide differentiates request from booking and avoids claiming measured lead uplift; clinical claim approval remains necessary.

**Proposed remedy:** Preserve explicit evidence caveat; add an approved blank booking brief or annotated enquiry journey if available, and link only verified clinical sources for medical claims.

**Priority/confidence:** P2 / high. **Finding IDs:** F08. **Measure:** Informational design-brief queries and clicks into Pivotal/service/planner; practice review.

### `/blog/saas-dashboard-development-scope`

**Intent/audience:** SaaS dashboard development scope; founders hiring frontend teams.

**Evidence:** Concrete multi-role acceptance checks and API boundaries; stronger than generic guide; a worked example is still prose-only.

**Proposed remedy:** Add an approved sample role-action/state matrix grounded in ChainReach scope, not invented customer data; keep commercial service separate.

**Priority/confidence:** P2 / high. **Finding IDs:** F05 F08. **Measure:** Dashboard planning queries and qualified briefs; matrix source approval.

### `/blog/react-nextjs-performance-audit-brief`

**Intent/audience:** React Next.js performance audit brief; buyers considering rebuilds.

**Evidence:** Clearly separates field/lab and React/Next; repeats unverified 8 MB to 2 MB historical claim from project.

**Proposed remedy:** Link a reproducible approved measurement artifact or keep clearly attributed historical claim with measurement limitations; maintain official metric references.

**Priority/confidence:** P1 / high. **Finding IDs:** F04 F11. **Measure:** Metric-definition check, performance guide queries, clicks to scoped audit service.

### `/blog/small-business-website-cost-and-scope`

**Intent/audience:** Small business website cost and scope; small-business decision makers.

**Evidence:** Cost-led title but brief text mostly explains scope and routes toward packages; no worked cost composition.

**Proposed remedy:** Add a worked example using Arun's current published package with explicit inclusions/exclusions and date; do not present it as a market-wide price benchmark.

**Priority/confidence:** P2 / high. **Finding IDs:** F08. **Measure:** Cost queries land here vs hire queries on service; planner transitions and currency accuracy.

### `/blog/frontend-revamp-checklist`

**Intent/audience:** Frontend revamp checklist; owners planning a redesign.

**Evidence:** Useful headings but high-level checklist; statement that AI surfaces reward pages is broader than evidence supports.

**Proposed remedy:** Turn URL/status/canonical preservation into concrete acceptance checks and qualify AI claims; link performance guide for measurement details rather than duplicating it.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08 F10. **Measure:** Checklist query performance; approved example URL mapping; editorial evidence review.

### `/blog/ui-ux-before-rebuild`

**Intent/audience:** UI UX planning before website rebuild; founders deciding project sequence.

**Evidence:** Very broad principles overlap revamp article; no specific flow decision or design artifact demonstrated.

**Proposed remedy:** Show one documented before/after journey decision with constraints and acceptance criteria; keep this article about decision-making, not a duplicate revamp checklist.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08. **Measure:** UI UX planning query separation and service-fit inquiries; artifact approval.

### `/blog/api-development-for-startup-web-apps`

**Intent/audience:** Startup API planning / role and response states; nontechnical founders.

**Evidence:** Generalized auth/API guidance; frontend examples do not prove backend ownership.

**Proposed remedy:** Add a sanitized illustrative request/error/permission contract clearly marked as an example, and distinguish tutorial advice from completed backend contributions.

**Priority/confidence:** P2 / high. **Finding IDs:** F04 F08. **Measure:** API planning informational queries and appropriate service referrals; technical review.

### `/blog/landing-page-vs-website-vs-web-app`

**Intent/audience:** Landing page vs website vs web app; founders selecting scope.

**Evidence:** Useful three-way distinction, but no compact side-by-side scope example; same package context also appears on resources/pricing.

**Proposed remedy:** Provide a small comparison of one-offer, multi-page, and authenticated-workflow requirements using published scope assumptions; preserve each route's distinct intent.

**Priority/confidence:** P2 / medium. **Finding IDs:** F08. **Measure:** Comparison queries and downstream planner/service choices; no search-volume assumption.

## 8. Structured data and entity accuracy

**[L]** Every JSON-LD block encountered on the 42 public pages parsed successfully. This is JSON syntax validation, **not a passed Rich Results Test or complete Schema.org vocabulary validation**. No manual action, rich-result eligibility or actual enhancement appearance was verified.

| Surface | Observed implementation | Assessment / proposed handling |
|---|---|---|
| Every public page | Root Person, WebSite and ProfessionalService with stable IDs | Repeating the same referenced entity across pages is not inherently a duplicate-entity problem. Confirm the freelance studio representation is accurate; do not invent a separate incorporated business or physical offices |
| Homepage | ProfilePage, work ItemList, service ItemList, BreadcrumbList | Profile/Person linkage is coherent. Service ItemList describes first six registry services while four different capability cards are visible; align to the actual displayed set (F06) |
| About | AboutPage with Person mainEntity and product mentions | All ten products are modeled as SoftwareApplication while five are featured; reconcile visible mentions and types, using stable references rather than loosely repeated product objects (F06) |
| Work hub | ItemList of ten cases | Useful navigation representation; distinguish the case-study document from the product described |
| Every case | SoftwareApplication, Role/contributor, founder-only creator, BreadcrumbList | Role qualification is a legitimate schema pattern. The problem is blanket product typing and using the case URL as the software entity's URL, particularly for business websites/demos |
| Services | Service, offers, FAQPage, BreadcrumbList | Service descriptions match the purpose broadly; retain actual deliverables/prices and verify provider/scope accuracy. These objects are not a promise of a Google service rich result |
| Pricing | OfferCatalog with USD starting prices | Visible USD and INR values are present. Label the scope/starting-price interpretation accurately and reconcile registries; do not add aggregate ratings or invented availability |
| Blog index/articles | Blog/BlogPosting summaries; Article, Person author, dates | Appropriate content relationship. Dates must reflect actual publication/substantive updates, not artificial freshness |
| Author | ProfilePage referring to the root Person | Correct shared identity; reader-facing author content needs improvement (F09) |
| FAQ | FAQPage matching visible questions/answers | Useful human answers remain valuable. Do not budget work around a Google FAQ rich-result benefit |
| Contact/privacy | Root entities, no special page schema | Not a missing-schema failure; additional markup is optional and must have a real semantic purpose |

The intermediate `Role` pattern in `lib/seo.ts` should not be called invalid merely because it is not a direct Person value; Schema.org explicitly supports relationship qualification. [Schema.org Role](https://schema.org/Role).

**Proposed case model (F06):** represent the portfolio document as a WebPage/CreativeWork, or an Article only where the content genuinely functions as one, authored by Arun and about the separate product/website. Link the product to its verified official URL and preserve the documented contributor role. Use SoftwareApplication for an actual application, not every business site. Treat founder ownership as a fact requiring approval, not an automatic license to claim sole implementation. No special “CaseStudy” markup is required to rank.

Keep stable Person/WebSite IDs, an accurate profile URL and factual sameAs links. A proper portrait could make Person imagery more representative than the generic OG banner, but there is no demonstrated indexing block from the current image. Do not add credentials, client reviews, awards, organization addresses or star ratings without evidence.

For ProfessionalService, absence of a physical address is **not** a reason to manufacture one. This remote freelancer's service-area description explicitly disclaims local offices. A schema-validator review can determine whether properties such as availableLanguage belong on a more suitable contact/service node; no unsupported property warning was fabricated here.

Google requires structured data to accurately represent page content; successful JSON parsing alone is insufficient. [Google structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

**Current FAQ guidance:** Google's official changelog says FAQ rich results stopped appearing from 7 May 2026, with documentation removed in June. Do not use obsolete claims that adding FAQ schema will win a portfolio expanded result. Existing honest markup need not be treated as harmful merely because that feature is retired. [Google Search documentation updates](https://developers.google.com/search/updates).

## 9. AIO, GEO and answerability

AIO/AEO/GEO here means accurate retrieval, understandable evidence and correct attribution across AI-powered discovery—not a separate guaranteed ranking mechanism.

**What is already useful [R+L]:** readable HTML, stable canonical URLs, specific role blocks on several projects, authored guides, official product links, structured identity references and brief question/answer sections. An AI system can extract these, but no current citation or answer accuracy was measured.

**Concrete problems:**

- **Role/product conflation:** metadata generated from product features can turn a frontend contribution into apparent product ownership (F03).
- **Conflicting supplemental language:** `app/llms.txt/route.ts` tells systems to avoid sole-builder claims unless a case says “founder, lead, or built from scratch.” Being a lead does not establish sole authorship. The file repeats projects/topics and contains citation preferences rather than only factual summaries (F10).
- **Entity ambiguity:** HeyClo/CLO AI, generic Transcendence, two similarly named interiors businesses and the calculator demo need explicit context (F03).
- **Unqualified results:** repeated numeric claims can spread without their measurement limitations (F04).
- **Author copy about search engines:** the author page explains what Google should understand instead of giving readers useful credential context (F09).

**Proposed handling:** maintain one concise, approved description of each project's identity, role, contribution boundaries and canonical case URL in visible content. If retaining llms.txt, summarize that same evidence and remove language implying the file can instruct ranking/citation behavior. Do not publish hidden keyword lists, claim guaranteed citations, create duplicate brand-spelling pages or generate generic Q&A at scale.

Google says ordinary SEO fundamentals apply to its AI features; pages need indexing and snippet eligibility, and no special AI file or schema is required. Its AI traffic is included in Search Console's Web performance totals, not reliably separable into a dedicated per-answer report there. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features). Google's June 2026 clarification also states llms.txt does not positively or negatively affect Google visibility/rankings. [Official changelog](https://developers.google.com/search/updates).

Those statements are about Google; do not extrapolate identical ingestion or reporting behavior to every AI provider. robots.txt does not currently disallow ordinary public content, but hosting-level bot access and each engine's retrieval coverage remain unknown.

### Proposed reproducible AI visibility benchmark — not executed

Use a small fixed question set and record engine, date, locale/account context, exact prompt, answer, cited URLs and attribution errors. Example questions:

- “Who is Arun Acharya and what frontend work has he done?”
- “What did Arun Acharya implement for HeyClo?”
- “Who developed the public website for ProofCohort?”
- “Show a developer case study of multi-role campaign dashboard UI.”
- “Is Rey9 Living in Arun's portfolio a demo or a shipped client project?”
- “What evidence supports the Sound Of Meme performance claim?”

Judge **correct attribution**, **relevant citation**, **source URL**, and **whether the answer invents outcomes** separately. Do not count an uncited name mention as a source citation or a referral click. Use repeated observations rather than claiming stable AI rankings. F03–F05/F10 define the content changes to test; F12 defines the measurement dependency.

## 10. Performance, images, semantics and conversion measurement

### What was actually inspected

**[R]** Next/Image is used on project cards and case previews. Fill images have reserved aspect-ratio containers; absent width/height HTML attributes on a fill image are not by themselves a CLS defect. Homepage decorative artwork has empty alt and explicit dimensions; that is appropriate for decoration. Case previews have descriptive product-name alt text and captions, but generally show only one image rather than annotated implementation evidence. Heading outlines are in the CSV; all 42 pages contain one H1 and a readable hierarchy. No canvas-only primary explanation was found.

Smooth scrolling checks reduced-motion preferences. Forms and the cost planner have labels/field grouping in source. These are positive observations, **not a completed accessibility or keyboard audit**. Future F11/F14 checks must inspect actual mobile layout, focus, errors, reduced motion and image loading. No screenshot comparison or all-state interactive audit was performed here.

**[L]** All 11 distinct OG image URLs returned 200, and image bytes decoded successfully. Raw public-file sizes, not browser-optimized transfer sizes:

| Asset | Actual format / dimensions | Raw bytes |
|---|---|---:|
| `og-image-light-v2.jpg` | JPEG, 1200×630 | 169,629 |
| `transcendence-thumbnail.webp` | WebP, 1280×720 | 29,908 |
| `proofcohort-thumbnail.webp` | WebP, 1275×717 | 57,582 |
| `chainreach-thumbnail.png` | JPEG bytes, 1425×891 | 75,788 |
| `pivotal-physiocare-thumbnail.png` | JPEG bytes, 1425×891 | 121,073 |
| `clo.png` | PNG, 1901×936 | 833,369 |
| `soundofmeme.png` | PNG, 1440×900 | 425,598 |
| `samriddhi.png` | PNG, 1440×900 | 1,332,873 |
| `nurse.png` | PNG, 1440×900 | 975,144 |
| `rey9-living-thumbnail.webp` | WebP, 1274×717 | 51,460 |
| `ai-case-calculator-thumbnail.webp` | WebP, 1280×720 | 47,978 |

Large raw PNGs are a social-crawler and asset-efficiency opportunity, not proof of poor LCP: page rendering can use optimized Next/Image responses. Two .png filenames contain JPEG bytes; decoding succeeded, so no broken-image claim is warranted. Verify Content-Type and preview behavior before changing URLs. Work OG metadata omits dimensions; adding actual dimensions can improve predictability but is not a ranking requirement. Shared banner images on non-work pages are not an indexing defect.

HTML responses ranged from approximately 56.5 KB to 167.5 KB uncompressed. This includes framework payload and schema; it does not establish transmitted JavaScript weight, LCP, INP, CLS or hydration cost. Large dependencies in package.json do not prove all are shipped to every route. The legacy Three.js code must not be blamed without a bundle/route trace.

### Performance data limitation and precise next test

`docs/seo-measurement.md` records a **12 October 2026 historical mobile lab** result: performance 92, LCP 2.9 s, TBT 80 ms, CLS 0, before analytics was added and with insufficient CrUX data. This is a repository record, not a fresh audit measurement; a Lighthouse SEO score of 100 cannot prove indexing or rankings.

F11: obtain current mobile/desktop PageSpeed/CrUX data for `/`, one image-heavy case (Samriddhi or HeyClo), one service detail and the planner; investigate waterfall/JS/interaction traces only where measured issues appear. If origin/URL field data is insufficient, say so rather than passing CWV. Test consenting and non-consenting sessions separately because analytics loads conditionally. Core Web Vitals should be evaluated with real-user LCP, INP and CLS; Google's targets are approximately 2.5 s, 200 ms and 0.1 respectively, not a guarantee of ranking. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

### Analytics and qualified leads

**[R]** `lib/analytics.ts` and `AnalyticsConsent.tsx` restrict analytics to the canonical production host after consent, remove query/hash information from page locations and reduce referrer values to origin. `lib/submit-project-inquiry.ts` sends a lead event after a successful submission response. Separate session attribution supplies first-touch context to inquiries. No personal form values are intentionally included in these analytics payloads.

**[U]** Current GA4 admin configuration, event delivery, consent rates, campaign attribution accuracy, real inquiries and conversion rates were not verified. The existing measurement document's account IDs/settings are documentation, not account-access evidence.

F12: owner verifies page-view deduplication and key-event settings with read-only report/debug evidence, then reconciles the next **genuine** successful inquiry with delivery and consented analytics. Consent loss/ad blockers naturally make counts differ; that is not automatically a bug. Check whether intentional query stripping affects campaign attribution before changing the privacy design. Do not send fake production leads or reconfigure analytics during an audit.

## 11. Prioritized remediation register

The page CSV supplies route-specific observations and remedies. This register supplies shared implementation boundaries, expected effect, confidence and verification dependencies. None of these changes was implemented.

| ID | Priority / confidence | Affected route, file or surface | Observed evidence and why it matters | Precise proposed remedy | Measurement / dependency |
|---|---|---|---|---|---|
| F01 | P1 / high destination finding, medium current-profile finding | External LinkedIn portfolio field; `lib/site.ts` sameAs identity | Search-accessible profile lists old Vercel portfolio; destination currently returns another person's title. Could misdirect prospects and confuse identity | Owner checks current authenticated profile; if still present, replace only that field with canonical www site. Confirm control before touching any old deployment | Current profile screenshot, outbound-link destination check, name-query observations. Separate external-write approval required |
| F02 | P1 / high | `/locations`, `/blog`, `/services`, `/experience`; files in local/live table | Live orphan and weak hubs; local linking changes already exist. Discovery paths do not match intended local architecture | Review existing diffs and scope accuracy; after a separately approved release, recrawl and verify Blog nav, remote-work links, all nine services and relevant related-case maps | Zero intended orphans; Blog depth one; 9/9 hub targets; no broken targets. Depends on approved deployment, not new audit code |
| F03 | P1 / high | `app/work/[id]/page.tsx`, `data/work-projects.ts`; especially HeyClo, ProofCohort, demos | Generic shortName title and feature-derived contribution description create ambiguity/overclaim risk | Allow accurate per-case title/description or derive from approved contribution summary; label aliases, categories and demos naturally, keeping URLs stable | Compare raw HTML/OG/body consistency; GSC page+query themes and title/snippet observations. Owner approves role facts |
| F04 | P1 / medium-high | Homepage proofMetrics, project outcomes, performance guide, API/SaaS service proof | 11+ products/15+ clients, bundle/Lighthouse and client-business claims lack audit artifacts; frontend integration may be read as backend ownership | Define each metric and scope/date; retain supporting records or qualify/remove unsupported claims; distinguish client-business facts and product features from Arun's contribution | Evidence checklist and client permission; approved wording across visible/schema/llms. No invented replacements |
| F05 | P2 / high | All ten work pages; `WorkPages.tsx`, `data/work-projects.ts` | One preview each; two demos have empty method/challenge/stack fields; several stories lack an inspectable implementation artifact | Add the specific approved artifact/decision identified per case, not a word-count target. Keep demo/project-overview labeling when evidence is limited | Role/method/artifact review and query-intent fit; project-qualified inquiries. Access to approved artifacts required |
| F06 | P2 / high | `lib/seo.ts`, `app/page.tsx`, `app/about/page.tsx`, service/work schema | JSON parses, but service list visibility and blanket SoftwareApplication modeling are imprecise | Align listed items to visible content; separate case document from product/website; preserve stable Person and legitimate Role pattern; validate vocabulary and applicable Google features | Schema.org validator and Rich Results Test where supported; side-by-side visible-content audit. No rich-result promise |
| F07 | P2 / high | `lib/seo.ts:createPageMetadata`, root metadata | Explicit undefined robots key clears root directives in installed 14.1.4; no public noindex observed, but preview policy is lost | Omit the property for ordinary pages or deliberately merge the full root policy; maintain intentional noindex separately | Final HTML on home/work/service/blog includes intended policy, with no conflicting tags; version-specific regression test in later implementation |
| F08 | P2 / medium | Services, resources/blog, cost/pricing, older guides | Overlapping purposes and generic claims can weaken usefulness; no measured keyword cannibalization established | Keep owner/home, transactional services, budget tool, editorial guides and case evidence distinct; make the concrete additions in each CSV row | GSC query-to-page matrix before/after; qualified inquiry fit and planner usage. Do not merge/noindex without query evidence |
| F09 | P2 / high | `app/blog/page.tsx`, `app/blog/author/arun-acharya/page.tsx` | “SEO content,” “Author entity,” and Google-facing intro reduce reader relevance | Use a reader-facing guide-index description and concise bio tied to selected genuine work; replace array-order proof selection with relevant evidence | Editorial review and working byline/evidence links; author/blog query relevance. No new credential claims |
| F10 | P2 / high | `app/llms.txt/route.ts`; overly broad AI statements in guides | Supplemental instructions can imply sole authorship from lead status and promise citation behavior | Synchronize concise factual roles/URLs with visible text; remove ranking/citation-control language and unjustified sole-builder inference | Claim parity checks and repeatable AI answer-attribution sample. llms.txt use by engines remains unverified |
| F11 | P2 / unknown performance impact | Active homepage, image-heavy case, service detail, planner; shared client providers | No current field or diagnostic lab result; historical baseline predates analytics | Measure representative production pages before changing bundles/animations; investigate only demonstrated bottlenecks and test responsive/keyboard/reduced-motion behavior | Current CWV/PSI and controlled traces; distinguish field vs lab and no-data states. Further tests may generate artifacts, requiring a separate scope |
| F12 | P1 / high evidence-access gap | GSC, GA4, host logs, inquiry delivery; analytics files | Connector blocked; no authenticated current report; code cannot establish indexed/traffic/lead states | Obtain the read-only evidence listed below; reconcile genuine inquiries and consent-aware counts before ranking or conversion claims | Report exports/date/property scopes; actual URL Inspection and query/page trends. Account access required; no settings changes authorized |
| F13 | P3 / high | `/sentry-example-page`, robots, unknown-route fallbacks | Test page has noindex plus crawl disallow; unknown pages return 404 with inherited metadata | If test route is unnecessary, propose removal in a separate change; otherwise ensure chosen noindex can be observed if deindexing is needed. Keep real 404s; clean fallback canonical/directive inconsistency only after full response check | GSC examples/URL Inspection for test route; fresh missing-route HTTP and all-meta checks. Not a public content blocker |
| F14 | P2 asset efficiency / high; ranking impact unknown | Raw case PNGs, `WorkPages.tsx`, `lib/seo.ts` OG image fields | Four raw PNGs are 0.43–1.33 MB; OG images bypass ordinary browser image optimization. Preview-only alt text gives limited implementation context | Consider optimized approved source assets and actual OG dimensions; retain resolution and add specific captions for any annotated artifact; verify filename/MIME alignment before changing paths | Raw/optimized transferred bytes, screenshot readability, social preview tests and LCP traces. Preserve URLs or plan replacements carefully |
| F15 | P3 / medium | `data/seo-content.ts`, `app/sitemap.ts`, blog Article/OG dates | Dates are manually maintained; local article edits exist; non-article lastmod is omitted | Review dateModified when content changes substantively; keep visible/Article/OG/sitemap dates aligned. Do not auto-update dates on deploy or for trivial edits | Compare approved editorial history to all emitted date fields. No invented freshness or required lastmod for every page |

### External identity finding F01: exact evidence

The search-accessible [LinkedIn profile](https://www.linkedin.com/in/arunacharya1603) listed `https://portfolio-phi-eight-47.vercel.app/` as Portfolio. That destination was fetched directly during this audit and returned 200 with title “Minhal Ahmed | Full-Stack Web Development Student,” without an observed canonical or X-Robots-Tag in the sampled response. The profile extract was crawled months earlier, so the **current authenticated profile field must be checked before concluding it is still wrong**. This is not evidence that Arun owns the destination, that it was compromised, or that a redirect can safely be configured.

Same-name search results include a [Deakin researcher profile](https://experts.deakin.edu.au/71541-arun-acharya). Its relationship to this portfolio owner was not verified. This supports using consistent developer context, verified profiles and domain links, not inventing credentials or merging identities based on name alone.

## 12. Required external validation and measurement plan

| Report / evidence | Exact question it answers | How to interpret it |
|---|---|---|
| GSC **Pages Indexing** | Which submitted canonical URLs are excluded, and under what reason/date? | Export affected URLs and separate redirects/duplicates from desired content. “Not indexed” is not necessarily an error |
| GSC **URL Inspection**, indexed result plus live test | Google-selected vs user-declared canonical, last crawl, fetch/robots/indexing status, rendered content | Inspect home, HeyClo, ProofCohort, /locations, one service, one blog and any failing examples; expand to all 42 if needed. A live test is not proof of indexing |
| GSC **Sitemaps** | Is the canonical sitemap fetched successfully, when, and with how many discovered URLs? | Compare with current 42 entries; submitted/discovered counts do not equal indexed counts |
| GSC **Performance → Search results → Web** | Name, product, modifier and nonbrand impressions/clicks/CTR/position by landing page | Filter individual canonical page and query; compare country/device/date. Average position is not a fixed rank or guaranteed opportunity |
| GSC **Crawl Stats** | Host availability, response codes, fetch volume/timing and crawler examples | Use actual failure patterns/logs to investigate infrastructure; do not infer a crawl-budget crisis from 42 pages |
| GSC **Core Web Vitals** | Real-user URL groups and status | Distinguish insufficient data from good results; validate representative URLs and device groups |
| GSC **Manual Actions** and **Security Issues** | Is an explicit penalty/security warning reported? | No evidence currently obtained. Check before claiming a penalty or asserting none exists |
| GA4 reports / read-only event evidence | Consented organic sessions and genuine lead-event behavior | Check route navigation deduplication, consent boundaries and campaign behavior; do not equate GA sessions with GSC clicks |
| Hosting access logs / deployment history | Googlebot requests, status trends, firewalls, current deployment identity | Verify bots legitimately; inspect logs for intermittent failures not visible in this sample |
| Owner/client records | Role, metric definitions, dates, client permissions and artifacts | Required before strengthening contribution or results claims; reliable product sources alone do not prove authorship |

Use a **baseline before any later publication**. Segment queries into owner identity, each exact product name, product + implementation modifiers, transactional services and informational planning. Preserve spelling variants within the same theme rather than creating duplicate pages. Explicitly examine pages that compete for the same query before calling it cannibalization.

A practical review cadence is a comparable 28-day period after Google has had an opportunity to recrawl, followed by a longer trend review if data is sparse. This is a measurement window, **not an indexing or ranking deadline**. Record releases, content changes and seasonality; do not attribute all movement to one edit. Track qualified inquiry fit and delivered leads separately from raw clicks and AI mentions.

### Acceptance criteria for a future, separately authorized implementation

1. Only approved changes are made; existing user work is preserved.
2. The 42 intended content routes remain 200 with correct self-canonical metadata; invalid routes remain genuine 404s and intended redirects remain redirects.
3. No intended content page is orphaned; Blog and all services are reachable through appropriate hubs; related project links are relevant.
4. Titles and descriptions reflect actual contribution, product identity and demo status, not merely feature lists.
5. Numeric claims have supporting records or explicit limitations; visible content, schema and llms summaries agree.
6. A current field/lab measurement is recorded without claiming a pass when data is unavailable.
7. Actual Search Console reports distinguish indexed, excluded, redirected and unknown URLs; no invented ranking outcomes.
8. No expectation is set that a portfolio must outrank official products for navigational queries.

## 13. Final audit conclusion

The site has a sound technical discovery foundation in the inspected production snapshot. The best-supported constraints are **an external identity-link problem requiring confirmation, unpublished internal-link improvements, ambiguous case-study naming, attribution/evidence weaknesses, and lack of authenticated measurement data**.

There is one specific metadata inheritance defect, but it is **not a site-wide noindex problem**. There are image/schema/content refinements, but no evidence that adding more schema or repeating keywords will force rankings. Prioritize clear, defensible implementation stories and qualified client intent while measuring what Google actually does.

Final integrity checks: all 42 CSV routes are unique, all 42 source paths exist, all rows contain a proposed remedy, and the CSV has 51 columns. SHA-256 comparison of 145 pre-existing audited files found no changes during this audit. Existing user changes remain untouched. No new build was run.

This audit changed documentation only. It does not declare Google indexing resolved, promise first-place rankings, or imply the proposed fixes have been published.
