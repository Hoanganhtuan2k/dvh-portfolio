import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import Pillars from "@/components/Pillars";
import LocaleCard from "@/components/LocaleCard";
import Timeline from "@/components/Timeline";
import { EXPERIENCE, PERSON } from "@/lib/constants";
import { User } from "lucide-react";

export const metadata = { title: "Persona — Dao Viet Hoang" };

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-9 py-32">
        <Kicker icon={<User size={12} />} label="ABOUT" />
        <SectionTitle>Persona</SectionTitle>
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[22px] leading-relaxed">{PERSON.summary}</p>
            <p className="mt-6 inline-block border-l-2 border-cyan py-2 px-4 font-mono text-cyan">
              &quot;Reliable systems aren&apos;t loud — they just keep working.&quot;
            </p>
            <div className="mt-9">
              <Pillars />
            </div>
          </div>
          <LocaleCard />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-9 py-16">
        <SectionTitle>Journey</SectionTitle>
        <Timeline items={EXPERIENCE} />
      </section>
    </>
  );
}
