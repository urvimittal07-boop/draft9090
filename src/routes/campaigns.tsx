import { createFileRoute, Link } from "@tanstack/react-router";
import { CAMPAIGNS } from "@/lib/data";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Brand Campaigns — ARIA" },
      { name: "description", content: "Seven brand campaigns: problem, insight, strategy, creatives." },
      { property: "og:title", content: "Brand Campaigns — ARIA" },
      { property: "og:description", content: "Polaroid wall of seven brand campaign case studies." },
    ],
  }),
  component: CampaignsList,
});

function CampaignsList() {
  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="seven brand worlds —" title="Brand" accent="campaigns" />
      <p className="px-6 md:px-10 max-w-[60ch] text-lg text-ink/75 mb-12">
        A wall of polaroids. Each one is a brief I made up trouble for. Tap one to
        see the problem, the insight that broke it open, the strategy, and the
        creatives that came out the other side.
      </p>

      <section className="px-6 md:px-10 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {CAMPAIGNS.map((c, i) => (
            <Link
              key={c.slug}
              to="/campaigns/$id"
              params={{ id: c.slug }}
              className="group relative block paper-card p-4 hover:-translate-y-2 hover:rotate-0 transition-transform"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)` }}
            >
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 ${i % 3 === 0 ? "tape-pink" : i % 3 === 1 ? "tape" : "bg-ink/20"} rotate-[-6deg]`} />
              {/* polaroid 'image' as abstract collage */}
              <div className={`aspect-[4/5] relative overflow-hidden ${
                c.accent === "hotpink" ? "bg-hotpink" : c.accent === "orange" ? "bg-orange" : "bg-ink"
              }`}>
                <div className="absolute inset-0 mix-blend-overlay opacity-60"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, white 0 8%, transparent 9%), radial-gradient(circle at 70% 60%, white 0 4%, transparent 5%)",
                  }}
                />
                <div className="absolute inset-0 grid place-items-center text-center p-6">
                  <div>
                    <div className="font-marker text-white/80 text-base mb-2">case study {String(i + 1).padStart(2, "0")}</div>
                    <div className="font-accent uppercase text-white text-2xl md:text-3xl leading-none tracking-tight">{c.title}</div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                  {c.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-accent uppercase tracking-widest text-white bg-black/30 px-1.5 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 font-hand text-2xl leading-tight">{c.tagline}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-ink/50 font-accent">
                {c.client}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
