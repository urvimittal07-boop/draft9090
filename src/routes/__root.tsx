import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { EditorialCursor } from "@/components/cursor";
import { CinematicLoader } from "@/components/loader";
import { FloatingStickers } from "@/components/floaters";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400;1,9..144,700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Permanent+Marker&family=Anton&family=Inter:wght@400;500;700&family=Caveat:wght@500;700&display=swap";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-marker text-[10rem] leading-none text-hotpink">404</div>
        <p className="font-display italic text-2xl mt-2">this page ran away with the circus</p>
        <Link to="/" className="inline-block mt-8 px-6 py-3 bg-ink text-paper font-accent uppercase tracking-widest text-sm hover:-translate-y-0.5 transition-transform">
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-marker text-6xl text-orange">oh no</div>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-3 bg-ink text-paper font-accent uppercase tracking-widest text-sm"
        >
          try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "urvi — Creative Portfolio" },
      { name: "description", content: "Brand strategist, art director & maximalist. NMIMS Branding & Advertising." },
      { property: "og:title", content: "urvi — Creative Portfolio" },
      { property: "og:description", content: "Brand strategist, art director & maximalist. NMIMS Branding & Advertising." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "urvi — Creative Portfolio" },
      { name: "twitter:description", content: "Brand strategist, art director & maximalist. NMIMS Branding & Advertising." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7b361f05-6675-45b1-a9b6-14b2bb21a866/id-preview-eef2cc69--174d0bf4-69d5-4340-8b69-7f923e88d2bd.lovable.app-1779040890956.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7b361f05-6675-45b1-a9b6-14b2bb21a866/id-preview-eef2cc69--174d0bf4-69d5-4340-8b69-7f923e88d2bd.lovable.app-1779040890956.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS_HREF },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CinematicLoader />
      <EditorialCursor />
      <FloatingStickers />
      <div className="min-h-screen flex flex-col">
        <TapedNav />
        <main className="flex-1 pt-28">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

const NAV = [
  { to: "/", label: "Home", color: "hotpink" },
  { to: "/about", label: "About", color: "orange" },
  { to: "/campaigns", label: "Campaigns", color: "hotpink" },
  { to: "/capstone", label: "Capstone", color: "ink" },
  { to: "/gallery", label: "Gallery", color: "orange" },
  { to: "/academics", label: "Academics", color: "ink" },
  { to: "/contact", label: "Contact", color: "hotpink" },
] as const;

function TapedNav() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[96vw]">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-3 py-2 -rotate-[0.5deg]">
        {NAV.map((n, i) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="group relative"
          >
            {({ isActive }) => (
              <span
                className={`relative inline-block px-4 py-2 bg-card font-accent uppercase tracking-widest text-[11px] md:text-xs paper-card transition-transform hover:-translate-y-0.5 ${
                  i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1.5deg]"
                } ${isActive ? "bg-ink text-paper" : ""}`}
              >
                <span
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 ${
                    n.color === "hotpink" ? "tape-pink" : n.color === "orange" ? "tape" : "bg-ink/20"
                  } ${i % 2 === 0 ? "rotate-[8deg]" : "rotate-[-6deg]"}`}
                />
                {n.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-ink/10 bg-card overflow-hidden">
      <div className="anim-marquee flex whitespace-nowrap gap-12 font-accent text-[10rem] leading-none uppercase tracking-tighter text-ink/[0.06] py-6">
        <span>URVI &nbsp;★&nbsp; MOSAIC &nbsp;★&nbsp; MAXIMALIST &nbsp;★&nbsp; VISIONARY &nbsp;★&nbsp;</span>
        <span>URVI &nbsp;★&nbsp; MOSAIC &nbsp;★&nbsp; MAXIMALIST &nbsp;★&nbsp; VISIONARY &nbsp;★&nbsp;</span>
      </div>
      <div className="px-8 pb-10 flex flex-wrap justify-between items-end gap-4">
        <div className="font-marker text-xl">Mumbai • NMIMS • {new Date().getFullYear()}</div>
        <Link to="/contact" className="font-marker text-xl text-hotpink underline decoration-2 underline-offset-4">
          slide into my DMs →
        </Link>
      </div>
    </footer>
  );
}
