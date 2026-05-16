import { createFileRoute, notFound } from "@tanstack/react-router";
import { CAPSTONES } from "@/lib/data";
import { BackLink } from "@/components/zine";

export const Route = createFileRoute("/capstone/$id")({
  head: ({ params }) => {
    const p = CAPSTONES.find((x) => x.slug === params.id);
    return {
      meta: [
        { title: p ? `${p.title} — Capstone` : "Capstone" },
        { name: "description", content: p?.brief ?? "Capstone project" },
        { property: "og:title", content: p?.title ?? "Capstone" },
        { property: "og:description", content: p?.brief ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const p = CAPSTONES.find((x) => x.slug === params.id);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <div className="px-6 py-32 text-center">
      <div className="font-marker text-5xl">empty tray ✿</div>
      <BackLink to="/capstone" label="back to the tray" />
    </div>
  ),
  component: CapstoneDetail,
});

function CapstoneDetail() {
  const p = Route.useLoaderData();
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
      <div className="mb-8"><BackLink to="/capstone" label="all capstones" /></div>

      <div className="paper-card p-8 md:p-14 -rotate-[0.5deg]">
        <div className="absolute" />
        <div className="font-marker text-hotpink text-xl mb-2">capstone project</div>
        <h1 className="font-display italic text-5xl md:text-7xl leading-[1.05]">{p.title}</h1>
        <div className="font-accent uppercase text-orange tracking-widest mt-3">{p.subtitle}</div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8 border-y-2 border-dashed border-ink/30 py-5">
          <div>
            <div className="text-xs font-accent uppercase tracking-widest text-ink/50">Role</div>
            <div className="font-hand text-xl">{p.role}</div>
          </div>
          <div>
            <div className="text-xs font-accent uppercase tracking-widest text-ink/50">Year</div>
            <div className="font-hand text-xl">{p.year}</div>
          </div>
          <div>
            <div className="text-xs font-accent uppercase tracking-widest text-ink/50">Outcome</div>
            <div className="font-hand text-xl">{p.outcome}</div>
          </div>
        </div>

        <h2 className="font-accent uppercase text-3xl mt-10 mb-2">The brief</h2>
        <p className="text-lg leading-relaxed text-ink/85">{p.brief}</p>

        <h2 className="font-accent uppercase text-3xl mt-10 mb-4">The process</h2>
        <ol className="space-y-3">
          {p.process.map((step: string, i: number) => (
            <li key={i} className="flex gap-4 items-start">
              <span className="font-marker text-hotpink text-2xl leading-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-lg">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
