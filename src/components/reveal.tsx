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

/** Hover-stretch typography. Letters expand horizontally on pointer enter. */
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
          whileHover={{ scaleY: 1.25, scaleX: 0.85, color: "oklch(0.74 0.13 5)" }}
          transition={{ type: "spring", stiffness: 380, damping: 14 }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
