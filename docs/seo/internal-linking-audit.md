# Internal linking audit

Date: 2026-10-23

Site: https://www.arunacharya1603.in

Mode: site-structure-optimizer / linking

Scope: existing public pages and internal links. Local implementation only; do not push.

## Evidence and method

**Measured:** a fresh Next.js 14 App Router production build, its prerender manifest, sitemap output and all 42 generated public HTML pages. The inventory is 15 base pages, 10 project pages, 9 service pages and 8 articles. Dynamic slugs come from local TypeScript data; there is no CMS, pagination, locale routing or authenticated page inventory in these routes.

Parse rendered anchor elements, excluding scripts (including JSON-LD and React payloads). Resolve relative URLs against the canonical origin; count non-www addresses as internal but flag them for redirect checking. Preserve query strings and fragments for target checks; use the pathname for the page graph. Separate same-page anchors from cross-page edges. A unique incoming link source is a distinct source page, not repeated header/footer links.

“Content-area” means links inside main content, excluding the repeated “Have something in mind?” CTA. It includes cards, sidebars, relevant navigation and prose; it does **not** mean every such link is an editorial paragraph link. Global header/footer/action-bar links are counted separately. Breadth-first traversal starts at the homepage. Fragments are checked against generated IDs. Public assets are not page nodes.

Reconciled sitemap paths with all public generated HTML routes. Excluded the intentional noindex Sentry example, API handlers, robots/sitemap/manifest/llms responses, generated error pages and configured redirects (/reviews, old city URLs, /github). Old city redirects do not count as additional pages. Unknown dynamic slugs use notFound(). The existing check-seo.cjs provides HTTP route validation.

**Limitations:** measurements cover this checkout and server-rendered default state, not a crawl of every production URL. Conditional mobile menus and planner selections need separate checks. No search rankings, traffic, backlinks, Google-selected canonicals or actual PageRank were measured or inferred. The installed skill's optional shared crawler/global contract files are absent from its standalone package; repo evidence supplies the analysis.

**Estimated model:** flat small portfolio, with existing Work, Services and Resources/Blog hubs. The skill's numeric targets are diagnostic heuristics, not Google rules. Its 8–15 links/page range does not account well for repeated responsive navigation; retain useful navigation.

## Verified findings before implementation

| Finding | Evidence / consequence | Priority |
|---|---|---|
| /locations is orphaned | Zero incoming anchors; sitemap discovery only. Page describes real remote collaboration and is useful to prospective clients. Keep and link. | P1 |
| Services hub omits three existing services | /services links to 6/9 detail pages; frontend-development, frontend-revamp and api-development are absent from this hub. They are reachable elsewhere. | P1 |
| Recommendations depend on data order | Every work page takes the first two other projects; 18/20 project-to-project links point to Transcendence or ProofCohort. Five articles and five services also fall back to the first two/three projects, unrelated to their topics. | P2 |
| Weak project connections | Rey9 Living and AI Case Calculator each have only one incoming source (/work); Samriddhi has two. These are not orphans. | P2 |
| Article hubs lack return paths | All eight articles omit a visible link to /blog; only /resources links to /blog. Structured breadcrumbs are not navigable anchors. | P2 |
| Articles have no paragraph cross-links | Related service/work cards exist, but article body paragraphs are plain strings even where another guide covers the topic. | P2 |
| Nine vague destination labels | Six “Explore this service” links and three “Explore package” links. Surrounding cards provide context, but the labels can name the destination directly. | P2 |
| Supporting pages rely on global navigation | /experience, /faq and /resources have zero incoming content-area links. /experience mentions three projects without links to their case studies. | P2 |

**Measured baseline:** 1,185 internal anchor occurrences (including same-page links), 1,077 cross-page occurrences, 674 distinct directed page pairs and 267 content-area cross-page occurrences. Mean cross-page anchors/page: 25.64; mean content-area cross-page anchors/page: 6.36. No broken page/asset targets or missing fragments found. One orphan, 41/42 pages reachable; maximum depth among reachable pages 2; mean depth 1.51 (includes homepage, excludes unreachable /locations).

Top incoming content-area sources: /work (31), /work/proofcohort (23), /work/transcendence (22), /work/chainreach-ai (16), /services/web-apps-saas (14). These are link counts, not authority scores. Array-order fallbacks explain much of the concentration.

