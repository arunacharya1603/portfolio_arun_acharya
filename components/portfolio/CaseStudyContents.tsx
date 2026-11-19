"use client";

import { useEffect, useState } from "react";

const contents = [
  ["contribution", "Brief & contribution"],
  ["goals", "Goals & constraints"],
  ["architecture", "How it works"],
  ["decisions", "Technical decisions"],
  ["challenges", "Challenges & solutions"],
  ["outcomes", "Outcomes"],
  ["reflection", "Lessons & next steps"],
  ["questions", "Project questions"],
  ["evidence", "Evidence & links"],
] as const;

function ContentsLinks({ activeId }: { activeId: string | null }) {
  return (
    <ol className="space-y-1">
      {contents.map(([id, label], index) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={activeId === id ? "location" : undefined}
            className="-ml-3 flex min-h-10 items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2 text-sm font-medium text-subtle transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand aria-[current=location]:border-brand aria-[current=location]:bg-brand/10 aria-[current=location]:text-brand"
          >
            <span aria-hidden="true" className="text-[11px] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function CaseStudyContents() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = contents.flatMap(([id]) => {
      const section = document.getElementById(id);
      return section ? [section] : [];
    });
    if (!sections.length) return;

    let frame = 0;
    let anchorOffset = 0;

    function updateActiveSection() {
      frame = 0;
      // Follow the reading position, including the existing smooth/native anchor offsets.
      const readingLine = Math.min(window.innerHeight / 2, Math.max(anchorOffset + 1, window.innerHeight * 0.3));
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        current = section.id;
      }
      setActiveId(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    function updateLayout() {
      anchorOffset = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
        + (parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0);
      scheduleUpdate();
    }

    // ResizeObserver also covers image/font loading and the mobile contents disclosure.
    const observer = new ResizeObserver(updateLayout);
    observer.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateLayout);
    window.addEventListener("pageshow", updateLayout);
    updateLayout();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("pageshow", updateLayout);
    };
  }, []);

  return (
    <aside className="min-w-0 lg:sticky lg:top-28">
      <nav aria-label="Case study contents" className="hidden lg:block">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest">Inside this project</p>
        <ContentsLinks activeId={activeId} />
      </nav>
      <details className="rounded-lg border border-line bg-surface/60 px-5 lg:hidden">
        <summary className="cursor-pointer py-4 text-sm font-semibold">Inside this project</summary>
        <nav aria-label="Case study contents" className="pb-4"><ContentsLinks activeId={activeId} /></nav>
      </details>
    </aside>
  );
}
