import {
  about,
  awards,
  caseStudies,
  certifications,
  codingProfiles,
  education,
  experience,
  faq,
  metrics,
  person,
  projects,
  skillGroups,
} from "@/data/profile";

export type Chunk = { id: string; title: string; text: string };

/** Flattens the profile into retrievable chunks — the assistant's knowledge base. */
export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];
  chunks.push({
    id: "summary",
    title: "Summary",
    text: `${person.name} is an ${person.role}. ${person.positioning} ${person.availability}. Location: ${person.location}. Languages: ${person.languages.join(", ")}. Contact: ${person.email}. Key metrics: ${metrics.map((m) => `${m.value} ${m.label}`).join("; ")}.`,
  });
  chunks.push({ id: "story", title: "Story & mission", text: `${about.story.join(" ")} Mission: ${about.mission}` });
  chunks.push({
    id: "values",
    title: "Values & leadership",
    text: about.values.map((v) => `${v.title}: ${v.body}`).join(" "),
  });
  for (const e of experience) {
    chunks.push({
      id: `exp-${e.company}`,
      title: `${e.role} at ${e.company}`,
      text: `${e.role} at ${e.company}${e.client ? ` (client: ${e.client})` : ""}, ${e.period}, ${e.location}. ${e.summary} ${e.highlights.join(" ")} Stack: ${e.stack.join(", ")}.${e.award ? ` Award: ${e.award}.` : ""}`,
    });
  }
  for (const p of projects) {
    chunks.push({
      id: `proj-${p.slug}`,
      title: `Project: ${p.title}`,
      text: `${p.title} — ${p.tagline} Problem: ${p.problem} Solution: ${p.solution} Challenges: ${p.challenges.join(" ")} Stack: ${p.stack.join(", ")}. Impact: ${p.impact.join("; ")}.${p.github ? ` GitHub: ${p.github}` : ""}${p.confidential ? " (Client work; code is confidential.)" : ""}`,
    });
  }
  for (const c of caseStudies) {
    chunks.push({
      id: `case-${c.slug}`,
      title: `Case study: ${c.title}`,
      text: `${c.title} (${c.context}). ${c.question} Approach: ${c.approach.join(" ")} Trade-offs: ${c.tradeoffs.map((t) => `${t.choice} — ${t.why}`).join(" ")} Result: ${c.result}`,
    });
  }
  for (const g of skillGroups) {
    chunks.push({ id: `skills-${g.name}`, title: `Skills: ${g.name}`, text: `${g.name}: ${g.skills.map((s) => s.name).join(", ")}.` });
  }
  chunks.push({
    id: "education",
    title: "Education, certifications & awards",
    text: `Education: ${education.degree}, ${education.school}, ${education.period}, ${education.grade}. Certifications: ${certifications.map((c) => `${c.name} (${c.issuer}${c.year ? ` ${c.year}` : ""})`).join("; ")}. Awards: ${awards.map((a) => `${a.name} ${a.year} at ${a.org}`).join("; ")}. Competitive programming: ${codingProfiles.map((p) => `${p.name} ${p.stat} — ${p.detail}`).join("; ")}.`,
  });
  for (const f of faq) chunks.push({ id: `faq-${f.q}`, title: f.q, text: `${f.q} ${f.a}` });
  return chunks;
}

const STOP = new Set(
  "a an and are as at be by do does for from has have he him his how i in is it its me my of on or tell that the this to was what when where which who why with you your about can did vivek kumar srivastava build built building know knows make made use used done any some there".split(" "),
);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/\.$/, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Small BM25 retriever. The corpus is tiny, so this beats a vector DB on cost and latency. */
export function retrieve(query: string, k = 5): Chunk[] {
  const chunks = buildChunks();
  const docs = chunks.map((c) => tokenize(`${c.title} ${c.text}`));
  const avg = docs.reduce((n, d) => n + d.length, 0) / docs.length;
  const q = tokenize(query);
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);
  const k1 = 1.4;
  const b = 0.5;
  const scored = docs.map((d, i) => {
    let score = 0;
    for (const t of q) {
      const f = d.filter((x) => x === t || (t.length > 3 && x.startsWith(t))).length;
      if (!f) continue;
      const idf = Math.log(1 + (docs.length - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.length) / avg)));
    }
    return { chunk: chunks[i], score };
  });
  const ranked = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  // Drop weak matches so a broad corpus doesn't pad the context with noise.
  const floor = (ranked[0]?.score ?? 0) * 0.4;
  const top = ranked.filter((s) => s.score >= floor).slice(0, k).map((s) => s.chunk);
  // Always keep the summary in context so broad questions get a sensible answer.
  if (!top.some((c) => c.id === "summary")) top.unshift(chunks[0]);
  return top.slice(0, k);
}

const OVERVIEW = /\b(summary|overview|about|introduce|who is|tell me|30.second|developer|candidate|profile)\b/i;

/**
 * Extractive answer with no LLM: picks the sentences that best match the
 * question from the retrieved chunks. Used on the static (GitHub Pages) build
 * and as a fallback on the server. It can only quote the profile, so it never
 * invents anything.
 */
export function localAnswer(question: string, chunks: Chunk[]) {
  const q = new Set(tokenize(question));
  const relevant = chunks.filter((c) => c.id !== "summary");

  // Broad "tell me about him" questions get a crafted overview.
  if (!relevant.length || (OVERVIEW.test(question) && q.size <= 3)) {
    return [
      `**${person.name}** — ${person.role}.`,
      person.positioning,
      `Highlights: ${metrics.slice(0, 4).map((m) => `**${m.value}** ${m.label}`).join(" · ")}.`,
      `Most recently ${experience[0].role} at ${experience[0].company}; before that Concentrix Catalyst (T-Mobile IAM platform) and BridgeNext.`,
      `${person.availability}.`,
    ].join("\n\n");
  }

  // FAQ matches already hold a complete, reviewed answer: return it whole.
  const faqHit = relevant[0]?.id.startsWith("faq-") ? faq.find((f) => relevant[0].title === f.q) : undefined;
  if (faqHit) return `${faqHit.a}

Anything else? Email ${person.email}.`;

  type S = { text: string; title: string; score: number; hits: number; order: number };
  const sentences: S[] = [];
  relevant.forEach((c, ci) => {
    c.text
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .filter((t) => t.length > 25 && !t.trim().endsWith("?"))
      .forEach((text, si) => {
        const toks = tokenize(text);
        const hits = toks.filter((t) => q.has(t) || [...q].some((w) => w.length > 3 && t.startsWith(w))).length;
        // Earlier chunks are better matches; small boost keeps their sentences first.
        sentences.push({ text, title: c.title, score: hits + (relevant.length - ci) * 0.15, hits, order: ci * 100 + si });
      });
  });
  const best = sentences
    .filter((s) => s.hits >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .sort((a, b) => a.order - b.order);
  const picked = best.length ? best : sentences.sort((a, b) => a.order - b.order).slice(0, 3);

  return [
    ...picked.map((s) => `• ${s.text}`),
    `
Anything else? Email ${person.email}.`,
  ].join("\n");
}
