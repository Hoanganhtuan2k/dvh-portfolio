"use client";

import { createContext, useContext, useState, useCallback } from "react";
import ResumeModal from "./ResumeModal";

type Ctx = { open: () => void; close: () => void };
const ResumeCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export const useResume = () => useContext(ResumeCtx);

export default function ResumeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const o = useCallback(() => setOpen(true), []);
  const c = useCallback(() => setOpen(false), []);

  return (
    <ResumeCtx.Provider value={{ open: o, close: c }}>
      {children}
      <ResumeModal open={open} onClose={c} />
    </ResumeCtx.Provider>
  );
}
