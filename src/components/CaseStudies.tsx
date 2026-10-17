import { caseStudies, systemDesigns } from "@/data/profile";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";

export function CaseStudies() {
  return (
    <Section id="case-studies">
      <SectionHeader
        index="06"
        eyebrow="Engineering thinking"
        title="How I think, not just what I shipped."
        lede="Three decisions from real systems — the question, the approach, the trade-offs I chose and why."
      />
      <div className="space-y-4">
        {caseStudies.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <details className="card group overflow-hidden" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
                <div>
                  <p className="font-mono text-xs text-faint">{c.context}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{c.title}</h3>
                  <p className="mt-1 text-sm italic text-muted">“{c.question}”</p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="grid gap-8 border-t border-line p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="eyebrow mb-3">Approach</p>
                  <ol className="space-y-3">
                    {c.approach.map((a, j) => (
                      <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="font-mono text-xs text-ember">{String(j + 1).padStart(2, "0")}</span>
                        {a}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="eyebrow mb-3">Trade-offs</p>
                    <ul className="space-y-3">
                      {c.tradeoffs.map((t) => (
                        <li key={t.choice} className="rounded-xl border border-line bg-bg/50 p-4">
                          <p className="text-sm font-medium">{t.choice}</p>
                          <p className="mt-1 text-sm text-muted">{t.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-ember/30 bg-ember-soft p-4">
                    <p className="eyebrow mb-1 text-ember">Result</p>
                    <p className="text-sm">{c.result}</p>
                  </div>
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <div id="system-design" className="mt-20">
        <Reveal className="mb-8">
          <p className="eyebrow">System design gallery</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Patterns I reach for.</h3>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {systemDesigns.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="card card-hover p-5">
                <p className="mb-2 text-sm font-medium">{s.title}</p>
                <ArchitectureDiagram nodes={s.nodes} accent={i % 2 ? "#7dd3fc" : "#ff7a45"} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
