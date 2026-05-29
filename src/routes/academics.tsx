import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/zine";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — URVI" },
      { name: "description", content: "A roadmap: DPS · NMIMS B.Sc. Branding & Advertising · IIM-A · IIT-B · research & leadership." },
      { property: "og:title", content: "Academics — URVI" },
      { property: "og:description", content: "The academic roadmap — chapter by chapter." },
    ],
  }),
  component: Academics,
});

type Stop = {
  year: string;
  title: string;
  sub: string;
  body: string;
  bullets: string[];
  tag: string;
  side: "L" | "R";
};

const STOPS: Stop[] = [
  {
    year: "2018 – 2020",
    title: "Class XII · DPS",
    sub: "Maths + Economics · 90%",
    tag: "Foundation",
    body: "PCM with Economics. First taste of advertising via Econ case studies — and the first time campaign mood-boards started crowding the margins of my notebooks.",
    bullets: [
      "School topper, Economics elective",
      "Editor, school annual magazine",
      "Inter-school debate · 3 finals",
    ],
    side: "L",
  },
  {
    year: "2021",
    title: "NMIMS — Year 01",
    sub: "B.Sc. Branding & Advertising",
    tag: "Foundation studio",
    body: "Foundations in design history, visual culture, copy basics, and brand anthropology. First brand identity submission graded 9.6/10.",
    bullets: [
      "Top-10% cohort · semester 1 & 2",
      "First identity system: Studio Salt",
      "Joined Student Branding Society",
    ],
    side: "R",
  },
  {
    year: "2022",
    title: "NMIMS — Year 02",
    sub: "Strategy + Editorial Design",
    tag: "Specialisation",
    body: "Pivoted into brand strategy + editorial. Anchored two on-campus events and co-authored the first internal research brief on diaspora media.",
    bullets: [
      "Elected VP, Branding Society",
      "Editorial Design — Distinction",
      "Anchor, NMIMS Foundation Day",
    ],
    side: "L",
  },
  {
    year: "2023",
    title: "Invitationals — IIM-A & IIT-B",
    sub: "Confluence · E-Summit",
    tag: "Inter-college",
    body: "Represented NMIMS at IIM Ahmedabad's Confluence (brand strategy debate) and IIT Bombay's E-Summit (pitch finalist with Step Luxe).",
    bullets: [
      "IIM-A Confluence · Brand debate finalist",
      "IIT-B E-Summit · Top-5 pitch",
      "3 inter-college parliamentary debate wins",
    ],
    side: "R",
  },
  {
    year: "2024",
    title: "NMIMS — Year 03",
    sub: "CGPA 8.96 / 10",
    tag: "Capstone",
    body: "Capstone-heavy year: three research papers, six real-world capstone briefs shipped, fest chair of Festigos 2024.",
    bullets: [
      "Chairperson · Festigos 2024 (14-person team)",
      "Co-curricular Captain · 2nd year running",
      "5+ live websites · 8+ events anchored",
    ],
    side: "L",
  },
  {
    year: "2024",
    title: "Research, published",
    sub: "Zara · Fairmont · Salt Tech",
    tag: "Published",
    body: "Three published / submitted research papers — each one pulling apart the brand strategy of a category leader and proposing a sharper play.",
    bullets: [
      "Zara Studio — scarcity & sub-brand exclusivity",
      "Fairmont — heritage hospitality, younger guests",
      "Salt Tech — anti-SaaS object branding · 9.4/10",
    ],
    side: "R",
  },
  {
    year: "2025 →",
    title: "Now boarding",
    sub: "Open to brand, editorial, campaign roles",
    tag: "Next",
    body: "Looking for a team where the brief says 'make it weird, make it work.' Available summer 2026 for full-time / lead-creative roles.",
    bullets: ["Currently: thesis on diaspora editorial design", "Soft-launching Issue 02 of The Desi Collective"],
    side: "L",
  },
];

function Academics() {
  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="issue n°05" title="Academic" accent="roadmap" />
      <p className="px-6 md:px-10 max-w-[58ch] font-serif italic text-xl text-ink/75 mb-16">
        A chronological route through the schools, the stages, and the
        papers. Each stop is a chapter — pinch and zoom into your favourite.
      </p>

      <section className="px-6 md:px-10 pb-32 max-w-6xl mx-auto relative">
        {/* spine */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ink/30 -translate-x-1/2" />
        {/* dashed travel line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--color-hotpink) 0 6px, transparent 6px 14px)" }} />

        <ul className="space-y-16">
          {STOPS.map((s, i) => (
            <Stop key={i} s={s} idx={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stop({ s, idx }: { s: Stop; idx: number }) {
  const [open, setOpen] = useState(idx === 0);
  const isLeft = s.side === "L";

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
    >
      {/* dot on spine */}
      <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 z-10">
        <div className="w-5 h-5 rounded-full bg-paper border-2 border-ink grid place-items-center">
          <div className="w-2 h-2 rounded-full bg-hotpink" />
        </div>
      </div>

      {/* year label — opposite side on desktop */}
      <div className={`pl-14 md:pl-0 ${isLeft ? "md:col-start-2 md:pl-14" : "md:col-start-1 md:text-right md:pr-14 md:row-start-1"}`}>
        <div className="font-accent uppercase tracking-[0.35em] text-[10px] text-ink/50">{s.tag}</div>
        <div className="font-display text-3xl md:text-4xl tracking-tight">{s.year}</div>
      </div>

      {/* content card */}
      <div className={`pl-14 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-14 md:row-start-1" : "md:col-start-2 md:pl-14"}`}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left bg-card border border-ink/20 hover:border-ink transition-colors p-5 md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-serif italic text-2xl md:text-3xl leading-tight">{s.title.toLowerCase()}</h3>
              <div className="font-accent uppercase tracking-widest text-[11px] text-ink/60 mt-1">{s.sub}</div>
            </div>
            <span className="font-accent text-xl text-hotpink shrink-0">{open ? "−" : "+"}</span>
          </div>

          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="font-serif text-base md:text-lg text-ink/80 mt-4 leading-relaxed">{s.body}</p>
              <ul className="mt-4 space-y-2 text-sm md:text-base text-ink/75 border-t border-ink/15 pt-4">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3"><span className="text-hotpink">→</span>{b}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </button>
      </div>
    </motion.li>
  );
}