**Estimated structure score using the skill rubric: 50/100.** Start 100; minus 10 for one orphan; minus 30 for six pages without incoming content-area links (home, experience, FAQ, locations, resources, privacy); minus 10 because the mean is outside the flat-model heuristic. No depth penalty. Home and privacy are intentionally navigation-led, so their penalties are not a reason to manufacture links.

## Route inventory — measured baseline

| Route | Incoming source pages | Incoming content-area sources | Homepage clicks |
|---|---:|---:|---:|
| `/` | 41 | 0 | 0 |
| `/about` | 41 | 2 | 1 |
| `/work` | 41 | 31 | 1 |
| `/experience` | 41 | 0 | 1 |
| `/services` | 41 | 2 | 1 |
| `/process` | 41 | 2 | 1 |
| `/pricing` | 41 | 2 | 1 |
| `/faq` | 41 | 0 | 1 |
| `/blog` | 1 | 1 | 2 |
| `/blog/author/arun-acharya` | 10 | 10 | 2 |
| `/locations` | 0 | 0 | Unreachable |
| `/resources` | 41 | 0 | 1 |
| `/tools/website-cost-planner` | 11 | 11 | 2 |
| `/contact` | 41 | 2 | 1 |
| `/privacy` | 41 | 0 | 1 |
| `/work/transcendence` | 22 | 22 | 2 |
| `/work/proofcohort` | 23 | 23 | 1 |
| `/work/chainreach-ai` | 16 | 16 | 1 |
| `/work/pivotal-physiocare` | 3 | 3 | 2 |
| `/work/heyclo-clo-ai` | 6 | 6 | 1 |
| `/work/sound-of-meme` | 6 | 6 | 1 |
| `/work/samriddhi-interiors` | 2 | 2 | 2 |
| `/work/nursephysiowala` | 5 | 5 | 2 |
| `/work/rey9-living` | 1 | 1 | 2 |
| `/work/ai-case-calculator` | 1 | 1 | 2 |
| `/services/landing-pages` | 7 | 7 | 2 |
| `/services/frontend-development` | 6 | 6 | 1 |
| `/services/small-business-websites` | 10 | 10 | 1 |
| `/services/frontend-revamp` | 8 | 8 | 2 |
| `/services/ui-ux-design` | 13 | 13 | 1 |
| `/services/api-development` | 4 | 4 | 2 |
| `/services/web-apps-saas` | 14 | 14 | 1 |
| `/services/performance-optimization` | 2 | 2 | 2 |
| `/services/product-mvp-development` | 2 | 2 | 2 |
| `/blog/physiotherapy-website-booking-brief` | 5 | 5 | 2 |
| `/blog/saas-dashboard-development-scope` | 6 | 6 | 2 |
| `/blog/react-nextjs-performance-audit-brief` | 5 | 5 | 2 |
| `/blog/small-business-website-cost-and-scope` | 6 | 6 | 2 |
| `/blog/frontend-revamp-checklist` | 8 | 8 | 2 |
| `/blog/ui-ux-before-rebuild` | 5 | 5 | 2 |
| `/blog/api-development-for-startup-web-apps` | 7 | 7 | 2 |
| `/blog/landing-page-vs-website-vs-web-app` | 8 | 8 | 2 |

## Anchor review

**Measured:** 9/267 (3.37%) content-area cross-page anchors are the two vague phrases above. 810/1,077 (75.21%) cross-page occurrences are outside the content-area definition; responsive navigation and the repeated inquiry CTA explain much of this.

**Estimated classification:** other content-area anchors generally name a service, project or guide, or provide a meaningful navigational action. “Read guide” and “Read case study” inside whole-card links already include the destination title in the same anchor and should not be counted as generic standalone links. Normal repeated menu/author/back-to-work anchors are not evidence of keyword stuffing.

The skill's generic threshold (<10%) passes. Its 60–80% descriptive, 10–20% navigational and <5% repeated exact-match targets cannot be treated as sitewide requirements on this template. Exact-match keyword classification and its dependent Anchor Score /10 are **N/A**: no target keyword set was supplied and matching repeated brand/navigation labels is not an adequate proxy. No verified unnatural keyword cluster found.

## Prioritized implementation plan

