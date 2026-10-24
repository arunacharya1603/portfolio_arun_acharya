# Canonical hostname audit and production migration

Audit date: 24 October 2026 (Asia/Kolkata). Repository baseline: `b3e630443dd68d779b8237233d9984ee92dea4c7`, branch `main`, initially clean.

Status as verified on 24 October 2026: **non-www migration deployed and production-tested; Search Console redirect-error validation started, not completed.** Production runs commit `0b472c20d6cad97808e8996ca286591cf8130588`. Sections 11–14 are the authoritative release record, Search Console results, exact rollback plan and remaining checks. Sections 1–9 preserve the initial www audit and proposal; section 10 preserves the local-only milestone. Their statements about unavailable access or an undeployed patch are historical, not current status.

The user separately authorized local preparation, disabling automatic custom-domain assignment, commit/push, staging, removal of the apex redirect, promotion, the www 308 redirect, and the specific Search Console actions recorded below. This documentation update is local only: no commit, push, deployment, settings change or new Search Console action. No secret values were read or included. DNS, nameservers, TLS settings, production environment values and verification records were not changed during the migration.

The [redirect matrix](canonical-redirect-matrix.csv) retains the original 16 rows as `baseline-www` and adds dated `production-non-www` observations with evidence and scope notes. Empty canonical fields mean the probe did not inspect HTML canonical metadata (or the resource is not an indexable HTML page); they do not mean a missing canonical on an eligible page.

## Initial decision — historical context

At the initial audit, the site had a consistent **HTTPS/www** configuration. The requested **HTTPS/non-www** migration is now complete at the application and hosting layers. The initial audit did not establish a site-wide indexing failure.

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

They followed the same 2/1/0/1 hop pattern, preserved the path and query string, and ended at HTTP 200. Service query variants canonicalized to the query-free service URL. See the 16 `baseline-www` rows in [the dated matrix](canonical-redirect-matrix.csv) for those original sources, intermediate hops, destinations and canonicals; `production-non-www` rows record the later release.

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

## 6. Original hosting plan — subsequently implemented in section 11

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

## 8. Original Search Console checklist — results in section 12

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

## 9. Original rollback proposal and audit-time limitations

This proposal predates deployment. Use the exact production rollback in section 13; the access limitations below describe the initial audit only.

Before editing, the relevant configuration is preserved in Git baseline `b3e630443dd68d779b8237233d9984ee92dea4c7`; this report records live behavior independently. The working tree was clean before report creation.

For a future local patch, revert only its hunks in the nine application/test/documentation files listed above, or revert its dedicated commit if one is later authorized. This restores www site identity, analytics host, test expectations and operating instructions. Do not use a broad hard reset that could discard later work.

A production rollback must also restore the hosting configuration: first stop www redirecting to apex and verify www can serve the previous release, restore the previously recorded deployment, then restore apex → www if needed. Recheck both hosts before finishing. Never restore one side of a reciprocal redirect pair while leaving the other active. Reverting code alone does not revert Vercel dashboard settings.

Migration risks include temporary canonical disagreement during cutover, Google recrawl delay, and clients caching earlier permanent redirects. Browser storage is origin-scoped: analytics consent and session attribution on www do not automatically transfer to apex; preserve the existing consent policy rather than silently treating new-origin visits as consented.

Still unverified: Search Console indexing/selected canonicals/manual actions/security, exact Vercel dashboard setup and release identity, preview protection, production environment values, real inquiry delivery, real analytics collection, mobile/full interaction regression and external rich-result validation. No DNS, TLS or provider change is justified by the observed behavior.

**Historical scope update:** at this milestone the user approved the local patch only. Later, separately authorized production and Search Console steps are recorded in sections 11–12.

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

### Status at the local-only milestone — superseded by sections 11–14

**Implemented and tested locally:** canonical identity and all existing consumers, analytics host handling, regression checks and operating instructions. No application regression was found in the checks above.

**Not deployed or production-tested:** this new non-www build. The production matrix in section 2 records the pre-change www behavior. Actual HTTP/HTTPS host redirects remain the separate Vercel cutover from section 6, requiring later authorization and live validation. Do not deploy the source change alone while apex still redirects to www; it would also disable tracking on the old www host by design.

