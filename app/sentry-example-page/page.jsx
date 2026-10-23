import SentryExampleClient from "./SentryExampleClient";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Sentry Onboarding",
    description: "Internal Sentry test page.",
    path: "/sentry-example-page",
    noIndex: true,
  });
}

export default function Page() {
  return <SentryExampleClient />;
}
