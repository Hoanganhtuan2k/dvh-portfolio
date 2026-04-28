"use client";

import Hero from "@/components/Hero";
import { Banner, SectionTitle } from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import Pillars from "@/components/Pillars";
import LocaleCard from "@/components/LocaleCard";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Marquee from "@/components/Marquee";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent, useT } from "@/lib/i18n";

export default function HomePage() {
  const { projects, experience, skills, workflow } = useContent();
  const t = useT();
  return (
    <>
      <Hero />
      <Marquee />

      <Banner>{t("home.banner.featured")}</Banner>
      <section id="projects" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>{t("home.section.projects")}</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.2em] text-cyan hover:text-cyan-soft"
        >
          {t("home.viewAll")} <ArrowRight size={14} />
        </Link>
      </section>

      <Banner>{t("home.banner.who")}</Banner>
      <section id="persona" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>{t("home.section.about")}</SectionTitle>
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-cyan">
              / {t("kicker.about")}
            </p>
            <p className="mt-4 max-w-[620px] text-[17px] leading-[1.7] text-white/80">
              {t("home.about.lead")}
            </p>
            <p className="mt-3 max-w-[620px] text-[15px] leading-[1.7] text-white/55">
              {t("home.about.lead2")}
            </p>
            <p className="mt-6 inline-block border-l-2 border-cyan py-1.5 px-4 font-mono text-[13px] text-cyan/90">
              {t("home.about.quote")}
            </p>
            <div className="mt-9">
              <Pillars />
            </div>
          </div>
          <LocaleCard />
        </div>
      </section>

      <Banner>{t("home.banner.work")}</Banner>
      <section id="experience" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>{t("home.section.experience")}</SectionTitle>
        <Timeline items={experience} />
      </section>

      <Banner>{t("home.banner.skills")}</Banner>
      <section id="forge" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>{t("home.section.forge")}</SectionTitle>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-white/10 bg-bg-soft p-5 transition hover:-translate-y-0.5 hover:border-white/25"
            >
              <span className="absolute right-4 top-3.5 font-mono text-[11px] tracking-[0.2em] text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-mono text-[11.5px] tracking-[0.22em] text-cyan">
                {s.title.toUpperCase()}
              </h4>
              <ul className="mt-3.5 flex flex-col gap-1.5 text-sm">
                {s.items.map((it) => (
                  <li key={it}>
                    <span className="font-mono text-cyan">›</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-20 mb-5 text-3xl font-semibold tracking-tight">
          {t("page.skills.workflow")}
        </h3>
        <ol className="flex flex-wrap gap-2">
          {workflow.map((w) => (
            <li
              key={w}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-soft px-4 py-2.5 font-mono text-[11.5px] tracking-[0.22em] transition hover:border-cyan hover:text-cyan"
            >
              <span className="text-cyan text-[10px]">◆</span>
              {w}
            </li>
          ))}
        </ol>
      </section>

      <Banner>{t("home.banner.contact")}</Banner>
      <Contact />
    </>
  );
}
