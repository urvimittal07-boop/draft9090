import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Magnetic editorial cursor with:
 * - lag-following ring (spring physics)
 * - dynamic cursor text from data-cursor="open / drag / view ..."
 * - pink/orange glow halo
 * - sparkle trail particles on movement
 *
 * Add data-cursor="text" to any element to change the cursor label.
 * Add data-cursor-magnet to make the element pull the cursor toward its center.
 */
export function EditorialCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });
  const haloX = useSpring(x, { stiffness: 60, damping: 14, mass: 1.2 });
  const haloY = useSpring(y, { stiffness: 60, damping: 14, mass: 1.2 });

  const [label, setLabel] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const sparksRef = useRef<{ id: number; x: number; y: number }[]>([]);
  const [, force] = useState(0);
  const lastSpark = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    // disable on touch / small screens
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const move = (e: PointerEvent) => {
      let tx = e.clientX;
      let ty = e.clientY;

      const el = (e.target as HTMLElement)?.closest?.("[data-cursor], [data-cursor-magnet], a, button") as HTMLElement | null;
      if (el) {
        if (el.hasAttribute("data-cursor-magnet")) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          tx = tx + (cx - tx) * 0.25;
          ty = ty + (cy - ty) * 0.25;
        }
        const txt = el.getAttribute("data-cursor");
        setLabel(txt || (el.tagName === "A" || el.tagName === "BUTTON" ? "click" : ""));
        setHovering(true);
      } else {
        setLabel("");
        setHovering(false);
      }
      x.set(tx);
      y.set(ty);

      const now = performance.now();
      if (now - lastSpark.current > 55) {
        lastSpark.current = now;
        idRef.current += 1;
        sparksRef.current.push({ id: idRef.current, x: e.clientX, y: e.clientY });
        if (sparksRef.current.length > 10) sparksRef.current.shift();
        force((n) => n + 1);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* warm halo */}
      <motion.div
        aria-hidden
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-[260px] h-[260px] rounded-full blur-3xl opacity-40 mix-blend-multiply"
      >
        <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,oklch(0.86_0.07_10_/_0.55),oklch(0.72_0.18_45_/_0.25)_45%,transparent_70%)]" />
      </motion.div>

      {/* spark trail */}
      <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
        <AnimatePresence>
          {sparksRef.current.map((s) => (
            <motion.span
              key={s.id}
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute w-1.5 h-1.5 rounded-full bg-hotpink"
              style={{ left: s.x - 3, top: s.y - 3, boxShadow: "0 0 10px oklch(0.74 0.13 5 / 0.8)" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* main ring */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: hovering ? 2.2 : 1, borderColor: hovering ? "oklch(0.74 0.13 5)" : "oklch(0.16 0.01 60)" }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="w-8 h-8 rounded-full border-2 border-ink bg-paper/20 backdrop-blur-[1px]"
        />
        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute top-9 left-3 font-marker text-hotpink text-base whitespace-nowrap -rotate-3"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* tiny dot */}
      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[10001] w-1.5 h-1.5 rounded-full bg-ink"
      />
    </>
  );
}
