import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { PERSON } from "@/lib/constants";

const tiles = [
  {
    label: "MAIL",
    value: PERSON.email,
    href: `mailto:${PERSON.email}`,
    Icon: Mail,
  },
  {
    label: "PHONE",
    value: PERSON.phone,
    href: `tel:${PERSON.phone.replace(/\s/g, "")}`,
    Icon: Phone,
  },
  {
    label: "LINKEDIN",
    value: "/in/dao-viet-hoang",
    href: PERSON.linkedin,
    Icon: Linkedin,
  },
  {
    label: "LOCATION",
    value: PERSON.location,
    href: null,
    Icon: MapPin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-9 py-32">
      <h2 className="text-gradient mb-12 text-[clamp(40px,7vw,90px)] font-bold leading-none tracking-[-0.025em]">
        Hit Me Up
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
        Currently building backends at TPBank · open to interesting backend &
        platform engineering roles.
      </p>
    </section>
  );
}
