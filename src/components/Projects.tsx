"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { projects, type Project } from "@/data/profile";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Section } from "./Section";
import { useLens } from "./ui";
import { SectionHeader } from "./Reveal";
import { ArrowUpRight, Close, GitHubIcon } from "./Icons";
import { track } from "./PostHog";

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / LLM" },
  { key: "platform", label: "Platforms" },
  { key: "frontend", label: "Frontend" },
] as const;

export function Projects() {
  const { lens } = useLens();
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [open, setOpen] = useState<Project | null>(null);

  const list = projects
    .filter((p) => filter === "all" || p.category === filter)
    .sort((a, b) => Number(b.lens.includes(lens)) - Number(a.lens.includes(lens)) || Number(!!b.featured) - Number(!!a.featured));

  return (
    <Section id="work">
      <SectionHeader
        index="05"
        eyebrow="Selected work"
        title="Problems worth solving, with receipts."
        lede="Each project opens into problem, solution, architecture, challenges and impact. Client work is described without confidential detail."
      />
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === f.key ? "bg-fg text-bg" : "border border-line text-muted hover:text-fg"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              onClick={() => {
                setOpen(p);
                track("project_open", { slug: p.slug });
              }}
              className={`card card-hover group flex flex-col p-6 text-left sm:p-7 ${i === 0 && filter === "all" ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {p.lens.includes(lens) && <span className="chip border-ember/40 text-ember">Relevant to your role</span>}
                    {p.confidential && <span className="chip">Client work</span>}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.tagline}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition group-hover:rotate-45 group-hover:border-ember/50 group-hover:text-ember">
                  <ArrowUpRight />
                </span>
              </div>
              {i === 0 && filter === "all" && (
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block">
                  <ArchitectureDiagram nodes={p.architecture.nodes} />
                </div>
              )}
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {p.impact.slice(0, 3).map((m) => (
                  <li key={m} className="font-mono text-xs text-fg/80">
                    <span className="text-ember">▲</span> {m}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectDialog project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 sm:rounded-3xl sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Case file</p>
                <h3 id="project-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
                <p className="mt-2 text-muted">{project.tagline}</p>
              </div>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line hover:bg-white/5">
                <Close />
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Block label="Problem">{project.problem}</Block>
              <Block label="Solution">{project.solution}</Block>
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-bg/60 p-4">
              <p className="eyebrow mb-2 px-2">Architecture</p>
              <ArchitectureDiagram nodes={project.architecture.nodes} />
              <p className="px-2 pb-1 text-xs text-muted">{project.architecture.caption}</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3">Challenges</p>
                <ul className="space-y-2">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">Business impact</p>
                <ul className="space-y-2">
                  {project.impact.map((m) => (
                    <li key={m} className="font-mono text-sm text-fg/90">
                      <span className="text-ember">▲</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <p className="eyebrow mb-3">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-sm font-medium text-bg">
                  <GitHubIcon /> Source code
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm">
                  Live demo <ArrowUpRight />
                </a>
              )}
              {project.confidential && (
                <p className="text-xs text-muted">Client work — source and live system are private. Happy to walk through the design in an interview.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <p className="text-sm leading-relaxed text-fg/85">{children}</p>
    </div>
  );
}

