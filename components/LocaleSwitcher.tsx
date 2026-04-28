"use client";

import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact pill toggle: VI / EN.
 * Persists to cookie via the LocaleProvider.
 */
export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Language"
      className="ml-1 flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 font-mono text-[10.5px] tracking-[0.2em]"
    >
      <button
        type="button"
        onClick={() => setLocale("vi")}
        className={cn(
          "rounded-full px-2.5 py-1 transition",
          locale === "vi"
            ? "bg-cyan/20 text-cyan ring-1 ring-cyan/40"
            : "text-white/55 hover:text-white",
        )}
        aria-pressed={locale === "vi"}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition",
          locale === "en"
            ? "bg-cyan/20 text-cyan ring-1 ring-cyan/40"
            : "text-white/55 hover:text-white",
        )}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
