"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("splashed")) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splashed", "1");
    }, 1300);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-black"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-cyan/40 text-cyan font-mono text-2xl shadow-[0_0_40px_rgba(0,217,255,0.35)]">
          DH
        </span>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="block h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
        />
        <span className="font-mono text-[10px] tracking-[0.4em] text-white/50">
          BOOTING&nbsp;PORTFOLIO
        </span>
      </motion.div>
    </motion.div>
  );
}
