import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";
import { PERSON } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#050505]/80 backdrop-blur">
      {/* big subtle wordmark — single, low-contrast, decorative only */}
      <div className="pointer-events-none mx-auto max-w-[1280px] overflow-hidden px-9 pt-14">
        <p className="select-none whitespace-nowrap text-center font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] text-[clamp(48px,10vw,140px)]">
          dvh.dev
        </p>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-10 px-9 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.28em] text-cyan">
            LET&apos;S BUILD
          </p>
          <h3 className="mt-3 max-w-[520px] text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Got a backend that needs to scale, ship, or just survive Monday?{" "}
            <a
              href={`mailto:${PERSON.email}`}
              className="underline decoration-cyan decoration-2 underline-offset-4 hover:text-cyan"
            >
              Say hi.
            </a>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${PERSON.email}`}
            aria-label="Email"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-cyan/60 hover:text-cyan"
          >
            <Mail size={16} />
          </a>
          <a
            href={PERSON.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-cyan/60 hover:text-cyan"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-cyan/60 hover:text-cyan"
          >
            <Github size={16} />
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/10 px-9 py-5 font-mono text-[11px] tracking-[0.22em] text-white/40 md:flex-row md:items-center md:justify-between">
        <span>© 2026 · {PERSON.name.toUpperCase()}</span>
        <span className="text-white/30">JAVA · SPRING · APIs</span>
        <Link href="#home" className="hover:text-cyan">
          BACK TO TOP ↑
        </Link>
      </div>
    </footer>
  );
}
