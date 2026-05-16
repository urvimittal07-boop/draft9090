import { createFileRoute } from "@tanstack/react-router";
import { StickyNote, Star } from "@/components/zine";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ARIA" },
      { name: "description", content: "Pitch me, hire me, or just say hi." },
      { property: "og:title", content: "Contact — ARIA" },
      { property: "og:description", content: "Pitch me, hire me, or just say hi." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="px-6 md:px-10 py-20 max-w-4xl mx-auto text-center relative overflow-hidden">
      <Star className="absolute top-10 left-4 w-12 h-12 text-hotpink anim-spin-slow" />
      <Star className="absolute bottom-10 right-4 w-10 h-10 text-orange anim-spin-slow" />

      <div className="font-marker text-orange text-2xl -rotate-3">drop a line —</div>
      <h1 className="font-accent uppercase text-7xl md:text-[10rem] leading-[0.85] tracking-tighter text-hotpink">
        Talk soon
      </h1>
      <div className="font-display italic text-2xl md:text-3xl mt-4">
        I read everything. Pinky promise.
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-14">
        <a href="mailto:hello@example.com" className="group">
          <StickyNote rotate={-3} color="pink" className="block group-hover:-translate-y-1 transition-transform">
            <div className="font-accent uppercase text-sm tracking-widest">Email</div>
            <div className="font-marker text-2xl">hello@aria.world</div>
          </StickyNote>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group">
          <StickyNote rotate={2} color="orange" className="block group-hover:-translate-y-1 transition-transform">
            <div className="font-accent uppercase text-sm tracking-widest">Instagram</div>
            <div className="font-marker text-2xl">@aria.world</div>
          </StickyNote>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group">
          <StickyNote rotate={-1.5} color="yellow" className="block group-hover:-translate-y-1 transition-transform">
            <div className="font-accent uppercase text-sm tracking-widest">LinkedIn</div>
            <div className="font-marker text-2xl">/in/aria</div>
          </StickyNote>
        </a>
      </div>

      <div className="mt-16 font-hand text-2xl text-ink/70">
        based in Mumbai · open to brand, editorial, and campaign roles · summer 2026
      </div>
    </div>
  );
}
