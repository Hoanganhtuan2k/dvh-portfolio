"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/lib/types";

const TONE: Record<string, string> = {
  cyan: "border-cyan/50 bg-cyan/10 text-cyan",
  warm: "border-orange-400/50 bg-orange-400/10 text-orange-300",
  violet: "border-violet-400/50 bg-violet-400/10 text-violet-300",
  emerald: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
};

export default function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative pl-0">
      <span className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan to-transparent" />
      {items.map((e, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: i * 0.04 }}
          className="relative pb-12 pl-14"
        >
          <span
            className={
              "absolute left-[7px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 bg-bg shadow-[0_0_0_6px_rgba(0,217,255,0.10)] " +
              (e.edu
                ? "border-warm shadow-[0_0_0_6px_rgba(255,122,69,0.12)]"
                : "border-cyan")
            }
          />
          <p className="font-mono text-[11px] tracking-[0.24em] text-cyan">
            {e.when}
          </p>
          <div className="mt-1 flex items-center gap-3">
            {e.badge && (
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border font-mono text-[10px] font-bold tracking-[0.06em] ${
                  TONE[e.badgeTone || (e.edu ? "warm" : "cyan")]
                }`}
                aria-hidden
              >
                {e.badge}
              </span>
            )}
            <h3 className="text-2xl font-semibold leading-tight">{e.role}</h3>
          </div>
          <p className="mt-1 text-white/60 italic">{e.org}</p>
          {e.summary && <p className="mt-2 text-white/70">{e.summary}</p>}
          <ul className="mt-3 list-disc pl-5 text-white/60 text-[15px] space-y-1">
            {e.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {e.tech.map((t) => (
              <span
                key={t}
                className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] tracking-[0.14em]"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
