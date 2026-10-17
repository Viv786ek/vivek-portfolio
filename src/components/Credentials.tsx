import { awards, certifications, education, testimonials } from "@/data/profile";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeader index="08" eyebrow="Recognition" title="Awards, certifications, education." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Reveal className="card p-6 lg:col-span-2">
          <p className="eyebrow mb-5">Awards</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {awards.map((a) => (
              <li key={`${a.name}-${a.year}`} className="rounded-xl border border-line bg-bg/40 p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium">
                    <span className="text-ember">★</span> {a.name}
                  </p>
                  <span className="font-mono text-xs text-faint">{a.year}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{a.org} — {a.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.05} className="card p-6">
          <p className="eyebrow mb-5">Education</p>
          <p className="font-medium">{education.degree}</p>
          <p className="mt-1 text-sm text-muted">{education.school}</p>
          <p className="mt-3 font-mono text-xs text-faint">{education.period} · {education.grade}</p>
        </Reveal>
      </div>
      <Reveal className="mt-4">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <li key={c.name} className="card card-hover p-5">
              <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg border border-line font-mono text-xs text-ember">✓</div>
              <p className="text-sm font-medium leading-snug">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {testimonials.length > 0 && (
        <div className="mt-20">
          <Reveal className="mb-6">
            <p className="eyebrow">What colleagues say</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <figure className="card h-full p-6">
                  <blockquote className="text-[1.05rem] leading-relaxed text-fg/90">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted"> · {t.title} · {t.relation}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
