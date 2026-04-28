"use client";

import { Mail, Phone, Linkedin, MapPin, type LucideIcon } from "lucide-react";
import { useContent, useT } from "@/lib/i18n";

export default function Contact() {
  const { person } = useContent();
  const t = useT();
  const tiles: {
    label: string;
    value: string;
    href: string | null;
    Icon: LucideIcon;
  }[] = [
    {
      label: t("contact.tile.mail"),
      value: person.email,
      href: `mailto:${person.email}`,
      Icon: Mail,
    },
    {
      label: t("contact.tile.phone"),
      value: person.phone,
      href: `tel:${person.phone.replace(/\s/g, "")}`,
      Icon: Phone,
    },
    {
      label: t("contact.tile.linkedin"),
      value: "/in/dao-viet-hoang",
      href: person.linkedin,
      Icon: Linkedin,
    },
    {
      label: t("contact.tile.location"),
      value: person.location,
      href: null,
      Icon: MapPin,
    },
  ];
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-9 py-32">
      <h2 className="text-gradient mb-12 text-[clamp(40px,7vw,90px)] font-bold leading-none tracking-[-0.025em]">
        {t("contact.title")}
      </h2>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ label, value, href, Icon }) => {
          const inner = (
            <>
              <Icon size={18} className="text-cyan" />
              <span className="font-mono text-[10.5px] tracking-[0.22em] text-white/50">
                {label}
              </span>
              <b className="text-base font-medium break-words">{value}</b>
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-bg-soft p-5 transition hover:-translate-y-0.5 hover:border-cyan/60"
            >
              {inner}
            </a>
          ) : (
            <div
              key={label}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-bg-soft p-5"
            >
              {inner}
            </div>
          );
        })}
      </div>
      <p className="mt-8 font-mono text-sm text-white/50">
        {t("contact.note")}
      </p>
    </section>
  );
}
