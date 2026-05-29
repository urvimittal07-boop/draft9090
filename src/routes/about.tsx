import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mosaicLoves from "@/assets/mosaic-loves.jpg";
import mosaicMountains from "@/assets/mosaic-mountains.jpg";
import heroGirl from "@/assets/hero-girl.jpg";
import handbag from "@/assets/handbag.png";
import { Star, Scribble, StickyNote } from "@/components/zine";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — i" },
      { name: "description", content: "I am a mosaic of everything I've ever loved. Tools in my bag, skills behind a locked door." },
      { property: "og:title", content: "About — i" },
      { property: "og:description", content: "I am a mosaic of everything I've ever loved." },
    ],
  }),
  component: About,
});

const MOSAIC = [
  { label: "Cinema", note: "the everything religion", img: mosaicLoves, span: "col-span-2 row-span-2", rot: 2, tape: "tape-pink" },
  { label: "Mountains", note: "high & quiet", img: mosaicMountains, span: "col-span-2 row-span-2", rot: -1.5, tape: "tape" },
  { label: "Bollywood", note: "soft corner, loud songs", color: "bg-hotpink text-paper", span: "col-span-2 row-span-1", rot: -1 },
  { label: "Desserts", note: "tiramisu girl ✿", color: "bg-cream", span: "col-span-1 row-span-1", rot: -2 },
  { label: "Dogs", note: "every single one", color: "bg-card border border-ink/15", span: "col-span-1 row-span-1", rot: 2 },
  { label: "Swimming", note: "lap-after-lap brain", color: "bg-babypink/70", span: "col-span-1 row-span-1", rot: -3 },
  { label: "Running", note: "morning miles", color: "bg-babypink", span: "col-span-1 row-span-1", rot: 3 },
  { label: "Mixed media", note: "collage > clean slate", color: "bg-babypink/60", span: "col-span-2 row-span-1", rot: 1.5 },
  { label: "Sketching", note: "in math class", color: "bg-card border border-ink/15", span: "col-span-1 row-span-1", rot: -2 },
  { label: "Styling", note: "fits = storytelling", color: "bg-ink text-paper", span: "col-span-1 row-span-2", rot: 1 },
  { label: "Sewing", note: "i make my fits", color: "bg-cream", span: "col-span-1 row-span-1", rot: 2 },
  { label: "Meditation", note: "soft mind, loud world", color: "bg-cream", span: "col-span-2 row-span-1", rot: -1, hand: true },
  { label: "Poetry", note: "midnight notes app", color: "bg-orange/80 text-paper", span: "col-span-1 row-span-1", rot: -3 },
  { label: "Substack", note: "newsletters i live in", color: "bg-card border border-ink/15", span: "col-span-1 row-span-1", rot: 2 },
  { label: "Music", note: "headphones glued on", color: "bg-ink text-paper", span: "col-span-2 row-span-1", rot: -2 },
  { label: "Food", note: "tasting menu of life", color: "bg-cream", span: "col-span-1 row-span-1", rot: 3 },
  { label: "Languages & culture", note: "english · français · हिन्दी · मारवाड़ी · नेपाली · বাংলা", color: "bg-hotpink text-paper", span: "col-span-2 row-span-1", rot: -1 },
  { label: "Debating", note: "i will win (politely)", color: "bg-babypink", span: "col-span-1 row-span-1", rot: 3 },
  { label: "Social groups", note: "rooms full of people", color: "bg-card border border-ink/15", span: "col-span-1 row-span-1", rot: -2 },
  { label: "Hosting", note: "a table, candles, chaos", color: "bg-ink text-paper", span: "col-span-2 row-span-1", rot: 1 },
];


const TOOLS = [
  { name: "Photoshop", abbr: "Ps", color: "bg-[#001E36] text-[#31A8FF]" },
  { name: "Illustrator", abbr: "Ai", color: "bg-[#330000] text-[#FF9A00]" },
  { name: "InDesign", abbr: "Id", color: "bg-[#49021F] text-[#FF3366]" },
  { name: "Premiere Pro", abbr: "Pr", color: "bg-[#00005B] text-[#9999FF]" },
  { name: "After Effects", abbr: "Ae", color: "bg-[#00005B] text-[#D291FF]" },
  { name: "Figma", abbr: "Fg", color: "bg-ink text-[#A259FF]" },
  { name: "Canva", abbr: "Cv", color: "bg-[#00C4CC] text-white" },
  { name: "Notion", abbr: "No", color: "bg-white text-ink border-2 border-ink" },
];

