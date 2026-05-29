export type Campaign = {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  tags: string[];
  accent: "hotpink" | "orange" | "ink";
  // Drop an MP4 export of your animated deck at /public/decks/<slug>.mp4
  // (PowerPoint → File → Export → Create a Video). Or set `embed` to a
  // Canva/Google Slides embed URL to use an iframe instead.
  deck?: {
    video?: string;
    embed?: string;
    poster?: string;
  };
};

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "upwind",
    title: "UPWIND",
    tagline: "A brand that moves before the room does.",
    client: "Upwind",
    tags: ["Brand Strategy", "Campaign", "Art Direction"],
    accent: "orange",
    deck: { video: "/decks/upwind.mp4" },
  },
  {
    slug: "dabur",
    title: "DABUR",
    tagline: "Heritage, re-cast for the right-now generation.",
    client: "Dabur",
    tags: ["Campaign", "Strategy", "Copywriting"],
    accent: "hotpink",
    deck: { video: "/decks/dabur.mp4" },
  },
  {
    slug: "lunara",
    title: "LUNARA",
    tagline: "Soft brand, sharp point of view.",
    client: "Lunara",
    tags: ["Brand Identity", "Editorial", "Strategy"],
    accent: "ink",
    deck: { video: "/decks/lunara.mp4" },
  },
  {
    slug: "preganews",
    title: "PREGANEWS",
    tagline: "A test, told like a story.",
    client: "Preganews",
    tags: ["Campaign", "Insight", "Film"],
    accent: "hotpink",
    deck: { video: "/decks/preganews.mp4" },
  },
  {
    slug: "vibemate",
    title: "VIBE MATE",
    tagline: "Friendship, productised — without the cringe.",
    client: "Vibe Mate",
    tags: ["Brand", "Digital", "Social"],
    accent: "orange",
    deck: { video: "/decks/vibemate.mp4" },
  },
  {
    slug: "salttree",
    title: "SALT TREE",
    tagline: "An earthy brand that doesn't whisper.",
    client: "Salt Tree",
    tags: ["Identity", "Packaging", "Strategy"],
    accent: "ink",
    deck: { video: "/decks/salttree.mp4" },
  },
  {
    slug: "amchi-events",
    title: "AMCHI EVENTS",
    tagline: "Mumbai's loudest event brand, dressed up.",
    client: "Amchi Events",
    tags: ["Brand Identity", "Event", "Campaign"],
    accent: "hotpink",
    deck: { video: "/decks/amchi-events.mp4" },
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