**Still unverified:** Google-selected canonicals/indexing and Search Console reports, production mail/analytics collection, hosting dashboard/preview protection, full mobile/device coverage and external rich-result validation. Successful local tests cannot guarantee behavior of untested external services or every client.

For rollback of this local patch, restore only the nine modified tracked files listed above to their baseline versions (or reverse these exact hunks if later work exists). That restores the four www identity values, standalone analytics hostname and previous test/documentation expectations. The audit report and CSV may remain as evidence. No production rollback is required because no release occurred.

## 11. Final production release — 24 October 2026

### Release identity and approved sequence

| Item | Verified state |
|---|---|
| Existing Vercel project | `arun-acharya`, team `arunacharya1603s-projects`; production branch `main` |
| Current production commit | `0b472c20d6cad97808e8996ca286591cf8130588` (`fix: prepare non-www canonical site identity`) |
| Current deployment | `A6SL9TWecPiKYknFtmkptkecZTi5`, Ready / Production; promotion and current-domain assignment verified |
| Previous production commit | `b3e630443dd68d779b8237233d9984ee92dea4c7` |
| Previous deployment | `6wrHreudtrn45JD5rTrKChzZUXNc`; retain as the rollback target |
| Apex custom domain | `arunacharya1603.in` serves Production directly; no hostname redirect |
| www custom domain | `www.arunacharya1603.in` permanently redirects to `arunacharya1603.in` with 308 |
| Automatic custom-domain assignment | **OFF**; rechecked after release. Future production-branch builds require deliberate promotion/assignment to these custom domains |
| Existing Vercel alias | `portfolio-arun-acharya.vercel.app` retained; no unrelated alias or provider changes |

Each consequential step had separate user authorization: turn off Auto-assign Custom Production Domains; commit and push the tested patch; verify the resulting staged build while the old production remained live; remove only apex → www; verify apex serves the old production directly; promote the tested non-www build; verify production; then set www → apex to permanent 308 and verify it. Opposite hostname redirects were never intentionally active together.

Staging used the existing protection. Anonymous requests to the unique staged deployment redirected to authentication and carried `noindex`; the signed-in browser verified the staged site. Protection was not disabled to run tests. The full anonymous HTTP suite was run on the custom production domains after promotion, rather than treating authenticated preview navigation as proof of public response headers.

The release commit contains two runtime files (`lib/site.ts`, `lib/analytics.ts`), five regression scripts and four documentation/evidence files: README, measurement notes, this audit and the redirect CSV. The runtime changes reuse the existing Metadata API, sitemap and robots generators. No content, public slugs, dependencies, inquiry delivery implementation, authentication, UI or styling was changed.

### Production redirect behavior

| Incoming valid page | Measured response chain | Redirect hops |
|---|---|---:|
| HTTPS/non-www | Direct 200, self-canonical on non-www | 0 |
| HTTPS/www | 308 to the same HTTPS/non-www path and query, then 200 | 1 |
| HTTP/non-www | 308 to HTTPS/non-www, then 200 | 1 |
| HTTP/www | 308 to HTTPS/www, 308 to HTTPS/non-www, then 200 | 2 |

The final redirect run checked all 42 sitemap pages through HTTPS/www with a query containing repeated keys, an empty value, encoded delimiters, spaces and Unicode. Each destination returned 200 with its clean non-www canonical. Five representative HTTP/www chains preserved the exact path and query and used two redirects. Twelve special-resource/error probes retained the expected final 200, 404 or POST-only API GET 405. Ten existing route redirects retained their targets and query values. GitHub's external destination was not followed, so its final response is not claimed.

