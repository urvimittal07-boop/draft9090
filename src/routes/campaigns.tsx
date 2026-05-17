import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAMPAIGNS, type Campaign } from "@/lib/data";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Brand Campaigns — ARIA" },
      { name: "description", content: "Seven brand campaigns: problem, insight, strategy, creatives." },
      { property: "og:title", content: "Brand Campaigns — ARIA" },
      { property: "og:description", content: "An editorial index of seven brand campaign case studies." },
    ],
  }),
  component: CampaignsList,
});

function CampaignsList() {
  const [open, setOpen] = useState<Campaign | null>(null);

  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="issue n°02" title="Campaigns" accent="seven worlds" />
      <p className="px-6 md:px-10 max-w-[58ch] font-serif italic text-xl text-ink/75 mb-14">
        Seven briefs I made trouble for. Each one opens like a spread —
        problem, insight, strategy, and the creatives that came out the other
        side.
      </p>

      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="editorial-rule pt-4">
          {CAMPAIGNS.map((c, i) => (
            <button
              key={c.slug}
              onClick={() => setOpen(c)}
              className="group w-full text-left grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-ink/15 items-start hover:bg-babypink/30 transition-colors px-2"
            >
              <div className="col-span-2 md:col-span-1 font-accent text-2xl md:text-3xl text-ink/40 tabular-nums pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-10 md:col-span-6">
                <div className="font-display uppercase tracking-tight text-2xl md:text-4xl leading-tight">
                  {c.title}
                </div>
                <div className="font-serif italic text-lg md:text-xl text-ink/70 mt-1">
                  {c.tagline}
                </div>
              </div>
              <div className="col-span-7 md:col-span-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="text-[10px] font-accent uppercase tracking-widest px-2 py-1 border border-ink/30 text-ink/70">
                    {t}
                  </span>
                ))}
              </div>
              <div className="col-span-5 md:col-span-2 text-right">
                <span className="inline-flex items-center gap-2 font-accent uppercase tracking-widest text-[11px] text-ink group-hover:text-hotpink transition-colors">
                  open spread
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
                <div className="text-[10px] font-accent uppercase tracking-widest text-ink/40 mt-1">
                  {c.client}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && <CampaignFlip c={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function CampaignFlip({ c, onClose }: { c: Campaign; onClose: () => void }) {
  const pages = [
    { label: "Cover", render: () => <CoverPage c={c} /> },
    { label: "The Problem", render: () => <TextPage eyebrow="01 · problem" body={c.problem} /> },
    { label: "The Insight", render: () => <TextPage eyebrow="02 · insight" body={c.insight} pink /> },
    { label: "The Strategy", render: () => <TextPage eyebrow="03 · strategy" body={c.strategy} dark /> },
    { label: "Creatives", render: () => <CreativesPage c={c} /> },
    { label: "Outcome", render: () => <OutcomePage c={c} /> },
  ];
  const [p, setP] = useState(0);
  const total = pages.length;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm grid place-items-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <div className="flex items-center justify-between mb-3 text-paper">
          <div className="font-accent uppercase tracking-[0.3em] text-xs">
            {c.title} · spread {p + 1}/{total}
          </div>
          <button onClick={onClose} className="font-accent uppercase tracking-widest text-xs border border-paper/40 px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors">
            close ×
          </button>
        </div>

        <div className="relative bg-paper aspect-[4/3] md:aspect-[16/10] shadow-2xl border-2 border-ink overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={p}
              initial={{ rotateY: 60, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -60, opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0"
            >
              {pages[p].render()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4 text-paper">
          <button onClick={() => setP((x) => Math.max(0, x - 1))} disabled={p === 0} className="font-accent uppercase tracking-widest text-xs disabled:opacity-30">
            ← prev page
          </button>
          <div className="flex gap-1.5">
            {pages.map((pg, i) => (
              <button key={i} onClick={() => setP(i)} title={pg.label}
                className={`h-1.5 transition-all ${i === p ? "w-8 bg-hotpink" : "w-4 bg-paper/30"}`} />
            ))}
          </div>
          <button onClick={() => setP((x) => Math.min(total - 1, x + 1))} disabled={p === total - 1} className="font-accent uppercase tracking-widest text-xs disabled:opacity-30">
            next page →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CoverPage({ c }: { c: Campaign }) {
  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="bg-babypink p-8 md:p-12 flex flex-col justify-between">
        <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-ink/60">issue n° {c.slug.slice(0, 2)} — case study</div>
        <div>
          <h2 className="font-serif italic text-5xl md:text-7xl leading-[0.95] text-ink">{c.title.toLowerCase()}</h2>
          <div className="font-display uppercase mt-4 text-sm tracking-widest text-ink/70">{c.client}</div>
        </div>
        <div className="font-serif italic text-lg md:text-2xl text-ink/80">"{c.tagline}"</div>
      </div>
      <div className="bg-ink text-paper p-8 md:p-12 flex flex-col justify-end gap-2">
        {c.tags.map((t) => (
          <div key={t} className="font-display uppercase tracking-tight text-3xl md:text-5xl leading-none text-paper">{t}</div>
        ))}
        <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-paper/50 mt-6">flip the page →</div>
      </div>
    </div>
  );
}

function TextPage({ eyebrow, body, pink, dark }: { eyebrow: string; body: string; pink?: boolean; dark?: boolean }) {
  return (
    <div className={`h-full p-10 md:p-16 flex flex-col justify-center ${dark ? "bg-ink text-paper" : pink ? "bg-babypink" : "bg-paper"}`}>
      <div className={`font-accent uppercase tracking-[0.35em] text-[11px] mb-6 ${dark ? "text-hotpink" : "text-ink/60"}`}>{eyebrow}</div>
      <p className="font-serif text-2xl md:text-4xl leading-[1.25] max-w-[28ch]">{body}</p>
    </div>
  );
}

function CreativesPage({ c }: { c: Campaign }) {
  return (
    <div className="h-full p-8 md:p-12 bg-paper overflow-auto">
      <div className="font-accent uppercase tracking-[0.35em] text-[11px] text-ink/60 mb-6">04 · the creatives</div>
      <div className="grid md:grid-cols-3 gap-5">
        {c.creatives.map((cr, i) => (
          <div key={cr.title} className="border border-ink/20 p-4">
            <div className="aspect-[4/5] bg-babypink/60 grid place-items-center mb-3">
              <div className="font-display text-5xl text-ink/20">{String(i + 1).padStart(2, "0")}</div>
            </div>
            <div className="font-display uppercase tracking-tight text-lg leading-tight">{cr.title}</div>
            <div className="font-serif italic text-base text-ink/70 mt-1">{cr.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutcomePage({ c }: { c: Campaign }) {
  return (
    <div className="h-full bg-cream p-10 md:p-16 flex flex-col justify-center">
      <div className="font-accent uppercase tracking-[0.35em] text-[11px] text-ink/60 mb-4">05 · outcome</div>
      <p className="font-serif italic text-3xl md:text-5xl leading-tight max-w-[24ch]">{c.outcome}</p>
      <div className="editorial-rule mt-10 max-w-xs" />
      <div className="font-accent uppercase tracking-widest text-xs text-ink/50 mt-6">end of spread · {c.title}</div>
    </div>
  );
}
