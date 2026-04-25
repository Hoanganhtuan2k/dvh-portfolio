"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic button — child element softly tracks the cursor.
 */
export default function MagneticButton({
  children,
  className,
  onClick,
  as = "button",
  href,
  download,
  target,
  rel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const rx = useTransform(sy, [-20, 20], [6, -6]);
  const ry = useTransform(sx, [-20, 20], [-6, 6]);

  const handle = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      style={{ x: sx, y: sy, rotateX: rx, rotateY: ry }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (as === "a" && href) {
    return (
      <div
        ref={ref}
        data-magnetic
        onMouseMove={handle}
        onMouseLeave={reset}
        className="inline-block [perspective:600px]"
      >
        <a href={href} download={download} target={target} rel={rel}>
          {Inner}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-magnetic
      onMouseMove={handle}
      onMouseLeave={reset}
      className="inline-block [perspective:600px]"
    >
      <button onClick={onClick}>{Inner}</button>
    </div>
  );
}
