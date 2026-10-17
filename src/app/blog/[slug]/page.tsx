import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { person, site } from "@/data/profile";
import { getPost, getPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: post.meta.title, description: post.meta.description, publishedTime: post.meta.date, authors: [person.name] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: person.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
    keywords: post.meta.tags.join(", "),
  };
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-2xl px-4 pb-24 pt-32 sm:px-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
        <Link href="/blog" className="text-sm text-muted hover:text-fg">← All writing</Link>
        <p className="mt-8 font-mono text-xs text-faint">
          {new Date(post.meta.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.meta.readingMinutes} min read
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{post.meta.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.meta.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
        <article className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
      <Footer />
    </>
  );
}
