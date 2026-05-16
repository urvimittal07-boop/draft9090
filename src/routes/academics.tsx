import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle, Star } from "@/components/zine";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — ARIA" },
      { name: "description", content: "DPS 90% · NMIMS Branding & Advertising · CGPA 8.96 · IIM-A · IIT-B · research & leadership." },
      { property: "og:title", content: "Academics — ARIA" },
      { property: "og:description", content: "The nerdy chapter — opened up like a notebook." },
    ],
  }),
  component: Academics,
});

const PAGES = [
  {
    title: "Class XII — DPS",
    sub: "Maths + Economics · 90%",
    notes: [
      "Stream: PCM + Economics. Beat the curve.",
      "First taste of advertising via Economics case studies.",
      "Started sketching campaign mood-boards in my margins (still do).",
    ],
    sticker: "★",
  },
  {
    title: "NMIMS — B.Sc. Branding & Advertising",
    sub: "3rd year · CGPA 8.96 / 10",
    notes: [
      "Major: Brand Strategy + Creative Direction.",
      "Top-10% cohort, three semesters running.",
      "Electives: Consumer Psychology, Editorial Design, Brand Anthropology.",
    ],
    sticker: "✿",
  },
  {
    title: "Debates & invitations",
    sub: "IIM Ahmedabad · IIT Bombay",
    notes: [
      "Represented NMIMS at IIM-A Confluence (brand strategy debate).",
      "IIT Bombay E-Summit — pitch finalist with Step Luxe concept.",
      "3 inter-college parliamentary debate wins.",
    ],
    sticker: "♡",
  },
  {
    title: "Research papers",
    sub: "Published / submitted",
    notes: [
      "Zara Studio — scarcity & sub-brand exclusivity.",
      "Fairmont — heritage hospitality & younger guests.",
      "Salt Tech — anti-SaaS object branding (capstone, 9.4/10).",
    ],
    sticker: "✎",
  },
  {
    title: "Leadership & extra-c",
    sub: "Captain, Chair, Anchor",
    notes: [
      "Co-curricular Captain · 2 years.",
      "President, Student Branding Society.",
      "Chairperson, 3 college fests (incl. Festigos 2024).",
      "Anchored 8+ on-campus events; designed 5+ live websites.",
    ],
    sticker: "♛",
  },
];

function Academics() {
  const [page, setPage] = useState(0);
  const p = PAGES[page];

  return (
    <div className="overflow-hidden">
      <SectionTitle eyebrow="the nerdy chapter —" title="Academic" accent="journal" />
      <p className="px-6 md:px-10 max-w-[60ch] text-lg text-ink/75 mb-12">
        Open the notebook. Each page is a chapter of the resumé you'd hand a
        recruiter — except this one has marginalia.
      </p>

      <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
        <div className="relative bg-cream border-4 border-ink shadow-[10px_10px_0_0_var(--color-ink)] p-4 md:p-8">
          {/* spiral binding */}
          <div className="absolute -top-3 left-0 right-0 flex justify-center gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-3 h-6 bg-ink rounded-full" />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6 min-h-[460px]">
            {/* left page — tab list */}
            <div className="bg-card paper-card p-6 border-l-[14px] border-hotpink">
              <div className="font-marker text-orange text-xl mb-4">contents</div>
              <ul className="space-y-3">
                {PAGES.map((pg, i) => (
                  <li key={pg.title}>
                    <button
                      onClick={() => setPage(i)}
                      className={`text-left w-full ${
                        i === page ? "text-hotpink" : "text-ink/75 hover:text-ink"
                      }`}
                    >
                      <span className="font-marker text-xl mr-2">{pg.sticker}</span>
                      <span className="font-accent uppercase tracking-tight text-base">
                        {pg.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* right page — content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 30, rotateY: 12 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -30, rotateY: -12 }}
                transition={{ duration: 0.4 }}
                className="bg-card paper-card p-6 relative"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0 31px, oklch(0.7 0.04 230 / 0.25) 31px 32px)",
                }}
              >
                <Star className="absolute top-4 right-4 w-6 h-6 text-hotpink" />
                <div className="font-marker text-hotpink text-xl">{p.sub}</div>
                <h2 className="font-display italic text-3xl md:text-4xl leading-tight mt-1">
                  {p.title}
                </h2>
                <ul className="mt-6 space-y-3 font-hand text-2xl leading-snug">
                  {p.notes.map((n, i) => (
                    <li key={i}>→ {n}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* pager */}
          <div className="flex justify-between items-center mt-6 font-marker text-ink/60">
            <button onClick={() => setPage((x) => (x - 1 + PAGES.length) % PAGES.length)}>
              ← previous page
            </button>
            <span>page {page + 1} / {PAGES.length}</span>
            <button onClick={() => setPage((x) => (x + 1) % PAGES.length)}>
              next page →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
