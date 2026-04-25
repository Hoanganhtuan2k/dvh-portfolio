"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-viewport background video.
 *
 * Design notes:
 *  - Fixed-position behind everything (-z-20). AuroraBackground sits at -z-10
 *    on top to add color wash + grain, so legibility is preserved even on
 *    bright frames.
 *  - Auto-mute + playsInline so iOS/Safari autoplays.
 *  - Honors `prefers-reduced-motion` and Save-Data: shows a static poster
 *    instead of playing the video.
 *  - Pauses when the tab is hidden (saves CPU/battery).
 *  - Lazy-attaches src after first paint to keep LCP unaffected.
 *  - Triple-stack overlay (top vignette + center darken + bottom fade) gives
 *    text-on-video contrast without flat-looking black wash.
 */
export default function VideoBackground({
  src = "/bg.mp4",
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // @ts-expect-error - non-standard but widely supported on mobile
    const saveData = navigator.connection?.saveData === true;
    if (reduce || saveData) {
      setEnabled(false);
      return;
    }

    // Lazy attach src after first paint so LCP isn't blocked.
    const v = videoRef.current;
    if (!v) return;
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          v.src = src;
          v.load();
          v.play().catch(() => {});
        })
      : (window.setTimeout(() => {
          v.src = src;
          v.load();
          v.play().catch(() => {});
        }, 200) as unknown as number);

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (window.cancelIdleCallback && typeof id === "number") {
        try {
          window.cancelIdleCallback(id);
        } catch {
          /* noop */
        }
      } else {
        window.clearTimeout(id as number);
      }
    };
  }, [src]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-black"
    >
      {enabled && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          // 60% brightness keeps motion visible without bleeding into UI text
          className="h-full w-full object-cover opacity-60 [filter:brightness(0.55)_saturate(1.1)]"
        />
      )}

      {/* Layered overlays for guaranteed contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,0,0,0.35),rgba(0,0,0,0.85)_85%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
      {/* tint to keep brand vibe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,217,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,rgba(255,122,69,0.08),transparent_55%)]" />
      {/* fine grain to break banding */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
    </div>
  );
}
