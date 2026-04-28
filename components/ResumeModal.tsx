"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Download, X, ExternalLink } from "lucide-react";
import { useContent, useT } from "@/lib/i18n";

const RESUME_URL = "/Dao_Viet_Hoang_CV.pdf";
const RESUME_DOWNLOAD_URL = "/Dao_Viet_Hoang_CV.pdf";

export default function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { person } = useContent();
  const t = useT();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[88vh] w-full max-w-[960px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-soft shadow-[0_30px_120px_-20px_rgba(0,217,255,0.25)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <div>
                <p className="font-mono text-[10.5px] tracking-[0.22em] text-cyan">
                  {t("resume.label")}
                </p>
                <h3 className="text-sm font-medium text-white/90">
                  {person.name} — {person.role}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_DOWNLOAD_URL}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan/50 bg-cyan/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-cyan transition hover:bg-cyan/20"
                >
                  <Download size={13} /> {t("resume.download")}
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-white/70 transition hover:border-white/30"
                >
                  <ExternalLink size={13} /> {t("resume.newTab")}
                </a>
                <button
                  onClick={onClose}
                  aria-label={t("resume.close")}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* PDF viewer (falls back to message if file missing) */}
            <div className="relative flex-1 bg-[#0a0a0a]">
              <object
                data={RESUME_URL}
                type="application/pdf"
                className="h-full w-full"
              >
                <div className="grid h-full place-items-center p-8 text-center">
                  <div>
                    <p className="text-white/70">
                      {t("resume.fallback")}{" "}
                      <code className="text-cyan">
                        public/Dao_Viet_Hoang_CV.pdf
                      </code>
                    </p>
                    <a
                      href={`mailto:${person.email}?subject=Resume request`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-cyan/10 px-4 py-2 text-cyan"
                    >
                      {t("resume.request")}
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
