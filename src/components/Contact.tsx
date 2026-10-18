"use client";

import { useState } from "react";
import { person } from "@/data/profile";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";
import { GitHubIcon, LinkedInIcon, Mail, Send } from "./Icons";
import { track } from "./PostHog";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const reasons = ["Full-time role", "Contract / freelance", "Consulting", "Just saying hi"];

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [reason, setReason] = useState(reasons[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ state: "sending" });
    // Static hosting (GitHub Pages) has no server: open a pre-filled email instead.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
      if (data.website) return setStatus({ state: "sent" });
      const subject = `[Portfolio] ${reason} — ${data.name}${data.company ? ` (${data.company})` : ""}`;
      const body = `${data.message}

— ${data.name} <${data.email}>`;
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      track("contact_submit", { reason, via: "mailto" });
      return setStatus({ state: "sent", message: "Opening your email app — just press send." });
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, reason }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; mailto?: string };
      if (json.ok) {
        setStatus({ state: "sent" });
        form.reset();
        track("contact_submit", { reason });
      } else if (json.mailto) {
        window.location.href = json.mailto;
        setStatus({ state: "sent", message: "Opening your email client…" });
      } else {
        setStatus({ state: "error", message: json.error ?? "Something went wrong." });
      }
    } catch {
      setStatus({ state: "error", message: "Network error — please email me directly." });
    }
  }

  const field = "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-ember/60";

  return (
    <Section id="contact">
      <SectionHeader
        index="11"
        eyebrow="Contact"
        title={<>Let&apos;s build something that ships.</>}
        lede="Hiring for an AI, full-stack or backend role in Europe, the UK, the US, the UAE or remote? Tell me about the team and the problem."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-3">
          {[
            { href: `mailto:${person.email}`, icon: <Mail />, label: "Email", value: person.email },
            { href: person.socials.linkedin, icon: <LinkedInIcon />, label: "LinkedIn", value: "in/viveksde" },
            { href: person.socials.github, icon: <GitHubIcon />, label: "GitHub", value: "@viveksde" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="card card-hover flex items-center gap-4 p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted">{c.icon}</span>
              <span className="min-w-0">
                <span className="block text-xs text-muted">{c.label}</span>
                <span className="block truncate text-sm">{c.value}</span>
              </span>
            </a>
          ))}
          <div className="card p-5 text-sm text-muted">
            <p className="text-fg">Recruiter quick facts</p>
            <ul className="mt-3 space-y-1.5">
              <li>· 5+ years · AI + full-stack</li>
              <li>· Open to relocation & remote</li>
              <li>· Visa sponsorship required where applicable</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Reason for reaching out">
              {reasons.map((r) => (
                <button
                  type="button"
                  key={r}
                  role="radio"
                  aria-checked={reason === r}
                  onClick={() => setReason(r)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors ${reason === r ? "bg-fg text-bg" : "border border-line text-muted hover:text-fg"}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">Name</span>
                <input name="name" required maxLength={100} placeholder="Your name" className={field} autoComplete="name" />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input name="email" type="email" required maxLength={200} placeholder="you@company.com" className={field} autoComplete="email" />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Company</span>
              <input name="company" maxLength={120} placeholder="Company & role (optional)" className={field} autoComplete="organization" />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea name="message" required minLength={10} maxLength={4000} rows={5} placeholder="What are you building, and how can I help?" className={`${field} resize-none`} />
            </label>
            {/* Honeypot: hidden from humans, bots fill it */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted" aria-live="polite">
                {status.state === "sent" && <span className="text-lime">{status.message ?? "Thanks — message received. I'll be in touch."}</span>}
                {status.state === "error" && <span className="text-red-400">{status.message}</span>}
              </p>
              <button
                disabled={status.state === "sending"}
                className="inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : "Send message"} <Send />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
