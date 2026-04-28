"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Rocket, Coffee } from "lucide-react";
import FloatingIcons from "./FloatingIcons";
import MagneticButton from "./MagneticButton";
import RotatingTitle from "./RotatingTitle";
import { useResume } from "./ResumeProvider";
import { useContent, useT } from "@/lib/i18n";

export default function Hero() {
  const resume = useResume();
  const { person } = useContent();
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden border-b border-white/10"
    >
      {/* dot-grid backdrop */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_75%)]" />
      {/* glow */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(0,217,255,0.18),transparent_70%)] blur-2xl" />

      <motion.div
        style={{ y: yContent, opacity, scale }}
        className="relative mx-auto flex min-h-[82vh] max-w-[1100px] items-center justify-center px-6 py-16"
      >
        <FloatingIcons />

        <div className="relative z-10 flex w-full max-w-[680px] flex-col items-center text-center">
          {/* Available status pill */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-white/70 transition hover:text-white"
          >
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {t("hero.available")}
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.32em] text-white/50"
          >
            {t("hero.hello")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient-cyan mt-2 text-[clamp(32px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em]"
          >
            {person.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2.5 font-mono text-[12.5px] text-white/70 sm:text-sm"
          >
            <span className="text-cyan">{t("hero.role.left")}</span> ·{" "}
            <span className="text-warm">{t("hero.role.right")}</span>
          </motion.p>

          {/* Rotating role title with state dots */}
          <RotatingTitle />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 max-w-[560px] text-balance text-[14px] leading-[1.65] text-white/65"
          >
            {t("hero.lead.prefix")}{" "}
            <b className="text-white">{t("hero.lead.banking")}</b>,{" "}
            <b className="text-white">{t("hero.lead.payments")}</b>{" "}
            <b className="text-white">{t("hero.lead.platforms")}</b>{" "}
            {t("hero.lead.suffix")}
          </motion.p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              as="a"
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm transition hover:border-white/30"
            >
              <Coffee size={14} /> {t("hero.cta.projects")}
            </MagneticButton>

            <MagneticButton
              onClick={resume.open}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/60 bg-cyan/15 px-5 py-3 text-sm text-cyan shadow-[0_0_30px_-5px_rgba(0,217,255,0.5)] transition hover:bg-cyan/25"
            >
              <FileText size={14} /> {t("hero.cta.cv")}
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-300 transition hover:bg-emerald-400/20"
            >
              <Rocket size={14} /> {t("hero.cta.persona")}
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — pinned to hero section bottom, fades on scroll */}
      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        style={{ opacity }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[9.5px] tracking-[0.32em] text-white/40 transition hover:text-cyan"
      >
        <span>{t("hero.scroll")}</span>
        {/* mouse shape */}
        <span className="relative flex h-7 w-[18px] items-start justify-center rounded-full border border-white/25 transition group-hover:border-cyan/60">
          <motion.span
            animate={{ y: [2, 10, 2], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-1 h-1.5 w-[2px] rounded-full bg-white/70 group-hover:bg-cyan"
          />
        </span>
      </motion.a>
    </section>
  );
}
