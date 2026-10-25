import { siteConfig } from "@/lib/site";

export const analyticsId = "G-J713ZJ8TRT";
export const analyticsConsentKey = "portfolio-analytics-consent-v1";
export const analyticsPreferencesEvent = "portfolio:analytics-preferences";

type Consent = "granted" | "denied";
export type LinkClickEvent = "npm_link_click" | "github_link_click" | "start_project_click" | "book_call_click";
export type ClickLocation = "package_hero" | "package_overview" | "page_cta" | "header" | "mobile_menu" | "footer";
const consentLifetime = 180 * 24 * 60 * 60 * 1000;
const productionHost = siteConfig.host;
let consent: Consent | null = null;
let initialized = false;
let lastPage: string | null = null;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-J713ZJ8TRT"?: boolean;
  }
}

export function readAnalyticsConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(analyticsConsentKey) || "null");
    return saved && (saved.value === "granted" || saved.value === "denied") &&
      typeof saved.expires === "number" && saved.expires > Date.now()
      ? saved.value
      : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of ["", location.hostname, ".arunacharya1603.in"]) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

export function applyAnalyticsConsent(value: Consent | null) {
  consent = value;
  window["ga-disable-G-J713ZJ8TRT"] = value !== "granted";
  if (value !== "granted") {
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    lastPage = null;
    clearAnalyticsCookies();
  } else if (initialized) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  }
}

export function saveAnalyticsConsent(value: Consent) {
  try {
    localStorage.setItem(analyticsConsentKey, JSON.stringify({
      value,
      expires: Date.now() + consentLifetime,
    }));
  } catch {
    // The current visit still respects the choice when storage is unavailable.
  }
  applyAnalyticsConsent(value);
}

function pageContext(pathname: string) {
  // Never include query strings, fragments, form values or arbitrary 404 URLs.
  const path = pathname.split(/[?#]/)[0];
  const knownPage = /^\/(?:about|work|experience|services|process|pricing|faq|blog|locations|resources|contact|privacy)?\/?$/.test(path) ||
    /^\/(?:work|services|blog)\/[a-z0-9-]+$/.test(path) ||
    path === "/blog/author/arun-acharya" || path === "/tools/website-cost-planner" ||
    path === "/packages" || path === "/packages/seo-engineering";
  let referrer = "";
  try {
    referrer = new URL(document.referrer).origin;
  } catch {
    // Direct visits have no referrer.
  }
  const page = knownPage ? path : "/not-found";
  return {
    page_location: `https://${productionHost}${page}`,
    page_path: page,
    page_referrer: referrer,
  };
}

function canMeasure() {
  return typeof window !== "undefined" && consent === "granted" &&
    location.hostname === productionHost;
}

function initializeAnalytics(pathname: string) {
  if (initialized || !canMeasure()) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Google's queue consumes the arguments object, rather than a plain array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("set", pageContext(pathname));
  window.gtag("config", analyticsId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: consentLifetime / 1000,
    cookie_update: false,
  });
  const script = document.createElement("script");
  script.id = "portfolio-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);
  initialized = true;
}

export function trackPageView(pathname: string) {
  if (!canMeasure()) return;
  initializeAnalytics(pathname);
  const context = pageContext(pathname);
  if (lastPage === context.page_path) return;
  window.gtag?.("set", context);
  window.gtag?.("event", "page_view", context);
  lastPage = context.page_path;
}

export function trackSuccessfulInquiry(source: string) {
  if (!canMeasure()) return;
  try {
    initializeAnalytics(location.pathname);
    const formName = source.startsWith("service-proposal:") ? "service-proposal" :
      ["portfolio-contact", "homepage-contact", "website-cost-planner"].includes(source)
        ? source : "project-inquiry";
    window.gtag?.("event", "generate_lead", {
      ...pageContext(location.pathname),
      form_name: formName,
    });
  } catch {
    // Measurement must never turn a delivered inquiry into a failed submission.
  }
}

export function trackClick(
  eventName: LinkClickEvent | "install_command_copy_click",
  uiLocation: ClickLocation,
  copyResult?: "success" | "error",
) {
  if (!canMeasure()) return;
  try {
    initializeAnalytics(location.pathname);
    const context = pageContext(location.pathname);
    window.gtag?.("event", eventName, {
      ...context,
      ui_location: uiLocation,
      ...(context.page_path === "/packages/seo-engineering" ? { package_name: "seo-engineering" } : {}),
      ...(eventName === "install_command_copy_click" && copyResult ? { copy_result: copyResult } : {}),
    });
  } catch {
    // A blocked analytics tag must never interrupt copying or navigation.
  }
}
