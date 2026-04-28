"use client";

import { useT } from "@/lib/i18n";

const FIELDS = [
  { key: "role" },
  { key: "experience" },
  { key: "based" },
  { key: "english" },
  { key: "openTo" },
] as const;

export default function LocaleCard() {
  const t = useT();
  return (
    <aside className="sticky top-24 self-start rounded-2xl border border-white/10 bg-bg-soft p-6">
      <p className="font-mono text-[10.5px] tracking-[0.22em] text-white/50">
        {t("locale.heading")}
      </p>
      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-[#070707]">
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute left-[62%] top-[30%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_0_6px_rgba(0,217,255,0.18),0_0_24px_var(--cyan)] animate-pulse" />
      </div>
      <h3 className="mt-5 text-3xl font-semibold tracking-tight">
        {t("locale.country")}
      </h3>
      <p className="mt-1 font-mono text-xs text-cyan">
        21.0285° N · 105.8542° E · GMT+7
      </p>
      <ul className="mt-5 flex flex-col gap-2.5 text-[13.5px]">
        {FIELDS.map((f) => (
          <li
            key={f.key}
            className="flex items-baseline justify-between gap-3 border-b border-dashed border-white/10 pb-2"
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] text-white/50">
              {t(`locale.field.${f.key}` as const)}
            </span>
            <b className="text-right font-medium">
              {t(`locale.value.${f.key}` as const)}
            </b>
          </li>
        ))}
      </ul>
    </aside>
  );
}
