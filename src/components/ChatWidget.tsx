"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Send, Sparkle } from "./Icons";
import { track } from "./PostHog";

type Msg = { role: "user" | "assistant"; content: string; sources?: string[] };

const starters = [
  "Tell me about this developer in 30 seconds.",
  "What has Vivek built with RAG and LLM agents?",
  "Is Vivek a fit for a Senior Full-Stack role?",
  "Is Vivek open to relocation? Which countries?",
];

/** Renders **bold** and line breaks without pulling in a markdown library. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-[0.5em]">
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? <strong key={j} className="font-semibold text-fg">{part.slice(2, -2)}</strong> : part,
          )}
        </span>
      ))}
    </>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgsRef = useRef<Msg[]>([]);
  msgsRef.current = msgs;

  const ask = useCallback(async (question: string) => {
    const q = question.trim();
    if (!q || busy) return;
    track("ai_question", { length: q.length });
    const history = [...msgsRef.current, { role: "user" as const, content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8).map(({ role, content }) => ({ role, content })) }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "The assistant is unavailable right now." }));
        throw new Error(err.error);
      }
      const sources = JSON.parse(decodeURIComponent(res.headers.get("x-sources") ?? "%5B%5D")) as string[];
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: acc, sources }]);
      }
    } catch (e) {
      setMsgs((m) => [...m.slice(0, -1), { role: "assistant", content: (e as Error).message || "Something went wrong — please try again." }]);
    } finally {
      setBusy(false);
    }
  }, [busy]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) setTimeout(() => ask(q), 150);
      else setTimeout(() => inputRef.current?.focus(), 200);
    };
    window.addEventListener("open-chat", onOpen);
    return () => window.removeEventListener("open-chat", onOpen);
  }, [ask]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1.2 }}
            onClick={() => setOpen(true)}
            className="no-print fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-line-strong bg-surface/90 py-2.5 pl-3 pr-4 text-sm shadow-2xl shadow-black/60 backdrop-blur-xl transition hover:border-ember/50"
            aria-label="Ask about Vivek — open AI assistant"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ember text-black"><Sparkle className="h-3.5 w-3.5" /></span>
            Ask about Vivek
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AI recruiter assistant"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="no-print fixed inset-x-3 bottom-3 z-[70] flex h-[min(640px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-2xl shadow-black/70 backdrop-blur-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[420px]"
          >
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ember text-black"><Sparkle className="h-4 w-4" /></span>
                <div>
                  <p className="text-sm font-medium">Vivek&apos;s AI assistant</p>
                  <p className="text-[11px] text-muted">Grounded in Vivek&apos;s resume, projects & GitHub</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5" aria-label="Close assistant">
                <Close />
              </button>
            </header>

            <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
              {msgs.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-muted">
                    Hi! I answer questions about Vivek&apos;s experience, projects, skills and availability. I only use facts from that profile.
                  </p>
                  <div className="space-y-2">
                    {starters.map((s) => (
                      <button key={s} onClick={() => ask(s)} className="block w-full rounded-xl border border-line px-3 py-2.5 text-left text-sm text-muted transition hover:border-ember/50 hover:text-fg">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                  <div className={`max-w-[88%] text-sm leading-relaxed ${m.role === "user" ? "rounded-2xl rounded-br-md bg-fg px-3.5 py-2 text-bg" : "text-fg/85"}`}>
                    {m.content ? <Rich text={m.content} /> : <span className="inline-flex gap-1 py-1"><Dot /><Dot d={0.15} /><Dot d={0.3} /></span>}
                    {m.sources && m.sources.length > 0 && m.content && !busy && (
                      <p className="mt-2 flex flex-wrap gap-1">
                        {m.sources.slice(0, 3).map((s) => <span key={s} className="chip text-[10px]">{s}</span>)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="border-t border-line p-3"
            >
              <div className="flex items-end gap-2 rounded-xl border border-line bg-bg/60 p-2 focus-within:border-ember/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  rows={1}
                  maxLength={500}
                  placeholder="Ask anything about Vivek…"
                  className="max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-faint"
                  aria-label="Your question"
                />
                <button disabled={busy || !input.trim()} className="grid h-8 w-8 place-items-center rounded-lg bg-ember text-black disabled:opacity-40" aria-label="Send">
                  <Send />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-faint">AI can make mistakes — verify key facts with Vivek.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-muted" style={{ animationDelay: `${d}s` }} />;
}
