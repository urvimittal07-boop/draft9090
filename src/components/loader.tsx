import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic intro: collage pieces fly in from edges and assemble into "URVI"
 * before peeling off the screen. Shows once per session.
 */
export function CinematicLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("urvi-intro-played")) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("urvi-intro-played", "1");
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  const pieces = [
    { from: { x: -400, y: -200, r: -20 }, color: "bg-babypink", w: 220, h: 140, x: -260, y: -40, r: -8 },
    { from: { x: 500, y: -300, r: 25 }, color: "bg-hotpink", w: 160, h: 200, x: 200, y: -60, r: 6 },
    { from: { x: -500, y: 300, r: 15 }, color: "bg-orange", w: 140, h: 140, x: -180, y: 100, r: -12 },
    { from: { x: 400, y: 400, r: -25 }, color: "bg-ink", w: 240, h: 60, x: 60, y: 140, r: 4 },
    { from: { x: 0, y: -500, r: 0 }, color: "bg-cream border-2 border-ink", w: 320, h: 80, x: -20, y: 20, r: -2 },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[20000] bg-paper grid place-items-center overflow-hidden"
        >
          <div className="relative w-[600px] h-[400px] max-w-[90vw] max-h-[60vh]">
            {pieces.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: p.from.x, y: p.from.y, rotate: p.from.r, opacity: 0 }}
                animate={{ x: p.x, y: p.y, rotate: p.r, opacity: 1 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${p.color} shadow-[6px_6px_0_0_var(--color-ink)]`}
                style={{ width: p.w, height: p.h }}
              />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="text-center">
                <div className="font-marker text-7xl md:text-9xl text-ink leading-none">
                  urvi<span className="text-hotpink font-display italic">.</span>
                </div>
                <div className="font-accent uppercase tracking-[0.4em] text-xs mt-3 text-ink/60">
                  loading…
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
