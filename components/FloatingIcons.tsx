"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";

type Icon = {
  label: string;
  glyph: string;
  x: number; // grid offset (-50..50)
  y: number;
  depth: number; // parallax intensity 0..1
  tone?: "cyan" | "warm" | "violet" | "lime";
};

const ICONS: Icon[] = [
  { label: "Spring",   glyph: "🌱", x:   0, y: -42, depth: 1.0, tone: "lime"   },
  { label: "Java",     glyph: "☕", x: -38, y: -28, depth: 0.8, tone: "warm"   },
  { label: "REST",     glyph: "⇌",  x:  38, y: -28, depth: 0.8, tone: "cyan"   },
  { label: "WSO2",     glyph: "⌬",  x: -46, y:   8, depth: 0.6, tone: "cyan"   },
  { label: "Postgres", glyph: "🐘", x:  46, y:   8, depth: 0.6, tone: "violet" },
  { label: "Redis",    glyph: "◈",  x: -38, y:  34, depth: 0.4, tone: "warm"   },
  { label: "Docker",   glyph: "🐳", x:  38, y:  34, depth: 0.4, tone: "cyan"   },
  { label: "JUnit",    glyph: "✓",  x:   0, y:  46, depth: 0.5, tone: "lime"   },
];

const TONE = {
  cyan:   "border-cyan/40 text-cyan shadow-[0_0_24px_rgba(0,217,255,0.18)]",
  warm:   "border-orange-400/40 text-orange-300 shadow-[0_0_24px_rgba(255,122,69,0.18)]",
  violet: "border-violet-400/40 text-violet-300 shadow-[0_0_24px_rgba(139,92,246,0.18)]",
  lime:   "border-emerald-400/40 text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.18)]",
};

export default function FloatingIcons() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 30);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 hidden place-items-center md:grid">
      {/* concentric rings */}
      <div className="ring-line absolute h-[820px] w-[820px] animate-[spin_70s_linear_infinite] opacity-40" />
      <div className="ring-line absolute h-[640px] w-[640px] animate-[spin_55s_reverse_linear_infinite] opacity-50" />
      <div className="ring-line absolute h-[460px] w-[460px] animate-[spin_40s_linear_infinite] opacity-30" />

      {ICONS.map((it, i) => (
        <ParallaxIcon key={it.label} icon={it} sx={sx} sy={sy} delay={i * 0.05} />
      ))}
    </div>
  );
}

function ParallaxIcon({
  icon,
  sx,
  sy,
  delay,
}: {
  icon: Icon;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  delay: number;
}) {
  const tx = useTransform(sx, (v) => v * icon.depth + icon.x * 8);
  const ty = useTransform(sy, (v) => v * icon.depth + icon.y * 7);

  return (
    <motion.div
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute flex flex-col items-center gap-1.5"
    >
      <motion.div
        whileHover={{ scale: 1.18, rotate: 6 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 300, damping: 18 },
        }}
        className={`grid h-12 w-12 cursor-default place-items-center rounded-xl border bg-[#0a0a0a]/80 backdrop-blur font-mono text-base ${TONE[icon.tone || "cyan"]}`}
      >
        {icon.glyph}
      </motion.div>
      <span className="font-mono text-[10px] tracking-widest text-white/40">
        {icon.label}
      </span>
    </motion.div>
  );
}
