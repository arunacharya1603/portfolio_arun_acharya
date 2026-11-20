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
  const { caseStudies } = load("data/case-studies.ts");
  assert.deepEqual(Object.keys(caseStudies).sort(), Array.from(workProjects, (p) => p.slug).sort(), "Every existing route must have one case study");
  const { seoBlogPosts } = load("data/seo-content.ts");
  const { serviceProposals } = load("data/service-proposals.ts");
  const { servicePackages } = load("data/seo.ts");
  const { createPageMetadata, caseStudyJsonLd, personJsonLd, professionalServiceJsonLd } = load("lib/seo.ts");
  const { siteConfig } = load("lib/site.ts");
  assert.equal(siteConfig.url, "https://arunacharya1603.in");
  assert.equal(siteConfig.host, new URL(siteConfig.url).hostname);
  assert.equal(siteConfig.personId, `${siteConfig.url}#person`);
  assert.equal(siteConfig.websiteId, `${siteConfig.url}#website`);
  const sitemap = load("app/sitemap.ts").default();
  assert.equal(new Set(sitemap.map((page) => page.url)).size, sitemap.length);
  for (const page of sitemap) {
    const url = new URL(page.url);
    assert.equal(url.origin, siteConfig.url);
    assert.equal(url.search + url.hash, "");
  }
  assert.equal(load("app/robots.ts").default().sitemap, `${siteConfig.url}/sitemap.xml`);
  const metadata = createPageMetadata({ title: "Test", description: "Test page", path: "/test" });
  assert.equal(metadata.alternates.canonical, `${siteConfig.url}/test`);
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  const sharedImage = await sharp("public" + siteConfig.socialImage).metadata();
  assert.equal(metadata.openGraph.images[0].width, sharedImage.width, "Shared social image width must match the delivered asset");
  assert.equal(metadata.openGraph.images[0].height, sharedImage.height, "Shared social image height must match the delivered asset");
  assert.equal(metadata.openGraph.images[0].alt, siteConfig.socialImageAlt);
  assert.equal(metadata.twitter.images[0], metadata.openGraph.images[0].url);
  assert.equal(personJsonLd().jobTitle, siteConfig.jobTitle);
  assert.equal(personJsonLd().description, siteConfig.profileDescription);
  assert.equal(personJsonLd().worksFor.name, professionalServiceJsonLd([]).name, "Organization identity must agree across schemas");
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
  assert.ok(summary.includes(siteConfig.jobTitle));
  assert.ok(summary.includes(siteConfig.profileDescription));
  assert.equal(load("data/seo.ts").seoFaqs.find((faq) => faq.question === "Who is Arun Acharya?").answer, personJsonLd().description);
  assert.ok(!summary.includes("https://www.arunacharya1603.in"));

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
    const story = project.caseStudy;
    assert.equal(schema.headline, story.headline);
    assert.equal(schema.abstract, story.summary);
    assert.equal(schema.genre, story.category);
    assert.deepEqual(schema.keywords, story.topics);
    assert.ok(story.preview.alt && story.preview.caption && story.evidence, project.slug + " requires an explained preview and evidence");
    assert.ok(story.decisions.length >= 2 && story.decisions.length <= 4, project.slug + " needs meaningful trade-offs");
    assert.ok(story.challenges.length >= 1 && story.challenges.length <= 3, project.slug + " needs a scoped challenge");
    assert.ok(story.goals.length && story.architecture.length && story.outcomes.length && story.nextSteps.length);
    for (const related of project.relatedWorkSlugs) assert.ok(workProjects.some((p) => p.slug === related), project.slug + " related route");
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
  assert.match(workProjects.find((p) => p.slug === "heyclo-clo-ai").seoTitle, /HeyClo.*CLO AI.*Next.js/);
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
  console.log("PASS: non-www metadata/sitemap/robots identity, metadata inheritance, 10 contribution-based case studies, image dimensions, demo labels, factual llms index, price consistency and article dates.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
