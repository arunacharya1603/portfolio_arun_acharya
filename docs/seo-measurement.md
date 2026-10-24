# Portfolio measurement

## Google Analytics

- Property: `portfolio-aea53` (`522258245`)
- Web stream: Arun Acharya Portfolio (`16112961650`)
- Public measurement ID: `G-J713ZJ8TRT` (not a secret)
- Prepared production origin: `https://arunacharya1603.in`. The live site still used www at the 24 October 2026 audit; release requires the coordinated hosting cutover in [the migration plan](seo/canonical-hostname-audit.md).
- `page_view`: initial page and subsequent App Router navigation, after consent.
- `generate_lead`: after the inquiry endpoint returns success; marked as a GA4 key event, once per event, with no assigned monetary value.
- Enhanced measurement is disabled in the web stream. Keep it disabled to avoid duplicate page views and automatic form collection.

`lib/analytics.ts` owns the tag and event payloads. `components/AnalyticsConsent.tsx` owns the preference controls. The inquiry conversion is called centrally from `lib/submit-project-inquiry.ts`, so contact, service proposal and cost planner forms use the same success rule.

The analytics host gate now derives from `siteConfig.host`. Deploy it with the canonical-host switch: this prepared build excludes www from measurement. Consent storage is origin-scoped, so a visitor's www consent does not automatically transfer to non-www; the existing consent flow still applies.

The Google script loads only after analytics consent and only on the canonical production host. No tracking runs on localhost or Vercel previews. Form values never enter analytics events. Page URLs omit query strings and fragments; referrers contain only the origin. Advertising signals are disabled. Choosing “No thanks” stops measurement and removes the site's GA cookies. The preference lasts 180 days and is available in the footer.

First-touch referral and campaign details in inquiry emails are handled separately by `lib/inquiry-attribution.ts`. They are not GA event parameters. Conversion counts cover consenting visitors whose browsers allow Analytics, so they can be lower than the number of delivered emails.

## Validation

```sh
node scripts/check-analytics.cjs
npm run build
npm run start -- --port 3005
node scripts/check-seo.cjs http://localhost:3005
```

The analytics check uses isolated browser and fetch stubs. It sends no Google events or inquiry emails. It covers consent, expiry, revocation, sanitized payloads, navigation deduplication, production-only loading, and failed/honeypot submissions.

To verify a deployment, visit production, allow analytics, navigate between public pages, and inspect GA4 Realtime. Verify a real `generate_lead` when the next genuine inquiry arrives; do not submit fake leads into production. Standard reports need processing time.

## Mobile baseline — 12 October 2026

[PageSpeed report](https://pagespeed.web.dev/analysis/https-www-arunacharya1603-in/1rjs8fsh0m?form_factor=mobile): performance 92, accessibility 100, best practices 100, SEO 100. LCP 2.9 seconds, TBT 80 ms, CLS 0. This is a lab result before analytics was added, not a real-user Core Web Vitals pass. CrUX had insufficient data.

Search Console and Bing indexing are separate from Analytics. Bing's AI Performance report is available; an empty report does not establish that every AI answer engine has no citations. Clear, factual project summaries support discovery, but indexing and AI citations are not guaranteed by markup or `llms.txt`.

The featured project summaries use the existing documented scope. New client testimonials or business results should be added only with approved wording and supporting evidence.
