// Isolated browser stubs: never loads Google or sends an inquiry email.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, globals = {}, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
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
  a.trackClick("npm_link_click", "package_overview");
  assert.equal(b.scripts.length, 0, "No Google request without consent");
  a.saveAnalyticsConsent("denied");
  a.trackPageView("/");
  a.trackClick("book_call_click", "page_cta");
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
  a.trackClick("start_project_click", "page_cta");
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
    other.analytics.trackClick("install_command_copy_click", "package_hero", "success");
    other.analytics.trackClick("book_call_click", "page_cta");
    assert.equal(other.scripts.length, 0, `No production tag on ${hostname}`);
    assert.equal(other.events().length, 0, `No production events on ${hostname}`);
  }

  const clicks = browser();
  clicks.analytics.saveAnalyticsConsent("granted");
  clicks.analytics.trackPageView("/packages");
  clicks.analytics.trackPageView("/packages/seo-engineering");
  clicks.analytics.trackPageView("/packages/seo-engineering");
  assert.deepEqual(Array.from(clicks.events().filter(e => e[1] === "page_view"), e => e[2].page_path), ["/packages", "/packages/seo-engineering"]);
  clicks.globals.location.pathname = "/packages/seo-engineering?email=private@example.com#secret";
  for (const [event, placement, result] of [
    ["install_command_copy_click", "package_hero", "success"],
    ["install_command_copy_click", "package_hero", "error"],
    ["npm_link_click", "package_overview"],
    ["github_link_click", "package_overview"],
    ["start_project_click", "page_cta"],
    ["book_call_click", "header"],
  ]) clicks.analytics.trackClick(event, placement, result);
  const clickEvents = clicks.events().filter(e => e[0] === "event" && e[1] !== "page_view");
  assert.equal(clickEvents.length, 6, "Exactly one event per interaction");
  for (const [, name, payload] of clickEvents) {
    assert.equal(payload.page_path, "/packages/seo-engineering");
    assert.equal(payload.page_location, "https://arunacharya1603.in/packages/seo-engineering");
    assert.equal(payload.package_name, "seo-engineering");
    assert.equal(payload.page_referrer, "https://search.example");
    assert.notEqual(name, "generate_lead", "Clicks are not completed leads");
  }
  assert.equal(clickEvents[0][2].copy_result, "success");
  assert.equal(clickEvents[1][2].copy_result, "error");
  assert.equal(clickEvents[2][2].copy_result, undefined);
  assert.equal(JSON.stringify(clickEvents).includes("private@"), false);
  assert.equal(JSON.stringify(clickEvents).includes("#secret"), false);
  clicks.globals.location.pathname = "/about";
  clicks.analytics.trackClick("book_call_click", "footer");
  assert.equal(clicks.events().at(-1)[2].package_name, undefined);
  clicks.globals.window.gtag = () => { throw Error("Blocked tag"); };
  assert.doesNotThrow(() => clicks.analytics.trackClick("npm_link_click", "package_overview"));

  // Exercise actual UI handlers without a browser, real clipboard or Google tag.
  const react = require("react");
  const jsxRuntime = require("react/jsx-runtime");
  const recordedClicks = [];
  const tracking = { trackClick: (...args) => recordedClicks.push(args) };
  const { GlassLink } = load("components/ui/glass-link.tsx", {}, {
    "react/jsx-runtime": jsxRuntime,
    "next/link": { default: "a" },
    "@liqui-design/glass": { LiquiGlass: "div" },
    "@/lib/utils": { cn: (...args) => args.filter(Boolean).join(" ") },
    "@/lib/glass": { controlGlass: {} },
    "@/lib/analytics": tracking,
  });
  let originalClicks = 0;
  const link = GlassLink({ href: "https://www.npmjs.com/package/seo-engineering", target: "_blank", rel: "noopener noreferrer", analyticsEvent: "npm_link_click", analyticsLocation: "package_overview", onClick: () => originalClicks++ });
  link.props.onClick({ defaultPrevented: false, button: 0 });
  link.props.onAuxClick({ defaultPrevented: false, button: 1 });
  link.props.onAuxClick({ defaultPrevented: false, button: 2 });
  assert.equal(recordedClicks.length, 2, "Primary/keyboard and middle-click each count once; right-click does not");
  assert.equal(originalClicks, 1, "Existing handlers still run");
  assert.equal(link.props.target, "_blank");
  assert.equal(link.props.rel, "noopener noreferrer");
  assert.equal(link.props.analyticsEvent, undefined, "Tracking props do not leak to the DOM");
  const prevented = GlassLink({ href: "/contact", analyticsEvent: "start_project_click", analyticsLocation: "mobile_menu", onClick: e => { e.defaultPrevented = true; } });
  prevented.props.onClick({ defaultPrevented: false });
  GlassLink({ href: "/work" }).props.onClick({ defaultPrevented: false });
  assert.equal(recordedClicks.length, 2, "Cancelled and untagged navigation is not measured");

  let copyState = "idle";
  let failCopy = false;
  let copiedText;
  const { InstallCommand } = load("components/InstallCommand.tsx", {
    navigator: { clipboard: { writeText: async text => { if (failCopy) throw Error("Clipboard denied"); copiedText = text; } } },
  }, {
    "react/jsx-runtime": jsxRuntime,
    react: { useState: () => [copyState, value => { copyState = value; }] },
    "lucide-react": { Check: "span", Copy: "span" },
    "@/components/ui/button": { Button: "button" },
    "@/lib/analytics": tracking,
  });
  const nodes = element => typeof element === "object" && element ? [element, ...react.Children.toArray(element.props?.children).flatMap(nodes)] : [];
  const copyButton = () => nodes(InstallCommand()).find(n => n.type === "button");
  await copyButton().props.onClick();
  assert.equal(copiedText, "npx seo-engineering");
  assert.equal(copyState, "copied");
  assert.deepEqual(recordedClicks.at(-1), ["install_command_copy_click", "package_hero", "success"]);
  failCopy = true;
  await copyButton().props.onClick();
  assert.equal(copyState, "error");
  assert.deepEqual(recordedClicks.at(-1), ["install_command_copy_click", "package_hero", "error"]);
  assert.equal(recordedClicks.length, 4, "One outcome event per copy click");

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
  console.log("PASS: consent, expiry, revocation, sanitized events, package SPA page views, production-only tracking, link/copy handlers, click outcomes and successful inquiry conversion.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
