import { AnalyticsPreferencesButton } from "@/components/AnalyticsConsent";
import { SeoPageShell } from "@/components/SeoPageShell";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy & analytics | Arun Acharya",
  description: "How this portfolio handles project inquiries, optional analytics and your privacy choices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SeoPageShell eyebrow="Your privacy" title="A clear view of what is collected." description="You can browse this portfolio and send an inquiry without allowing Google Analytics.">
      <div className="max-w-3xl space-y-10 text-sm leading-7 text-subtle">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Project inquiries</h2>
          <p>When you contact me, your name, email, message and any project details you provide are sent to my inbox so I can respond. The inquiry may also include the first page you visited, referring website and campaign tags to help me understand how you found the portfolio. Those referral details are held in this browser session; they are not sent to Google Analytics with your inquiry.</p>
          <p className="mt-3">The form uses your IP address temporarily for rate limiting. Website hosting is provided by Vercel, and inquiry email is delivered through Gmail. Please avoid including passwords or other sensitive information in the form.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Optional Google Analytics</h2>
          <p>Google Analytics loads only after you choose “Allow analytics.” It uses cookies to measure visits, page views, selected button and link clicks, and completed inquiries, along with standard device, browser and approximate location information. Click events identify the action, page and button placement. Package events also identify the package, and install-command copy clicks record whether copying succeeded. They do not read your clipboard contents. Your name, email, message and project form values are not included in analytics events. Page URLs sent by this site exclude query strings and fragments, and referrers are limited to the referring website.</p>
          <p className="mt-3">Advertising signals and automatic form tracking are disabled. Your analytics choice is remembered for 180 days. You can decline or withdraw consent using the control below or in the footer; withdrawing stops further measurement and removes the Google Analytics cookies set by this site.</p>
          <div className="mt-3 font-semibold text-brand"><AnalyticsPreferencesButton /></div>
          <p className="mt-3">Google processes analytics data on its infrastructure. Read <a href="https://policies.google.com/technologies/partner-sites" className="text-brand underline underline-offset-4">how Google uses information from sites that use its services</a>.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold text-ink">Contact about your information</h2>
          <p>For questions or a request to access or delete inquiry information you have sent me, email <a href={`mailto:${siteConfig.email}`} className="break-all text-brand underline underline-offset-4">{siteConfig.email}</a>.</p>
        </section>
      </div>
    </SeoPageShell>
  );
}
