import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sentry Onboarding",
  description: "Internal Sentry test page.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function SentryExampleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