All target routes below exist in the measured build. Relationships are supported by the existing descriptions, contribution statements and guide sections. Preserve URLs and schema.

| Priority | Source route / placement | Destination route | Anchor / action | Purpose |
|---|---|---|---|---|
| P1 | /faq, answer about clients outside India | /locations | Remote collaboration details | Connect the orphan at the matching question |
| P1 | /contact, project-discussion sidebar | /locations | How remote collaboration works | Make delivery context accessible before inquiry |
| P1 | /services, after current service cards | /services/frontend-development; /services/frontend-revamp; /services/api-development | Existing service navLabel for each | Complete 9/9 hub coverage without adding full cards |
| P2 | /services, six existing card links | Existing six service destinations | Explore + existing service title | Replace vague destination labels |
| P2 | /pricing, three existing package links | /services/landing-pages#pricing; /services/small-business-websites#pricing; /services/web-apps-saas#pricing | View + existing package name + scope | Identify package while keeping valid fragments |
| P2 | /about, existing background links | /experience | Professional experience | Link biography to supporting work history |
| P2 | /experience, after each relevant role | /work/sound-of-meme; /work/chainreach-ai; /work/heyclo-clo-ai | Read + product + case study | Connect each role to its evidence |
| P2 | /process, collaboration section | /resources; /faq | project-planning resources; hiring FAQ | Connect preparation and common hiring questions |
| P2 | Every /blog/{slug}, above article | /blog | All articles | Add a visible return to the existing hub |
| P2 | Work-page brief section | One service per project, mapped below | Existing service navLabel | Connect demonstrated scope to an applicable offering |
| P2 | Existing related-work cards | Explicit work mappings below | Existing project card text | Replace order-based recommendations; keep two cards |

### Project-to-project and project-to-service map

Each source below is /work/{slug}. Project target slugs expand to /work/{slug}; service targets expand to /services/{slug}. Place service links after the existing brief, and keep project links in the existing “More of my work” cards.

| Source | Related project targets | Service target | Verified relationship |
|---|---|---|---|
| transcendence | heyclo-clo-ai; chainreach-ai | frontend-development | Motion-led public frontend and dashboard work |
| proofcohort | nursephysiowala; chainreach-ai | web-apps-saas | Products with user roles and coordinated workflows |
| chainreach-ai | nursephysiowala; ai-case-calculator | frontend-development | Multi-role interfaces and structured data/report presentation; calculator remains a demo |
| pivotal-physiocare | nursephysiowala; samriddhi-interiors | small-business-websites | Healthcare discovery/booking and service-to-inquiry paths |
| heyclo-clo-ai | transcendence; rey9-living | landing-pages | Visual product storytelling and interactive public interfaces |
| sound-of-meme | chainreach-ai; heyclo-clo-ai | performance-optimization | Frontend product flows and measured loading/bundle work |
| samriddhi-interiors | rey9-living; pivotal-physiocare | small-business-websites | Interior product discovery and service-business inquiries |
| nursephysiowala | pivotal-physiocare; chainreach-ai | product-mvp-development | Healthcare journeys and role-based product workflows |
| rey9-living | samriddhi-interiors; heyclo-clo-ai | ui-ux-design | Interiors discovery and product presentation; no claimed backend scope |
| ai-case-calculator | chainreach-ai; proofcohort | ui-ux-design | Interface/report clarity and product entry paths; no claimed production outcomes |

Use already-explicit article → work relationships to show a small relevant guide link in a case study's brief where one exists. Sources: pivotal-physiocare and nursephysiowala → physiotherapy-website-booking-brief; chainreach-ai and nursephysiowala → saas-dashboard-development-scope; sound-of-meme and heyclo-clo-ai → react-nextjs-performance-audit-brief. Anchor: existing guide title. Cap this section to two guides.

### Replace arbitrary fallback work recommendations

Targets expand to /work/{slug}; anchors remain project names and existing summaries.

