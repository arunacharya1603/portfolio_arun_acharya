# Canonical hostname audit and local migration

Audit date: 24 October 2026 (Asia/Kolkata). Repository baseline: `b3e630443dd68d779b8237233d9984ee92dea4c7`, branch `main`, initially clean.

Status: **non-www changes implemented and tested locally after user approval. No deployment or hosting changes.** Section 10 records the implementation and fresh test results. Sections 1–9 preserve the initial audit and proposed migration; their www observations and pre-approval test results describe the baseline. The redirect CSV also remains the measured production baseline.

The user authorized preparing and testing the local patch, explicitly excluding deployment and hosting changes. No DNS, TLS, production environment, Search Console setting or verification record was changed. No commit or push was made.

## Decision

The site currently has a consistent **HTTPS/www** configuration. Your requested target is **HTTPS/non-www**. This is a hostname migration, not a repair of a demonstrated site-wide indexing failure.

Changing only canonical tags would point them at URLs that currently redirect away. Adding a www-to-non-www application redirect while the current non-www-to-www edge redirect remains would create a loop. Prepare the local changes together, then coordinate the hosting switch in a separately authorized release.

Google treats redirects, canonical annotations and sitemap inclusion as canonicalization signals. Keep these signals aligned; the audit cannot establish Google's selected canonical without Search Console access. [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## 1. Verified architecture and existing configuration

- Next.js **14.1.4**, React 18, TypeScript; App Router in `app/`.
- `pages/_document.tsx` is a legacy document wrapper, without a competing canonical implementation.
- Public content: 15 base pages, 10 work details, 9 service details, 8 blog articles = **42 pages**.
- Work, service and blog routes use local data registries and `generateStaticParams`. New registry entries join the sitemap and prerendered pages on the next build/deployment. There is no CMS publication webhook in this implementation.
- No category, tag or pagination routes were found. Categories on articles are labels. No filtering URL architecture needs migration.
- `lib/site.ts` defines the www host, origin and Person/WebSite identifiers.
- `lib/seo.ts` owns absolute URLs, page-specific Next Metadata API canonicals, Open Graph metadata and JSON-LD. Each content route supplies its own path.
- `app/layout.tsx` supplies metadataBase, index/follow defaults, Google preview directives, shared structured data and the existing Google verification token. It does not force a homepage canonical onto unknown routes.
- `app/sitemap.ts` generates the existing `/sitemap.xml`. `app/robots.ts` generates `/robots.txt`. Both derive their origin from `siteConfig`.
- `next.config.mjs` contains intentional permanent route redirects: `/reviews → /work`, eight retired city paths to `/locations`, and `/github` to the GitHub profile. Preserve them.
- No repository middleware, proxy, Vercel JSON, Netlify or server rewrite configuration was found. No local `.vercel` project link was present.
- Vercel is verified by live response headers and corroborated by the deploy script. The exact dashboard rule and project/domain assignments have **not** been inspected. Edge hostname normalization is strongly indicated by live behavior and its absence from application configuration.
- The production URL is hard-coded, not selected from a secret environment variable. `.env.example` documents mail settings; secret values were not read or printed. Production environment settings remain unverified.
- `lib/analytics.ts` separately hard-codes the www-only host gate and event URL origin. This is a required migration dependency.
- Relative application links, inquiry attribution, the existing sitemap endpoint, page slugs, content and UI can remain intact.

## 2. Live HTTP findings

Direct GET requests were made independently of source inspection. The initial sandbox DNS failure was resolved through an approved network-capable execution. No TLS verification was bypassed. HTTPS requests to both hosts succeeded; this verifies current connectivity, not certificate renewal configuration.

### Homepage matrix

| Source | Responses and destinations | Final status | Redirects |
|---|---|---:|---:|
| http://arunacharya1603.in/ | 308 → https://arunacharya1603.in/ → 308 → https://www.arunacharya1603.in/ | 200 | 2 |
| http://www.arunacharya1603.in/ | 308 → https://www.arunacharya1603.in/ | 200 | 1 |
| https://www.arunacharya1603.in/ | Direct | 200 | 0 |
| https://arunacharya1603.in/ | 308 → https://www.arunacharya1603.in/ | 200 | 1 |

The final homepage canonical is `https://www.arunacharya1603.in`. The absent trailing slash denotes the same root URL; it is not a separate hostname defect.

All four hostname/protocol variants were also tested for:

