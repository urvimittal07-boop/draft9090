import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Stickers / paper cutouts that lazily follow the cursor with delayed physics.
 * Each floater has its own stiffness so they spread out like a school of paper.
 */
const STICKERS: { emoji: string; size: number; stiffness: number; damping: number; offset: { x: number; y: number }; rotate: number }[] = [
  { emoji: "✂️", size: 28, stiffness: 30, damping: 14, offset: { x: 80, y: -60 }, rotate: -8 },
  { emoji: "★", size: 22, stiffness: 60, damping: 16, offset: { x: -100, y: 40 }, rotate: 12 },
  { emoji: "✿", size: 24, stiffness: 22, damping: 12, offset: { x: 140, y: 100 }, rotate: 4 },
  { emoji: "♡", size: 20, stiffness: 45, damping: 13, offset: { x: -140, y: -80 }, rotate: -10 },
];

export function FloatingStickers() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, []);
  if (!enabled) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[40] hidden md:block" aria-hidden>
      {STICKERS.map((s, i) => (
        <Floater key={i} {...s} />
      ))}
    </div>
  );
}

function Floater({
  emoji, size, stiffness, damping, offset, rotate,
}: typeof STICKERS[number]) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness, damping, mass: 1.4 });
  const sy = useSpring(y, { stiffness, damping, mass: 1.4 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX + offset.x);
      y.set(e.clientY + offset.y);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y, offset.x, offset.y]);

  return (
    <motion.span
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", fontSize: size, rotate }}
      className="absolute top-0 left-0 select-none opacity-60"
    >
      {emoji}
    </motion.span>
  );
}