| Source route | Explicit targets / rationale |
|---|---|
| /services/small-business-websites | pivotal-physiocare; samriddhi-interiors — service discovery and inquiry sites |
| /services/frontend-revamp | sound-of-meme; heyclo-clo-ai — frontend/loading refinement, not a claim of full rebuild results |
| /services/ui-ux-design | chainreach-ai; rey9-living; ai-case-calculator — interface and workflow presentation |
| /services/api-development | nursephysiowala; chainreach-ai — documented data workflows/API integrations, not a claim of owning all backend work |
| /services/web-apps-saas | nursephysiowala; chainreach-ai; proofcohort — role-based product workflows |
| /blog/small-business-website-cost-and-scope | pivotal-physiocare; samriddhi-interiors — business website scope |
| /blog/frontend-revamp-checklist | sound-of-meme; heyclo-clo-ai — interface/performance refinement |
| /blog/ui-ux-before-rebuild | chainreach-ai; samriddhi-interiors — usable flows and content hierarchy |
| /blog/api-development-for-startup-web-apps | nursephysiowala; chainreach-ai — data/API-backed interfaces |
| /blog/landing-page-vs-website-vs-web-app | heyclo-clo-ai; samriddhi-interiors; nursephysiowala — one example of each scope |

### Contextual article links

Wrap the exact existing phrase; do not rewrite the body text. One explicitly configured link per section prevents indiscriminate auto-linking. Source and destination article slugs expand to /blog/{slug} unless an absolute route is shown.

| Source article / section | Destination | Exact anchor |
|---|---|---|
| physiotherapy-website-booking-brief / patient journey | ui-ux-before-rebuild | Write the journey before choosing a template |
| physiotherapy-website-booking-brief / appointment requests | landing-page-vs-website-vs-web-app | Practitioner assignment, payments and patient accounts |
| saas-dashboard-development-scope / role inventory | api-development-for-startup-web-apps | what it can view, create, edit and approve |
| react-nextjs-performance-audit-brief / fix list | frontend-revamp-checklist | A rewrite should follow evidence |
| small-business-website-cost-and-scope / lean build | ui-ux-before-rebuild | strategy and structure |
| small-business-website-cost-and-scope / web apps | landing-page-vs-website-vs-web-app | accounts, dashboards, payments, permissions, workflows, or data entry |
| frontend-revamp-checklist / audit | ui-ux-before-rebuild | which screens feel confusing |
| frontend-revamp-checklist / performance | react-nextjs-performance-audit-brief | loading states, and layout shift |
| ui-ux-before-rebuild / product decisions | saas-dashboard-development-scope | which states need to exist |
| api-development-for-startup-web-apps / frontend and API | saas-dashboard-development-scope | loading, empty, error, success, and permission states |
| landing-page-vs-website-vs-web-app / landing page | /services/landing-pages | A landing page |
| landing-page-vs-website-vs-web-app / business website | small-business-website-cost-and-scope | A business website |
| landing-page-vs-website-vs-web-app / web app | saas-dashboard-development-scope | accounts, dashboards, saved data, payments, approvals, uploads, or workflow automation |

## Navigation and remaining considerations

Keep the existing four-item primary navigation, contact CTA, footer and mobile menu. No new sitewide link block is needed. Keep functional pricing/proposal/skip fragments and repeated responsive navigation. The blog return link fixes a real missing parent path; structured breadcrumb changes are out of scope. No valid page needs deletion, redirection or noindex.

Low incoming-source counts alone do not prove poor rankings. The two demos remain identified as demos in their source content. Case-study relationships do not assert that every product has the same implementation scope.

## Validation and handoff

Before editing site code: baseline production build passed after retrying a filesystem-restricted build (EPERM creating .next/static/chunks). Existing unrelated hook/image lint warnings remain.

After implementation: rebuild, run lint and the existing HTTP SEO checker, compare the full link graph, validate explicit relationships and new inline anchors, check query/fragment/trailing-slash/dynamic-slug behavior, and inspect the diff for scope. Record actual results below; do not infer deployment or traffic impact.

Handoff: linking mode for the existing portfolio; preserve all 42 URLs. No blockers requiring a content or indexing audit. Review this local diff before any future publication. Rerun the graph check when adding pages; monitor orphan count, hub coverage, valid targets and recommendation relevance.

## Completed results — local validation

Snapshot note: the measurements below precede the subsequent user-requested Blog navigation addition. Blog is now also in the shared desktop/mobile header; the earlier recommendation to keep four primary items is superseded by that request. The full graph has not been remeasured for this one-link follow-up.

**Measured before versus after**, using the same rendered-anchor definition:

