"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { person } from "@/data/profile";
import { openChat } from "./ui";

type Item = { label: string; hint: string; run: () => void };

/** ⌘K / Ctrl+K palette for jumping around the site and firing actions. */
export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (hash: string) => () => router.push(`/${hash}`);
    const ext = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      { label: "Ask the AI assistant", hint: "AI", run: () => openChat() },
      { label: "Selected work", hint: "Section", run: go("#work") },
      { label: "Experience timeline", hint: "Section", run: go("#experience") },
      { label: "AI engineering", hint: "Section", run: go("#ai") },
      { label: "Skill map", hint: "Section", run: go("#skills") },
      { label: "Case studies & system design", hint: "Section", run: go("#case-studies") },
      { label: "GitHub dashboard", hint: "Section", run: go("#github") },
      { label: "Terminal", hint: "Section", run: go("#terminal") },
      { label: "Contact", hint: "Section", run: go("#contact") },
      { label: "Interactive resume", hint: "Page", run: () => router.push("/resume") },
      { label: "Writing", hint: "Page", run: () => router.push("/blog") },
      { label: "Download resume (PDF)", hint: "File", run: ext(person.resumePdf) },
      { label: "Copy email address", hint: "Action", run: () => navigator.clipboard?.writeText(person.email) },
      { label: "GitHub profile", hint: "Link", run: ext(person.socials.github) },
      { label: "LinkedIn profile", hint: "Link", run: ext(person.socials.linkedin) },
      { label: "LeetCode profile", hint: "Link", run: ext(person.socials.leetcode) },
    ];
  }, [router]);

  const filtered = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const choose = (it?: Item) => {
    if (!it) return;
    setOpen(false);
    it.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ scale: 0.97, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setI(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(x + 1, filtered.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(x - 1, 0)); }
                if (e.key === "Enter") choose(filtered[i]);
              }}
              placeholder="Type a command or search…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-sm outline-none placeholder:text-faint"
              aria-label="Search commands"
            />
            <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
              {filtered.map((it, idx) => (
                <li key={it.label} role="option" aria-selected={idx === i}>
                  <button
                    onMouseEnter={() => setI(idx)}
                    onClick={() => choose(it)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${idx === i ? "bg-white/[0.06] text-fg" : "text-muted"}`}
                  >
                    {it.label}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{it.hint}</span>
                  </button>
                </li>
              ))}
              {!filtered.length && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
