import { getInquiryAttribution } from "@/lib/inquiry-attribution";

export type ProjectInquiry = {
  source: string;
  name: string;
  email: string;
  message: string;
  [key: string]: string;
};

export async function submitProjectInquiry(inquiry: ProjectInquiry) {
  const response = await fetch("/api/contact-submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...inquiry, ...getInquiryAttribution() }),
  });

  const result = (await response.json()) as { error?: string };

  if (!response.ok) {
    throw new Error(result.error || "Your message could not be sent.");
  }
}
