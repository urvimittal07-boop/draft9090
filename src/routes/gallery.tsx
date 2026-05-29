import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { GALLERIES, type Gallery } from "@/lib/data";
import { Star } from "@/components/zine";
import { Reveal, StretchText } from "@/components/reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "THIS IS MY Gallery — i" },
      { name: "description", content: "An immersive floating exhibition: magazines, ad films, ad games, posters." },
      { property: "og:title", content: "THIS IS MY Gallery — i" },
      { property: "og:description", content: "An interactive museum of magazines, films, games & posters." },
    ],
  }),
  component: GalleryPage,
});

type Scatter = { x: number; y: number; r: number; w: number; h: number };

function GalleryPage() {
  const [open, setOpen] = useState<Gallery | null>(null);

  return (
    <div className="overflow-hidden">
      <section className="px-6 md:px-10 pt-2 pb-6">
        <Reveal>
          <div className="font-accent uppercase tracking-[0.35em] text-xs text-ink/60 mb-3">— the exhibition —</div>
          <h1 className="font-serif italic font-normal leading-[0.9] text-6xl md:text-9xl">
            <StretchText>THIS IS MY</StretchText>
            <span className="block font-display not-italic uppercase tracking-tight text-4xl md:text-7xl mt-2">
              gallery<span className="text-hotpink">.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink/75">
            Four rooms. Drag the artefacts around. Click one to walk inside —
            magazines unfold, films take over the screen, games open in
            floating windows.
          </p>
        </Reveal>
      </section>

      {/* THE EXHIBITION FLOOR — desktop free-scatter */}
      <section className="hidden md:block relative grain-bg border-y-2 border-ink min-h-[760px] overflow-hidden">
        <Spotlight />
        <div className="absolute inset-0 pointer-events-none">
          {["NORTH WING", "EAST WING", "SOUTH WING", "WEST WING"].map((t, i) => (
            <div
              key={t}
              className="absolute font-accent uppercase tracking-[0.5em] text-[10px] text-ink/40"
              style={{
                top: i < 2 ? 20 : "auto",
                bottom: i >= 2 ? 20 : "auto",
                left: i % 2 === 0 ? 24 : "auto",
                right: i % 2 === 1 ? 24 : "auto",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <FloatingExhibition galleries={GALLERIES} onOpen={setOpen} />
      </section>

      {/* MOBILE — stacked rooms, no overflow */}
      <section className="md:hidden grain-bg border-y-2 border-ink px-4 py-8 space-y-10">
        {GALLERIES.map((g, gi) => (
          <div key={g.slug} className="relative">
            <button
              onClick={() => setOpen(g)}
              className="block w-full text-left mb-4"
            >
              <div className="font-marker text-hotpink text-sm -rotate-2 mb-1">
                room {String(gi + 1).padStart(2, "0")} →
              </div>
              <div className="font-accent uppercase text-3xl leading-none tracking-tight">
                {g.title}
              </div>
              <div className="font-display italic text-sm text-ink/60 mt-1">{g.subtitle}</div>
            </button>
            <div className="grid grid-cols-2 gap-3">
              {g.items.slice(0, 4).map((item, ii) => (
                <motion.button
                  key={ii}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setOpen(g)}
                  style={{ transform: `rotate(${ii % 2 === 0 ? -1.5 : 1.5}deg)` }}
                  className="paper-card paper-lift p-2 text-left"
                >
                  <div className={`relative w-full aspect-[3/4] ${g.color} grid place-items-center overflow-hidden vhs`}>
                    <Star className="w-7 h-7 text-white/80" />
                    <div className="absolute bottom-1.5 left-1.5 font-accent uppercase text-[9px] tracking-widest text-white/80">
                      {item.tag}
                    </div>
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 tape-pink rotate-[-6deg]" />
                  </div>
                  <div className="pt-1.5">
                    <div className="font-display italic text-xs leading-tight line-clamp-2">{item.title}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </section>


      <p className="px-6 md:px-10 py-10 max-w-[60ch] text-sm font-marker text-ink/60">
        psst — every piece is draggable. shuffle the room however you like.
      </p>

      <AnimatePresence>
        {open && <RoomViewer gallery={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function Spotlight() {
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(circle at ${x}% ${y}%, oklch(0.985 0.006 60 / 0.9), oklch(0.93 0.035 8 / 0.2) 30%, oklch(0.16 0.01 60 / 0.15) 80%)`
  );
  return (
    <motion.div
      aria-hidden
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="absolute inset-0 z-0"
      style={{ backgroundImage: bg as unknown as string }}
    />
  );
}

function FloatingExhibition({
  galleries, onOpen,
}: { galleries: Gallery[]; onOpen: (g: Gallery) => void }) {
  // pre-scatter every item across the floor — stable per render
  const positions = useMemo(() => {
    const out: { gIdx: number; iIdx: number; pos: Scatter }[] = [];
    galleries.forEach((g, gIdx) => {
      const cols = 2;
      g.items.forEach((_, iIdx) => {
        // quadrant per gallery: split a 100x100 floor into 4 quadrants
        const qx = gIdx % 2 === 0 ? 5 : 55;
        const qy = gIdx < 2 ? 5 : 50;
        const col = iIdx % cols;
        const row = Math.floor(iIdx / cols);
        const jitterX = (Math.sin(gIdx * 9 + iIdx * 3.1) + 1) * 6;
        const jitterY = (Math.cos(gIdx * 5 + iIdx * 2.7) + 1) * 6;
        out.push({
          gIdx,
          iIdx,
          pos: {
            x: qx + col * 18 + jitterX,
            y: qy + row * 18 + jitterY,
            r: Math.sin(gIdx + iIdx) * 10,
            w: 180 + ((iIdx * 11) % 60),
            h: 220 + ((iIdx * 7) % 80),
          },
        });
      });
    });
    return out;
  }, [galleries]);

  return (
    <div className="relative w-full h-[760px]">
      {/* room markers (clickable big labels per gallery) */}
      {galleries.map((g, i) => {
        const px = i % 2 === 0 ? 18 : 70;
        const py = i < 2 ? 12 : 62;
        return (
          <button
            key={g.slug}
            onClick={() => onOpen(g)}
            data-cursor="enter room"
            className="absolute z-20 text-left group"
            style={{ left: `${px}%`, top: `${py}%` }}
          >
            <div className="font-marker text-hotpink text-sm -rotate-3 mb-1 opacity-70 group-hover:opacity-100 transition-opacity">
              room {String(i + 1).padStart(2, "0")} →
            </div>
            <div className="font-accent uppercase text-3xl md:text-5xl leading-none tracking-tight text-ink group-hover:text-hotpink transition-colors">
              {g.title}
            </div>
            <div className="font-display italic text-sm md:text-base text-ink/60 mt-1">{g.subtitle}</div>
          </button>
        );
      })}

      {/* scattered artefacts */}
      {positions.map(({ gIdx, iIdx, pos }) => {
        const g = galleries[gIdx];
        const item = g.items[iIdx];
        return (
          <ArtefactCard
            key={`${gIdx}-${iIdx}`}
            pos={pos}
            color={g.color}
            title={item.title}
            tag={item.tag}
            note={item.note}
            onOpen={() => onOpen(g)}
            tone={gIdx}
          />
        );
      })}
    </div>
  );
}

function ArtefactCard({
  pos, color, title, tag, note, onOpen, tone,
}: {
  pos: Scatter;
  color: string;
  title: string;
  tag: string;
  note: string;
  onOpen: () => void;
  tone: number;
}) {
  const tapes = ["tape-pink", "tape", "tape-orange", "bg-ink/30"];
  return (
    <motion.button
      drag
      dragMomentum
      dragElastic={0.25}
      whileDrag={{ scale: 1.06, zIndex: 50, rotate: pos.r + 2 }}
      whileHover={{ scale: 1.03, zIndex: 40 }}
      initial={{ opacity: 0, scale: 0.6, rotate: pos.r - 20, y: 60 }}
      whileInView={{ opacity: 1, scale: 1, rotate: pos.r, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (tone * 4 + 1) * 0.05, ease: [0.19, 1, 0.22, 1] }}
      onClick={onOpen}
      data-cursor="open"
      className="absolute paper-card paper-lift p-3 text-left"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: pos.w,
        height: pos.h,
        rotate: pos.r,
      }}
    >
      <span className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 ${tapes[tone % tapes.length]} rotate-[-6deg]`} />
      <div className={`relative w-full h-2/3 ${color} grid place-items-center overflow-hidden vhs`}>
        <Star className="w-8 h-8 text-white/80" />
        <div className="absolute bottom-2 left-2 font-accent uppercase text-[10px] tracking-widest text-white/80">
          {tag}
        </div>
      </div>
      <div className="pt-2">
        <div className="font-display italic text-sm leading-tight line-clamp-2">{title}</div>
        <div className="font-hand text-base text-ink/60 line-clamp-1">{note}</div>
      </div>
    </motion.button>
  );
}

function RoomViewer({ gallery, onClose }: { gallery: Gallery; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const total = gallery.items.length;
  const item = gallery.items[page];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] grid place-items-center p-0 md:p-8"
      onClick={onClose}
    >
      {/* cinematic curtain */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-ink/90 backdrop-blur-md"
      />

      <motion.div
        initial={{ scale: 0.85, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full"
      >
        <div className="flex items-center justify-between mb-4 text-paper px-4">
          <div>
            <div className="font-marker text-hotpink text-2xl">{gallery.title} — room open</div>
            <div className="font-accent uppercase tracking-widest text-xs text-paper/60">
              piece {page + 1} of {total} · {gallery.subtitle}
            </div>
          </div>
          <button
            onClick={onClose}
            data-cursor="close"
            className="font-accent uppercase tracking-widest text-sm border border-paper/40 px-4 py-2 hover:bg-paper hover:text-ink transition-colors"
          >
            ✕ exit room
          </button>
        </div>

        <div className="relative bg-card aspect-[4/3] md:aspect-[16/9] shadow-2xl border-4 border-ink overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ rotateY: 80, opacity: 0, x: 60 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: -80, opacity: 0, x: -60 }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
              style={{ transformOrigin: "left center" }}
              className="absolute inset-0 grid md:grid-cols-2"
            >
              <div className={`${gallery.color} grid place-items-center p-8 relative vhs`}>
                {/* decorative scatter inside the room */}
                <div className="absolute top-4 left-4 w-16 h-4 tape-pink rotate-[-8deg]" />
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-paper/20" />
                <div className="text-center relative z-10">
                  <div className="font-marker text-white/80 text-xl mb-3">{item.tag}</div>
                  <div className="font-accent uppercase text-white text-5xl md:text-6xl tracking-tighter leading-[0.85]">
                    {item.title.split(" — ")[0]}
                  </div>
                  <Star className="w-10 h-10 text-white/70 mx-auto mt-4 anim-spin-slow" />
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center bg-paper relative">
                <div className="font-display italic text-3xl leading-tight">{item.title}</div>
                <p className="mt-4 text-lg text-ink/80">{item.note}</p>
                <div className="mt-6 inline-block self-start text-xs font-accent uppercase tracking-widest bg-ink text-paper px-3 py-1">
                  {item.tag}
                </div>
                <div className="absolute bottom-4 right-4 font-hand text-ink/40 text-sm">
                  — flip with arrows or dots →
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4 px-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            data-cursor="prev"
            className="font-marker text-2xl text-paper disabled:opacity-30"
          >
            ← prev
          </button>
          <div className="flex gap-2">
            {gallery.items.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                data-cursor={`p${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === page ? "bg-hotpink scale-125" : "bg-paper/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
            disabled={page === total - 1}
            data-cursor="next"
            className="font-marker text-2xl text-paper disabled:opacity-30"
          >
            next →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
