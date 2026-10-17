"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { lenses, skillGroups } from "@/data/profile";
import { Section } from "./Section";
import { useLens } from "./ui";
import { Reveal, SectionHeader } from "./Reveal";

/** Skill map: groups are re-ordered by the active role lens; bars animate on switch. */
export function Skills() {
  const { lens } = useLens();
  const ordered = [...skillGroups].sort((a, b) => Number(b.key === lens) - Number(a.key === lens));
  const [active, setActive] = useState<string | null>(null);
  const group = skillGroups.find((g) => g.name === active) ?? ordered[0];
  const lensLabel = lenses.find((l) => l.key === lens)?.label;

  return (
    <Section id="skills">
      <SectionHeader
        index="02"
        eyebrow="Skill map"
        title="Depth where it matters, breadth everywhere else."
        lede={
          <>
            Ordered for a <span className="text-fg">{lensLabel}</span> role — change the lens in the hero to re-rank. Levels are
            self-assessed relative to production use, not tutorials.
          </>
        }
      />
      <Reveal className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div role="tablist" aria-label="Skill groups" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {ordered.map((g) => {
            const on = g.name === group.name;
            return (
              <button
                key={g.name}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(g.name)}
                className={`flex shrink-0 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  on ? "border-ember/50 bg-ember-soft text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                {g.name}
                <span className="font-mono text-xs text-faint">{g.skills.length}</span>
              </button>
            );
          })}
        </div>
        <div className="card p-6 sm:p-8" role="tabpanel">
          <ul className="space-y-5">
            {group.skills.map((s, i) => (
              <li key={`${group.name}-${s.name}`}>
                <div className="mb-2 flex items-baseline justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="font-mono text-xs text-faint">{s.level}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ember/70 to-ember"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
