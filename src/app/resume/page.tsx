import type { Metadata } from "next";
import Link from "next/link";
import { awards, certifications, education, experience, person, projects, site, skillGroups } from "@/data/profile";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: `ATS-friendly resume of ${person.name}, AI Engineer and Full-Stack Engineer.`,
  alternates: { canonical: "/resume" },
};

/**
 * The resume is generated from the same data as the site, in a single-column,
 * ATS-parsable layout. "Save as PDF" uses the browser's print engine, which
 * produces selectable text that applicant tracking systems read reliably.
 */
export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f4f4f5] py-8 text-[#111] print:bg-white print:py-0">
      <div className="no-print mx-auto mb-6 flex max-w-[820px] flex-wrap items-center justify-between gap-3 px-4">
        <Link href="/" className="text-sm text-neutral-600 hover:text-black">← Back to portfolio</Link>
        <div className="flex gap-2">
          <a href={person.resumePdf} download className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50">
            Original PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto max-w-[820px] bg-white px-8 py-10 font-sans text-[13px] leading-[1.5] shadow-sm sm:px-12 print:max-w-none print:p-0 print:shadow-none">
        <header className="border-b border-neutral-200 pb-4">
          <h1 className="text-[26px] font-bold tracking-tight">{person.name}</h1>
          <p className="mt-0.5 text-[14px] font-medium text-neutral-700">
            AI Engineer | Senior Full-Stack Engineer | GenAI, LLM Applications, RAG, React, Node.js, Python, AWS
          </p>
          <p className="mt-2 text-neutral-600">
            {person.email} · {person.socials.linkedin.replace("https://www.", "")} · {person.socials.github.replace("https://", "")} · {site.url.replace("https://", "")}
          </p>
          <p className="text-neutral-600">{person.location} · Open to relocation (EU, UK, US, UAE) and remote · {person.languages.join(", ")}</p>
        </header>

        <Section title="Summary">
          <p>
            AI Engineer and Senior Full-Stack Engineer with 5+ years of experience building secure, scalable enterprise platforms
            and Generative AI applications across telecom, fintech, logistics, insurance and retail. Shipped a production RAG system
            that improved retrieval quality by 35%, LangGraph-based automation that reduced manual effort by 40%, and a microservices
            migration that cut API latency by 40% on a platform serving 1M+ users. Mentor to 4–6 engineers; four engineering awards.
          </p>
        </Section>

        <Section title="Skills">
          <ul className="space-y-0.5">
            {skillGroups.map((g) => (
              <li key={g.name}>
                <strong>{g.name}:</strong> {g.skills.map((s) => s.name).join(", ")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.company} className="mb-3 break-inside-avoid">
              <div className="flex flex-wrap justify-between gap-x-4">
                <p><strong>{e.role}</strong> — {e.company}{e.client ? ` (${e.client})` : ""}</p>
                <p className="text-neutral-600">{e.period} · {e.location}</p>
              </div>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {e.highlights.map((h) => <li key={h}>{h}</li>)}
                {e.award ? <li>{e.award}.</li> : null}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Selected Projects">
          {projects.filter((p) => p.featured).map((p) => (
            <div key={p.slug} className="mb-2 break-inside-avoid">
              <p><strong>{p.title}</strong> — {p.stack.slice(0, 6).join(", ")}</p>
              <p>{p.solution} Impact: {p.impact.join("; ")}.</p>
            </div>
          ))}
        </Section>

        <Section title="Education">
          <p><strong>{education.degree}</strong> — {education.school}, {education.period} · {education.grade}</p>
        </Section>

        <Section title="Certifications & Awards">
          <ul className="list-disc space-y-0.5 pl-5">
            {certifications.map((c) => <li key={c.name}>{c.name} — {c.issuer}{c.year ? `, ${c.year}` : ""}</li>)}
            {awards.map((a) => <li key={`${a.name}${a.year}`}>{a.name} {a.year} — {a.org}</li>)}
          </ul>
        </Section>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-neutral-800">{title}</h2>
      {children}
    </section>
  );
}
