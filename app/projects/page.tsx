"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import ProjectCard from "@/components/ProjectCard";
import { useContent, useT } from "@/lib/i18n";
import { Layers } from "lucide-react";

export default function ProjectsPage() {
  const { projects } = useContent();
  const t = useT();
  return (
    <section className="mx-auto max-w-[1280px] px-9 py-32">
      <Kicker icon={<Layers size={12} />} label={t("kicker.portfolio")} />
      <SectionTitle>{t("page.projects.title")}</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
