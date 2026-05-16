import { createFileRoute, Link } from "@tanstack/react-router";
import { CAPSTONES } from "@/lib/data";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/capstone")({
  head: () => ({
    meta: [
      { title: "Capstone Projects — ARIA" },
      { name: "description", content: "Six real-world capstone projects, served on a cafeteria tray." },
      { property: "og:title", content: "Capstone Projects — ARIA" },
      { property: "og:description", content: "Six real-world capstone projects." },
    ],
  }),
  component: CapstoneList,
});

const TRAY_LABELS: Record<string, { emoji: string; bg: string }> = {
  matcha: { emoji: "🍵", bg: "bg-[oklch(0.85_0.15_140)]" },
  lily: { emoji: "🌸", bg: "bg-hotpink/30" },
  glasses: { emoji: "👓", bg: "bg-orange/30" },
  movies: { emoji: "🎬", bg: "bg-cream" },
  cd: { emoji: "💿", bg: "bg-[oklch(0.75_0.18_320)]" },
  key: { emoji: "🔑", bg: "bg-[oklch(0.88_0.18_85)]" },
};

function CapstoneList() {
  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="served on a tray —" title="Capstone" accent="projects" />
      <p className="px-6 md:px-10 max-w-[60ch] text-lg text-ink/75 mb-12">
        Six things I actually shipped (or pitched, or chaired, or printed). Real briefs,
        real teammates, real deadlines. Tap any compartment to read the full project.
      </p>

      <section className="px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        {/* the tray */}
        <div className="relative bg-[oklch(0.86_0.01_240)] border-[6px] border-ink rounded-[40px] p-4 md:p-6 shadow-[12px_12px_0_0_var(--color-ink)]">
          <div className="absolute -top-4 left-10 font-marker text-ink text-xl rotate-[-4deg] bg-paper px-3 py-1 border-2 border-ink">
            Tray #06 — Capstone special
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {CAPSTONES.map((p, i) => {
              const t = TRAY_LABELS[p.tray];
              return (
                <Link
                  key={p.slug}
                  to="/capstone/$id"
                  params={{ id: p.slug }}
                  className={`group relative ${t.bg} border-4 border-ink rounded-2xl p-5 min-h-[220px] flex flex-col justify-between hover:-translate-y-1 transition-transform`}
                >
                  <div className="text-5xl">{t.emoji}</div>
                  <div>
                    <div className="font-accent uppercase tracking-tight text-xl leading-tight">{p.title}</div>
                    <div className="font-hand text-lg mt-1 text-ink/80">{p.subtitle}</div>
                    <div className="mt-2 text-[10px] font-accent uppercase tracking-widest text-ink/60">
                      {p.role} · {p.year}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 font-accent text-xs uppercase bg-ink text-paper px-2 py-0.5">
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="font-hand text-xl text-center mt-6 text-ink/60">
          (yes the tray is metal. yes it's intentional.)
        </div>
      </section>
    </div>
  );
}
