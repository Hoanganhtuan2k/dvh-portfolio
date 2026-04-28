"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText } from "lucide-react";
import { useContent, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useResume } from "./ResumeProvider";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const path = usePathname();
  const resume = useResume();
  const { navLinks } = useContent();
  const t = useT();

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <div className="glass-strong flex items-center gap-1 rounded-full px-2.5 py-2 text-[11px] tracking-[0.22em] font-mono shadow-[0_10px_40px_-10px_rgba(0,217,255,0.3)]">
        <Link
          href="/"
          className="ml-2 mr-2 normal-case tracking-wider text-cyan hover:opacity-80"
        >
          daoviethoang<span className="text-white/40">.me</span>
        </Link>

        <Link
          href="/"
          aria-label="Home"
          className="grid h-8 w-8 place-items-center rounded-full border border-cyan/40 text-cyan transition hover:bg-cyan/10"
        >
          <Home size={14} />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 px-1 text-white/55">
          {navLinks.filter((l) => l.href !== "/").map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3 py-2 rounded-full transition hover:text-white",
                  active && "text-cyan",
                )}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-cyan/10 ring-1 ring-cyan/30" />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={resume.open}
          className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-cyan/50 px-3.5 py-2 text-cyan transition hover:bg-cyan/10"
        >
          <FileText size={12} /> {t("nav.cv")}
        </button>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
