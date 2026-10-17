import { about, person } from "@/data/profile";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";

const companies = ["Enterprise Minds AI", "Concentrix Catalyst", "T-Mobile (client)", "BridgeNext", "XenonStack"];
const domains = ["Telecom", "Fintech", "Logistics", "Insurance", "Retail", "Enterprise AI"];

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        index="01"
        eyebrow="About"
        title={<>Engineer first. Product thinker always.</>}
        lede={about.mission}
      />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
          {about.story.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p>
                <span className="mb-1 block font-mono text-xs text-faint">{["2021", "2021–25", "2025–26", "2026—"][i]}</span>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="space-y-4">
          <div className="card p-6">
            <p className="eyebrow mb-4">Where I&apos;ve shipped</p>
            <ul className="flex flex-wrap gap-2">
              {companies.map((c) => (
                <li key={c} className="chip text-fg/80">{c}</li>
              ))}
            </ul>
            <p className="eyebrow mb-4 mt-6">Domains</p>
            <ul className="flex flex-wrap gap-2">
              {domains.map((c) => (
                <li key={c} className="chip">{c}</li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow mb-3">Work authorisation & languages</p>
            <p className="text-sm leading-relaxed text-muted">{person.availability}. Indian national — visa sponsorship required where applicable. Available to start quickly.</p>
            <p className="mt-3 text-sm text-muted">{person.languages.join(" · ")}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <div className="card card-hover h-full p-6">
              <p className="font-mono text-xs text-ember">0{i + 1}</p>
              <h3 className="mt-3 font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
