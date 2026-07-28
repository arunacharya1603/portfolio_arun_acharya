import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/send-contact-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubmissionPayload = {
  source?: unknown;
  name?: unknown;
  email?: unknown;
  message?: unknown;
  [key: string]: unknown;
};

const submissionsPath = path.join(process.cwd(), "data", "contact-submissions.json");
let writeQueue: Promise<void> = Promise.resolve();
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

function cleanText(value: unknown, maxLength = 4000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function appendSubmission(submission: Record<string, string>) {
  writeQueue = writeQueue.then(async () => {
    let existing: unknown = [];

    try {
      existing = JSON.parse(await fs.readFile(submissionsPath, "utf8"));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }

    const submissions = Array.isArray(existing) ? existing : [];
    submissions.push(submission);
    await fs.writeFile(submissionsPath, `${JSON.stringify(submissions, null, 2)}\n`, "utf8");
  });

  return writeQueue;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  if (ip === "unknown") return false;

  const now = Date.now();
  const current = rateLimits.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;
    const name = cleanText(payload.name, 120);
    const email = cleanText(payload.email, 180).toLowerCase();
    const message = cleanText(payload.message);

    if (cleanText(payload.companyFax, 200)) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: "Too many messages were sent. Please try again shortly." },
        { status: 429 }
      );
    }

    const submission = Object.fromEntries(
      Object.entries(payload)
        .slice(0, 24)
        .filter(
          ([key, value]) =>
            key !== "companyFax" &&
            /^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/.test(key) &&
            typeof value === "string"
        )
        .map(([key, value]) => [key, cleanText(value)])
    );
    const storedSubmission = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      ...submission,
      name,
      email,
      message,
    };

    try {
      await appendSubmission(storedSubmission);
    } catch (error) {
      console.error("Contact submission backup failed.", error);
    }

    try {
      await sendContactEmail(storedSubmission);
    } catch (error) {
      const isConfigurationError =
        error instanceof Error &&
        error.message === "GMAIL_SMTP_NOT_CONFIGURED";

      console.error("Contact email delivery failed.", error);

      return NextResponse.json(
        {
          error: isConfigurationError
            ? "Email delivery is not configured yet."
            : "Your message could not be emailed. Please try again.",
        },
        { status: isConfigurationError ? 503 : 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again." },
      { status: 500 }
    );
  }
}
