export function Banner({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y border-white/10 bg-[#050505]">
      <div className="mx-auto max-w-[1280px] px-9 py-3 font-mono text-[11px] tracking-[0.4em] text-white/50">
        {children}
      </div>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-gradient mb-12 text-[clamp(40px,7vw,90px)] font-bold leading-none tracking-[-0.025em]">
      {children}
    </h2>
  );
}