The two-hop HTTP/www path is a Vercel limitation, not an unnoticed loop: HTTPS enforcement occurs before hostname normalization and cannot be disabled. Retired routes can add their existing route redirect (for example HTTPS/www `/locations/delhi` → HTTPS/non-www `/locations/delhi` → `/locations`). Do not change DNS/providers, weaken HTTPS or add another redirect layer to remove these bounded hops. [Vercel HTTPS behavior](https://vercel.com/docs/cdn-security/encryption)

The CSV contains 16 preserved `baseline-www` rows and 113 `production-non-www` observations. Its legacy-route rows record the observed destination origin/path and successful query-value preservation; exact final query serialization was not retained by that probe and is explicitly marked. It does not invent an external GitHub final status or a canonical check for a non-HTML resource. Multiple rows can cover the same URL when different checks were performed; row count is not a count of unique pages.

### Production SEO and regression results

| Check | Verified result |
|---|---|
| Public page coverage | All 42 sitemap pages passed the production SEO suite after promotion; HTTPS/www redirects were then checked across all 42 pages |
| Page metadata | One correct non-www canonical per eligible page; unique titles/descriptions, matching OG URLs, inherited indexable robots, accessible HTML and one H1 |
| Structured data | JSON-LD parsed; non-www Person/WebSite/page identities and case-study/article checks passed. This is not exhaustive rich-result eligibility certification |
| Sitemap and robots | Existing endpoints return 200; 42 unique eligible non-www URLs; blog dates remain data-driven; public crawling allowed; API disallow retained; non-www sitemap directive |
| Internal links | Local generated graph: 42 pages, 1,285 anchors, 760 unique edges, zero broken targets/missing fragments/orphans/unreachable pages, maximum depth 2. Hosted staged and production link checks also passed |
| Queries and legacy routes | Query-free canonicals and preserved legitimate query values; all ten intentional route redirects retained |
| Missing/test routes | True 404 responses without a homepage canonical; Sentry test page remains explicitly noindex and outside the sitemap |
| Assets and API | Fifteen homepage CSS/JS assets and favicon returned 200; contact endpoint GET remained 405. No real inquiry was sent |
| Browser smoke checks | Homepage/images rendered, no observed horizontal overflow or console warnings/errors; contact required-field validation blocked empty submission; client navigation and planner price/currency changes passed |
| Analytics | Zero tag scripts before consent, one after Allow on apex, zero after decline/reload. www host gate was checked while www still served directly; local and staged hosts remained excluded |
| Build and local checks | Production build, typecheck, SEO data, analytics/inquiry mocks, smooth-scroll and generated-link checks passed; lint passed with 11 pre-existing warnings |

### Evidence provenance

Local evidence is retained outside Git in `C:/Users/aruna/.codex/visualizations/2026/10/24/01a16c90-b0a3-76c2-8526-bd884fce51a7/`. Relevant files: `non-www-staged-validation.json`, `apex-production-routing-verification.json`, `non-www-production-verification.json`, `www-308-verification.json`, `verify-www-redirect.cjs`, and the corresponding Vercel screenshots. The script is evidence of the completed check, not a command run during this documentation edit.

These are sequential snapshots. In particular, the production verification JSON's www "No Redirect" describes the deliberate intermediate step before www → apex was enabled; `www-308-verification.json` and `www-permanent-308-confirmed.jpg` record the final behavior. Do not interpret an earlier snapshot as the current setting.

## 12. Search Console results — 24 October 2026

Google's signed-in Search Console UI supplied the results; the optional GSC Wizard connector remained subscription-blocked. All three existing properties were accessible and verified: Domain `arunacharya1603.in`, URL-prefix `https://arunacharya1603.in/`, and URL-prefix `https://www.arunacharya1603.in/`. No property, verification token or verification record was removed or recreated.

| Check/action | Observed result |
|---|---|
| Non-www sitemap in Domain property | Resubmitted once with explicit authorization. Google confirmed submission and processing success; submitted and last read 24 October 2026; 42 discovered pages, zero videos |
| Existing www sitemap record | Left unchanged; its last observed successful read was 22 October 2026. No duplicate sitemap endpoint or submissions across all properties were created |
| Page indexing report | Last updated 16 October 2026: 33 indexed, 33 not indexed. Exclusions: 13 Page with redirect, 4 Redirect error, 1 Alternate with proper canonical, 15 Discovered currently not indexed, 0 Crawled currently not indexed. These include historical host/route variants, not 33 broken current sitemap pages |
| Manual actions / security | Both reported no issues detected |
| Domain crawl stats | Last updated 21 October 2026: 152 requests over 90 days; www 142, apex 10; no host problems reported. Historical activity does not prove post-migration recrawling |
| Performance reference | Observed 28-day filter: 4 clicks, 165 impressions, 2.4% CTR, average position 7.4; available chart covered 11–22 October. Captured after rollout from historical data, not a measured migration outcome |

The non-www homepage's indexed record still described the old Page with redirect state and www canonical (last crawl 12 October); the www homepage's record was indexed with a www canonical from before the cutover. ChainReach's indexed record still showed the June redirect error. The landing-page service's indexed record already used its own non-www canonical. The two articles below were unknown to Google's index in the inspected records. These historical records are kept separate from the successful live tests.

### Authorized indexing requests

Google live tests passed first, then one Request indexing action per URL was accepted into Google's priority crawl queue:

- `https://arunacharya1603.in/`
- `https://arunacharya1603.in/work/chainreach-ai`
- `https://arunacharya1603.in/blog/saas-dashboard-development-scope`
- `https://arunacharya1603.in/blog/react-nextjs-performance-audit-brief`

Evidence: `gsc-indexing-requests-confirmed.json` and four `gsc-indexing-request-*.jpg` confirmations. Acceptance does not establish that a page is indexed or that Google selected the non-www canonical. Live tests cannot determine Google's indexed canonical. [Google URL Inspection guidance](https://support.google.com/webmasters/answer/9012289)

### Redirect-error validation

Fresh smartphone live tests succeeded for every URL in the four-example Redirect error report:

| Inspected path on HTTPS/non-www | Test time (Asia/Kolkata, 24 October) | Page fetch / crawl / indexing allowed | User-declared canonical in live result |
|---|---|---|---|
| `/work` | 18:28:57 | Successful / Yes / Yes | `https://arunacharya1603.in/work` |
| `/work/chainreach-ai` | 18:29:01 | Successful / Yes / Yes | `https://arunacharya1603.in/work/chainreach-ai` |
| `/blog/author/arun-acharya` | 18:29:27 | Successful / Yes / Yes | `https://arunacharya1603.in/blog/author/arun-acharya` |
| `/locations/delhi` | 18:29:34 | Successful / Yes / Yes | `https://arunacharya1603.in/locations` |

Delhi intentionally redirects to `/locations`; Google's live test followed it. There is no requirement to index the retired Delhi URL separately.

After all four tests passed, Validate Fix was clicked once on the Domain property's Redirect error report. Google confirmed **Validation started — Started: 10/24/26**. A subsequent read-only refresh still showed Started and the historical four affected pages. Validation is not complete. Evidence: `gsc-redirect-validation.json`, `gsc-redirect-validation-started.jpg`, and four `gsc-redirect-live-*.jpg` captures. Sitemap evidence: `gsc-non-www-sitemap-submitted.jpg` and `gsc-non-www-sitemap-processed.jpg`.

Next read-only checks: wait for validation progress; inspect the indexed (not just live) destination records and Google-selected canonicals after recrawling; compare complete performance periods and watch for new crawl failures. Expected Page with redirect exclusions on old www or retired URLs are not, by themselves, errors. Do not repeatedly request indexing or resubmit successful sitemaps. Keep all three properties. Google's Change of Address tool is not used for a same-domain www/non-www move. [Google guidance](https://support.google.com/webmasters/answer/9370220)

## 13. Exact rollback plan — instructions only, not executed

A production rollback requires fresh authorization. It changes both Vercel routing and the active build; a Git revert alone cannot restore dashboard settings. Use the existing project and retain both custom domains. Leave Auto-assign Custom Production Domains OFF throughout the rollback.

1. **Verify the target before changing routing.** In `arunacharya1603s-projects/arun-acharya`, confirm the current deployment is `A6SL9TWecPiKYknFtmkptkecZTi5` / `0b472c20d6cad97808e8996ca286591cf8130588`, and that the previous Ready deployment `6wrHreudtrn45JD5rTrKChzZUXNc` belongs to commit `b3e630443dd68d779b8237233d9984ee92dea4c7`. Record any intervening releases or user edits. If the previous deployment is unavailable or its identity differs, stop and prepare a separately approved recovery; do not substitute a guessed deployment or expose environment values.
2. **Remove the www → apex redirect first.** In Domains, edit only `www.arunacharya1603.in`, connect it directly to Production with No Redirect, and save. Leave apex connected directly to Production. Verify fresh HTTPS requests to both homepages and a representative service/blog path return 200 without a hostname redirect. At this brief intermediate step both hosts serve the current non-www build. Do not enable apex → www while www still redirects to apex.
3. **Restore the previous production build.** Promote/roll back to the verified deployment `6wrHreudtrn45JD5rTrKChzZUXNc` through Vercel's deployment controls. Confirm the intended previous deployment becomes Current for both custom domains. Check www pages return 200 with their own www canonicals; sitemap, robots and structured data must use www again. Confirm the consent-gated analytics host agrees with www. Do not change environment variables, TLS, DNS, nameservers, unrelated aliases or API routes.
4. **Restore apex → www only after www serves correctly.** In Domains, set only `arunacharya1603.in` to permanent 308 redirect to `www.arunacharya1603.in`, retaining path and query. Verify saved settings and fresh responses. Expected restored matrix for valid pages: HTTPS/www 200 (0 hops), HTTP/www → HTTPS/www → 200 (1 hop), HTTPS/apex → HTTPS/www → 200 (1 hop), HTTP/apex → HTTPS/apex → HTTPS/www → 200 (2 hops).
5. **Verify the complete restored configuration.** Check every sitemap page, representative services/projects/articles, repeated and encoded queries, all existing route redirects, sitemap XML, robots, clean www canonicals/OG/JSON-LD, loaded assets, genuine 404s, API GET 405, navigation, empty-form validation and consent behavior. Inspect actual Location headers and detect loops. Use owner-authorized real delivery/GA reporting checks separately; do not send fake inquiries. Previously cached permanent redirects can outlive the change, so fresh-network checks do not prove every cached client has recovered.
6. **Reconcile source and records before another release.** Prepare a separately reviewed source patch restoring www site identity and matching host expectations in the five affected regression scripts; use `b3e6304` as the reference, preserve the useful 404 test correction and later unrelated changes, and keep this historical migration record. The shared analytics host gate may continue to derive from the restored `siteConfig.host`. Run the full checks before any newly authorized push/promotion. Do not hard-reset the working tree or blindly revert all 11 files and delete the audit. Update the recorded active deployment, routing matrix and measurement origin. Keep Search Console properties/verification; review the now-pending non-www validation/indexing actions and the restored canonical sitemap before proposing any further Google action.

If a verification gate fails, stop before the next routing reversal and investigate the last change. Do not add compensating reciprocal redirects. The rollback procedure itself has not been exercised in production.

## 14. Completion status and remaining limits

- **Implemented and production-tested:** canonical-host migration, Vercel 308 normalization, 42-page SEO checks, sitemap/robots, internal links, preserved routes/queries, assets, tested browser flows and consent/hostname gating.
- **Actions accepted; outcome pending:** sitemap processing succeeded, four indexing requests were queued and redirect-error validation started. Google recrawling, final canonical selection, indexing and traffic effects remain to be observed.
- **Not fully verified:** real SMTP delivery/inbox receipt, GA4 Realtime/report ingestion or real lead events, full mobile/device interaction coverage, exhaustive external rich-result eligibility, and post-promotion indexability/protection behavior of every Vercel alias. No production environment values were inspected to close these gaps.
- **Operational choice retained:** automatic custom-domain assignment stays OFF; later deployments require deliberate promotion. Re-enabling it is optional and needs separate authorization, not an SEO repair.
- **Local documentation completed:** current release/GSC results and the rollback procedure are recorded in this audit, the dated CSV, README and measurement notes. This edit does not commit, push, deploy, change settings or rerun Google requests. Existing warnings and unrelated application behavior remain outside its scope.
