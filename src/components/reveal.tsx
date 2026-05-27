import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Reveal-on-scroll wrapper with a torn-paper feel. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Hover-stretch typography. Letters jump/wiggle on pointer enter. */
export function StretchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex group ${className}`} data-cursor="ooh">
      {children.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block origin-bottom"
          whileHover={{ y: -12, rotate: [-6, 6, -3, 0], scale: 1.15, color: "oklch(0.74 0.13 5)" }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Every word jumps individually on hover. Use for body / headings to add play. */
export function JumpyText({
  children,
  className = "",
  as: As = "span",
}: {
  children: string;
  className?: string;
  as?: "span" | "p" | "h2" | "h3" | "div";
}) {
  const words = children.split(/(\s+)/);
  return (
    <As className={className}>
      {words.map((w, i) =>
        /\s+/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <motion.span
            key={i}
            className="inline-block"
            whileHover={{ y: -8, rotate: [-4, 4, 0], color: "oklch(0.74 0.13 5)" }}
            transition={{ type: "spring", stiffness: 480, damping: 12 }}
          >
            {w}
          </motion.span>
        )
      )}
    </As>
  );
}
