"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Section kicker — small label that sits above big page titles.
 *
 * Layout:  [ icon ] LABEL ──────────
 *          accented chip + horizontal accent line that fades to transparent.
 *
 * `icon` accepts an already-rendered React element (e.g. `<Sparkles size={12} />`)
 * so it can be passed safely from Server Components.
 */
export function Kicker({
  icon,
  label,
  tone = "cyan",
}: {
  icon?: ReactNode;
  label: string;
  tone?: "cyan" | "warm";
}) {
  const color = tone === "warm" ? "text-warm" : "text-cyan";
  const ring =
    tone === "warm"
      ? "border-warm/40 bg-warm/[0.07]"
      : "border-cyan/40 bg-cyan/[0.07]";
  const glow =
    tone === "warm"
      ? "from-warm/40 via-warm/10"
      : "from-cyan/40 via-cyan/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3"
    >
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${ring}`}
      >
        {icon ? <span className={color}>{icon}</span> : null}
        <span
          className={`font-mono text-[10.5px] font-semibold tracking-[0.3em] ${color}`}
        >
          {label}
        </span>
      </span>
      <span
        aria-hidden
        className={`h-px w-24 bg-gradient-to-r ${glow} to-transparent sm:w-40`}
      />
    </motion.div>
  );
}