| Metric | Before | After |
|---|---:|---:|
| Public HTML pages | 42 | 42 |
| Reachable from homepage | 41 | 42 |
| Orphan/unreachable pages | 1 | 0 |
| Broken internal targets | 0 | 0 |
| Missing fragment targets | 0 | 0 |
| Maximum reachable click depth | 2 | 2 |
| /locations depth | Unreachable | 2 |
| Service detail pages linked by /services | 6/9 | 9/9 |
| Articles linking back to /blog | 0/8 | 8/8 |
| Vague standalone service/package anchors | 9 | 0 |
| Explicit inline article links | 0 | 13 |
| Total internal anchor occurrences | 1,185 | 1,242 |
| Cross-page anchor occurrences | 1,077 | 1,134 |
| Distinct directed page pairs | 674 | 728 |
| Content-area cross-page occurrences | 267 | 324 |
| Mean content-area links/page | 6.36 | 7.71 |
| Pages without incoming content-area links | 6 | 2 |

Mean reachable depth changes from 1.51 across 41 pages to 1.52 across 42 because /locations is now reachable; no previously reachable page became deeper. More link occurrences are not themselves a success criterion. The material results are recovered reachability, complete hub coverage, useful reciprocal paths and explicit recommendations.

**Concurrent-edit boundary:** during final validation, separate edits expanded the experience data and changed its introduction and optional-field rendering. Those edits were preserved, not authored as part of this internal-linking task. The final rebuilt snapshot includes five additional experience-to-case-study links supplied by those edits, so the aggregate increase of 57 content-area anchors includes 52 from this task and five from the concurrent additions. The checker now accepts experience entries without a case-study slug and validates every supplied slug. Final measurements describe the combined current checkout, not only this task's changes.

Incoming content-area source pages:

| Target | Before | After |
|---|---:|---:|
| `/locations` | 0 | 2 |
| `/blog` | 1 | 9 |
| `/experience` | 0 | 1 |
| `/faq` | 0 | 1 |
| `/resources` | 0 | 1 |
| `/work/transcendence` | 22 | 5 |
| `/work/proofcohort` | 23 | 7 |
| `/work/pivotal-physiocare` | 3 | 7 |
| `/work/samriddhi-interiors` | 2 | 9 |
| `/work/rey9-living` | 1 | 4 |
| `/work/ai-case-calculator` | 1 | 4 |
| `/services/performance-optimization` | 2 | 3 |
| `/services/product-mvp-development` | 2 | 3 |

Transcendence and ProofCohort lose arbitrary fallback links while retaining relevant links and their original click depth. The new graph has no disconnected clusters. Home and privacy still rely on appropriate navigation links; no extra editorial links were added just to improve a score.

**Estimated structure score: 80/100** under the same skill rubric (0 orphan/depth deductions; -10 for home/privacy having no incoming content-area links; -10 for the mean all-cross-page count outside its heuristic). This is a structural checklist score, not a ranking/traffic forecast. Generic-anchor share is now 0/324; keyword-specific Anchor Score remains N/A.

### Exact project-to-guide links rendered

These reverse existing article-to-project relationships. Slugs expand to /work/{source} and /blog/{destination}; anchors are the exact existing guide titles, placed after each project brief. Two reading links per applicable project, no sitewide additions.

| Project source | Article destinations |
|---|---|
| pivotal-physiocare | physiotherapy-website-booking-brief; small-business-website-cost-and-scope |
| nursephysiowala | physiotherapy-website-booking-brief; saas-dashboard-development-scope |
| chainreach-ai | saas-dashboard-development-scope; ui-ux-before-rebuild |
| heyclo-clo-ai | react-nextjs-performance-audit-brief; frontend-revamp-checklist |
| sound-of-meme | react-nextjs-performance-audit-brief; frontend-revamp-checklist |
| samriddhi-interiors | small-business-website-cost-and-scope; ui-ux-before-rebuild |

### Files changed and purpose

