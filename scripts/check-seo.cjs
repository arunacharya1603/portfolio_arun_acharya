// Test the running production build: node scripts/check-seo.cjs http://localhost:3005
const assert = require("node:assert/strict");
const base = process.argv[2] || "http://localhost:3005";
const canonicalOrigin = "https://www.arunacharya1603.in";

async function main() {
  const response = await fetch(`${base}/sitemap.xml`);
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => item[1]);
  assert.ok(urls.length > 0);
  assert.equal(new Set(urls).size, urls.length);
  for (const route of ["/resources", "/contact", "/tools/website-cost-planner", "/blog/physiotherapy-website-booking-brief", "/blog/saas-dashboard-development-scope", "/blog/react-nextjs-performance-audit-brief"]) assert.ok(urls.includes(`${canonicalOrigin}${route}`), `${route} missing from sitemap`);
  const internalPaths = new Set();
  const titles = new Set();
  const descriptions = new Set();
  for (let i = 0; i < urls.length; i += 5) {
    await Promise.all(urls.slice(i, i + 5).map(async (url) => {
      assert.equal(new URL(url).origin, canonicalOrigin);
      const res = await fetch(`${base}${new URL(url).pathname}`, { redirect: "manual" });
      assert.equal(res.status, 200, `${url} must return 200 without a redirect`);
      const html = await res.text();
      const document = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");
      assert.ok(html.includes(`rel="canonical" href="${url}"`), `Wrong canonical: ${url}`);
      assert.equal([...document.matchAll(/rel="canonical"/g)].length, 1, `Duplicate canonical: ${url}`);
      assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `Expected one page heading: ${url}`);
      assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `Unexpected noindex: ${url}`);
      assert.match(document, /<meta name="robots" content="index, follow"/, `Missing inherited robots: ${url}`);
      assert.match(document, /<meta name="googlebot" content="[^"]*max-image-preview:large/, `Missing inherited preview directive: ${url}`);
      const title = /<title>(.*?)<\/title>/.exec(document)?.[1];
      const description = /<meta name="description" content="([^"]+)"/.exec(document)?.[1];
      assert.ok(title && !titles.has(title), `Missing or duplicate title: ${url}`);
      assert.ok(description && !descriptions.has(description), `Missing or duplicate description: ${url}`);
      titles.add(title);
      descriptions.add(description);
      for (const field of ["title", "description", "url", "image", "type", "locale", "site_name"]) {
        assert.ok(document.includes(`property="og:${field}"`), `Missing OG ${field}: ${url}`);
      }
      assert.ok(document.includes('name="twitter:card" content="summary_large_image"'), `Missing Twitter card: ${url}`);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
      if (new URL(url).pathname.startsWith("/work/")) {
        const work = schemas.find((schema) => schema["@id"] === `${url}#case-study`);
        assert.equal(work?.["@type"], "CreativeWork", `Missing case-study identity: ${url}`);
        assert.equal(work.author["@id"], `${canonicalOrigin}#person`);
        assert.ok(work.creditText && work.about?.name, `Missing project scope: ${url}`);
        assert.ok(!schemas.some((schema) => schema["@type"] === "SoftwareApplication"));
        assert.match(document, /property="og:image:width" content="\d+"/);
        assert.match(document, /property="og:image:height" content="\d+"/);
      }
      if (new URL(url).pathname === "/") {
        const services = schemas.find((schema) => schema["@id"] === `${canonicalOrigin}/#services-itemlist`);
        assert.equal(services.itemListElement.length, 4, "Homepage schema must match four visible services");
        assert.ok(document.includes("Projects in this portfolio"));
        assert.ok(document.includes("Interface demos"));
      }
      if (new URL(url).pathname === "/about") {
        assert.equal(schemas.find((schema) => schema["@type"] === "AboutPage").mentions.length, 5);
      }
      const article = schemas.find((schema) => schema["@type"] === "Article");
      if (article) {
        assert.ok(document.includes(`Updated ${article.dateModified}`), `Visible article date differs: ${url}`);
        assert.ok(document.includes(`property="article:modified_time" content="${article.dateModified}"`), `OG article date differs: ${url}`);
        const sitemapEntry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find((entry) => entry[1].includes(`<loc>${url}</loc>`));
        assert.ok(sitemapEntry?.[1].includes(`<lastmod>${article.dateModified}`), `Sitemap article date differs: ${url}`);
      }
      for (const anchor of document.matchAll(/<a\b[^>]*>/g)) {
        const link = /href="(\/[^"?#]*)/.exec(anchor[0]);
        if (!link) continue;
        if (!link[1].startsWith("/_next") && !/\.[a-z0-9]+$/i.test(link[1])) internalPaths.add(link[1]);
      }
    }));
  }
  const known = new Set(urls.map((url) => new URL(url).pathname));
  for (const route of internalPaths) {
    if (known.has(route)) continue;
    assert.equal((await fetch(`${base}${route}`)).status, 200, `Broken internal link: ${route}`);
  }
  for (const [route, destination] of [["/reviews", "/work"], ["/locations/delhi", "/locations"]]) {
    const redirect = await fetch(`${base}${route}`, { redirect: "manual" });
    assert.equal(redirect.status, 308, `${route} must permanently redirect`);
    assert.equal(redirect.headers.get("location"), destination, `${route} has the wrong redirect target`);
  }
  for (const route of ["/locations/not-a-market", "/work/not-a-project", "/services/not-a-service", "/blog/not-an-article", "/not-a-real-page"]) {
    const missing = await fetch(`${base}${route}`, { redirect: "manual" });
    assert.equal(missing.status, 404, `Missing route must return 404: ${route}`);
    const html = await missing.text();
    assert.match(html, /<meta name="robots" content="[^"]*noindex/, `Missing route must be noindex: ${route}`);
    assert.ok(!/<link rel="canonical"/.test(html), `Missing route must not inherit homepage canonical: ${route}`);
  }
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  assert.ok(robots.includes("Disallow: /api/"));
  assert.ok(!robots.includes("Disallow: /sentry-example-page"), "Allow crawlers to read the test-page noindex");
  const testPage = await fetch(`${base}/sentry-example-page`);
  assert.equal(testPage.status, 200);
  assert.match(await testPage.text(), /<meta name="robots" content="noindex, nofollow/);
  assert.ok(!urls.includes(`${canonicalOrigin}/sentry-example-page`));
  console.log(`PASS: ${urls.length} sitemap pages return 200 with unique metadata, matching canonicals, inherited robots, social metadata, one h1 and valid JSON-LD. Links, case-study scope, redirects, noindex and 404 behavior pass.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
