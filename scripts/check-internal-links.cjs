// Run after npm run build. Add --json for the measured graph; no network or file writes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const origin = "https://arunacharya1603.in";
const buildRoot = ".next/server/app";

const decode = (value) => value
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const plainText = (value) => decode(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

// shortcut: targets Next's generated HTML; use an HTML parser if input becomes arbitrary HTML.
function extract(html, source) {
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const mainStart = html.indexOf("<main ");
  const mainEnd = html.indexOf("</main>");
  const links = [];
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const href = /\bhref="([^"]*)"/.exec(match[1]);
    if (!href) continue;
    const url = new URL(decode(href[1]), origin + source);
    if (!["www.arunacharya1603.in", "arunacharya1603.in"].includes(url.hostname)) continue;
    const anchor = plainText(match[2]) || decode(/\baria-label="([^"]*)"/.exec(match[1])?.[1] || "");
    const inMain = match.index > mainStart && match.index < mainEnd;
    const sharedCta = inMain && anchor === "Start Project" && html.slice(Math.max(mainStart, match.index - 2200), match.index).includes("glass-cta");
    links.push({ source, target: url.pathname, href: decode(href[1]), anchor,
      context: inMain && !sharedCta, self: url.pathname === source,
      hash: url.hash, origin: url.origin, nofollow: /\brel="[^"]*nofollow/.test(match[1]) });
  }
  return { html, links, ids: new Set([...html.matchAll(/\bid="([^"]*)"/g)].map((m) => decode(m[1]))) };
}

const fixture = extract('<header><a href="/">Home</a></header><main id="main-content"><a href="/work?x=1&amp;y=2#case-study">Work &amp; scope</a><script>"<a href=\"/fake\">Fake</a>"</script><a href="#main-content">Jump</a><a href="https://example.com">External</a></main>', "/about");
assert.equal(fixture.links.length, 3);
assert.equal(fixture.links[0].context, false);
assert.equal(fixture.links[1].href, "/work?x=1&y=2#case-study");
assert.equal(fixture.links[1].anchor, "Work & scope");
assert.equal(fixture.links[1].context, true);
assert.equal(fixture.links[2].self, true);

const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports,
    require: (name) => name.startsWith("@/") ? load(`${name.slice(2)}.ts`) : require(name) }, { filename: file });
  return module.exports;
}

const sitemap = fs.readFileSync(path.join(buildRoot, "sitemap.xml.body"), "utf8");
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
assert.equal(new Set(routes).size, routes.length, "Duplicate sitemap routes");
const pages = new Map(routes.map((route) => [route, extract(fs.readFileSync(path.join(buildRoot, route === "/" ? "index.html" : `${route.slice(1)}.html`), "utf8"), route)]));
const manifest = JSON.parse(fs.readFileSync(".next/prerender-manifest.json", "utf8"));
for (const route of Object.keys(manifest.routes)) {
  const file = path.join(buildRoot, route === "/" ? "index.html" : `${route.slice(1)}.html`);
  if (fs.existsSync(file) && !/name="robots" content="[^"]*noindex/.test(fs.readFileSync(file, "utf8"))) {
    assert.ok(pages.has(route), `Public rendered route absent from graph: ${route}`);
  }
}
const links = [...pages.values()].flatMap((page) => page.links);
const edges = links.filter((link) => !link.self && pages.has(link.target) && !link.nofollow);
const depth = { "/": 0 };
const queue = ["/"];
for (const source of queue) {
  for (const link of edges.filter((item) => item.source === source)) {
    if (depth[link.target] === undefined) { depth[link.target] = depth[source] + 1; queue.push(link.target); }
  }
}
const rows = routes.map((route) => ({ route,
  inbound: new Set(edges.filter((link) => link.target === route).map((link) => link.source)).size,
  contentInbound: new Set(edges.filter((link) => link.target === route && link.context).map((link) => link.source)).size,
  depth: depth[route] ?? null,
}));
const broken = links.filter((link) => !pages.has(link.target) && !fs.existsSync(path.join("public", link.target.slice(1))));
const missingFragments = links.filter((link) => link.hash && pages.has(link.target) && !pages.get(link.target).ids.has(decodeURIComponent(link.hash.slice(1))));
const generic = edges.filter((link) => link.context && /^(Explore this service|Explore package|Click here|Read more|Learn more)$/i.test(link.anchor));
const contentLinks = edges.filter((link) => link.context);
const result = { pages: routes.length, totalLinks: links.length, crossPageLinks: edges.length,
  uniqueEdges: new Set(edges.map((link) => `${link.source}>${link.target}`)).size,
  contentLinks: contentLinks.length,
  orphans: rows.filter((row) => row.route !== "/" && !row.inbound).map((row) => row.route),
  unreachable: rows.filter((row) => row.depth === null).map((row) => row.route),
  maxDepth: Math.max(...Object.values(depth)),
  averageDepth: Object.values(depth).reduce((sum, value) => sum + value, 0) / queue.length,
  broken, missingFragments, generic,
  zeroContext: rows.filter((row) => !row.contentInbound).map((row) => row.route), rows,
};
assert.deepEqual(broken, [], "Unresolved internal targets (including redirect aliases)");
assert.deepEqual(missingFragments, [], "Missing fragment targets");
assert.deepEqual(result.unreachable, [], "Public pages disconnected from home");
assert.deepEqual(generic, [], "Vague standalone content links");
assert.ok(links.every((link) => link.origin === origin), "Internal links must use the canonical origin");
assert.ok(result.maxDepth <= 3, "A public page now needs more than three clicks");