| File | Purpose |
|---|---|
| app/about/page.tsx | Add experience link in existing background list |
| app/contact/page.tsx | Add remote collaboration link beside inquiry context |
| app/faq/page.tsx | Link the international-client answer to /locations |
| app/blog/[slug]/page.tsx | Visible parent link; render explicit inline section links; remove arbitrary work fallback |
| app/services/[slug]/page.tsx | Use explicit work relationships instead of positional fallback |
| components/portfolio/ServicePages.tsx | Complete service hub and clarify service/package labels |
| components/portfolio/ExperiencePage.tsx | Add role-to-case-study links; preserve concurrent optional-field rendering and introduction edits |
| components/portfolio/ProcessPage.tsx | Link preparation guidance to Resources and FAQ |
| components/portfolio/WorkPages.tsx | Explicit related projects, matching service, and up to two relevant guides |
| data/portfolio.ts | Connect the three original experience entries to existing project slugs; preserve concurrent experience expansion |
| data/work-projects.ts | Declare project/service relationships |
| data/seo-content.ts | Explicit work recommendations and optional inline section link metadata |
| data/project-guides.ts | Four contextual links attached to existing section text |
| scripts/check-internal-links.cjs | Reproducible graph, target/fragment, relationship, inline-anchor and orphan checks |
| docs/seo/internal-linking-audit.md | Baseline, plan, full route/link mappings, results and limitations |

The five additional links supplied by concurrent experience edits were validated but are outside this task's authored plan: /experience → /work/transcendence, /work/proofcohort, /work/nursephysiowala, /work/samriddhi-interiors and /work/ai-case-calculator. They use the same “Read the {product} case study” rendering. No links were invented for the three new experience entries without a matching case study.

### Commands and results

- **Passed:** npm run lint. Existing hook-dependency warnings in legacy UI components and the existing InfiniteCards img warning remain; no new lint errors.
- **Passed:** npm run build in an isolated temporary copy of the current source, with the same installed dependencies and unmodified config. All 50 generated routes completed (42 public page nodes).
- **Passed:** node scripts/check-internal-links.cjs --json against that completed build. Checks graph reachability, complete service hub, valid relationship slugs, bounded/nonduplicate recommendations, actual rendered inline anchors, exact once-only phrase matches, canonical-origin links and fragments.
- **Passed:** node scripts/check-seo.cjs http://127.0.0.1:3005 against the isolated production server. All 42 sitemap pages returned direct 200 responses; existing redirect checks also passed.
- **Passed:** additional HTTP assertions for service, blog and project query URLs (200), trailing-slash variants (308 to the same path without slash), and unknown slugs (404).
- **Passed:** node scripts/check-inquiries.cjs and node scripts/check-smooth-scroll.cjs. These use local stubs and send no inquiries or analytics.
- **Passed:** git diff --check and final scope review.
- **Passed:** final SHA-256 comparison confirmed all implementation files and the checker matched the rebuilt snapshot. The isolated test server was stopped and its disposable build copy removed afterward; the user's development server, dependencies and assets were preserved.
- **Browser checks:** followed the new Services → Frontend Development link, FAQ → Remote Collaboration link, and comparison article → Small Business Cost guide. Confirmed the article parent link and contextual link text. Changing the planner from Landing Pages to API Development updated its service destination correctly.

**Failed attempts, resolved:** the initial sandbox build could not create .next/static/chunks (EPERM); the elevated baseline build succeeded. A later build in the working checkout encountered missing page modules and an incomplete manifest while an existing next dev process was using .next. The graph checker correctly failed because that build had no sitemap output. Final measurements therefore use the isolated completed build; the user's development process was not stopped. The browser's exact-label selector did not match the planner select; its exposed native selection control worked and showed the correct destination.

### Remaining limitations and handoff

No production deployment or push was performed, and these measurements do not describe an updated live site. A complete live crawl, search impact and all mobile-menu/viewport states were not tested. The unchanged mobile menu uses the same navigation array; server-rendered links were measured and one nondefault planner state was exercised. There are no locale variants in the current configuration.

No confirmed unresolved broken internal page link, orphan or missing service-hub connection remains in the tested local graph. Future pages should receive explicit relevant relationships; recommendations intentionally have no unrelated fallback. Rerun npm run build followed by the internal-link checker after content changes, with next dev stopped or in a separate temporary copy to avoid the shared .next conflict.

Handoff: internal linking completed locally; 42 routes retained, 0 orphans, 9/9 service-hub coverage, 13 inline links verified. The source/target plan and this report are ready for review. Publication requires a later user request.
