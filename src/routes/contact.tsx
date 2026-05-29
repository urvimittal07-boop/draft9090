import { createFileRoute } from "@tanstack/react-router";
import { Star } from "@/components/zine";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — URVI" },
      { name: "description", content: "Pitch me, hire me, download the resume." },
      { property: "og:title", content: "Contact — URVI" },
      { property: "og:description", content: "Pitch me, hire me, download the resume." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="px-6 md:px-10 py-20 max-w-5xl mx-auto relative overflow-hidden">
      <Star className="absolute top-10 left-4 w-10 h-10 text-hotpink anim-spin-slow" />
      <Star className="absolute bottom-10 right-4 w-8 h-8 text-orange anim-spin-slow" />

      <div className="text-center">
        <div className="font-accent uppercase tracking-[0.35em] text-xs text-ink/60 mb-4">— issue n°06 · contact —</div>
        <h1 className="font-serif italic text-7xl md:text-[9rem] leading-[0.9] text-ink">
          let&apos;s talk<span className="text-hotpink">.</span>
        </h1>
        <p className="font-serif italic text-xl md:text-2xl mt-6 text-ink/70 max-w-[40ch] mx-auto">
          For briefs, collaborations, hiring conversations, or just a coffee
          recommendation in Mumbai — the inbox is open.
        </p>
      </div>

      {/* RESUME CTA */}
      <div className="mt-14 grid md:grid-cols-[1.2fr_1fr] gap-6 items-stretch">
        <div className="bg-ink text-paper p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-hotpink mb-3">the wall street pack</div>
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight">The full resume — formatted, printed-paper ready.</h2>
            <p className="font-serif text-base text-paper/70 mt-3 max-w-[40ch]">
              One-page, Wall-Street-style CV: education, experience,
              capstones, publications, awards.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/resume.pdf"
              download="Urvi-Resume.pdf"
              className="inline-flex items-center gap-2 bg-paper text-ink font-accent uppercase tracking-widest text-xs px-5 py-3 hover:bg-hotpink hover:text-paper transition-colors"
            >
              ↓ Download Resume (PDF)
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-paper/40 font-accent uppercase tracking-widest text-xs px-5 py-3 hover:bg-paper/10 transition-colors"
            >
              View in browser →
            </a>
          </div>
        </div>

        <div className="bg-babypink p-8 md:p-10 flex flex-col justify-center">
          <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-ink/60 mb-2">currently</div>
          <p className="font-serif italic text-2xl md:text-3xl leading-tight">
            Based in Mumbai · open to brand, editorial &amp; campaign roles · summer 2026.
          </p>
        </div>
      </div>

      {/* CHANNELS */}
      <div className="mt-12 editorial-rule pt-4">
        {[
          { label: "Email", value: "hello@urvi.world", href: "mailto:hello@urvi.world" },
          { label: "Instagram", value: "@urvi.world", href: "https://instagram.com" },
          { label: "LinkedIn", value: "/in/urvi", href: "https://linkedin.com" },
          { label: "Behance", value: "/urvi", href: "https://behance.net" },
        ].map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
             className="group grid grid-cols-12 gap-4 py-5 border-b border-ink/15 hover:bg-babypink/40 px-2 transition-colors">
            <div className="col-span-3 md:col-span-2 font-accent uppercase tracking-[0.3em] text-[10px] text-ink/50 pt-2">{c.label}</div>
            <div className="col-span-9 md:col-span-8 font-serif italic text-2xl md:text-3xl leading-tight">{c.value}</div>
            <div className="hidden md:flex col-span-2 items-center justify-end font-accent uppercase tracking-widest text-[11px] text-ink group-hover:text-hotpink">
              open <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
