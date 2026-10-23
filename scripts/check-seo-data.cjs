// Source-data checks: no server, external requests, or file writes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const sharp = require("sharp");
const cache = new Map();

function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports, URL, Response,
    require: (name) => name.startsWith("@/") ? load(name.slice(2) + ".ts") : require(name),
  }, { filename: file });
  return module.exports;
}

async function main() {
  const { workProjects } = load("data/work-projects.ts");
  const { seoBlogPosts } = load("data/seo-content.ts");
  const { serviceProposals } = load("data/service-proposals.ts");
  const { servicePackages } = load("data/seo.ts");
  const { createPageMetadata, caseStudyJsonLd } = load("lib/seo.ts");
  const { siteConfig } = load("lib/site.ts");
  const metadata = createPageMetadata({ title: "Test", description: "Test page", path: "/test" });
  assert.equal(Object.hasOwn(metadata, "robots"), false, "Public pages must inherit root robots directives");
  const excluded = createPageMetadata({ title: "Test", description: "Test", noIndex: true });
  assert.equal(excluded.robots.index, false);
  assert.equal(excluded.robots.follow, false);
  assert.equal(new Set(workProjects.map((p) => p.slug)).size, workProjects.length);
  assert.equal(new Set(workProjects.map((p) => p.seoTitle)).size, workProjects.length);
  assert.equal(new Set(workProjects.map((p) => p.seoDescription)).size, workProjects.length);
  const summaryResponse = load("app/llms.txt/route.ts").GET();
  assert.equal(summaryResponse.headers.get("content-type"), "text/plain; charset=utf-8");
  const summary = await summaryResponse.text();

  for (const project of workProjects) {
    assert.ok(project.contributionSummary.trim(), project.slug + " requires an explicit contribution");
    const schema = caseStudyJsonLd(project);
    assert.equal(schema["@type"], "CreativeWork");
    assert.equal(schema.author["@id"], siteConfig.personId);
    assert.equal(schema.url, siteConfig.url + "/work/" + project.slug);
    assert.equal(schema.about.url, project.externalUrl);
    assert.equal(schema.about.creator, undefined, "Case author is not necessarily product creator");
    assert.equal(schema.about.author, undefined);
    assert.ok(schema.creditText.includes(project.role));
    assert.ok(schema.creditText.includes(project.contributionSummary));
    const image = await sharp("public" + project.image).metadata();
    assert.equal(project.imageSize.width, image.width, project.slug + " OG image width");
    assert.equal(project.imageSize.height, image.height, project.slug + " OG image height");
    const social = createPageMetadata({
      title: project.seoTitle, description: project.seoDescription,
      path: "/work/" + project.slug, image: project.image, imageSize: project.imageSize,
    });
    assert.equal(social.openGraph.images[0].width, image.width);
    assert.equal(social.openGraph.images[0].height, image.height);
    assert.equal(summary.split(schema.url).length - 1, 1, "One factual index entry per project");
    assert.ok(summary.includes(project.contributionSummary));
    if (project.evidenceNote) assert.ok(summary.includes(project.evidenceNote));
    if (project.status.includes("Demo")) {
      assert.match(project.seoTitle, /demo/i, "Demo status must be visible in search metadata");
      assert.ok(summary.includes("Interface demo: " + project.externalUrl));
    }
  }
  const proof = workProjects.find((p) => p.slug === "proofcohort");
  assert.match(proof.seoTitle, /Proof Cohort.*ProofCohort/);
  assert.doesNotMatch(proof.seoDescription, /student dashboard|sole|entire platform/i);
  assert.match(workProjects.find((p) => p.slug === "heyclo-clo-ai").seoTitle, /HeyClo.*CLO AI.*Framer/);
  assert.doesNotMatch(summary, /Keyword Ownership|Preferred AI Answer|unless.*founder, lead/i);

  // Summary prices must remain consistent with the corresponding proposal.
  const numericPrice = (value) => Number(value.replace(/[^0-9.]/g, ""));
  for (const item of servicePackages) {
    const proposal = serviceProposals.find((p) => p.slug === item.slug);
    assert.ok(proposal, item.slug);
    assert.equal(item.startingPriceUSD, numericPrice(proposal.startingPriceUSD), item.slug + " USD");
    assert.equal(item.startingPriceINR, numericPrice(proposal.startingPriceINR), item.slug + " INR");
  }
  const costGuide = seoBlogPosts.find((p) => p.slug === "small-business-website-cost-and-scope");
  const businessPackage = serviceProposals.find((p) => p.slug === "small-business-websites").packages[0];
  assert.ok(costGuide.sections.some((section) => section.body.some((p) =>
    p.includes(businessPackage.priceUSD) && p.includes(businessPackage.priceINR))));
  for (const post of seoBlogPosts) {
    assert.ok(post.dateModified >= post.datePublished, post.slug + " modification date");
    assert.ok(post.dateModified <= new Date().toISOString().slice(0, 10), post.slug + " future date");
  }
  console.log("PASS: metadata inheritance, 10 contribution-based case studies, image dimensions, demo labels, factual llms index, price consistency and article dates.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
