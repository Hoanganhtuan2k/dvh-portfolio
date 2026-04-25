"use client";

import { motion } from "framer-motion";

const MARQUEE = [
  "JAVA",
  "SPRING BOOT",
  "REST APIs",
  "WSO2 APIM",
  "ORACLE",
  "POSTGRESQL",
  "REDIS",
  "DOCKER",
  "MICROSERVICES",
  "JUNIT",
  "BANKING",
  "ENTERPRISE",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#050505]/80 backdrop-blur">
      <motion.div
        className="flex gap-12 whitespace-nowrap py-4 font-mono text-sm tracking-[0.32em] text-white/40"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...MARQUEE, ...MARQUEE].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="hover:text-cyan transition">{w}</span>
            <span className="text-cyan/60">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
