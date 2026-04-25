"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

const tints = [
  "from-cyan/20 via-transparent",
  "from-orange-500/20 via-transparent",
  "from-blue-500/20 via-transparent",
  "from-pink-500/20 via-transparent",
  "from-emerald-500/20 via-transparent",
  "from-purple-500/20 via-transparent",
];

export default function ProjectCard({
  p,
  i,
}: {
  p: Project;
  i: number;
}) {
  const tint = tints[i % tints.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
      className={
        p.featured
          ? "group relative flex flex-col overflow-hidden rounded-2xl border border-cyan/40 bg-gradient-to-br from-cyan/[0.07] via-bg-soft to-bg-soft shadow-[0_30px_80px_-30px_rgba(0,217,255,0.35)] transition hover:-translate-y-1 hover:border-cyan/60 sm:col-span-2 lg:col-span-3"
          : "group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-soft transition hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_60px_-30px_rgba(0,217,255,0.18)]"
      }
    >
      {p.featured && (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-cyan/50 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          LATEST
        </span>
      )}
      <div
        className={`relative grid place-items-center bg-gradient-to-br ${tint} to-bg-soft ${
          p.featured ? "h-56" : "h-44"
        }`}
      >
        <div className="absolute inset-0 dot-grid opacity-40" />
        <span className="relative rounded-md border border-cyan/30 bg-black/40 px-3 py-1.5 font-mono text-xs tracking-[0.28em] text-cyan">
          {p.title.split("—")[0].trim().toUpperCase()}
        </span>
        {p.when && (
          <span className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-white/50">
            {p.when}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className={p.featured ? "text-2xl font-semibold" : "text-lg font-semibold"}>
          {p.title}
        </h3>
        <p className={p.featured ? "text-[15px] text-white/70 leading-relaxed" : "text-sm text-white/60"}>
          {p.description}
        </p>
        {p.scope && (
          <p className="font-mono text-[11px] tracking-[0.18em] text-cyan/80">
            SCOPE · {p.scope}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] tracking-[0.14em]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
