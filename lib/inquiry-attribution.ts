const storageKey = "portfolio-inquiry-source";
const campaignKeys = ["utm_source", "utm_medium", "utm_campaign"] as const;

// Keep only attribution fields, never arbitrary query parameters or a full referrer URL.
export function captureInquiryAttribution() {
  const url = new URL(window.location.href);
  const fields: Record<string, string> = { landingPage: url.pathname.slice(0, 300) };
  if (document.referrer) {
    try { fields.referrer = new URL(document.referrer).hostname; } catch { /* Invalid referrer. */ }
  }
  for (const key of campaignKeys) {
    const value = url.searchParams.get(key);
    if (value) fields[key] = value.slice(0, 120);
  }
  try {
    if (!sessionStorage.getItem(storageKey)) sessionStorage.setItem(storageKey, JSON.stringify(fields));
  } catch { /* Inquiry submission also works when browser storage is disabled. */ }
  return fields;
}

export function getInquiryAttribution(): Record<string, string> {
  const fallback = captureInquiryAttribution();
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    const safe = Object.fromEntries(
      ["landingPage", "referrer", ...campaignKeys]
        .filter((key) => typeof stored?.[key] === "string")
        .map((key) => [key, stored[key].slice(0, 300)])
    );
    return { ...(safe.landingPage ? safe : fallback), inquiryPage: window.location.pathname.slice(0, 300) };
  } catch {
    return { ...fallback, inquiryPage: window.location.pathname.slice(0, 300) };
  }
}
