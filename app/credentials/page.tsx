"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  GraduationCap,
  Award,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Kicker } from "@/components/Kicker";
import { useT } from "@/lib/i18n";

type Tone = "cyan" | "warm" | "violet" | "emerald";

type Item = {
  id: string;
  title: string;
  issuer: string;
  /** Sortable date — YYYY-MM-DD. */
  date: string;
  /** Display label. */
  when: string;
  kind: "education" | "certification";
  tone: Tone;
  tags: string[];
  /** Path to image (.png/.jpg) OR PDF (.pdf). */
  file?: string;
  description?: string;
  /** Optional verification URL. */
  verify?: string;
  /** Optional credential ID. */
  credentialId?: string;
};

const ITEMS: Item[] = [
  {
    id: "ptit",
    title: "Posts and Telecommunications Institute of Technology (PTIT)",
    issuer: "Distance Learning · Information Technology",
    date: "2024-09-01",
    when: "2024 — Present",
    kind: "education",
    tone: "warm",
    tags: ["BACHELOR", "IT", "ONGOING"],
    file: "/ptit.png",
    description:
      "Pursuing a formal IT degree alongside full-time engineering work — distributed systems, software architecture, and applied AI for fintech.",
  },
  {
    id: "aptech-bk",
    title: "Bach Khoa — Aptech",
    issuer: "Major: Java Engineering",
    date: "2020-04-01",
    when: "Jul 2018 — Apr 2020",
    kind: "education",
    tone: "warm",
    tags: ["DIPLOMA", "JAVA", "OOP"],
    description:
      "Foundational Java engineering program — OOP, web frameworks, databases, and enterprise patterns.",
  },
  {
    id: "api-security",
    title: "API Security Architect",
    issuer: "API Academy",
    date: "2020-08-01",
    when: "Aug 2020",
    kind: "certification",
    tone: "cyan",
    tags: ["API", "SECURITY", "OAUTH2"],
    file: "/api-security.pdf",
    credentialId: "APIA-SEC-2020",
    description:
      "Designing secure APIs — auth flows, threat modelling, rate-limiting, and gateway hardening.",
  },
  {
    id: "api-designer",
    title: "API Designer",
    issuer: "API Academy",
    date: "2020-06-01",
    when: "Jun 2020",
    kind: "certification",
    tone: "cyan",
    tags: ["API", "REST", "OPENAPI"],
    file: "/api-designer.pdf",
    credentialId: "APIA-DSG-2020",
    description:
      "REST/OpenAPI contract design, resource modelling, versioning, and developer-experience.",
  },
  {
    id: "api-pm",
    title: "API Product Manager",
    issuer: "API Academy",
    date: "2020-05-01",
    when: "May 2020",
    kind: "certification",
    tone: "cyan",
    tags: ["API", "PRODUCT", "STRATEGY"],
    file: "/api-product-manager.pdf",
    credentialId: "APIA-PM-2020",
    description:
      "Treating APIs as products — lifecycle, monetization, governance, and analytics.",
  },
];

// ---- Tone palette (full strings so Tailwind JIT keeps them) ----
const TONE: Record<
  Tone,
  {
    text: string;
    border: string;
    bg: string;
    chipText: string;
    chipBorder: string;
    dot: string;
    glow: string;
    btn: string;
  }
