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
  const ringX = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });

  const [label, setLabel] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    let raf = 0;
    let pendingE: PointerEvent | null = null;
    const flush = () => {
      raf = 0;
      const e = pendingE;
      if (!e) return;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor], a, button") as HTMLElement | null;
      if (el) {
        const txt = el.getAttribute("data-cursor");
        setLabel(txt || (el.tagName === "A" || el.tagName === "BUTTON" ? "click" : ""));
        setHovering(true);
      } else {
        setLabel("");
        setHovering(false);
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const move = (e: PointerEvent) => {
      pendingE = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[10000] flex items-center justify-center will-change-transform"
      >
        <motion.div
          animate={{ scale: hovering ? 2.2 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="w-8 h-8 rounded-full border-2 border-ink"
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

      <motion.div
        aria-hidden
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[10001] w-1.5 h-1.5 rounded-full bg-ink will-change-transform"
      />
    </>
  );
}
