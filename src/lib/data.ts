export type Campaign = {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  tags: string[];
  accent: "hotpink" | "orange" | "ink";
  problem: string;
  insight: string;
  strategy: string;
  creatives: { title: string; note: string }[];
  outcome: string;
};

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "eau-de-orange",
    title: "EAU DE ORANGE",
    tagline: "A perfume for people who refuse to be subtle.",
    client: "Maison Citra (hypothetical)",
    tags: ["Brand Strategy", "Art Direction", "Copywriting"],
    accent: "orange",
    problem: "Luxury perfume marketing has flattened into the same beige whisper. Every brand is selling 'effortless,' nobody is selling effort.",
    insight: "Gen-Z women aren't afraid of being too much — they're afraid of being forgettable. Loudness has become the new luxury.",
    strategy: "Build a fragrance brand around unapologetic personality. Editorial campaign in citrus-saturated colour blocking, with bottle drops styled as zines, not catalogues.",
    creatives: [
      { title: "Hero film", note: "30-second short of a girl walking into a room and silencing it." },
      { title: "OOH series", note: "Five typographic billboards — one word each: PEEL. SPLASH. STING. LINGER. RUIN." },
      { title: "Sampling zine", note: "16-page fold-out with a scratch-and-sniff cover." },
    ],
    outcome: "Concept brief; pitched as semester capstone — A+ grade.",
  },
  {
    slug: "volt-surge",
    title: "VOLT SURGE",
    tagline: "Energy drink that doesn't taste like regret.",
    client: "Volt Co. (hypothetical)",
    tags: ["Campaign", "Packaging", "Social"],
    accent: "hotpink",
    problem: "Energy-drink branding is stuck in 2008 — extreme sports, screaming type, neon. Their actual buyer is a 22-year-old designer at 11pm.",
    insight: "We don't want to be 'extreme.' We want to finish the deck without crashing at 2am.",
    strategy: "Reposition Volt as the calm-focus drink: spa packaging, slow-mo social, ASMR product films. Energy without the anxiety.",
    creatives: [
      { title: "Pack redesign", note: "Matte pastel cans with embossed wordmark." },
      { title: "Series of 6 posters", note: "Each is a single sentence — 'still awake. still chill.'" },
      { title: "Sleep playlist drop", note: "Co-branded Spotify playlist for the after-rush." },
    ],
    outcome: "Top-3 in NMIMS internal pitch competition.",
  },
  {
    slug: "step-luxe",
    title: "STEP LUXE",
    tagline: "Streetwear treated like sculpture.",
    client: "Step Atelier",
    tags: ["Brand Identity", "Editorial", "Film"],
    accent: "ink",
    problem: "Sneaker brands all use the same drop-cycle hype playbook. Saturation has killed scarcity.",
    insight: "If you want hype to mean something, treat the product like it's behind glass — not behind a queue.",
    strategy: "Position Step Luxe as a gallery. Drops are openings. Lookbooks read like exhibition catalogues. No countdowns, no resellers.",
    creatives: [
      { title: "Exhibition launch", note: "Pop-up at JJ School of Art, 1 sneaker per pedestal." },
      { title: "Catalogue", note: "Heavy-stock A4 booklet, museum captions, no prices." },
      { title: "Microsite", note: "Scroll-to-zoom interaction, no add-to-cart." },
    ],
    outcome: "Concept pitched at IIT Bombay E-Summit — finalist.",
  },
  {
    slug: "desi-collective",
    title: "THE DESI COLLECTIVE",
    tagline: "A magazine for the diaspora that refuses to translate.",
    client: "Desi Co. (hypothetical)",
    tags: ["Editorial", "Art Direction", "Strategy"],
    accent: "hotpink",
    problem: "South Asian fashion media either over-explains itself for a Western reader or shrinks itself for a 'safe' Indian one. Nobody is just talking to us.",
    insight: "We don't want representation. We want our inside jokes printed at 200gsm.",
    strategy: "An unapologetic quarterly: Hindi/English code-switching headlines, no glossary, no footnotes. Designed for the girl with both a sari and Doc Martens.",
    creatives: [
      { title: "Issue 01 cover", note: "Bollywood B-grade poster meets Vogue grid." },
      { title: "Editorial spreads", note: "12 layouts, each in a different vernacular display face." },
      { title: "Launch campaign", note: "Subway posters in Marathi, Tamil, Punjabi — no translation." },
    ],
    outcome: "Self-published zine pilot — 200 copies distributed.",
  },
  {
    slug: "fairmont-eternal",
    title: "FAIRMONT: ETERNAL GUEST",
    tagline: "Luxury hospitality told as a love letter.",
    client: "Fairmont (research study)",
    tags: ["Campaign", "Research", "Storytelling"],
    accent: "orange",
    problem: "Heritage hotels are losing 25–35 year-olds to design hotels with personality. Fairmont reads as 'parents' vacation.'",
    insight: "We don't crave anonymity — we crave being remembered. The fantasy isn't a new room, it's a returning welcome.",
    strategy: "Reframe Fairmont's heritage as relationship, not legacy. Campaign films cast real returning guests as the heroes of the brand.",
    creatives: [
      { title: "Documentary series", note: "5 short films, each a guest's return story." },
      { title: "Print", note: "A folded letter, addressed to you, found in your room." },
      { title: "Loyalty rebrand", note: "From 'points' to 'chapters.'" },
    ],
    outcome: "Submitted as published research paper at NMIMS, 2024.",
  },
  {
    slug: "salt-tech",
    title: "SALT TECH",
    tagline: "Make technology feel essential again.",
    client: "Salt Tech (research study)",
    tags: ["Identity", "Strategy", "Editorial"],
    accent: "ink",
    problem: "B2B tech branding has become indistinguishable — same gradient, same lowercase wordmark, same astronaut illustrations.",
    insight: "Software has become so generic it feels disposable. People miss tools that feel like objects.",
    strategy: "Brand Salt Tech as an object brand, not a SaaS. Tactile identity, mineral-inspired palette, packaging-grade collateral, zero illustrations.",
    creatives: [
      { title: "Identity system", note: "Mineral colour deck, embossed wordmark, no gradients." },
      { title: "Brand book", note: "32-page printed manifesto on uncoated stock." },
      { title: "Launch site", note: "Single-page, no scroll, no animation." },
    ],
    outcome: "Capstone research, 9.4/10 jury score.",
  },
  {
    slug: "zara-studio",
    title: "ZARA STUDIO: GHOST DROPS",
    tagline: "Bring scarcity back to fast fashion.",
    client: "Zara (research study)",
    tags: ["Strategy", "Campaign", "Digital"],
    accent: "hotpink",
    problem: "Zara's Studio sub-line is premium but reads as 'just another collection.' Its exclusivity is invisible in the noise of the main brand.",
    insight: "Premium isn't a price tag — it's the right to not be available.",
    strategy: "Run Zara Studio as a series of 'ghost drops': unannounced, in 3 cities, for 3 days only. Find it via word-of-mouth and a single Instagram pin.",
    creatives: [
      { title: "Drop mechanic", note: "3 stealth pop-ups, 72-hour windows, no media buy." },
      { title: "One pinned post", note: "A single Story per drop. No grid, no influencer seeding." },
      { title: "Studio Letter", note: "Print mailer to top-tier loyalty list — handwritten font, wax seal." },
    ],
    outcome: "Featured in NMIMS Brand Strategy showcase, semester 5.",
  },
];

