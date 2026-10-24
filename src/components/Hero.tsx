"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { experience, lenses, metrics, person } from "@/data/profile";
import { NeuralField } from "./NeuralField";
import { openChat, useLens } from "./ui";
import { ArrowUpRight, Download, Sparkle } from "./Icons";
import { track } from "./PostHog";

export function Hero() {
  const { lens, setLens } = useLens();
  const active = lenses.find((l) => l.key === lens)!;

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36" aria-labelledby="hero-title">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <NeuralField className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-ember/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <div style={{ animationDelay: "0s" }} className="enter-fade mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Open to roles · EU · UK · US · UAE · Remote
          </div>

          <h1
            id="hero-title" className="text-[clamp(2rem,9vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[3.6rem] xl:text-7xl"
          >
            <span className="text-gradient">I build AI products</span>
            <br />
            <span className="text-gradient">that </span>
            <span className="relative whitespace-nowrap text-ember">
              survive production.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                <path
                  d="M2 9 C 80 2, 220 2, 298 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1} className="draw" />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            I&apos;m <strong className="font-medium text-fg">Vivek Kumar Srivastava</strong> — an AI Engineer and full-stack
            engineer with 5+ years shipping RAG systems, LLM agents and the platforms around them to{" "}
            <strong className="font-medium text-fg">1M+ users</strong>.
          </p>

          {/* Role lens */}
          <div style={{ animationDelay: "0.3s" }} className="enter-fade mt-8"
          >
            <p className="eyebrow mb-3">Hiring for</p>
            <div role="tablist" aria-label="Choose the role you are hiring for" className="flex flex-wrap gap-2">
              {lenses.map((l) => (
                <button
                  key={l.key}
                  role="tab"
                  aria-selected={lens === l.key}
                  onClick={() => {
                    setLens(l.key);
                    track("lens_change", { lens: l.key });
                  }}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    lens === l.key ? "text-bg" : "border border-line text-muted hover:text-fg"
                  }`}
                >
                  {lens === l.key && (
                    <motion.span layoutId="lens-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 min-h-[3rem] max-w-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm leading-relaxed text-fg/80"
                >
                  <span className="mr-2 font-mono text-ember">→</span>
                  {active.pitch}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div style={{ animationDelay: "0.4s" }} className="enter-fade mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => {
                openChat("Give me a 30-second summary of Vivek for a hiring manager.");
                track("hero_ask_ai");
              }}
              className="group inline-flex items-center gap-2 rounded-xl bg-ember px-5 py-3 text-sm font-semibold text-black shadow-[0_0_40px_-8px] shadow-ember/60 transition-transform hover:scale-[1.03]"
            >
              <Sparkle /> Ask my AI about me
            </button>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5"
            >
              See the work <ArrowUpRight />
            </a>
            <a
              href={person.resumePdf}
              download
              onClick={() => track("resume_download", { from: "hero" })}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:text-fg"
            >
              <Download /> Resume (PDF)
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div style={{ animationDelay: "0.2s" }} className="enter relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-ember/40 via-line to-transparent" />
          <div className="relative overflow-hidden rounded-[1.75rem] bg-surface">
            <Image
              src={person.photo}
              alt="Portrait of Vivek Kumar Srivastava"
              width={1024}
              height={1536}
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-5 pt-20">
              <p className="eyebrow mb-1.5">Currently</p>
              <p className="text-sm font-medium">
                {experience[0].role.split(" / ")[0]} · {experience[0].company}
              </p>
              <p className="mt-0.5 text-xs text-muted">Previously Concentrix Catalyst (T-Mobile) · BridgeNext</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="relative mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/60 backdrop-blur sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <div key={m.label} style={{ animationDelay: `${0.5 + i * 0.06}s` }} className="enter-fade border-line p-5 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-r lg:border-b-0"
            >
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{m.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
