"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight animated background:
 *  - Aurora radial gradients (CSS, GPU-friendly)
 *  - Canvas particle field with mouse parallax
 * No Three.js — keeps bundle small and 60fps on low-end laptops.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let w = 0,
      h = 0,
      dpr = 1;
    const mouse = { x: 0, y: 0, active: false };

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    type S = { x: number; y: number; r: number; a: number; tw: number };
    type Shoot = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    let parts: P[] = [];
    let stars: S[] = [];
    let shoots: Shoot[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(90, Math.floor((w * h) / 22000));
      parts = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.4,
      }));

      const starCount = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random(),
        tw: 0.003 + Math.random() * 0.012,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => (mouse.active = false);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // twinkling star field (deep space layer)
      for (const s of stars) {
        s.a += s.tw;
        const alpha = 0.35 + Math.abs(Math.sin(s.a)) * 0.55;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`;
        ctx.fill();
      }

      // occasional shooting star
      if (Math.random() < 0.004 && shoots.length < 2) {
        const fromLeft = Math.random() < 0.5;
        shoots.push({
          x: fromLeft ? -40 : w + 40,
          y: Math.random() * h * 0.5,
          vx: fromLeft ? 6 + Math.random() * 4 : -(6 + Math.random() * 4),
          vy: 1.2 + Math.random() * 1.4,
          life: 0,
          max: 70,
        });
      }
      for (let k = shoots.length - 1; k >= 0; k--) {
        const sh = shoots[k];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
        const grad = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * 8,
          sh.y - sh.vy * 8,
        );
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(1, "rgba(0,217,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        ctx.stroke();
        if (sh.life > sh.max || sh.x < -100 || sh.x > w + 100) {
          shoots.splice(k, 1);
        }
      }

      // particles
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,217,255,0.55)";
        ctx.fill();
      }

      // links
      const max = 120;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i],
            b = parts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < max * max) {
            const o = 1 - Math.sqrt(d2) / max;
            ctx.strokeStyle = `rgba(0,217,255,${o * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // mouse halo
      if (mouse.active) {
        const grd = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180,
        );
        grd.addColorStop(0, "rgba(0,217,255,0.18)");
        grd.addColorStop(1, "rgba(0,217,255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(mouse.x - 200, mouse.y - 200, 400, 400);
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* aurora blobs */}
      <div className="absolute -top-1/3 -left-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.18),transparent_60%)] blur-3xl animate-[float_14s_ease-in-out_infinite]" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(255,122,69,0.14),transparent_60%)] blur-3xl animate-[float_18s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,80,255,0.10),transparent_65%)] blur-3xl" />
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      {/* canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
