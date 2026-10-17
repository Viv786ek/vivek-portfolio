import { experience } from "@/data/profile";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="03"
        eyebrow="Experience"
        title="Five years. Four companies. Every bullet has a number."
        lede="From intern to owning GenAI delivery on a platform with a million users."
      />
      <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
        {experience.map((e, i) => (
          <li key={e.company} className="relative">
            <span
              className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-bg sm:-left-[47px] ${
                i === 0 ? "bg-lime shadow-[0_0_0_4px] shadow-lime/20" : "bg-faint"
              }`}
              aria-hidden="true"
            />
            <Reveal delay={i * 0.04}>
              <article className="card card-hover p-6 sm:p-8">
                <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{e.role}</h3>
                    <p className="mt-1 text-sm text-muted">
                      <span className="text-fg">{e.company}</span>
                      {e.client ? <> · {e.client}</> : null} · {e.location}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-faint">{e.period}</p>
                </header>
                <p className="mt-4 text-sm leading-relaxed text-fg/80">{e.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                  {e.award ? <span className="chip border-ember/40 text-ember">★ {e.award}</span> : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
