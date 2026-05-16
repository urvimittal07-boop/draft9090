import { createFileRoute, notFound } from "@tanstack/react-router";
import { CAMPAIGNS } from "@/lib/data";
import { BackLink, Star } from "@/components/zine";

export const Route = createFileRoute("/campaigns/$id")({
  head: ({ params }) => {
    const c = CAMPAIGNS.find((x) => x.slug === params.id);
    return {
      meta: [
        { title: c ? `${c.title} — Campaign` : "Campaign" },
        { name: "description", content: c?.tagline ?? "Campaign case study." },
        { property: "og:title", content: c?.title ?? "Campaign" },
        { property: "og:description", content: c?.tagline ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const c = CAMPAIGNS.find((x) => x.slug === params.id);
    if (!c) throw notFound();
    return c;
  },
  notFoundComponent: () => (
    <div className="px-6 py-32 text-center">
      <div className="font-marker text-5xl">no such campaign ✿</div>
      <BackLink to="/campaigns" label="back to the wall" />
    </div>
  ),
  component: CampaignDetail,
});

function CampaignDetail() {
  const c = Route.useLoaderData();
  const accentBg = c.accent === "hotpink" ? "bg-hotpink" : c.accent === "orange" ? "bg-orange" : "bg-ink";
  const accentText = c.accent === "hotpink" ? "text-hotpink" : c.accent === "orange" ? "text-orange" : "text-ink";

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
      <div className="mb-8"><BackLink to="/campaigns" label="all campaigns" /></div>

      {/* hero */}
      <div className={`relative ${accentBg} text-white p-8 md:p-14 shadow-[10px_10px_0_0_var(--color-ink)] border-4 border-ink overflow-hidden`}>
        <Star className="absolute top-4 right-4 w-10 h-10 text-white/60" />
        <div className="font-marker text-white/85 text-xl -rotate-2 mb-2">case study —</div>
        <h1 className="font-accent uppercase text-6xl md:text-8xl tracking-tighter leading-[0.85]">
          {c.title}
        </h1>
        <div className="font-display italic text-2xl md:text-3xl mt-3 max-w-[40ch]">{c.tagline}</div>
        <div className="flex flex-wrap gap-2 mt-6">
          {c.tags.map((t) => (
            <span key={t} className="text-xs font-accent uppercase tracking-widest bg-black/25 px-3 py-1">{t}</span>
          ))}
        </div>
        <div className="font-hand text-2xl mt-6">For: {c.client}</div>
      </div>

      {/* PIS grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {[
          { label: "The problem", content: c.problem, color: "bg-card" },
          { label: "The insight", content: c.insight, color: "bg-cream" },
          { label: "The strategy", content: c.strategy, color: "bg-ink text-paper" },
        ].map((b, i) => (
          <div
            key={b.label}
            style={{ transform: `rotate(${i === 1 ? 1 : -0.5}deg)` }}
            className={`relative paper-card p-6 ${b.color}`}
          >
            <div className={`absolute -top-3 left-6 w-20 h-5 ${i % 2 ? "tape-pink" : "tape"} rotate-[-6deg]`} />
            <div className={`font-marker text-2xl mb-2 ${i === 2 ? "text-hotpink" : accentText}`}>{b.label}</div>
            <p className="text-base leading-relaxed">{b.content}</p>
          </div>
        ))}
      </div>

      {/* creatives */}
      <h2 className="font-accent uppercase text-5xl md:text-6xl tracking-tighter mt-16 mb-6">
        The <span className={accentText}>creatives</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {c.creatives.map((cr, i) => (
          <div
            key={cr.title}
            style={{ transform: `rotate(${(i - 1) * 1.2}deg)` }}
            className="paper-card p-5"
          >
            <div className={`aspect-[4/3] ${accentBg}/15 border-2 border-dashed border-ink/20 mb-4 grid place-items-center font-accent uppercase text-xs tracking-widest text-ink/50`}>
              creative {String(i + 1).padStart(2, "0")}
            </div>
            <div className="font-accent uppercase tracking-tight text-xl">{cr.title}</div>
            <div className="font-hand text-xl text-ink/70 mt-1">{cr.note}</div>
          </div>
        ))}
      </div>

      {/* outcome */}
      <div className="mt-16 border-t-2 border-dashed border-ink/30 pt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-marker text-orange text-xl">the outcome</div>
          <div className="font-display italic text-2xl md:text-3xl mt-1 max-w-[40ch]">{c.outcome}</div>
        </div>
        <BackLink to="/campaigns" label="next campaign →" />
      </div>
    </div>
  );
}
