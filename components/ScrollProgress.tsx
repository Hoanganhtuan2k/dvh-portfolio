"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0 0" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-cyan via-cyan-soft to-warm shadow-[0_0_12px_var(--cyan)]"
    />
  );
}
