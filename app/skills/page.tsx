import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import { SKILLS, WORKFLOW } from "@/lib/constants";
import { Hammer } from "lucide-react";

export const metadata = { title: "Forge — Dao Viet Hoang" };

export default function SkillsPage() {
  return (
    <section className="mx-auto max-w-[1280px] px-9 py-32">
      <Kicker icon={<Hammer size={12} />} label="EXPERTISE" />
      <SectionTitle>Technical Forge</SectionTitle>
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
  );
}