- `/services/landing-pages?utm_source=seo-audit&service=frontend`
- `/work/transcendence`
- `/blog/saas-dashboard-development-scope`

They followed the same 2/1/0/1 hop pattern, preserved the path and query string, and ended at HTTP 200. Service query variants canonicalized to the query-free service URL. See [the exact 16-case matrix](canonical-redirect-matrix.csv) for every source, intermediate hop, destination and canonical.

### Other live checks

| Source on HTTPS/non-www | Observed chain | Final canonical / result |
|---|---|---|
| /contact?service=nextjs-react&package=essential&utm_source=seo-audit | 308 to same path/query on www; 200 | https://www.arunacharya1603.in/contact |
| /blog/physiotherapy-website-booking-brief | 308 to same path on www; 200 | Corresponding www article |
| /reviews | 308 to www/reviews; 308 to /work; 200 | https://www.arunacharya1603.in/work |
| /locations/delhi | 308 to www/locations/delhi; 308 to /locations; 200 | https://www.arunacharya1603.in/locations |
| /sitemap.xml | 308 to www/sitemap.xml; 200 | application/xml |
| /robots.txt | 308 to www/robots.txt; 200 | text/plain |
| /llms.txt | 308 to www/llms.txt; 200 | text/plain; charset=utf-8 |
| /not-a-real-page-seo-audit | 308 to same www path; 404 | No canonical |
| /work/not-a-project | 308 to same www path; 404 | No canonical; noindex present |
| /blog/not-an-article | 308 to same www path; 404 | No canonical; noindex present |
| /services/not-a-service | 308 to same www path; 404 | No canonical; noindex present |
| /sentry-example-page | 308 to same www path; 200 | Explicit noindex/nofollow/nocache; absent from sitemap |

No redirect loop was observed. Retired aliases have an additional intentional route redirect when entered through the noncanonical host. No crawled internal page link points to these aliases.

Query handling: UTM parameters are consumed by the existing first-touch inquiry attribution logic. The additional service/package query keys used above are preservation probes; the audit does not claim the contact form consumes those fields. No URL query parameters were stripped by redirects. Canonicals omit these parameters, which do not identify separate content pages.

## 3. What is already correct

**Live crawl: all 42 sitemap URLs** returned 200 directly on www, had exactly one matching canonical, matching og:url, one H1, accessible text in initial HTML and no observed meta/header noindex. The existing regression script also passed its unique title/description, inherited robots, social metadata, JSON parsing, case-study identity and article-date checks before reaching the missing-page assertion described below.

**Sitemap:** XML parsed successfully with a namespace-aware XML parser. 42 unique absolute HTTPS/www URLs, 6,117 bytes, no query strings, and an exact match to the source-generated route set. Only eight blog entries have lastmod; those dates come from article data and agree with visible/article/Open Graph dates. Undated base, work and service pages do not get invented deployment dates. The endpoint is far below the 50,000-URL/50 MB limits. Publishing is build-driven. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

**robots.txt:** allows `/`, disallows `/api/`, and declares the www sitemap. Public test-page crawling is allowed so its noindex can be read. API robots blocking is not an authorization mechanism; the contact API is a submission endpoint, not a read API for stored inquiries. Private delivery/storage behavior was not exercised against production.

**Internal links:** 1,285 rendered internal anchors across the 42 pages resolved to the current HTTPS/www origin. No unknown internal page targets were found. Source-relative links will resolve on non-www after a hosting migration. This HTTP crawl does not replace a new build-based fragment/orphan graph check.

**Structured data:** JSON-LD parsed across the crawl. Person, WebSite, ProfessionalService, breadcrumbs, services, authored case studies and articles use the shared current origin. This is syntax/identity consistency verification, not a Google Rich Results Test or proof of rich-result eligibility.

**Verification and previous work:** Google verification markup remains present. The live blog metadata, article dates, contribution-based case metadata, inherited robots and factual llms summary reflect the earlier fixes. The older audit documents are historical evidence and should not be rewritten to pretend their original observations occurred today.

**Browser rendering:** desktop screenshots confirmed the homepage, landing-page service, Transcendence case study, blog listing, physiotherapy article, SaaS-dashboard article and generic 404 render. The other pages were verified through HTTP HTML, not exhaustively exercised in the browser. No forms, analytics consent, outbound messages or Sentry error triggers were activated.

## 4. Findings and risks

