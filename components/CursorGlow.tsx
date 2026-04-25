"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle desktop-only cursor glow. Hidden on touch / coarse pointers.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const el = ref.current!;
    let x = -200,
      y = -200,
      tx = -200,
      ty = -200;
    let raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);

    const overInteractive = (e: Event) => {
      const t = e.target as HTMLElement;
      const tag = t?.closest?.("a,button,[data-magnetic]");
      el.dataset.hover = tag ? "1" : "0";
    };
    document.addEventListener("mouseover", overInteractive);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", overInteractive);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[300px] w-[300px] rounded-full opacity-70 mix-blend-screen transition-[background,opacity] duration-300 [background:radial-gradient(circle,rgba(0,217,255,0.22),transparent_60%)] data-[hover='1']:opacity-100 data-[hover='1']:[background:radial-gradient(circle,rgba(0,217,255,0.45),transparent_55%)]"
    />
  );
}
