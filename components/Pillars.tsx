const PILLARS = [
  {
    title: "STABILITY",
    text: "An engineer of systems, driven by predictability and observability.",
  },
  {
    title: "PERFORMANCE",
    text: "Deep work on efficiency and precision — queries, services and gateways.",
  },
  {
    title: "CRAFT",
    text: "Discipline and dedication in every line of code, test and doc.",
  },
];

export default function Pillars() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {PILLARS.map((p) => (
        <div
          key={p.title}
          className="rounded-2xl border border-white/10 bg-bg-soft p-5"
        >
          <span className="block h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
          <h4 className="mt-3 font-mono text-xs tracking-[0.22em] text-cyan">
            {p.title}
          </h4>
          <p className="mt-2 text-sm text-white/60">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
