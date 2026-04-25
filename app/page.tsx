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
import { EXPERIENCE, PROJECTS, SKILLS, WORKFLOW } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <Banner>FEATURED WORK</Banner>
      <section id="projects" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>Projects</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.2em] text-cyan hover:text-cyan-soft"
        >
          View All Projects <ArrowRight size={14} />
        </Link>
      </section>

      <Banner>WHO I AM</Banner>
      <section id="persona" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>About Me</SectionTitle>
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-cyan">
              / ABOUT
            </p>
            <p className="mt-4 max-w-[620px] text-[17px] leading-[1.7] text-white/80">
              I&apos;m Hoang — an{" "}
              <span className="text-white">AI Developer</span> based in Hanoi,
              focused on{" "}
              <span className="text-white">banking and financial systems</span>
              . I bridge classic Java/Spring backends with modern AI workloads:
              RAG pipelines, LLM gateways, fraud-signal services and
              decisioning APIs — without sacrificing latency, observability or
              compliance.
            </p>
            <p className="mt-3 max-w-[620px] text-[15px] leading-[1.7] text-white/55">
              4+ years across core banking (T24), API platforms (WSO2), PKI &
              digital signing, and government-scale data systems. I care about
              measurable reliability and shipping AI features that survive
              audit, not just demos.
            </p>
            <p className="mt-6 inline-block border-l-2 border-cyan py-1.5 px-4 font-mono text-[13px] text-cyan/90">
              &quot;Reliable systems aren&apos;t loud — they just keep working.&quot;
            </p>
            <div className="mt-9">
              <Pillars />
            </div>
          </div>
          <LocaleCard />
        </div>
      </section>

      <Banner>EDUCATION &amp; WORK</Banner>
      <section id="experience" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>Experience</SectionTitle>
        <Timeline items={EXPERIENCE} />
      </section>

      <Banner>SKILLS · WORKFLOW · IDENTITY</Banner>
      <section id="forge" className="mx-auto max-w-[1280px] px-9 py-24">
        <SectionTitle>Forge</SectionTitle>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
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
          Workflow
        </h3>
        <ol className="flex flex-wrap gap-2">
          {WORKFLOW.map((w) => (
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

      <Banner>REACH OUT</Banner>
      <Contact />
    </>
  );
}
