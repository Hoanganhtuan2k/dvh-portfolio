"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const KEYS = ["rotating.0", "rotating.1", "rotating.2", "rotating.3"] as const;

export default function RotatingTitle() {
  const t = useT();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % KEYS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mt-6 flex h-[clamp(34px,5vw,60px)] items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={KEYS[i]}
          initial={{ y: "55%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-55%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[linear-gradient(90deg,#ff7a45_0%,#ffb37a_30%,#5fe7ff_70%,#00d9ff_100%)] bg-clip-text text-center font-semibold leading-none tracking-[-0.02em] text-transparent text-[clamp(28px,4.5vw,52px)]"
        >
          {t(KEYS[i])}
        </motion.h2>
      </AnimatePresence>

      {/* dots */}
      <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {KEYS.map((_, idx) => (
          <motion.span
            key={idx}
            animate={{
              width: idx === i ? 18 : 5,
              opacity: idx === i ? 1 : 0.3,
            }}
            transition={{ duration: 0.4 }}
            className={
              idx === i
                ? "h-[2px] rounded-full bg-cyan"
                : "h-[2px] rounded-full bg-white/30"
            }
          />
        ))}
      </div>
    </div>
  );
}
