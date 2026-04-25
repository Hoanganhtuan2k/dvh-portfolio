import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/constants";
import { Layers } from "lucide-react";

export const metadata = { title: "Selected Works — Dao Viet Hoang" };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-[1280px] px-9 py-32">
      <Kicker icon={<Layers size={12} />} label="PORTFOLIO" />
      <SectionTitle>Selected Works</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
