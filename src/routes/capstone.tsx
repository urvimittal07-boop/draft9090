import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAPSTONES, type Capstone } from "@/lib/data";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/capstone")({
  head: () => ({
    meta: [
      { title: "Capstone Projects — URVI" },
      { name: "description", content: "Six capstone projects — open each to read the brief, process, outcome." },
      { property: "og:title", content: "Capstone Projects — URVI" },
      { property: "og:description", content: "Six real-world capstone projects." },
    ],
  }),
  component: CapstoneList,
});

function CapstoneList() {
  const [open, setOpen] = useState<Capstone | null>(null);

  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="issue n°03" title="Capstone" accent="six projects" />
      <p className="px-6 md:px-10 max-w-[58ch] font-serif italic text-xl text-ink/75 mb-14">
        Real briefs. Real teammates. Real deadlines. Click any card to open the
        case file — brief, process, outcome.
      </p>

      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CAPSTONES.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setOpen(p)}
              className="group text-left bg-card border border-ink/15 hover:border-ink transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-ink)]"
            >
              <div className={`aspect-[4/3] relative overflow-hidden ${i % 3 === 0 ? "bg-babypink" : i % 3 === 1 ? "bg-cream" : "bg-ink text-paper"}`}>
                <div className="absolute top-4 left-4 font-accent uppercase tracking-[0.3em] text-[10px] opacity-60">
                  capstone · {String(i + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-serif italic text-3xl md:text-4xl leading-[1] mb-2">
                    {p.title.toLowerCase()}
                  </div>
                  <div className="font-accent uppercase tracking-widest text-[10px] opacity-70">
                    {p.year} · {p.role}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="font-display uppercase tracking-tight text-sm text-ink/60 mb-1">{p.subtitle}</div>
                <div className="font-serif text-base text-ink/80 line-clamp-2">{p.brief}</div>
                <div className="mt-4 inline-flex items-center gap-2 font-accent uppercase tracking-widest text-[11px] text-ink group-hover:text-hotpink transition-colors">
                  open case file
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && <CapstoneFlip p={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function CapstoneFlip({ p, onClose }: { p: Capstone; onClose: () => void }) {
  const pages = [
    {
      render: () => (
        <div className="grid md:grid-cols-2 h-full">
          <div className="bg-babypink p-10 md:p-14 flex flex-col justify-between">
            <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-ink/60">capstone · case file</div>
            <h2 className="font-serif italic text-5xl md:text-7xl leading-[0.95]">{p.title.toLowerCase()}</h2>
            <div className="font-display uppercase tracking-tight text-sm text-ink/70">{p.subtitle}</div>
          </div>
          <div className="bg-ink text-paper p-10 md:p-14 grid grid-cols-1 gap-4 content-center">
            {[["Role", p.role], ["Year", p.year], ["Outcome", p.outcome]].map(([k, v]) => (
              <div key={k}>
                <div className="font-accent uppercase tracking-[0.3em] text-[10px] text-hotpink">{k}</div>
                <div className="font-serif italic text-xl md:text-2xl mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      render: () => (
        <div className="h-full p-10 md:p-16 bg-paper flex flex-col justify-center">
          <div className="font-accent uppercase tracking-[0.35em] text-[11px] text-ink/60 mb-6">the brief</div>
          <p className="font-serif text-2xl md:text-4xl leading-[1.25] max-w-[30ch]">{p.brief}</p>
        </div>
      ),
    },
    {
      render: () => (
        <div className="h-full p-10 md:p-14 bg-cream overflow-auto">
          <div className="font-accent uppercase tracking-[0.35em] text-[11px] text-ink/60 mb-6">the process</div>
          <ol className="space-y-5">
            {p.process.map((step, i) => (
              <li key={i} className="flex gap-5 items-baseline border-b border-ink/15 pb-4">
                <span className="font-display text-4xl text-hotpink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif italic text-xl md:text-2xl leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      render: () => (
        <div className="h-full bg-babypink p-10 md:p-16 flex flex-col justify-center">
          <div className="font-accent uppercase tracking-[0.35em] text-[11px] text-ink/60 mb-4">outcome</div>
          <p className="font-serif italic text-3xl md:text-5xl leading-tight max-w-[24ch]">{p.outcome}</p>
          <div className="editorial-rule mt-10 max-w-xs" />
          <div className="font-accent uppercase tracking-widest text-xs text-ink/50 mt-6">end of file · {p.title}</div>
        </div>
      ),
    },
  ];
  const [i, setI] = useState(0);

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
          <div className="font-accent uppercase tracking-[0.3em] text-xs">{p.title} · page {i + 1}/{pages.length}</div>
          <button onClick={onClose} className="font-accent uppercase tracking-widest text-xs border border-paper/40 px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors">
            close ×
          </button>
        </div>

        <div className="relative bg-paper aspect-[4/3] md:aspect-[16/10] shadow-2xl border-2 border-ink overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ rotateY: 60, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -60, opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0"
            >
              {pages[i].render()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4 text-paper">
          <button onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0} className="font-accent uppercase tracking-widest text-xs disabled:opacity-30">← prev</button>
          <div className="flex gap-1.5">
            {pages.map((_, j) => (
              <button key={j} onClick={() => setI(j)} className={`h-1.5 transition-all ${j === i ? "w-8 bg-hotpink" : "w-4 bg-paper/30"}`} />
            ))}
          </div>
          <button onClick={() => setI((x) => Math.min(pages.length - 1, x + 1))} disabled={i === pages.length - 1} className="font-accent uppercase tracking-widest text-xs disabled:opacity-30">next →</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
