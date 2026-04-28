"use client";

import { useT } from "@/lib/i18n";

const PILLARS = [
  { id: "stability" },
  { id: "performance" },
  { id: "craft" },
] as const;

export default function Pillars() {
  const t = useT();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {PILLARS.map((p) => (
        <div
          key={p.id}
          className="rounded-2xl border border-white/10 bg-bg-soft p-5"
        >
          <span className="block h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
          <h4 className="mt-3 font-mono text-xs tracking-[0.22em] text-cyan">
            {t(`pillars.${p.id}.title` as const)}
          </h4>
          <p className="mt-2 text-sm text-white/60">
            {t(`pillars.${p.id}.text` as const)}
          </p>
        </div>
      ))}
    </div>
  );
}
