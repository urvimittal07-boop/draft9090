import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAMPAIGNS, type Campaign } from "@/lib/data";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Brand Campaigns — URVI" },
      { name: "description", content: "Seven brand campaigns. Click any title to play the animated deck in fullscreen." },
      { property: "og:title", content: "Brand Campaigns — URVI" },
      { property: "og:description", content: "Seven animated campaign decks, played inside the portfolio." },
    ],
  }),
  component: CampaignsList,
});

function CampaignsList() {
  const [open, setOpen] = useState<Campaign | null>(null);

  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="issue n°02" title="Campaigns" accent="seven decks" />
      <p className="px-6 md:px-10 max-w-[58ch] font-serif italic text-xl text-ink/75 mb-14">
        Seven brand campaigns. Click any title — the deck opens cinematically,
        animations and all, right here on the page.
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
                  open deck
                  <span className="inline-block transition-transform group-hover:translate-x-1">▶</span>
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
        {open && <DeckPlayer c={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function DeckPlayer({ c, onClose }: { c: Campaign; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md grid place-items-center p-3 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        {/* header */}
        <div className="flex items-center justify-between mb-3 text-paper">
          <div className="font-accent uppercase tracking-[0.3em] text-[10px] md:text-xs">
            <span className="text-hotpink">●</span> now playing — {c.title}
            <span className="text-paper/40 hidden md:inline"> · {c.client}</span>
          </div>
          <button
            onClick={onClose}
            className="font-accent uppercase tracking-widest text-[10px] md:text-xs border border-paper/40 px-3 py-1.5 hover:bg-paper hover:text-ink transition-colors"
          >
            close ×
          </button>
        </div>

        {/* stage */}
        <div className="relative bg-ink aspect-video shadow-[0_30px_120px_-20px_rgba(255,82,158,0.35)] border border-paper/10 overflow-hidden">
          {c.deck?.embed ? (
            <iframe
              src={c.deck.embed}
              title={`${c.title} deck`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : c.deck?.video ? (
            <video
              ref={videoRef}
              src={c.deck.video}
              poster={c.deck.poster}
              controls
              autoPlay
              playsInline
              onError={() => setMissing(true)}
              className="absolute inset-0 w-full h-full object-contain bg-ink"
            />
          ) : (
            <DeckPlaceholder c={c} />
          )}

          {missing && <DeckPlaceholder c={c} />}
        </div>

        {/* tagline */}
        <div className="mt-4 text-center font-serif italic text-paper/80 text-base md:text-xl">
          "{c.tagline}"
        </div>
        <div className="text-center font-accent uppercase tracking-[0.35em] text-[10px] text-paper/40 mt-2">
          press esc to close
        </div>
      </motion.div>
    </motion.div>
  );
}

function DeckPlaceholder({ c }: { c: Campaign }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink via-ink to-hotpink/30 text-paper p-8 text-center">
      <div>
        <div className="font-accent uppercase tracking-[0.4em] text-[10px] text-hotpink mb-4">
          deck not uploaded yet
        </div>
        <div className="font-display uppercase text-3xl md:text-5xl leading-tight mb-4">
          {c.title}
        </div>
        <div className="font-serif italic text-paper/70 text-sm md:text-base max-w-md mx-auto">
          Drop the animated deck as an MP4 at
          <code className="block mt-2 font-accent not-italic text-xs text-hotpink/90">
            public/decks/{c.slug}.mp4
          </code>
        </div>
      </div>
    </div>
  );
}
