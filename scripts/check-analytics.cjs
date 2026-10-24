// Isolated browser stubs: never loads Google or sends an inquiry email.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, globals = {}, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: (name) => dependencies[name], ...globals });
  return exports;
}

function browser() {
  const storage = new Map();
  const scripts = [];
  const deleted = [];
  const document = {
    referrer: "https://search.example/results?email=private@example.com#private",
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    get cookie() { return "_ga=abc; _ga_J713ZJ8TRT=abc; unrelated=keep"; },
    set cookie(value) { deleted.push(value); },
  };
  const globals = {
    window: {}, document, URL, Date,
    location: { hostname: "arunacharya1603.in", pathname: "/contact" },
    localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  };
  const analytics = load("lib/analytics.ts", globals, { "@/lib/site": load("lib/site.ts") });
  const events = () => (globals.window.dataLayer || []).map((args) => Array.from(args));
  return { globals, storage, scripts, deleted, analytics, events };
}

async function main() {
  const b = browser();
  const a = b.analytics;
  assert.equal(a.readAnalyticsConsent(), null);
  a.trackPageView("/");
  a.trackSuccessfulInquiry("portfolio-contact");
  assert.equal(b.scripts.length, 0, "No Google request without consent");
  a.saveAnalyticsConsent("denied");
  a.trackPageView("/");
  assert.equal(b.events().length, 0);
  a.saveAnalyticsConsent("granted");
  assert.equal(a.readAnalyticsConsent(), "granted");
  a.trackPageView("/work?email=private@example.com#secret");
  a.trackPageView("/work");
  a.trackPageView("/contact");
  assert.equal(b.scripts.length, 1);
  assert.equal(b.events().filter((e) => e[1] === "page_view").length, 2, "One page view per navigation");
  const config = b.events().find((e) => e[0] === "config")[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  a.trackSuccessfulInquiry("service-proposal:private@example.com");
  const lead = b.events().find((e) => e[1] === "generate_lead")[2];
  assert.equal(lead.form_name, "service-proposal");
  assert.equal(lead.page_location, "https://arunacharya1603.in/contact");
  assert.equal(b.events().find((e) => e[1] === "page_view")[2].page_location, "https://arunacharya1603.in/work");
  assert.equal(lead.page_referrer, "https://search.example");
  assert.equal(JSON.stringify(b.events()).includes("private@"), false);
  assert.equal(JSON.stringify(b.events()).includes("#secret"), false);
  a.trackPageView("/private@example.com");
  assert.equal(b.events().at(-1)[2].page_path, "/not-found");
  a.saveAnalyticsConsent("denied");
  const count = b.events().length;
  a.trackPageView("/");
  a.trackSuccessfulInquiry("portfolio-contact");
  assert.equal(b.events().length, count, "Revocation stops events");
  assert.equal(b.globals.window["ga-disable-G-J713ZJ8TRT"], true);
  assert.ok(b.deleted.length > 0);
  assert.equal(b.deleted.some((cookie) => cookie.startsWith("unrelated=")), false);
  a.saveAnalyticsConsent("granted");
  a.trackPageView("/");
  assert.equal(b.scripts.length, 1, "Reconsent does not add a second tag");
  b.storage.set(a.analyticsConsentKey, JSON.stringify({ value: "granted", expires: Date.now() - 1 }));
  assert.equal(a.readAnalyticsConsent(), null, "Expired choice requires fresh consent");
  b.storage.set(a.analyticsConsentKey, "invalid");
  assert.equal(a.readAnalyticsConsent(), null);
  b.globals.localStorage.getItem = () => { throw Error("Blocked storage"); };
  b.globals.localStorage.setItem = () => { throw Error("Blocked storage"); };
  assert.equal(a.readAnalyticsConsent(), null);
  assert.doesNotThrow(() => a.saveAnalyticsConsent("denied"));
  for (const hostname of ["localhost", "127.0.0.1", "portfolio-preview.vercel.app", "www.arunacharya1603.in"]) {
    const other = browser();
    other.globals.location.hostname = hostname;
    other.analytics.saveAnalyticsConsent("granted");
    other.analytics.trackPageView("/");
    other.analytics.trackSuccessfulInquiry("portfolio-contact");
    assert.equal(other.scripts.length, 0, `No production tag on ${hostname}`);
    assert.equal(other.events().length, 0, `No production events on ${hostname}`);
  }

  let responseOk = true;
  const leads = [];
  const { submitProjectInquiry } = load("lib/submit-project-inquiry.ts", {
    fetch: async () => ({ ok: responseOk, json: async () => ({ error: "Failed" }) }),
  }, {
    "@/lib/inquiry-attribution": { getInquiryAttribution: () => ({}) },
    "@/lib/analytics": { trackSuccessfulInquiry: (source) => leads.push(source) },
  });
  const inquiry = { source: "portfolio-contact", name: "Test", email: "test@example.com", message: "Local mock only" };
  await submitProjectInquiry(inquiry);
  assert.deepEqual(leads, ["portfolio-contact"]);
  responseOk = false;
  await assert.rejects(submitProjectInquiry(inquiry), /Failed/);
  responseOk = true;
  await submitProjectInquiry({ ...inquiry, companyFax: "bot" });
  assert.equal(leads.length, 1, "Failed and honeypot submissions are not leads");
  console.log("PASS: consent, expiry, revocation, sanitized events, SPA page views, production-only tracking and successful inquiry conversion.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
