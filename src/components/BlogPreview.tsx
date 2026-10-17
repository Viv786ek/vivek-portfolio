import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";
import { ArrowUpRight } from "./Icons";

export function BlogPreview() {
  const posts = getPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <Section id="writing">
      <SectionHeader index="09" eyebrow="Writing" title="Notes from production." />
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link href={`/blog/${p.slug}`} className="card card-hover group flex h-full flex-col p-6">
              <p className="font-mono text-xs text-faint">
                {new Date(p.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })} · {p.readingMinutes} min
              </p>
              <h3 className="mt-3 flex-1 font-medium leading-snug group-hover:text-ember">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <ArrowUpRight className="mt-5 h-4 w-4 text-faint group-hover:text-ember" />
            </Link>
          </Reveal>
        ))}
      </div>
      <Link href="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        All posts <ArrowUpRight />
      </Link>
    </Section>
  );
}