const SKILLS = [
  { name: "Brand Strategy", level: 95 },
  { name: "Art Direction", level: 92 },
  { name: "Copywriting", level: 88 },
  { name: "Campaign Design", level: 94 },
  { name: "Editorial Layout", level: 86 },
  { name: "Consumer Research", level: 84 },
  { name: "Storyboarding", level: 80 },
  { name: "Web Design", level: 78 },
];

function About() {
  return (
    <div className="overflow-hidden">
      {/* INTRO — INFORMAL */}
      <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="font-marker text-hotpink text-3xl -rotate-2">hi hi hi.</div>
        <h1 className="font-display italic text-5xl md:text-7xl leading-[1.05] mt-3 max-w-[20ch]">
          I am a mosaic of <span className="scribble-underline">everything</span> I've loved.
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink/80">
          {"\n"}
        </p>
      </section>

      {/* MOSAIC WALL */}
      <section className="px-6 md:px-12 pb-16 max-w-7xl mx-auto relative">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-accent uppercase text-5xl md:text-7xl tracking-tighter leading-none">
            The <span className="text-hotpink">mosaic</span> wall
          </h2>
          <div className="font-marker text-orange text-xl -rotate-3 hidden md:block">a wall of me ✿</div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 auto-rows-[120px] md:auto-rows-[140px] gap-3">
          {MOSAIC.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              style={{ transform: `rotate(${m.rot}deg)` }}
              className={`relative paper-card overflow-hidden ${m.span} ${m.color ?? ""}`}
            >
              {m.img && (
                <img src={m.img} alt={m.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className={`absolute -top-2 left-4 w-16 h-4 ${m.tape ?? "tape-pink"} rotate-[-6deg]`} />
              <div className="absolute inset-0 p-3 flex flex-col justify-end">
                <div className={`${m.hand ? "font-hand text-3xl" : "font-accent uppercase text-sm tracking-widest"}`}>
                  {m.label}
                </div>
                <div className={`text-xs mt-1 ${m.img ? "bg-card/90 inline-block px-1.5 py-0.5 w-fit font-hand text-base text-ink" : "opacity-80"}`}>
                  {m.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Star className="absolute -top-2 -right-2 w-12 h-12 text-hotpink anim-spin-slow" />
      </section>

      {/* SLIGHTLY FORMAL */}
      <section className="bg-ink text-paper py-20 px-6 md:px-12 border-y-4 border-ink">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-marker text-hotpink text-2xl mb-2">the official bit →</div>
            <h2 className="font-accent uppercase text-5xl md:text-6xl tracking-tighter leading-none">
              On paper, I am.
            </h2>
          </div>
          <div className="space-y-4 text-paper/85 text-lg leading-relaxed">
            <p>
              Branding &amp; Advertising undergraduate at NMIMS Mumbai (CGPA 8.96).
              Designer, copywriter, and strategist with 7 campaign case studies, 6
              capstone projects, and a creative gallery spanning magazines, ad films,
              and ad games.
            </p>
            <p>
              I&apos;ve represented at IIM Ahmedabad &amp; IIT Bombay, chaired three
              college fests, and turned in research on Zara Studio, Fairmont, and Salt
              Tech. I&apos;m looking for roles where the brief says &quot;make it weird,
              make it work.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S IN MY BAG */}
      <section className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="font-marker text-hotpink text-2xl -rotate-2 mb-2">click the bag ↓</div>
          <h2 className="font-accent uppercase text-5xl md:text-7xl tracking-tighter">
            What's in my <span className="text-hotpink">bag?</span>
          </h2>
        </div>
        <Handbag />
      </section>

      {/* SKILLS DOOR */}
      <section className="px-6 md:px-12 py-24 bg-cream border-y-4 border-ink">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <div className="font-marker text-orange text-2xl rotate-2 mb-2">turn the key →</div>
          <h2 className="font-accent uppercase text-5xl md:text-7xl tracking-tighter">
            Unlock my <span className="text-orange">skillset</span>
          </h2>
          <p className="mt-4 max-w-[50ch] mx-auto text-ink/70">
            Behind every door is a girl with too many tabs open. Tap the keyhole to
            see what she&apos;s actually good at.
          </p>
        </div>
        <SkillDoor />
      </section>

      {/* OUTRO — INFORMAL AGAIN */}
      <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center relative">
        <StickyNote rotate={-3} color="pink" className="inline-block mb-8">
          p.s. i don&apos;t bite (much)
        </StickyNote>
        <h3 className="font-display italic text-4xl md:text-6xl leading-tight">
          M
        </h3>
        <Scribble className="mx-auto w-40 text-hotpink mt-6" />
      </section>
    </div>
  );
}

function Handbag() {
  const [open, setOpen] = useState(false);
  // measure container so the spill radius always fits the visible frame on mobile
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 600, h: 600 });
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // tool tile size scales down on tiny screens
  const tile = box.w < 380 ? 64 : box.w < 520 ? 80 : 96;
  // keep tools fully inside the container — leave half a tile of padding
  const margin = tile / 2 + 12;
  const radiusX = Math.max(80, box.w / 2 - margin);
  const radiusY = Math.max(80, box.h / 2 - margin - 20);

  return (
    <div ref={wrapRef} className="relative w-full max-w-3xl mx-auto h-[460px] sm:h-[560px] md:h-[620px] overflow-hidden">
      {/* tools fly out */}
      <AnimatePresence>
        {open &&
          TOOLS.map((t, i) => {
            const angle = (i / TOOLS.length) * Math.PI * 2;
            const x = Math.cos(angle) * radiusX;
            const y = Math.sin(angle) * radiusY - 20;
            return (
              <motion.div
                key={t.name}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ x, y, opacity: 1, scale: 1, rotate: (i % 2 ? 8 : -8) }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.04 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div
                  style={{ width: tile, height: tile }}
                  className={`grid place-items-center font-accent text-xl sm:text-2xl paper-card ${t.color}`}
                >
                  {t.abbr}
                </div>
                <div className="text-center font-marker text-xs sm:text-sm mt-1.5">{t.name}</div>
              </motion.div>
            );
          })}
      </AnimatePresence>

      {/* the bag */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
        aria-label="Toggle bag"
      >
        <motion.img
          src={handbag}
          alt="my bag"
          width={400}
          height={400}
          animate={{ rotate: open ? -4 : 0, scale: open ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-marker text-hotpink text-lg sm:text-xl whitespace-nowrap">
          {open ? "← put it back" : "tap to spill →"}
        </div>
      </button>
    </div>
  );
}


function SkillDoor() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative max-w-3xl mx-auto h-[480px]" style={{ perspective: "1400px" }}>
      {/* behind-door content */}
      <div className="absolute inset-0 bg-ink text-paper p-8 md:p-10 grid grid-cols-2 gap-4 content-center border-4 border-ink">
        {SKILLS.map((s) => (
          <div key={s.name} className="border-l-4 border-hotpink pl-3">
            <div className="font-accent uppercase text-base md:text-lg tracking-widest">{s.name}</div>
            <div className="h-2 bg-paper/20 mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: open ? `${s.level}%` : 0 }}
                transition={{ duration: 0.8, delay: open ? 0.4 : 0 }}
                className="h-full bg-orange"
              />
            </div>
            <div className="text-xs text-paper/60 mt-1">{s.level}%</div>
          </div>
        ))}
      </div>

      {/* door */}
      <motion.div
        animate={{ rotateY: open ? -105 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 14 }}
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
        className="absolute inset-0 bg-orange border-4 border-ink shadow-[10px_10px_0_0_var(--color-ink)] p-8 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start">
          <div className="font-accent uppercase text-3xl md:text-5xl tracking-tighter leading-none">
            ROOM<br />OF<br />SKILLS
          </div>
          <div className="font-marker text-white text-xl rotate-6">no peeking</div>
        </div>

        <div className="self-end">
          {/* keyhole */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="relative w-20 h-28 bg-ink rounded-t-full grid place-items-center hover:scale-110 transition-transform"
            aria-label="Unlock door"
          >
            <div className="w-6 h-6 rounded-full bg-orange" />
            <div className="absolute bottom-3 w-3 h-10 bg-orange" />
          </button>
          <div className="font-marker text-white text-base text-center mt-2">
            {open ? "shhh, you're in ★" : "click the keyhole"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
