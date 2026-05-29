import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import heroGirl from "@/assets/hero-girl.jpg";
import mosaicMountains from "@/assets/mosaic-mountains.jpg";
import mosaicLoves from "@/assets/mosaic-loves.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { Scribble, Star } from "@/components/zine";
import { Reveal, StretchText, JumpyText } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "u — THIS IS MY Portfolio" },
      { name: "description", content: "Brand strategist & art director. A mosaic of everything I've ever loved." },
      { property: "og:title", content: "URVI — Creative Portfolio" },
      { property: "og:description", content: "A mosaic of everything I've ever loved." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rotateMid = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] px-6 md:px-12 py-10">
        {/* background scraps with parallax */}
        <motion.div style={{ y: yBack }} className="absolute top-10 left-6 w-44 h-56 bg-hotpink/10 -rotate-12 hidden md:block" />
        <motion.div style={{ y: yBack }} className="absolute bottom-20 right-10 w-72 h-44 bg-orange/10 rotate-6 hidden md:block" />
        <motion.div style={{ y: yMid, rotate: rotateMid }} className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-babypink/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <motion.div style={{ y: yFront }} className="lg:col-span-7 relative z-10 anim-peel">
            <div className="font-marker text-hotpink text-3xl -rotate-3 mb-3" data-cursor="hi">hi, i'm —</div>
            <h1 className="font-marker text-[22vw] lg:text-[12rem] leading-[0.85] text-ink">
              <StretchText>urvi</StretchText>
              <span className="text-hotpink font-display italic">.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="px-4 py-2 bg-ink text-paper font-accent uppercase text-3xl md:text-5xl rotate-[-2deg] -skew-x-6" data-cursor-magnet>
                <JumpyText>THIS IS MY</JumpyText>
              </div>
              <div className="font-display italic text-3xl md:text-5xl text-orange">
                <JumpyText>portfolio</JumpyText>
              </div>
            </div>

            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink/75">
              <JumpyText>I love turning ideas into experiences. Inspired by fashion, culture, cinema, mixed media, and human behavior, I create brands, campaigns, and digital worlds that people don’t just see — they feel. Currently studying Branding &amp; Advertising at NMIMS.</JumpyText>
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/campaigns"
                data-cursor="see"
                className="group relative inline-flex items-center gap-2 px-7 py-3 bg-hotpink text-white font-accent uppercase tracking-widest text-sm shadow-[6px_6px_0_0_var(--color-ink)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all glow-pink"
              >
                See the work →
              </Link>
              <Link
                to="/about"
                data-cursor="meet her"
                className="inline-flex items-center gap-2 px-7 py-3 border-2 border-ink font-accent uppercase tracking-widest text-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Who is she
              </Link>
            </div>
          </motion.div>

          {/* draggable hero collage — clustered top-right, contained */}
          <div className="lg:col-span-5 relative h-[560px] lg:h-[720px] overflow-hidden">
            <DraggablePiece
              initial={{ top: 8, right: 8, rotate: -5 }}
              className="w-72 h-[26rem] lg:w-80 lg:h-[30rem] paper-card p-3 vhs anim-float"
              cursorLabel="drag me"
              z={5}
            >
              <img src={heroGirl} alt="urvi portrait" width={1024} height={1280} className="w-full h-full object-cover" />
              <div className="absolute -top-3 left-10 w-24 h-6 tape-pink rotate-[10deg]" />
              <div className="absolute -bottom-3 right-6 w-20 h-6 tape rotate-[-8deg]" />
              <div className="absolute bottom-3 left-3 bg-cream px-2 py-0.5 font-hand text-sm text-ink rotate-[-3deg]">urvi ✿ '26</div>
            </DraggablePiece>

            <DraggablePiece
              initial={{ top: 24, right: 280, rotate: -10 }}
              className="w-24 h-24 rounded-full bg-orange grid place-items-center text-white font-accent text-[11px] uppercase text-center p-3 shadow-xl anim-jiggle"
              cursorLabel="spin"
              z={6}
            >
              MEET<br />ME<br />★
            </DraggablePiece>

            <DraggablePiece
              initial={{ bottom: 40, right: 200, rotate: 8 }}
              className="w-32 h-10 bg-babypink border-2 border-ink grid place-items-center font-hand text-ink text-base"
              cursorLabel="hello"
              z={4}
            >
              made with ♡
            </DraggablePiece>

            <DraggablePiece
              initial={{ bottom: 8, left: 8, rotate: -6 }}
              className="w-28 h-28 bg-cream paper-card p-2 grid place-items-center"
              cursorLabel="ticket"
              z={3}
            >
              <div className="text-center">
                <div className="font-accent uppercase text-[9px] tracking-widest text-ink/60">admit one</div>
                <div className="font-display italic text-2xl text-hotpink leading-none mt-1">urvi's<br/>world</div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 tape-pink rotate-[6deg]" />
            </DraggablePiece>

            <Star className="absolute top-4 left-4 w-8 h-8 text-hotpink anim-spin-slow pointer-events-none" />
            <Star className="absolute top-1/3 left-2 w-5 h-5 text-orange pointer-events-none" />
            <Star className="absolute top-1/2 right-4 w-4 h-4 text-ink pointer-events-none" />
            <Star className="absolute bottom-40 left-1/3 w-6 h-6 text-hotpink anim-spin-slow pointer-events-none" />
            <Star className="absolute bottom-4 right-6 w-5 h-5 text-orange pointer-events-none" />
            <Scribble className="absolute bottom-10 left-10 w-24 text-ink/30 pointer-events-none" />
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-accent uppercase tracking-[0.4em] text-[10px] text-ink/50"
        >
          ↓ scroll, drag, play
        </motion.div>
      </section>

      {/* TICKER */}
      <div className="border-y-2 border-ink bg-ink text-paper overflow-hidden py-4">
        <div className="anim-marquee flex whitespace-nowrap gap-8 font-accent uppercase tracking-widest text-lg">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8 items-center">
              <span>★ Brand Strategy</span><span className="text-hotpink">✶</span>
              <span>★ Art Direction</span><span className="text-orange">✶</span>
              <span>★ Copywriting</span><span className="text-hotpink">✶</span>
              <span>★ Campaign Design</span><span className="text-orange">✶</span>
              <span>★ Editorial</span><span className="text-hotpink">✶</span>
              <span>★ Film &amp; Motion</span><span className="text-orange">✶</span>
            </span>
          ))}
        </div>
      </div>

      {/* SECTION TEASERS */}
      <section className="relative px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <Star className="absolute top-10 right-8 w-8 h-8 text-orange anim-spin-slow pointer-events-none" />
        <Star className="absolute top-32 left-4 w-6 h-6 text-hotpink pointer-events-none" />
        <Star className="absolute bottom-20 right-20 w-7 h-7 text-ink pointer-events-none" />
        <Reveal>
          <div className="font-marker text-orange text-2xl -rotate-2 mb-4">flip the pages →</div>
          <h2 className="font-accent uppercase tracking-tighter text-6xl md:text-8xl leading-[0.9] mb-12">
            What's <StretchText className="text-hotpink">inside</StretchText> the zine
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: "/about", title: "About me", note: "mosaic wall, the bag, the door", rotate: -2, tape: "pink" },
            { to: "/campaigns", title: "7 campaigns", note: "case studies, problem → strategy", rotate: 1.5, tape: "orange" },
            { to: "/capstone", title: "Capstone work", note: "6 real-world projects", rotate: -1, tape: "ink" },
            { to: "/gallery", title: "Creative gallery", note: "magazines, ad films, games, art", rotate: 2, tape: "pink" },
            { to: "/academics", title: "Academic journal", note: "the nerdy chapter", rotate: -1.5, tape: "orange" },
            { to: "/contact", title: "Say hi", note: "ily, let's collab", rotate: 1, tape: "pink" },
          ].map((c, i) => (
            <Reveal key={c.to} delay={i * 0.05}>
              <Link
                to={c.to}
                data-cursor="open"
                className="group relative block paper-card paper-lift p-6 glow-pink"
                style={{ transform: `rotate(${c.rotate}deg)` }}
              >
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 ${
                    c.tape === "pink" ? "tape-pink" : c.tape === "orange" ? "tape" : "bg-ink/20"
                  } rotate-[-4deg]`}
                />
                <div className="font-marker text-hotpink text-lg mb-1"><JumpyText>{c.note}</JumpyText></div>
                <div className="font-accent uppercase text-3xl tracking-tight"><JumpyText>{c.title + " →"}</JumpyText></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function DraggablePiece({
  children, initial, className = "", cursorLabel, z = 1,
}: {
  children: React.ReactNode;
  initial: { top?: number; left?: number; right?: number; bottom?: number; rotate: number };
  className?: string;
  cursorLabel?: string;
  z?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // tilt slightly while dragging
  const rotateLive = useTransform(x, [-200, 200], [initial.rotate - 6, initial.rotate + 6]);
  const sRot = useSpring(rotateLive, { stiffness: 120, damping: 14 });

  return (
    <motion.div
      drag
      dragMomentum
      dragElastic={0.35}
      whileDrag={{ scale: 1.05, zIndex: 30 }}
      whileHover={{ scale: 1.02 }}
      style={{
        x, y, rotate: sRot, zIndex: z,
        top: initial.top, left: initial.left, right: initial.right, bottom: initial.bottom,
      }}
      data-cursor={cursorLabel}
      className={`absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}
