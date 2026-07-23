import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SubmissionPayload;
    const name = cleanText(payload.name, 120);
    const email = cleanText(payload.email, 180).toLowerCase();
    const message = cleanText(payload.message);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid name, email, and message." },
        { status: 400 }
      );
    }

    const submission = Object.fromEntries(
      Object.entries(payload)
        .filter(([, value]) => typeof value === "string")
        .map(([key, value]) => [key, cleanText(value)])
    );

    await appendSubmission({
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      ...submission,
      name,
      email,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your message could not be saved. Please try again." },
      { status: 500 }
    );
  }
}
