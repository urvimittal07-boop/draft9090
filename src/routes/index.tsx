import { Link } from "@tanstack/react-router";
import heroGirl from "@/assets/hero-girl.jpg";
import mosaicMountains from "@/assets/mosaic-mountains.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { Scribble, Star } from "@/components/zine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARIA — Creative Portfolio" },
      { name: "description", content: "Brand strategist & art director. A mosaic of everything I've ever loved." },
      { property: "og:title", content: "ARIA — Creative Portfolio" },
      { property: "og:description", content: "A mosaic of everything I've ever loved." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[88vh] px-6 md:px-12 py-10">
        {/* background scraps */}
        <div className="absolute top-10 left-6 w-44 h-56 bg-hotpink/10 -rotate-12 hidden md:block" />
        <div className="absolute bottom-20 right-10 w-72 h-44 bg-orange/10 rotate-6 hidden md:block" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative z-10 anim-peel">
            <div className="font-marker text-hotpink text-3xl -rotate-3 mb-3">hi, i'm —</div>
            <h1 className="font-marker text-[18vw] lg:text-[11rem] leading-[0.85] text-ink">
              ARIA<span className="text-hotpink font-display italic">.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="px-4 py-2 bg-ink text-paper font-accent uppercase text-3xl md:text-5xl rotate-[-2deg] -skew-x-6">
                Creative
              </div>
              <div className="font-display italic text-3xl md:text-5xl text-orange">
                portfolio &amp; chaos
              </div>
            </div>

            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink/75">
              Brand strategist, art director, and self-appointed cool girl. I make
              campaigns that don't put you to sleep — for brands brave enough to feel
              something. Currently studying Branding &amp; Advertising at NMIMS.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/campaigns"
                className="group relative inline-flex items-center gap-2 px-7 py-3 bg-hotpink text-white font-accent uppercase tracking-widest text-sm shadow-[6px_6px_0_0_var(--color-ink)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                See the work →
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 border-2 border-ink font-accent uppercase tracking-widest text-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Who is she
              </Link>
            </div>
          </div>

          {/* hero collage */}
          <div className="lg:col-span-5 relative h-[520px] lg:h-[640px]">
            <div className="absolute top-4 left-0 w-72 h-80 paper-card p-3 rotate-[-6deg] anim-float">
              <img src={heroGirl} alt="cool girl collage portrait" width={1024} height={1280} className="w-full h-full object-cover" />
              <div className="absolute -top-3 left-8 w-20 h-6 tape-pink rotate-[10deg]" />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-44 paper-card p-2 rotate-[5deg]">
              <img src={mosaicMountains} alt="desert mountains" width={1024} height={768} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute -top-3 right-6 w-20 h-6 tape rotate-[-12deg]" />
            </div>
            <div className="absolute top-1/2 right-8 w-28 h-28 rounded-full bg-orange grid place-items-center text-white font-accent text-xs uppercase text-center p-3 shadow-xl anim-jiggle">
              Heart<br />Attack<br />★ Beware
            </div>
            <Star className="absolute top-1/3 -left-2 w-10 h-10 text-hotpink anim-spin-slow" />
            <Scribble className="absolute bottom-10 left-10 w-32 text-ink/40" />
          </div>
        </div>
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
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="font-marker text-orange text-2xl -rotate-2 mb-4">flip the pages →</div>
        <h2 className="font-accent uppercase tracking-tighter text-6xl md:text-8xl leading-[0.9] mb-12">
          What's <span className="text-hotpink">inside</span> the zine
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: "/about", title: "About me", note: "mosaic wall, the bag, the door", rotate: -2, tape: "pink" },
            { to: "/campaigns", title: "7 campaigns", note: "case studies, problem → strategy", rotate: 1.5, tape: "orange" },
            { to: "/capstone", title: "Capstone work", note: "6 real-world projects", rotate: -1, tape: "ink" },
            { to: "/gallery", title: "Creative gallery", note: "magazines, ad films, games, art", rotate: 2, tape: "pink" },
            { to: "/academics", title: "Academic journal", note: "the nerdy chapter", rotate: -1.5, tape: "orange" },
            { to: "/contact", title: "Say hi", note: "ily, let's collab", rotate: 1, tape: "pink" },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative block paper-card p-6 transition-transform hover:-translate-y-2 hover:rotate-0"
              style={{ transform: `rotate(${c.rotate}deg)` }}
            >
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 ${
                  c.tape === "pink" ? "tape-pink" : c.tape === "orange" ? "tape" : "bg-ink/20"
                } rotate-[-4deg]`}
              />
              <div className="font-marker text-hotpink text-lg mb-1">{c.note}</div>
              <div className="font-accent uppercase text-3xl tracking-tight">{c.title} →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
