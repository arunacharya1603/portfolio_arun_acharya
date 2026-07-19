import Link from "next/link";
import { Layers3, Send } from "lucide-react";

export function SiteActionBar() {
  return (
    <aside
      className="pointer-events-none fixed inset-x-4 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,transform] duration-200 md:hidden"
      aria-label="Quick actions"
    >
      <div className="pointer-events-auto mx-auto grid max-w-sm grid-cols-2 gap-1.5 rounded-full border border-[#f4efe3]/18 bg-[#0d0c09]/92 p-1.5 shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[#f4efe3]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
        >
          Work
          <Layers3 className="h-4 w-4" />
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f4efe3] px-4 py-2.5 text-sm font-semibold text-[#0d0c09] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4efe3]"
        >
          Contact
          <Send className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
