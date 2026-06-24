import SentryExampleClient from "./SentryExampleClient";

export function generateMetadata() {
  return {
    title: "Sentry Onboarding",
    description: "Internal Sentry test page.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default function Page() {
  return <SentryExampleClient />;
}