| Finding | Severity / status | Action |
|---|---|---|
| Production and source prefer www, contrary to the newly requested non-www target | P1 for target compliance; not an observed indexing outage | Coordinated application and hosting migration |
| Reverse redirect added before the existing edge redirect is removed could loop | High prospective availability risk; no current loop | Keep hostname normalization at Vercel; verify apex serves before enabling the reverse redirect |
| Analytics remains restricted to www | P1 prospective measurement regression | Change host gate/event origin alongside siteConfig; preserve consent and preview exclusions |
| HTTP on the alternate host needs HTTPS normalization then host normalization | P3 platform limitation | Retain Vercel HTTPS enforcement; document bounded two-hop behavior rather than promise an unsupported single hop |
| Generic missing pages omit explicit noindex despite returning real 404 | P3 test expectation discrepancy | Keep 404/no-canonical assertions; do not redesign routing solely to add a redundant signal |
| GSC access denied by connector subscription gate | External verification blocked | Manual checks below; no indexing or selected-canonical claims |
| Preview protection, dashboard domain settings, deployed commit and production environment values not inspected | Unverified | Check before an authorized release |

The generic `/not-a-real-page` and `/locations/not-a-market` pages returned 404 and no canonical, but inherited index/follow rather than explicit noindex. Dynamic missing work/blog/service paths included noindex. A request with a Googlebot user-agent reproduced the distinction; it is not an authenticated Google crawl or URL Inspection.

Google does not index content returned with 404. An explicit noindex is therefore not required to make a true 404 non-indexable. The existing script's blanket noindex assertion is stricter than that requirement. Preserve hard status and canonical checks; preserve explicit noindex checks for the **200-status Sentry test page**. [Google HTTP status handling](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)

## 5. Concrete local patch proposed for approval

| File | Proposed edit and reason |
|---|---|
| lib/site.ts | Set host to arunacharya1603.in; url to https://arunacharya1603.in; Person/WebSite IDs to the same origin. This updates all existing metadata, sitemap, robots, schema, summary links and email branding consumers. |
| lib/analytics.ts | Derive productionHost from the shared site configuration, keeping measurement confined to the new production host and existing consent rules. |
| scripts/check-analytics.cjs | Supply the shared configuration in the test loader; verify non-www measurement and exclusion of www/local/preview hosts after migration. |
| scripts/check-inquiries.cjs | Update the production-host fixtures and email-brand assertion; preserve attribution, delivery and validation checks. |
| scripts/check-seo.cjs | Expect non-www; add query-preservation/canonical checks and targeted origin consistency checks. Correct the blanket 404-noindex assumption while retaining status, no-canonical and test-page noindex checks. |
| scripts/check-internal-links.cjs | Expect the non-www canonical origin while still recognizing both hostnames as internal for detection. |
| scripts/check-seo-data.cjs | Assert shared site origin/IDs and generated metadata/sitemap/robots agreement. |
| README.md | Replace the current opposite-host instruction with the coordinated non-www release procedure. |
| docs/seo-measurement.md | Update the target measurement origin and explain the release dependency. |
| This audit report | Append actual implementation and validation results after approval. Preserve this pre-change evidence. |

The core configuration change is:

```diff
- host: "www.arunacharya1603.in",
- url: "https://www.arunacharya1603.in",
+ host: "arunacharya1603.in",
+ url: "https://arunacharya1603.in",
...
- personId: "https://www.arunacharya1603.in#person",
- websiteId: "https://www.arunacharya1603.in#website",
+ personId: "https://arunacharya1603.in#person",
+ websiteId: "https://arunacharya1603.in#website",
```

No edits are currently needed in the page templates, shared canonical helper, sitemap route or robots route: they already consume the common configuration correctly. No new dependency, middleware, duplicate sitemap, public slug, metadata system or broad application redirect is proposed. `next.config.mjs` keeps its existing route redirects.

## 6. Hosting plan — recommended, not implemented