export type Capstone = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  brief: string;
  process: string[];
  outcome: string;
  tray: "matcha" | "lily" | "glasses" | "movies" | "cd" | "key";
};

export const CAPSTONES: Capstone[] = [
  {
    slug: "rebrand-saltech",
    title: "Salt Tech Rebrand",
    subtitle: "Identity system + brand book",
    role: "Lead designer & strategist",
    year: "2024",
    brief: "Replace generic SaaS visual language with a tactile, object-grade identity for an enterprise tools company.",
    process: [
      "12 founder & customer interviews",
      "Audit of 24 competitors in the category",
      "Three identity routes, one selected",
      "32-page printed brand book on uncoated stock",
    ],
    outcome: "Adopted as the brand's working identity prototype.",
    tray: "matcha",
  },
  {
    slug: "fairmont-letter",
    title: "The Eternal Guest",
    subtitle: "Fairmont brand storytelling study",
    role: "Researcher & creative lead",
    year: "2024",
    brief: "Investigate why heritage hospitality is losing younger guests and prototype a campaign in response.",
    process: [
      "Survey, n=180 across 3 markets",
      "Stakeholder interviews with returning guests",
      "5 short-film treatments + 1 produced pilot",
      "Loyalty programme rewrite",
    ],
    outcome: "Published as research paper, NMIMS, 2024.",
    tray: "lily",
  },
  {
    slug: "zara-ghost",
    title: "Zara Studio: Ghost Drops",
    subtitle: "Fast-fashion exclusivity playbook",
    role: "Strategist",
    year: "2024",
    brief: "Restore perceived scarcity to Zara's premium sub-line without raising prices.",
    process: [
      "Category mapping across H&M, COS, Arket",
      "Consumer panel: 60 Gen-Z respondents",
      "Drop mechanic prototype + media plan",
      "OOH and CRM mock-up",
    ],
    outcome: "Top-3 in semester strategy showcase.",
    tray: "glasses",
  },
  {
    slug: "desi-zine",
    title: "The Desi Collective Zine",
    subtitle: "Print magazine pilot",
    role: "Editor & art director",
    year: "2023",
    brief: "Launch a quarterly print zine for the South Asian diaspora that refuses to over-explain itself.",
    process: [
      "Edit board of 6 contributors",
      "12 editorial spreads, 64 pages",
      "Self-published run of 200 copies",
      "Launch event at NMIMS, Mumbai",
    ],
    outcome: "Sold out within 3 weeks; Issue 02 in production.",
    tray: "movies",
  },
  {
    slug: "adgame-citra",
    title: "Citra: The Game",
    subtitle: "Branded mini-game for Eau de Orange",
    role: "Concept + art direction",
    year: "2024",
    brief: "Translate a perfume brand into a 60-second playable experience for Instagram.",
    process: [
      "Brand-to-mechanic translation map",
      "Wireframes + interaction script",
      "Art direction with 3D artist",
      "QA across 5 devices",
    ],
    outcome: "Prototype playable on web; 1.2k plays in soft launch.",
    tray: "cd",
  },
  {
    slug: "fest-chair",
    title: "Festigos 2024 — Fest Identity",
    subtitle: "NMIMS inter-college fest brand system",
    role: "Chairperson, creative direction",
    year: "2024",
    brief: "Build a fest identity that competes with IIM/IIT fest aesthetics on a student budget.",
    process: [
      "Brand naming + manifesto",
      "Identity, merch, social toolkit",
      "Coordinated team of 14 designers",
      "On-ground signage & stage design",
    ],
    outcome: "Highest-attended fest in 3 years.",
    tray: "key",
  },
];

