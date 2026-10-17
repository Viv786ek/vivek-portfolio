import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on production AI, RAG, LLM agents, system design and full-stack engineering by Vivek Kumar Srivastava.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <p className="eyebrow">Writing</p>
        <h1 className="text-gradient mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Notes from production.</h1>
        <p className="mt-4 text-muted">What I learn shipping AI and full-stack systems — written for engineers and the people who hire them.</p>
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-6">
                <p className="font-mono text-xs text-faint">
                  {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {p.readingMinutes} min read
                  {p.draft ? " · draft" : ""}
                </p>
                <h2 className="mt-2 text-xl font-medium group-hover:text-ember">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
