"use client";

import { createContext, useContext, useState } from "react";
import type { Lens } from "@/data/profile";

/* ── Role lens: lets a recruiter say what they're hiring for; sections re-rank. ── */
const LensCtx = createContext<{ lens: Lens; setLens: (l: Lens) => void }>({ lens: "ai", setLens: () => {} });
export const useLens = () => useContext(LensCtx);
export function LensProvider({ children }: { children: React.ReactNode }) {
  const [lens, setLens] = useState<Lens>("ai");
  return <LensCtx.Provider value={{ lens, setLens }}>{children}</LensCtx.Provider>;
}

/* ── Global open-chat event so any button (hero, terminal, ⌘K) can open the assistant. ── */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { question } }));
}
