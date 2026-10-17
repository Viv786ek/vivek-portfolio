"use client";

import { useEffect, useRef, useState } from "react";
import { awards, certifications, experience, person, projects, skillGroups } from "@/data/profile";
import { Section } from "./Section";
import { openChat } from "./ui";
import { Reveal, SectionHeader } from "./Reveal";
import { track } from "./PostHog";

type Line = { kind: "in" | "out" | "err"; text: string };

const HELP = `Available commands:
  whoami        who is Vivek, in one line
  experience    roles and impact
  projects      featured projects
  skills [ai|backend|frontend]
  awards        awards & certifications
  stack         tools I use daily
  resume        download the PDF resume
  contact       how to reach me
  ask <question>  ask the AI assistant
  open <github|linkedin|leetcode>
  clear         clear the screen`;

function run(raw: string): string | null {
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(" ");
  switch ((cmd ?? "").toLowerCase()) {
    case "":
      return "";
    case "help":
    case "?":
      return HELP;
    case "whoami":
      return `${person.name} — ${person.role}. ${person.positioning}`;
    case "experience":
    case "exp":
      return experience.map((e) => `▸ ${e.period.padEnd(22)} ${e.role} @ ${e.company}\n  ${e.highlights[0]}`).join("\n");
    case "projects":
    case "ls":
      return projects.filter((p) => p.featured).map((p) => `▸ ${p.title}\n  ${p.impact.join(" · ")}`).join("\n");
    case "skills": {
      const groups = arg ? skillGroups.filter((g) => g.key.startsWith(arg.toLowerCase()) || g.name.toLowerCase().includes(arg.toLowerCase())) : skillGroups;
      if (!groups.length) return `No skill group matches "${arg}". Try: ai, backend, frontend.`;
      return groups.map((g) => `${g.name}\n  ${g.skills.map((s) => s.name).join(" · ")}`).join("\n");
    }
    case "awards":
      return [...awards.map((a) => `★ ${a.name} ${a.year} — ${a.org}`), ...certifications.map((c) => `✓ ${c.name} — ${c.issuer}`)].join("\n");
    case "stack":
      return "TypeScript · React · Next.js · Angular · Node.js · Python/FastAPI · LangChain · LangGraph · PGVector · PostgreSQL · Redis · RabbitMQ · AWS · Docker";
    case "resume":
      window.open(person.resumePdf, "_blank");
      track("resume_download", { from: "terminal" });
      return "Opening resume PDF…";
    case "contact":
      return `email    ${person.email}\nlinkedin ${person.socials.linkedin}\ngithub   ${person.socials.github}`;
    case "open": {
      const url = person.socials[arg as keyof typeof person.socials];
      if (!url) return "Usage: open <github|linkedin|leetcode>";
      window.open(url, "_blank", "noopener");
      return `Opening ${url}`;
    }
    case "ask":
      if (!arg) return "Usage: ask <question>   e.g. ask what did Vivek build with LangGraph?";
      openChat(arg);
      return "Handing off to the AI assistant →";
    case "sudo":
      return "Nice try. Permission granted only after an interview. 😉";
    case "hire":
    case "hire-me":
      return `Great choice. Email ${person.email} — or run 'contact'.`;
    default:
      return null;
  }
}

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "vivek-os v2026.10 — type 'help' to get started." },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [h, setH] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const submit = (cmd: string) => {
    track("terminal_command", { cmd: cmd.split(" ")[0] });
    if (cmd.trim() === "clear") {
      setLines([]);
    } else {
      const out = run(cmd);
      setLines((l) => [
        ...l,
        { kind: "in", text: cmd },
        ...(out === null ? [{ kind: "err" as const, text: `command not found: ${cmd.split(" ")[0]} — try 'help'` }] : out ? [{ kind: "out" as const, text: out }] : []),
      ]);
    }
    if (cmd.trim()) setHistory((x) => [cmd, ...x].slice(0, 50));
    setH(-1);
    setValue("");
  };

  return (
    <Section id="terminal">
      <SectionHeader
        index="10"
        eyebrow="Command center"
        title="Prefer a terminal? Same."
        lede="A tiny shell over my profile. Try whoami, projects, skills ai, or ask followed by any question."
      />
      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-line bg-[#0b0b0e] shadow-2xl shadow-black/50" onClick={() => input.current?.focus()}>
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-faint">vivek@portfolio: ~</span>
          </div>
          <div ref={body} className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:p-5" aria-live="polite">
            {lines.map((l, i) => (
              <pre key={i} className={`whitespace-pre-wrap break-words ${l.kind === "in" ? "text-fg" : l.kind === "err" ? "text-red-400" : "text-muted"}`}>
                {l.kind === "in" ? <><span className="text-lime">➜</span> <span className="text-cyan">~</span> {l.text}</> : l.text}
              </pre>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(value);
              }}
              className="flex items-center gap-2"
            >
              <span className="text-lime">➜</span> <span className="text-cyan">~</span>
              <input
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const n = Math.min(h + 1, history.length - 1);
                    if (history[n]) { setH(n); setValue(history[n]); }
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const n = h - 1;
                    setH(Math.max(n, -1));
                    setValue(n >= 0 ? history[n] : "");
                  }
                }}
                className="flex-1 bg-transparent text-fg caret-ember outline-none"
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
            {["help", "whoami", "projects", "skills ai", "awards", "contact"].map((c) => (
              <button key={c} onClick={() => submit(c)} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted hover:border-ember/50 hover:text-fg">
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
