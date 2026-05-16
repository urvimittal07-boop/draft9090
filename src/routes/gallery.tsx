import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERIES, type Gallery } from "@/lib/data";
import { SectionTitle, Star } from "@/components/zine";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Creative Gallery — ARIA" },
      { name: "description", content: "An art gallery you can click: magazines, ad films, ad games, creatives." },
      { property: "og:title", content: "Creative Gallery — ARIA" },
      { property: "og:description", content: "Magazines, films, games, creatives — clickable, flip-through." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [open, setOpen] = useState<Gallery | null>(null);

  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="walk into the room —" title="Creative" accent="gallery" />
      <p className="px-6 md:px-10 max-w-[60ch] text-lg text-ink/75 mb-12">
        Each frame on the wall is a category. Click one to walk inside and flip
        through the works — magazines, ad films, the playable stuff, and the
        odd stills.
      </p>

      {/* gallery wall */}
      <section className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
        <div className="relative bg-cream border-y-4 border-ink py-16 px-6">
          {/* picture rail */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-ink" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {GALLERIES.map((g, i) => (
              <button
                key={g.slug}
                onClick={() => setOpen(g)}
                className="group relative block text-left"
              >
                {/* hanging wire */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-16 bg-ink/40" />
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-ink" />
                <div
                  className={`relative aspect-[4/5] ${g.color} border-[10px] border-card shadow-[8px_8px_0_0_var(--color-ink)] ring-2 ring-ink p-5 flex flex-col justify-between transition-transform group-hover:-translate-y-1`}
                  style={{ transform: `rotate(${(i - 1.5) * 1.4}deg)` }}
                >
                  <div className="font-marker text-white text-xl">frame {String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="font-accent uppercase text-3xl tracking-tight text-white leading-none">
                      {g.title}
                    </div>
                    <div className="font-hand text-xl text-white/85 mt-2">{g.subtitle}</div>
                  </div>
                  <Star className="absolute top-3 right-3 w-6 h-6 text-white/70" />
                </div>
                <div className="text-center font-accent uppercase tracking-widest text-xs mt-4 text-ink/60">
                  click to open →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <FlipViewer gallery={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function FlipViewer({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const total = gallery.items.length;
  const item = gallery.items[page];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/85 backdrop-blur-sm grid place-items-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full"
      >
        <div className="flex items-center justify-between mb-4 text-paper">
          <div>
            <div className="font-marker text-hotpink text-xl">{gallery.title}</div>
            <div className="font-accent uppercase tracking-widest text-xs text-paper/60">
              page {page + 1} of {total}
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-accent uppercase tracking-widest text-sm border border-paper/40 px-4 py-2 hover:bg-paper hover:text-ink transition-colors"
          >
            close ×
          </button>
        </div>

        <div className="relative bg-card aspect-[4/3] md:aspect-[16/10] shadow-2xl border-4 border-ink overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0 grid md:grid-cols-2"
            >
              <div className={`${gallery.color} grid place-items-center p-8`}>
                <div className="text-center">
                  <div className="font-marker text-white/80 text-xl mb-2">{item.tag}</div>
                  <div className="font-accent uppercase text-white text-4xl tracking-tighter leading-none">
                    {item.title.split(" — ")[0]}
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="font-display italic text-3xl leading-tight">{item.title}</div>
                <p className="mt-4 text-lg text-ink/80">{item.note}</p>
                <div className="mt-6 inline-block self-start text-xs font-accent uppercase tracking-widest bg-ink text-paper px-3 py-1">
                  {item.tag}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="font-marker text-2xl text-paper disabled:opacity-30"
          >
            ← prev page
          </button>
          <div className="flex gap-2">
            {gallery.items.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full ${i === page ? "bg-hotpink" : "bg-paper/30"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
            disabled={page === total - 1}
            className="font-marker text-2xl text-paper disabled:opacity-30"
          >
            next page →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
