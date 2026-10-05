// Test the running production build: node scripts/check-seo.cjs http://localhost:3005
const assert = require("node:assert/strict");
const base = process.argv[2] || "http://localhost:3005";
const canonicalOrigin = "https://www.arunacharya1603.in";

async function main() {
  const response = await fetch(`${base}/sitemap.xml`);
  assert.equal(response.status, 200);
  const urls = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((item) => item[1]);
  assert.ok(urls.length > 0);
  assert.equal(new Set(urls).size, urls.length);
  for (const route of ["/resources", "/contact", "/tools/website-cost-planner", "/blog/physiotherapy-website-booking-brief", "/blog/saas-dashboard-development-scope", "/blog/react-nextjs-performance-audit-brief"]) assert.ok(urls.includes(`${canonicalOrigin}${route}`), `${route} missing from sitemap`);
  const internalPaths = new Set();
  for (let i = 0; i < urls.length; i += 5) {
    await Promise.all(urls.slice(i, i + 5).map(async (url) => {
      assert.equal(new URL(url).origin, canonicalOrigin);
      const res = await fetch(`${base}${new URL(url).pathname}`, { redirect: "manual" });
      assert.equal(res.status, 200, `${url} must return 200 without a redirect`);
      const html = await res.text();
      assert.ok(html.includes(`rel="canonical" href="${url}"`), `Wrong canonical: ${url}`);
      assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `Expected one page heading: ${url}`);
      assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `Unexpected noindex: ${url}`);
      for (const schema of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(schema[1]);
      for (const link of html.matchAll(/href="(\/[^"?#]*)/g)) {
        if (!link[1].startsWith("/_next") && !/\.[a-z0-9]+$/i.test(link[1])) internalPaths.add(link[1]);
      }
    }));
  }
  const known = new Set(urls.map((url) => new URL(url).pathname));
  for (const route of internalPaths) {
    if (known.has(route)) continue;
    assert.equal((await fetch(`${base}${route}`)).status, 200, `Broken internal link: ${route}`);
  }
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  console.log(`PASS: ${urls.length} sitemap pages return 200 with matching www canonicals, one h1, indexable metadata and parseable JSON-LD. Internal links resolve.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
