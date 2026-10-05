import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site";

type ContactSubmission = Record<string, string> & {
  name: string;
  email: string;
  message: string;
};

const fieldLabels: Record<string, string> = {
  projectType: "Project type",
  service: "Service",
  package: "Package",
  company: "Company",
  website: "Website",
  stage: "Project stage",
  budget: "Budget",
  timeline: "Timeline",
  goal: "Goal",
  requirements: "Requirements",
  references: "References",
  landingPage: "First page visited",
  inquiryPage: "Inquiry page",
  referrer: "Referral site",
  utm_source: "Campaign source",
  utm_medium: "Campaign medium",
  utm_campaign: "Campaign name",
};

const hiddenFields = new Set([
  "id",
  "source",
  "name",
  "email",
  "message",
  "submittedAt",
  "companyFax",
]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelFor(key: string) {
  return (
    fieldLabels[key] ||
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_]/g, " ")
      .replace(/^./, (letter) => letter.toUpperCase())
  );
}

function formatSubmittedAt(value?: string) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function getGmailConfig() {
  const user = process.env.GMAIL_SMTP_USER?.trim() || siteConfig.email;
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;

  if (!appPassword) {
    throw new Error("GMAIL_SMTP_NOT_CONFIGURED");
  }

  return { user, appPassword, recipient };
}

export async function sendContactEmail(submission: ContactSubmission) {
  const { user, appPassword, recipient } = getGmailConfig();
  const source = submission.source || "portfolio";
  const subject = `New portfolio inquiry from ${submission.name}`;
  const submittedAt = formatSubmittedAt(submission.submittedAt);
  const detailFields = Object.entries(submission).filter(
    ([key, value]) => !hiddenFields.has(key) && Boolean(value)
  );
  const replyHref = `mailto:${submission.email}?subject=${encodeURIComponent(
    `Re: ${subject}`
  )}`;
  const textDetails = detailFields
    .map(([key, value]) => `${labelFor(key)}: ${value}`)
    .join("\n");
  const text = [
    "NEW PROJECT INQUIRY",
    "",
    `From: ${submission.name} <${submission.email}>`,
    `Received: ${submittedAt}`,
    `Source: ${source}`,
    "",
    textDetails,
    textDetails ? "" : null,
    "MESSAGE",
    submission.message,
    "",
    `Reply directly to: ${submission.email}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const detailRows = detailFields
    .map(
      ([key, value], index) => `
        <tr>
          <td style="padding:${index === 0 ? "0" : "14px"} 0 14px;color:#8b8275;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;vertical-align:top;width:38%;">
            ${escapeHtml(labelFor(key))}
          </td>
          <td style="padding:${index === 0 ? "0" : "14px"} 0 14px;color:#201d19;font-size:15px;font-weight:600;line-height:1.55;vertical-align:top;">
            ${escapeHtml(value)}
          </td>
        </tr>`
    )
    .join("");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {
      user,
      pass: appPassword,
    },
  });

  await transporter.sendMail({
    from: `"Arun Acharya Portfolio" <${user}>`,
    to: recipient,
    replyTo: {
      name: submission.name,
      address: submission.email,
    },
    subject,
    text,
    html: `
      <!doctype html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="color-scheme" content="light">
          <title>${escapeHtml(subject)}</title>
        </head>
        <body style="margin:0;padding:0;background:#ece8df;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
            ${escapeHtml(submission.name)} sent a new project inquiry from your portfolio.
          </div>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;background:#ece8df;">
            <tr>
              <td align="center" style="padding:28px 12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="width:100%;max-width:640px;border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid #d8d0c2;border-radius:20px;background:#fbfaf7;box-shadow:0 16px 50px rgba(37,31,24,0.10);">
                  <tr>
                    <td style="padding:30px 30px 28px;background:#11100e;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="vertical-align:middle;">
                            <div style="display:inline-block;padding:9px 11px;border:1px solid rgba(236,216,180,0.35);border-radius:10px;color:#ead5b2;font-size:15px;font-weight:800;letter-spacing:-0.02em;">AA</div>
                          </td>
                          <td align="right" style="color:#9f978c;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;vertical-align:middle;">
                            ${escapeHtml(source.replaceAll("-", " "))}
                          </td>
                        </tr>
                      </table>
                      <p style="margin:34px 0 8px;color:#cdb185;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">New project inquiry</p>
                      <h1 style="margin:0;color:#fffdf8;font-family:Arial,Helvetica,sans-serif;font-size:31px;font-weight:700;letter-spacing:-0.04em;line-height:1.15;">
                        A new opportunity just landed.
                      </h1>
                      <p style="margin:14px 0 0;color:#bdb6ac;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">
                        ${escapeHtml(submission.name)} reached out through your portfolio. The full brief is organized below.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:26px 30px 10px;background:#fbfaf7;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="vertical-align:top;">
                            <p style="margin:0 0 5px;color:#908779;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Potential client</p>
                            <p style="margin:0;color:#171512;font-family:Arial,Helvetica,sans-serif;font-size:21px;font-weight:700;line-height:1.3;">${escapeHtml(
                              submission.name
                            )}</p>
                            <a href="mailto:${escapeHtml(
                              submission.email
                            )}" style="display:inline-block;margin-top:5px;color:#836947;font-family:Arial,Helvetica,sans-serif;font-size:14px;text-decoration:none;">${escapeHtml(
                              submission.email
                            )}</a>
                          </td>
                          <td align="right" style="padding-left:12px;vertical-align:top;">
                            <a href="${escapeHtml(
                              replyHref
                            )}" style="display:inline-block;padding:13px 18px;border-radius:999px;background:#bfa17f;color:#17130f;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;text-decoration:none;">
                              Reply to client &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  ${
                    detailRows
                      ? `
                  <tr>
                    <td style="padding:22px 30px 4px;background:#fbfaf7;">
                      <div style="height:1px;background:#e5ded2;"></div>
                      <p style="margin:24px 0 18px;color:#908779;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Project snapshot</p>
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
                        ${detailRows}
                      </table>
                    </td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding:20px 30px 30px;background:#fbfaf7;">
                      <div style="padding:22px;border:1px solid #e2d9cb;border-radius:14px;background:#f3eee5;">
                        <p style="margin:0 0 10px;color:#927653;font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">Their message</p>
                        <p style="margin:0;color:#28231d;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.75;white-space:pre-wrap;">${escapeHtml(
                          submission.message
                        )}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 30px;border-top:1px solid #e5ded2;background:#f7f4ee;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="color:#8d8478;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;">
                            Received ${escapeHtml(submittedAt)}
                          </td>
                          <td align="right" style="color:#8d8478;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;">
                            ${escapeHtml(siteConfig.host)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <p style="margin:18px 0 0;color:#8d857a;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;">
                  Replying to this email sends your response directly to ${escapeHtml(
                    submission.name
                  )}.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
  });
}
