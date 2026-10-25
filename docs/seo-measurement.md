# Portfolio measurement

## Google Analytics

- Property: `portfolio-aea53` (`522258245`)
- Web stream: Arun Acharya Portfolio (`16112961650`)
- Public measurement ID: `G-J713ZJ8TRT` (not a secret)
- Production origin: `https://arunacharya1603.in`, live after the authorized 24 October 2026 cutover. Release commit `0b472c20d6cad97808e8996ca286591cf8130588`, Vercel deployment `A6SL9TWecPiKYknFtmkptkecZTi5`. Apex serves directly; www redirects to apex with 308. See the [production record](seo/canonical-hostname-audit.md#11-final-production-release--24-october-2026).
- `page_view`: initial page and subsequent App Router navigation, after consent.
- `generate_lead`: after the inquiry endpoint returns success; marked as a GA4 key event, once per event, with no assigned monetary value.
- Enhanced measurement is disabled in the web stream. Keep it disabled to avoid duplicate page views and automatic form collection.

`lib/analytics.ts` owns the tag and event payloads. `components/AnalyticsConsent.tsx` owns the preference controls. The inquiry conversion is called centrally from `lib/submit-project-inquiry.ts`, so contact, service proposal and cost planner forms use the same success rule.

The analytics host gate derives from `siteConfig.host` and was released with the hostname switch. It measures only the non-www production host after consent. Consent storage is origin-scoped, so a visitor's www consent does not automatically transfer to non-www; the existing consent flow still applies. Do not interpret a change in measured sessions as a traffic change without accounting for consent, browser blocking and the hostname transition.

The Google script loads only after analytics consent and only on the canonical production host. No tracking runs on localhost or Vercel previews. Form values never enter analytics events. Page URLs omit query strings and fragments; referrers contain only the origin. Advertising signals are disabled. Choosing “No thanks” stops measurement and removes the site's GA cookies. The preference lasts 180 days and is available in the footer.

First-touch referral and campaign details in inquiry emails are handled separately by `lib/inquiry-attribution.ts`. They are not GA event parameters. Conversion counts cover consenting visitors whose browsers allow Analytics, so they can be lower than the number of delivered emails.

## Click tracking — 25 October 2026

The website changes below are prepared locally and are not deployed. The three event-scoped custom dimensions are already registered in property `522258245` so reporting is ready when the code is released.

| Control | Event | Meaning |
|---|---|---|
| Copy install command | `install_command_copy_click` | One event after each copy attempt resolves; `copy_result` is `success` or `error`. This is not an installation count. |
| View on npm | `npm_link_click` | Activation of the package's npm link. |
| View on GitHub | `github_link_click` | Activation of the package's repository link, not general footer social links. |
| Start Project | `start_project_click` | Activation of the shared contact CTA, including header/mobile-menu versions. |
| Book a call | `book_call_click` | Activation of the shared Calendly CTA, including header/mobile-menu/footer versions. This is not a completed booking. |

Each event includes a sanitized page location/path and `ui_location`. On `/packages/seo-engineering`, it also includes `package_name: seo-engineering`. Registered dimensions:

- **Button placement** → `ui_location`: `package_hero`, `package_overview`, `page_cta`, `header`, `mobile_menu`, or `footer`.
- **Package name** → `package_name`.
- **Copy result** → `copy_result`.

The package index and detail page are now recognized by the analytics page allowlist instead of being reported as `/not-found`. Click events use the same consent and canonical-host gate as page views and leads. They send no form values, arbitrary link URLs or clipboard contents. Primary clicks, keyboard activation and middle-click navigation are supported; analytics failures cannot block the action. No derived GA4 custom-event rules were created, and these click events were not marked as key events. `generate_lead` remains a separate successful-inquiry event.

### Account verification

On 25 October, the authenticated Google Analytics UI confirmed property **portfolio-aea53**, stream **Arun Acharya Portfolio** (`16112961650`), measurement ID **G-J713ZJ8TRT**, and active collection in the past 48 hours. Enhanced measurement remains disabled. The stream's display URL still uses www; the current site's canonical-host gate uses the apex domain. These observations confirm the existing connection, not delivery of the new click events.

The three dimensions above were saved and verified in Admin → Data display → Custom definitions. The optional GSC Wizard connector was subscription-blocked; Google Analytics was used directly. No production website deployment or test lead was performed.

### Reading the counts after deployment

Use the **Events** report with **Event name** and **Event count** for the five names above. For package-specific analysis, create an Explore free-form table with Event name as rows, Event count as values, and Page path and screen class filtered to `/packages/seo-engineering`. Add Button placement, Package name or Copy result as needed. Use Total users to distinguish people from repeat clicks. Filter Copy result to `success` when counting successful copies.

After the authorized deployment, verify a consented interaction in Realtime (or DebugView with debug mode enabled for the test session). Check each expected event once and verify its source page, placement and copy outcome. Localhost and previews intentionally send no production events. Registration/report processing can take up to 48 hours; these fields will not reconstruct clicks from before the implementation. Counts include only consenting visitors whose browsers allow Analytics. See [Google's event parameter guidance](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters).

## Validation

```sh
node scripts/check-analytics.cjs
npm run build
npm run start -- --port 3005
node scripts/check-seo.cjs http://localhost:3005
```

The analytics check uses isolated browser and fetch stubs. It sends no Google events or inquiry emails. It covers consent, expiry, revocation, sanitized payloads, navigation deduplication, production-only loading, package paths, click handlers, successful/failed copying, cancelled navigation, and failed/honeypot submissions.

### Completed release checks — 24 October 2026

- Local analytics and inquiry tests passed with browser, delivery and storage mocks; these do not prove Google ingestion or inbox receipt.
- The protected staged deployment rendered correctly and loaded no Google tag after consent/navigation. Protection was retained.
- Production apex had zero Google tag scripts before consent, one after Allow, and zero after decline/reload. The www host gate excluded measurement even after Allow when www still served directly during the controlled cutover; www now redirects to apex.
- Homepage rendering, navigation, contact required-field validation and cost-planner currency/service changes passed. Empty forms were blocked; no real inquiry email was sent.
- The production SEO suite passed across 42 sitemap pages; build and type checks passed; lint reported 11 existing warnings. Full mobile/device interaction coverage was not performed.

**Still unverified:** GA4 Realtime/report ingestion, real `generate_lead` events, SMTP delivery and inbox receipt. The existing property/stream configuration above is retained context, not a claim that GA4 settings or reports were re-audited during this migration. When separately authorized, verify consented navigation in GA4 Realtime. Verify lead measurement and delivery with the next genuine inquiry; do not submit fake leads. Standard reports need processing time.

## Search Console migration record — 24 October 2026

All three existing properties remain verified and intact. Use the Domain property `arunacharya1603.in` for aggregate monitoring and the two HTTPS URL-prefix properties for host-specific diagnosis. Signed-in Google Search Console was used because the optional connector was subscription-blocked.

| Item | Observed state |
|---|---|
| Canonical sitemap | `https://arunacharya1603.in/sitemap.xml`; resubmitted once in the Domain property; submitted/read 24 October; Success, 42 discovered pages, zero videos |
| Four indexing requests | Homepage, `/work/chainreach-ai`, `/blog/saas-dashboard-development-scope`, `/blog/react-nextjs-performance-audit-brief`: live tests passed and Google confirmed addition to its priority crawl queue |
| Four historical redirect-error URLs | `/work`, `/work/chainreach-ai`, `/blog/author/arun-acharya`, `/locations/delhi`: fresh live fetches succeeded, crawl/indexing allowed. Delhi correctly resolves to canonical `/locations` |
| Redirect error validation | Started 24 October after all four tests passed; still Started at the read-only follow-up. Not completed; the historical four affected pages remain displayed |
| Indexing report reference | Report dated 16 October: 33 indexed / 33 not indexed; includes historical host and retired-route variants, not 33 broken canonical pages |
| Manual actions / security | No issues detected in either report |

The 28-day Performance view captured on 24 October showed **4 clicks, 165 impressions, 2.4% CTR, average position 7.4**, with available chart dates 11–22 October. This is historical reference data captured after rollout, not a true before-and-after experiment or evidence of a traffic gain/loss. Domain crawl stats last updated 21 October showed 152 requests over 90 days and no reported host problems; those figures predate migration processing.

Next checks are read-only: follow validation progress, inspect the indexed destination records and Google-selected canonicals after recrawling, and compare complete periods by page/query. Separate old www redirects from failures at their non-www destinations. Queued requests, live-test success and sitemap processing do not guarantee indexing or canonical selection. Do not repeatedly resubmit, delete properties/verification, or use Change of Address for this same-domain www/non-www move. See [Google URL Inspection guidance](https://support.google.com/webmasters/answer/9012289), [Change of Address scope](https://support.google.com/webmasters/answer/9370220), and the [complete dated evidence](seo/canonical-hostname-audit.md#12-search-console-results--24-october-2026).

## Deployment control and rollback

Auto-assign Custom Production Domains remains **OFF**. Future production-branch builds need deliberate promotion to the custom domains after testing and separate authorization. This setting is an operational choice, not an analytics defect.

For an authorized rollback, follow the [exact sequence and verification gates](seo/canonical-hostname-audit.md#13-exact-rollback-plan--instructions-only-not-executed): remove www → apex first and make both hosts serve Production directly; restore deployment `6wrHreudtrn45JD5rTrKChzZUXNc` / commit `b3e630443dd68d779b8237233d9984ee92dea4c7`; verify www metadata and analytics host; then restore apex → www 308. Keep automatic assignment OFF and reconcile the source before another release. The previous build measures www after consent; origin-scoped consent does not automatically migrate back. Recheck consent/tag behavior and, separately, real reporting. No rollback, settings change or new Google action was performed by this documentation update.

## Mobile baseline — 12 October 2026

[PageSpeed report](https://pagespeed.web.dev/analysis/https-www-arunacharya1603-in/1rjs8fsh0m?form_factor=mobile): performance 92, accessibility 100, best practices 100, SEO 100. LCP 2.9 seconds, TBT 80 ms, CLS 0. This is a lab result before analytics was added, not a real-user Core Web Vitals pass. CrUX had insufficient data.

Search Console and Bing indexing are separate from Analytics. Bing's AI Performance report is available; an empty report does not establish that every AI answer engine has no citations. Clear, factual project summaries support discovery, but indexing and AI citations are not guaranteed by markup or `llms.txt`.

The featured project summaries use the existing documented scope. New client testimonials or business results should be added only with approved wording and supporting evidence.