Use the **existing Vercel project** and its domain settings as the single hostname-normalization layer. Vercel documents domain redirects specifically for www/apex normalization. [Vercel redirects](https://vercel.com/docs/routing/redirects)

Before release, an authorized operator must inspect and record the current project/domain assignments, redirect status/target, production deployment ID and preview protection. Confirm both custom hosts remain attached to the same project and have valid TLS. Current successful HTTPS responses do not establish future dashboard state.

After local approval and successful tests, obtain separate release authorization. Prepare the release without changing the deployment target. During the controlled cutover:

1. Make the apex hostname serve the existing production project directly, removing only its verified redirect to www. Confirm 200 on known apex paths before adding any opposite redirect.
2. Promote the verified non-www application release. Verify apex pages, metadata, sitemap and robots immediately. Do not leave an extended mismatch between serving behavior and declared canonicals.
3. Set the exact www custom hostname to permanently redirect to the matching apex URL, preserving path/query. Never have opposite host redirects active together. Avoid wildcard subdomain rules.
4. Confirm canonical-host assets load and the inquiry endpoint remains same-origin. No catch-all application rule should intercept API or asset paths.
5. Rerun all four variants for homepage and representative deep/query paths and inspect the Vercel response chain. Keep previous route aliases working.
6. Check consented analytics in the actual production host after an authorized release; do not send fake inquiry submissions.

Vercel's CDN automatically upgrades HTTP to HTTPS using 308 and does not allow disabling that enforcement. Consequently, after migration, `http://www.../path` may still require HTTPS/www then HTTPS/apex: a provider-imposed two-hop chain. The final preferred HTTPS/apex URL must serve directly. Do not add more layers, change DNS/providers or weaken TLS just to remove that hop. This post-migration chain is an expectation to verify, not an already tested result. [Vercel HTTPS behavior](https://vercel.com/docs/cdn-security/encryption)

Preview protection and any public production vercel.app alias need separate host-specific inspection. Do not apply global noindex to production. No preview URL or authenticated dashboard access was established in this audit.

## 7. Regression results and release gate

| Check run in this audit | Result |
|---|---|
| node scripts/check-seo-data.cjs | PASS |
| node scripts/check-analytics.cjs | PASS; isolated stubs, no Google events |
| node node_modules/typescript/bin/tsc --noEmit --incremental false | PASS |
| npm run lint -- --no-cache | PASS, 11 existing unrelated warnings, no errors |
| node scripts/check-seo.cjs https://www.arunacharya1603.in | FAIL at generic /locations/not-a-market explicit-noindex assertion, after all 42 public-page checks and intentional-redirect checks |
| Namespace-aware live sitemap XML parse | PASS, 42 unique URLs |
| Independent 42-page live crawl | PASS for direct status, canonical, og:url, H1, JSON parsing and no unintended noindex |
| Homepage plus 12 deep host/protocol cases | PASS for current www configuration, path/query preservation; no loops |
| Independent missing-route and test-page samples | Real 404s/no canonical; explicit noindex on dynamic missing and Sentry routes; generic noindex discrepancy above |
| Fresh production build and generated internal-link graph | Not run in this audit phase; required after the approved patch |
| Deployment/preview validation of non-www target | Not performed; no migration implemented |

The earlier report records a successful build on 23–24 October, but that is historical evidence, not a fresh build result for this task. After local approval, run the full production build, source/analytics/inquiry checks, generated link graph and production-mode HTTP checks against the local output. Production edge redirects require a separate deployed check; localhost cannot prove them.

## 8. Exact Search Console checks

The connected GSC Wizard tool returned `payment_required / subscription_required`; it could not list properties or inspect URLs. No retry can resolve the account subscription gate. You can use Google's own Search Console directly without purchasing that connector.

Keep all three properties and all verification records. The Domain property aggregates protocols/subdomains; URL-prefix properties provide narrower views. Multiple registrations do not configure redirects or establish a ranking benefit. [Google property scopes](https://support.google.com/webmasters/answer/34592)

Before any migration:

1. Select the Domain property **arunacharya1603.in**. In Sitemaps, record all existing submissions, their last-read dates, processing status, errors and discovered-URL counts. Check the existing non-www sitemap submission without assuming it succeeded; HTTP currently redirects that endpoint to www.
2. In URL Inspection, inspect both homepage variants, one service, one work detail and two articles from the matrix. Record indexed status, last crawl, user-declared canonical, Google-selected canonical and referring sitemap.
3. Compare the **indexed result** with **Test live URL**. A live fetch can verify current availability; it does not prove an indexed canonical change.
4. In Page indexing, review Page with redirect, Alternate page with proper canonical, Duplicate/Google chose different canonical, Crawled/Discovered currently not indexed, Not found and Server error categories. Inspect representative URLs before deciding a category is a defect.
5. Review Manual actions, Security issues and Settings → Crawl stats. Actual current status is unknown here.
6. Capture a dated Performance baseline for clicks/impressions/pages before changing the hostname. Avoid interpreting absent connector data as zero traffic.

After an authorized release and live validation:

1. Inspect the HTTPS/non-www destination pages. Their declared canonical should now be themselves; Google-selected values may update only after recrawling.
2. Validate the existing `https://arunacharya1603.in/sitemap.xml` endpoint returns 200 with non-www entries. Keep that endpoint. If already submitted and processing successfully, do not add duplicate submissions to every property. Only submit if absent or use a justified re-fetch after the released change; no submission is performed by this task.
3. Expect old www URLs to report redirects once recrawled. Check destination indexing rather than treating all redirect exclusions as failures.
4. Monitor indexing, crawl errors and performance through recrawling. Sitemap submission and correct canonicals do not guarantee indexing.

## 9. Rollback and remaining limitations

Before editing, the relevant configuration is preserved in Git baseline `b3e630443dd68d779b8237233d9984ee92dea4c7`; this report records live behavior independently. The working tree was clean before report creation.

For a future local patch, revert only its hunks in the nine application/test/documentation files listed above, or revert its dedicated commit if one is later authorized. This restores www site identity, analytics host, test expectations and operating instructions. Do not use a broad hard reset that could discard later work.

A production rollback must also restore the hosting configuration: first stop www redirecting to apex and verify www can serve the previous release, restore the previously recorded deployment, then restore apex → www if needed. Recheck both hosts before finishing. Never restore one side of a reciprocal redirect pair while leaving the other active. Reverting code alone does not revert Vercel dashboard settings.

Migration risks include temporary canonical disagreement during cutover, Google recrawl delay, and clients caching earlier permanent redirects. Browser storage is origin-scoped: analytics consent and session attribution on www do not automatically transfer to apex; preserve the existing consent policy rather than silently treating new-origin visits as consented.

Still unverified: Search Console indexing/selected canonicals/manual actions/security, exact Vercel dashboard setup and release identity, preview protection, production environment values, real inquiry delivery, real analytics collection, mobile/full interaction regression and external rich-result validation. No DNS, TLS or provider change is justified by the observed behavior.

**Scope update:** the user approved the local patch above. Deployment and hosting changes remain outside the authorization.

## 10. Local implementation and verification — 24 October 2026

The prepared application now declares **https://arunacharya1603.in** consistently. Only two runtime files changed: `lib/site.ts` and `lib/analytics.ts`. The five existing regression scripts and two operating documents listed in section 5 were updated. This report records the result; the original production redirect matrix is unchanged.

### Implemented changes

| File | Actual change |
|---|---|
| lib/site.ts | Non-www host, origin, Person ID and WebSite ID. Existing consumers now generate non-www canonicals, OG URLs, sitemap, robots, JSON-LD, llms links and email branding. |
| lib/analytics.ts | Host gate and event URLs use `siteConfig.host`, preserving consent, sanitization and production-only collection. |
| scripts/check-analytics.cjs | Non-www event URL assertions; tests that www, localhost, loopback and a preview hostname load no Google tag and emit no events, even after consent. |
| scripts/check-inquiries.cjs | Non-www attribution fixtures and email-brand checks; original validation, rate-limiting, delivery-error and backup-recovery tests retained. |
| scripts/check-seo-data.cjs | Shared non-www identity, clean sitemap URLs, metadata/OG agreement, robots sitemap and llms host checks. |
| scripts/check-seo.cjs | Non-www rendered checks, verification-token preservation, JSON-LD identity, header noindex, all ten legacy route redirects, encoded/repeated query parameters, query-free canonicals, robots status, favicon and POST-only API behavior. True 404/no-canonical assertions retained; the unnecessary blanket 404-noindex assertion was removed. The 200-status test page still requires explicit noindex. |
| scripts/check-internal-links.cjs | Expected non-www origin; recognizes both hosts so stale www links fail. |
| README.md | Updated local checks, coordinated release instructions and Search Console property/submission guidance. |
| docs/seo-measurement.md | Prepared origin, shared host gate and origin-scoped consent behavior documented. |

Page content, slugs, UI, assets, route configuration, contact endpoint, mail delivery implementation, root verification token, analytics measurement ID and dependencies are unchanged. No application hostname redirect was added. Vercel remains the planned normalization layer.

### Fresh verification results

The production build ran in an isolated local folder with the installed dependencies linked by a junction. **All 1,407 copied build inputs matched the working tree by SHA-256.** The repository's existing `.next` preview directory was not rebuilt. No production environment files were copied and no packages were installed.

| Check | Result |
|---|---|
| `npm run build` in isolated copy | PASS: optimized compilation, type validation and 50 generated framework entries, including all 42 public sitemap pages |
| `node node_modules/typescript/bin/tsc --noEmit --incremental false` | PASS |
| `npm run lint -- --no-cache` | PASS, no errors; 11 pre-existing warnings in unrelated UI files |
| `node scripts/check-seo-data.cjs` | PASS |
| `node scripts/check-analytics.cjs` | PASS, with browser/fetch stubs |
| `node scripts/check-inquiries.cjs` | PASS, with delivery/storage mocks |
| `node scripts/check-smooth-scroll.cjs` | PASS, navigation, focus/history, reduced motion and cleanup |
| `node scripts/check-internal-links.cjs --json` against isolated build | PASS: 42 pages, 1,285 internal anchors, 760 unique edges, 0 broken targets, 0 missing fragments, 0 orphans, 0 unreachable pages, maximum depth 2 |
| `node scripts/check-seo.cjs http://127.0.0.1:3011` | PASS: all 42 pages return 200 directly, one non-www canonical, unique titles/descriptions, indexable robots, matching OG URLs, valid JSON-LD and unchanged verification token |
| Existing route redirects | PASS: /reviews, all eight retired city routes, /github; 308 status and expected target, with and without queries. Local content destinations return 200 without another hop; GitHub was not followed. |
| Query preservation | PASS: UTM, encoded spaces and repeated tag parameters survive legacy redirects; homepage/contact/service/work/blog query variants serve 200 with query-free canonicals |
| Missing routes / test page | PASS: five invalid route cases return 404 without a canonical; Sentry test page remains 200 with explicit noindex and outside sitemap |
| Sitemap XML and robots | PASS: namespace-aware XML parser, 42 non-www URLs; robots allows /, retains /api/ disallow and declares the non-www sitemap |
| Assets / API | PASS: favicon 200; contact endpoint GET remains 405 (POST-only). No real inquiry was sent. |
| Local Host-header probes | PASS: both apex/www with HTTP/HTTPS forwarded-protocol values serve the service page with a non-www canonical and no competing application redirect. These are application checks, not TLS/edge redirect tests. |
| Browser smoke checks | PASS: homepage render, consent choice, client navigation to contact/planner, required-field validation, planner currency/service updates and current-page canonical after navigation |
| Localhost measurement guard in browser | PASS: zero Google tag script elements after allowing consent and navigating; no console warnings/errors recorded during these checks |
| `git diff --check` | PASS |

Build warnings also note an old Browserslist data package; the server warned about the existing deprecated images.domains setting. Neither was changed because this migration does not require dependency or image-configuration changes. The first local HTTP attempt was blocked by sandbox networking and the sandboxed server was unreachable; the final successful suite used an approved local server on port 3011. Both temporary test servers and the QA browser tab were stopped/closed afterward.

The isolated build remains at `C:/Users/aruna/.codex/visualizations/2026/10/24/01a16c90-b0a3-76c2-8526-bd884fce51a7/non-www-build` for review. It is outside the repository and was never uploaded.

### Release status and practical limits

**Implemented and tested locally:** canonical identity and all existing consumers, analytics host handling, regression checks and operating instructions. No application regression was found in the checks above.

**Not deployed or production-tested:** this new non-www build. The production matrix in section 2 records the pre-change www behavior. Actual HTTP/HTTPS host redirects remain the separate Vercel cutover from section 6, requiring later authorization and live validation. Do not deploy the source change alone while apex still redirects to www; it would also disable tracking on the old www host by design.

**Still unverified:** Google-selected canonicals/indexing and Search Console reports, production mail/analytics collection, hosting dashboard/preview protection, full mobile/device coverage and external rich-result validation. Successful local tests cannot guarantee behavior of untested external services or every client.

For rollback of this local patch, restore only the nine modified tracked files listed above to their baseline versions (or reverse these exact hunks if later work exists). That restores the four www identity values, standalone analytics hostname and previous test/documentation expectations. The audit report and CSV may remain as evidence. No production rollback is required because no release occurred.
