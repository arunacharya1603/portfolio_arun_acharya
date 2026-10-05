// Run with: node scripts/check-inquiries.cjs. No network, real email or lead-file writes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loader(mocks = {}, globals = {}) {
  const cache = new Map();
  return function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const localRequire = (id) => {
      if (id in mocks) return mocks[id];
      if (id.startsWith("@/")) return load(`${id.slice(2)}.ts`);
      return require(id);
    };
    vm.runInNewContext(code, { module, exports: module.exports, require: localRequire, process, console, URL, Error, ...globals }, { filename: file });
    return module.exports;
  };
}

async function main() {
  const storage = new Map();
  const browser = { location: new URL("https://www.arunacharya1603.in/resources?utm_source=partner&utm_campaign=launch&token=never-store") };
  const attribution = loader({}, {
    window: browser, document: { referrer: "https://www.google.com/search?q=private-query" },
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  })("lib/inquiry-attribution.ts");
  attribution.captureInquiryAttribution();
  browser.location = new URL("https://www.arunacharya1603.in/contact?utm_medium=internal");
  const source = attribution.getInquiryAttribution();
  assert.equal(source.landingPage, "/resources");
  assert.equal(source.inquiryPage, "/contact");
  assert.equal(source.referrer, "www.google.com");
  assert.equal(source.utm_source, "partner");
  assert.equal(source.token, undefined);
  assert.equal(source.utm_medium, undefined, "Later links must not overwrite first-touch context");
  const blockedStorage = loader({}, { window: browser, document: { referrer: "" }, sessionStorage: { getItem() { throw new Error("blocked"); } } })("lib/inquiry-attribution.ts");
  assert.equal(blockedStorage.getInquiryAttribution().inquiryPage, "/contact");

  let sendError;
  let sent;
  let writes = 0;
  const quietConsole = { error() {} };
  const route = loader({
    "@/lib/send-contact-email": { async sendContactEmail(value) { if (sendError) throw sendError; sent = value; } },
    fs: { promises: { async readFile() { return "[]"; }, async writeFile() { if (++writes === 1) throw new Error("temporary backup failure"); } } },
  }, { console: quietConsole, process: { cwd: process.cwd, env: {} } })("app/api/contact-submissions/route.ts");
  const request = (body, ip) => new Request("http://localhost/api/contact-submissions", { method: "POST", headers: ip ? { "x-forwarded-for": ip } : {}, body: typeof body === "string" ? body : JSON.stringify(body) });
  const valid = { name: " Test Client ", email: " CLIENT@example.com ", message: " A dashboard brief ", source: "test", id: "untrusted", submittedAt: "untrusted" };
  for (const body of ["{", "null", "[]", { name: "", email: "invalid", message: "" }]) assert.equal((await route.POST(request(body))).status, 400);
  assert.equal((await route.POST(request({ companyFax: "bot" }))).status, 200);
  assert.equal(sent, undefined);
  assert.equal((await route.POST(request(valid))).status, 200, "Email succeeds even if optional local backup fails");
  assert.equal(sent.name, "Test Client");
  assert.equal(sent.email, "client@example.com");
  assert.notEqual(sent.id, "untrusted");
  assert.notEqual(sent.submittedAt, "untrusted");
  assert.equal((await route.POST(request(valid))).status, 200);
  assert.equal(writes, 2, "Backup queue must recover after a failed write");
  sendError = new Error("GMAIL_SMTP_NOT_CONFIGURED");
  assert.equal((await route.POST(request(valid))).status, 503);
  sendError = new Error("Private SMTP failure details");
  const failed = await route.POST(request(valid));
  assert.equal(failed.status, 502);
  assert.ok(!(await failed.text()).includes("Private SMTP"));
  sendError = undefined;
  for (let i = 0; i < 5; i++) assert.equal((await route.POST(request(valid, "test-ip"))).status, 200);
  assert.equal((await route.POST(request(valid, "test-ip"))).status, 429);

  let mail;
  const email = loader({ nodemailer: { createTransport: () => ({ async sendMail(value) { mail = value; } }) } }, {
    process: { env: { GMAIL_APP_PASSWORD: "test-only-not-a-credential" } },
  })("lib/send-contact-email.ts");
  await email.sendContactEmail({ name: "<Test>", email: "client@example.com", message: "<script>test</script>", landingPage: "/resources", inquiryPage: "/contact" });
  assert.equal(mail.replyTo.address, "client@example.com");
  assert.ok(mail.html.includes("&lt;script&gt;"));
  assert.ok(mail.text.includes("First page visited: /resources"));
  assert.ok(mail.html.includes("www.arunacharya1603.in"));

  const load = loader();
  const { servicePackages } = load("data/seo.ts");
  const { serviceProposals } = load("data/service-proposals.ts");
  const number = (value) => Number(value.replace(/[^0-9.]/g, ""));
  for (const pkg of servicePackages) {
    const proposal = serviceProposals.find((item) => item.slug === pkg.slug);
    assert.equal(pkg.startingPriceUSD, number(proposal.startingPriceUSD));
    assert.equal(pkg.startingPriceINR, number(proposal.startingPriceINR));
    assert.equal(pkg.startingPriceUSD, number(proposal.packages[0].priceUSD));
  }
  const { seoBlogPosts, seoServicePages } = load("data/seo-content.ts");
  const { workProjects } = load("data/work-projects.ts");
  for (const post of seoBlogPosts) {
    for (const slug of post.relatedServiceSlugs) assert.ok(seoServicePages.some((item) => item.slug === slug));
    for (const slug of post.relatedWorkSlugs || []) assert.ok(workProjects.some((item) => item.slug === slug));
  }
  console.log("PASS: inquiry validation, rate limit, delivery errors, backup recovery, safe attribution, email construction, price consistency and guide links.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
