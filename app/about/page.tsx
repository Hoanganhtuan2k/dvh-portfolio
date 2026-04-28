"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import Pillars from "@/components/Pillars";
import LocaleCard from "@/components/LocaleCard";
import Timeline from "@/components/Timeline";
import { useContent, useT } from "@/lib/i18n";
import { User } from "lucide-react";

export default function AboutPage() {
  const { person, experience } = useContent();
  const t = useT();
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-9 py-32">
        <Kicker icon={<User size={12} />} label={t("kicker.about")} />
        <SectionTitle>{t("page.about.title")}</SectionTitle>
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[22px] leading-relaxed">{person.summary}</p>
            <p className="mt-6 inline-block border-l-2 border-cyan py-2 px-4 font-mono text-cyan">
              {t("about.quote")}
            </p>
            <div className="mt-9">
              <Pillars />
            </div>
          </div>
          <LocaleCard />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-9 py-16">
        <SectionTitle>{t("page.about.journey")}</SectionTitle>
        <Timeline items={experience} />
      </section>
    </>
  );
}
