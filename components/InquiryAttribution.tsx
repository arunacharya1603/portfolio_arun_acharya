"use client";

import { useEffect } from "react";
import { captureInquiryAttribution } from "@/lib/inquiry-attribution";

export function InquiryAttribution() {
  useEffect(() => { captureInquiryAttribution(); }, []);
  return null;
}
