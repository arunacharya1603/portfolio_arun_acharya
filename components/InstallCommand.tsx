"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackClick } from "@/lib/analytics";

const command = "npx seo-engineering";

export function InstallCommand() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
      trackClick("install_command_copy_click", "package_hero", "success");
    } catch {
      setStatus("error");
      trackClick("install_command_copy_click", "package_hero", "error");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface/90 p-3 shadow-card sm:p-4">
        <code className="min-w-0 break-all font-mono text-sm font-semibold text-ink sm:text-base">{command}</code>
        <Button
          type="button"
          size="sm"
          className="shrink-0"
          glass={{ contentClassName: "min-w-11 px-3 sm:px-4" }}
          onClick={copyCommand}
          aria-label="Copy install command"
          aria-describedby="install-command-status"
        >
          {status === "copied" ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">{status === "copied" ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <p id="install-command-status" role="status" className="mt-3 text-sm leading-6 text-subtle">
        {status === "copied"
          ? "Install command copied. Paste it into your terminal when you’re ready."
          : status === "error"
            ? "Copy is unavailable. Select the command above and copy it manually."
            : "Run this command from your project directory."}
      </p>
    </div>
  );
}