const { seoBlogPosts, seoServicePages } = load("data/seo-content.ts");
const { workProjects } = load("data/work-projects.ts");
const { experience } = load("data/portfolio.ts");
function hasLink(source, target) {
  assert.ok(contentLinks.some((link) => link.source === source && link.target === target), `${source} must link to ${target} in its content`);
}
function checkSlugs(slugs, prefix, source) {
  assert.equal(new Set(slugs).size, slugs.length, `Duplicate relationships on ${source}`);
  for (const slug of slugs) {
    const target = `${prefix}/${slug}`;
    assert.notEqual(source, target, `Self-recommendation: ${source}`);
    assert.ok(pages.has(target), `Unknown relationship target: ${target}`);
  }
}
for (const service of seoServicePages) {
  const source = `/services/${service.slug}`;
  hasLink("/services", source);
  checkSlugs(service.relatedServiceSlugs, "/services", source);
  checkSlugs(service.relatedBlogSlugs, "/blog", source);
  checkSlugs(service.relatedWorkSlugs ?? [], "/work", source);
  for (const slug of service.relatedWorkSlugs ?? []) hasLink(source, `/work/${slug}`);
}
let inlineLinks = 0;
for (const post of seoBlogPosts) {
  const source = `/blog/${post.slug}`;
  hasLink(source, "/blog");
  checkSlugs(post.relatedServiceSlugs, "/services", source);
  checkSlugs(post.relatedWorkSlugs ?? [], "/work", source);
  for (const slug of post.relatedWorkSlugs ?? []) hasLink(source, `/work/${slug}`);
  const inlineTargets = new Set();
  for (const section of post.sections) {
    if (!section.link) continue;
    const { text, href } = section.link;
    assert.ok(text && href.startsWith("/") && !href.startsWith("//"), "Inline link needs text and an internal destination");
    assert.equal(section.body.reduce((n, paragraph) => n + paragraph.split(text).length - 1, 0), 1, `Inline anchor must occur exactly once: ${source} / ${text}`);
    assert.ok(!inlineTargets.has(href), `Repeated inline destination: ${source} / ${href}`);
    inlineTargets.add(href);
    assert.notEqual(source, href);
    hasLink(source, href);
    assert.equal(contentLinks.filter((link) => link.source === source && link.href === href && link.anchor === text).length, 1, `Inline link not rendered once: ${source} / ${text}`);
    inlineLinks++;
  }
}
for (const project of workProjects) {
  const source = `/work/${project.slug}`;
  checkSlugs(project.relatedWorkSlugs, "/work", source);
  checkSlugs(project.relatedServiceSlugs, "/services", source);
  assert.ok(project.relatedWorkSlugs.length <= 2, "Keep related project cards bounded");
  for (const slug of project.relatedWorkSlugs) hasLink(source, `/work/${slug}`);
  for (const slug of project.relatedServiceSlugs) hasLink(source, `/services/${slug}`);
  const guideLinks = contentLinks.filter((link) => link.source === source && link.target.startsWith("/blog/"));
  assert.ok(guideLinks.length <= 2, "Keep project reading links bounded");
  assert.equal(new Set(guideLinks.map((link) => link.target)).size, guideLinks.length);
}
for (const item of experience) {
  if (item.workSlug) hasLink("/experience", `/work/${item.workSlug}`);
}
for (const source of ["/faq", "/contact"]) hasLink(source, "/locations");
hasLink("/about", "/experience");
hasLink("/process", "/resources");
hasLink("/process", "/faq");
result.inlineLinks = inlineLinks;
if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
else console.log(`PASS: ${routes.length} public pages; ${result.orphans.length} orphans; ${broken.length} broken targets; ${missingFragments.length} missing fragments; max depth ${result.maxDepth}; all ${seoServicePages.length} services linked from hub; ${inlineLinks} explicit inline links and all recommendations validated.`);