export type Gallery = {
  slug: "magazine" | "adfilm" | "adgames" | "creatives";
  title: string;
  subtitle: string;
  color: string;
  items: { title: string; note: string; tag: string }[];
};

export const GALLERIES: Gallery[] = [
  {
    slug: "magazine",
    title: "Magazines",
    subtitle: "flip through the issues",
    color: "bg-hotpink",
    items: [
      { title: "The Desi Collective — Issue 01", note: "Cover story: the new diaspora glossary.", tag: "Editorial" },
      { title: "Mosaic Quarterly", note: "Personal zine — 24 pages, 4 essays.", tag: "Self-published" },
      { title: "Volt Magazine", note: "Brand magazine pitch for Volt Surge.", tag: "Brand mag" },
    ],
  },
  {
    slug: "adfilm",
    title: "Ad Films",
    subtitle: "press play, pretty please",
    color: "bg-orange",
    items: [
      { title: "Eau de Orange — Hero film", note: "30s. A girl walks into a room and silences it.", tag: "Perfume" },
      { title: "Fairmont — The Letter", note: "90s documentary pilot.", tag: "Hospitality" },
      { title: "Step Luxe — Opening Night", note: "45s teaser for the gallery drop.", tag: "Fashion" },
    ],
  },
  {
    slug: "adgames",
    title: "Ad Games",
    subtitle: "tap, swipe, lose 5 minutes",
    color: "bg-ink text-paper",
    items: [
      { title: "Citra — Catch the Drop", note: "60s playable Instagram game.", tag: "Perfume" },
      { title: "Volt — Stay Awake", note: "Tap-to-focus minigame.", tag: "Beverage" },
    ],
  },
  {
    slug: "creatives",
    title: "Creatives",
    subtitle: "stills, posters, mood",
    color: "bg-hotpink",
    items: [
      { title: "OOH series — Eau de Orange", note: "5 single-word billboards.", tag: "OOH" },
      { title: "Zara Studio — Letter mailer", note: "Wax-sealed CRM print.", tag: "Direct" },
      { title: "Festigos posters", note: "12-poster series for fest 2024.", tag: "Event" },
      { title: "Desi Collective spreads", note: "8 editorial layouts.", tag: "Editorial" },
    ],
  },
];
