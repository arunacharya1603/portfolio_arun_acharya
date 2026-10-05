import Link from "next/link";
import { SeoPageShell } from "@/components/SeoPageShell";
import { seoBlogPosts } from "@/data/seo-content";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Website Planning Resources for Founders & Businesses | Arun Acharya", description: "A free website cost planner and practical guides to healthcare booking sites, SaaS dashboards and frontend performance, grounded in Arun Acharya’s project work.", path: "/resources" });

export default function ResourcesPage() {
  return <SeoPageShell eyebrow="Make the next build clearer" title="Plan the right website. Know what to ask for." description="Practical resources for founders and service businesses choosing a developer, setting a budget, or improving an existing product.">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])) }} />
    <section className="grid gap-6 rounded-xl border border-[#d8c4a4]/35 bg-[#d8c4a4]/[0.06] p-6 sm:p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
      <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8c4a4]">Free tool · no signup</p><h2 className="mt-4 font-grotesk text-3xl font-semibold">What will your website cost?</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#f4efe3]/75">Compare my actual service packages in INR or USD. See scope and delivery assumptions, then copy a brief or send it with your inquiry.</p></div>
      <Link href="/tools/website-cost-planner" className="justify-self-start rounded-lg bg-[#f4efe3] px-6 py-4 text-sm font-semibold text-[#0d0c09] md:justify-self-end">Open the cost & scope planner →</Link>
    </section>
    <section className="mt-14">
      <h2 className="font-grotesk text-3xl font-semibold">Decisions to make before you hire</h2>
      <div className="mt-6 divide-y divide-[#f4efe3]/15">
        {seoBlogPosts.map((post) => <article key={post.slug} className="grid gap-3 py-7 md:grid-cols-[0.25fr_0.75fr]"><p className="text-sm text-[#d8c4a4]">{post.category}<span className="mt-2 block text-xs text-[#f4efe3]/60">{post.readingTime}</span></p><div><h3 className="font-grotesk text-2xl font-semibold"><Link className="hover:underline focus-visible:underline" href={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#f4efe3]/75">{post.description}</p></div></article>)}
      </div>
      <Link href="/blog" className="mt-6 inline-block text-sm text-[#d8c4a4] underline underline-offset-4">Browse the blog</Link>
    </section>
  </SeoPageShell>;
}