> = {
  cyan: {
    text: "text-cyan",
    border: "border-cyan/40",
    bg: "bg-cyan/[0.06]",
    chipText: "text-cyan",
    chipBorder: "border-cyan/30 bg-cyan/[0.08]",
    dot: "bg-cyan shadow-[0_0_14px_rgba(0,217,255,0.7)]",
    glow: "shadow-[0_24px_70px_-30px_rgba(0,217,255,0.35)]",
    btn: "border-cyan/50 bg-cyan/10 text-cyan hover:bg-cyan/20",
  },
  warm: {
    text: "text-warm",
    border: "border-warm/40",
    bg: "bg-warm/[0.06]",
    chipText: "text-warm",
    chipBorder: "border-warm/30 bg-warm/[0.08]",
    dot: "bg-warm shadow-[0_0_14px_rgba(255,122,69,0.7)]",
    glow: "shadow-[0_24px_70px_-30px_rgba(255,122,69,0.35)]",
    btn: "border-warm/50 bg-warm/10 text-warm hover:bg-warm/20",
  },
  violet: {
    text: "text-violet-300",
    border: "border-violet-400/40",
    bg: "bg-violet-400/[0.06]",
    chipText: "text-violet-300",
    chipBorder: "border-violet-400/30 bg-violet-400/[0.08]",
    dot: "bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.7)]",
    glow: "shadow-[0_24px_70px_-30px_rgba(167,139,250,0.35)]",
    btn: "border-violet-400/50 bg-violet-400/10 text-violet-300 hover:bg-violet-400/20",
  },
  emerald: {
    text: "text-emerald-300",
    border: "border-emerald-400/40",
    bg: "bg-emerald-400/[0.06]",
    chipText: "text-emerald-300",
    chipBorder: "border-emerald-400/30 bg-emerald-400/[0.08]",
    dot: "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]",
    glow: "shadow-[0_24px_70px_-30px_rgba(52,211,153,0.35)]",
    btn: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const isPdf = (src?: string) => !!src && /\.pdf($|\?)/i.test(src);

export default function CredentialsPage() {
  const t = useT();
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  // Build issuer chip list with counts.
  const issuers = useMemo(() => {
    const counts = new Map<string, number>();
    for (const it of ITEMS) {
      const key = it.issuer.split(/·|—/)[0].trim();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const filtered = useMemo(() => {
    const sorted = [...ITEMS].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    if (filter === "all") return sorted;
    return sorted.filter((it) => it.issuer.startsWith(filter));
  }, [filter]);

  // Viewer navigation acts on the *currently filtered* list.
  const viewable = useMemo(() => filtered.filter((it) => !!it.file), [filtered]);

  // Group by year (desc).
  const byYear = useMemo(() => {
    const groups = new Map<number, Item[]>();
    for (const it of filtered) {
      const y = new Date(it.date).getFullYear();
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y)!.push(it);
    }
    return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const openViewer = useCallback(
    (id: string) => {
      const idx = viewable.findIndex((i) => i.id === id);
      if (idx >= 0) setViewerIndex(idx);
    },
    [viewable],
  );

  const closeViewer = useCallback(() => setViewerIndex(null), []);

  const next = useCallback(
    () =>
      setViewerIndex((i) =>
        i === null ? null : (i + 1) % viewable.length,
      ),
    [viewable.length],
  );

  const prev = useCallback(
    () =>
      setViewerIndex((i) =>
        i === null ? null : (i - 1 + viewable.length) % viewable.length,
      ),
    [viewable.length],
  );

  // Keyboard nav.
  useEffect(() => {
    if (viewerIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerIndex, next, prev, closeViewer]);

  return (
    <section className="mx-auto max-w-[1100px] px-6 py-28 sm:px-9">
      <Kicker icon={<Sparkles size={12} />} label={t("kicker.achievements")} />
      <SectionTitle>{t("page.credentials.title")}</SectionTitle>
      <p className="mt-3 font-mono text-[12px] tracking-[0.18em] text-white/45">
        {ITEMS.length} ENTRIES · CLICK ANY CARD TO EXPAND · CLICK THUMBNAIL TO
        VIEW
      </p>

      {/* Filter chips */}
      <div className="mt-7 flex flex-wrap gap-2">
        <FilterChip
          label="All"
          count={ITEMS.length}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {issuers.map(([name, count]) => (
          <FilterChip
            key={name}
            label={name}
            count={count}
            active={filter === name}
            onClick={() => setFilter(name)}
          />
        ))}
      </div>

      {/* Timeline */}
      <div className="relative mt-12">
        {byYear.map(([year, items], gi) => (
          <div key={year} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative mb-6 flex items-center gap-4"
            >
              <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-[0.22em] text-cyan">
                {year}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
              <span className="font-mono text-[10.5px] tracking-[0.22em] text-white/35">
                {items.length} {items.length === 1 ? "ENTRY" : "ENTRIES"}
              </span>
            </motion.div>

            <div className="relative pl-8 sm:pl-10">
              <span
                aria-hidden
                className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/15 via-white/8 to-transparent sm:left-[9px]"
              />
              <div className="space-y-4">
                {items.map((it, ii) => (
                  <TimelineCard
                    key={it.id}
                    item={it}
                    index={ii + gi * 10}
                    expanded={expanded === it.id}
                    onToggle={() =>
                      setExpanded(expanded === it.id ? null : it.id)
                    }
                    onView={() => openViewer(it.id)}
                  />
                ))}
              </div>
            </div>

            {gi < byYear.length - 1 && <div className="h-10" />}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-[12px] tracking-[0.2em] text-white/40">
            NO ENTRIES FOR THIS FILTER
          </p>
        )}
      </div>

      {/* Viewer */}
      <AnimatePresence>
        {viewerIndex !== null && viewable[viewerIndex] && (
          <CertViewer
            item={viewable[viewerIndex]}
            current={viewerIndex + 1}
            total={viewable.length}
            onClose={closeViewer}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- sub-components ---------------- */

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.18em] transition ${
        active
          ? "border-cyan/60 bg-cyan/10 text-cyan shadow-[0_0_24px_-6px_rgba(0,217,255,0.55)]"
          : "border-white/12 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 py-px text-[9.5px] ${
          active ? "bg-cyan/20 text-cyan" : "bg-white/8 text-white/50"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function TimelineCard({
  item,
  index,
  expanded,
  onToggle,
  onView,
}: {
  item: Item;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onView: () => void;
}) {
  const t = TONE[item.tone];
  const Icon = item.kind === "education" ? GraduationCap : Award;
  const pdf = isPdf(item.file);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: EASE, delay: (index % 10) * 0.04 }}
      className="relative"
    >
      <span
        aria-hidden
        className={`absolute -left-[27px] top-5 h-3 w-3 rounded-full ring-4 ring-bg sm:-left-[33px] ${t.dot}`}
      />

      <button
        onClick={onToggle}
        className={`group flex w-full items-start gap-4 rounded-2xl border bg-bg-soft px-4 py-4 text-left transition hover:-translate-y-0.5 sm:px-5 ${
          expanded
            ? `${t.border} ${t.bg} ${t.glow}`
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <span
          className={`relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border ${t.border} ${t.bg}`}
        >
          {item.file && !pdf ? (
            <Image
              src={item.file}
              alt=""
              fill
              sizes="56px"
              className="object-cover opacity-90"
            />
          ) : pdf ? (
            <FileText size={22} className={t.text} />
          ) : (
            <Icon size={22} className={t.text} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[15.5px] font-semibold leading-snug text-white">
              {item.title}
            </h3>
            <span className="ml-auto whitespace-nowrap font-mono text-[10.5px] tracking-[0.22em] text-white/40">
              {item.when}
            </span>
          </div>
          <p className={`mt-1 text-[13px] ${t.text}`}>{item.issuer}</p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2 py-0.5 font-mono text-[9.5px] tracking-[0.18em] ${t.chipBorder} ${t.chipText}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`mt-2 shrink-0 text-white/40 transition ${
            expanded ? "rotate-180 text-white/70" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="ml-[72px] mr-2 mt-3 grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 sm:grid-cols-[1fr_220px]">
              <div>
                {item.description && (
                  <p className="text-[13.5px] leading-relaxed text-white/70">
                    {item.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.22em] text-white/40">
                    <ShieldCheck size={12} />
                    {item.kind === "education" ? "EDUCATION" : "CERTIFICATION"}
                  </span>
                  {item.credentialId && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-white/40">
                        {item.credentialId}
                      </span>
                    </>
                  )}
                  {item.file && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView();
                      }}
                      className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-[0.2em] transition ${t.btn}`}
                    >
                      <ExternalLink size={11} /> VIEW
                    </button>
                  )}
                </div>
              </div>

              {item.file && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onView();
                  }}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-xl border ${t.border} ${t.bg}`}
                  aria-label="Open certificate"
                >
                  {pdf ? (
                    <span className="grid h-full w-full place-items-center">
                      <FileText size={28} className={t.text} />
                      <span className="mt-2 font-mono text-[9.5px] tracking-[0.22em] text-white/50">
                        PDF · CLICK TO VIEW
                      </span>
                    </span>
                  ) : (
                    <Image
                      src={item.file}
                      alt={item.title}
                      fill
                      sizes="220px"
                      className="object-contain transition group-hover:scale-[1.03]"
                    />
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- viewer ---------------- */

function CertViewer({
  item,
  current,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  item: Item;
  current: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const t = TONE[item.tone];
  const pdf = isPdf(item.file);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        key={item.id}
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1080px] overflow-hidden rounded-2xl border border-white/12 bg-bg-soft shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white/70 transition hover:border-cyan/60 hover:text-cyan"
        >
          <X size={14} />
        </button>

        {/* Body: preview + info */}
        <div className="grid gap-0 sm:grid-cols-[1.1fr_1fr]">
          {/* Preview */}
          <div className="relative min-h-[320px] bg-black/40 p-4 sm:min-h-[460px]">
            {item.file ? (
              pdf ? (
                <object
                  data={item.file + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH"}
                  type="application/pdf"
                  className="h-full min-h-[320px] w-full rounded-lg border border-white/10 bg-white sm:min-h-[460px]"
                >
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`grid h-full w-full place-items-center font-mono text-[11px] tracking-[0.2em] ${t.text}`}
                  >
                    OPEN PDF IN NEW TAB
                  </a>
                </object>
              ) : (
                <div className="relative grid h-full min-h-[320px] w-full place-items-center sm:min-h-[460px]">
                  <Image
                    src={item.file}
                    alt={item.title}
                    width={1600}
                    height={1200}
                    className="max-h-[60vh] w-auto rounded-lg object-contain"
                  />
                </div>
              )
            ) : (
              <div className="grid h-full place-items-center font-mono text-[11px] tracking-[0.2em] text-white/40">
                NO PREVIEW AVAILABLE
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 p-6 sm:p-7">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] ${t.chipBorder} ${t.chipText}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-semibold leading-tight text-white sm:text-[28px]">
              {item.title}
            </h3>

            <p className="text-[13.5px]">
              <span className={`font-semibold ${t.text}`}>{item.issuer}</span>
              <span className="text-white/45"> — {item.when}</span>
            </p>

            {item.description && (
              <p className="text-[13.5px] leading-relaxed text-white/70">
                {item.description}
              </p>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              {item.credentialId && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.2em] text-white/40">
                  <ShieldCheck size={12} /> {item.credentialId}
                </span>
              )}
              {(item.verify || item.file) && (
                <a
                  href={item.verify || item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] transition ${t.btn}`}
                >
                  <ExternalLink size={12} />
                  {item.verify ? "VERIFY" : "OPEN"}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between border-t border-white/8 bg-black/40 px-5 py-3 font-mono text-[11px] tracking-[0.18em]">
          <button
            onClick={onPrev}
            disabled={total <= 1}
            className="inline-flex items-center gap-1.5 text-white/55 transition hover:text-white disabled:opacity-30 disabled:hover:text-white/55"
          >
            <ChevronLeft size={14} /> PREVIOUS
          </button>
          <span className="text-white/40">
            {current} / {total} <span className="mx-1.5 text-white/20">·</span> ← →{" "}
            <span className="mx-1.5 text-white/20">·</span> ESC
          </span>
          <button
            onClick={onNext}
            disabled={total <= 1}
            className="inline-flex items-center gap-1.5 text-white/55 transition hover:text-white disabled:opacity-30 disabled:hover:text-white/55"
          >
            NEXT <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
