# SEO Report

**Lighthouse SEO: 100 / 100** on every page tested (`/`, `/blog`, `/resume`).

## Implemented

| Item | Where |
|---|---|
| Title template and meta description | `app/layout.tsx` (`metadata`) |
| Canonical URLs | `alternates.canonical` on every page |
| Open Graph (`profile` type; `article` type on posts) | `layout.tsx`, `blog/[slug]/page.tsx` |
| Twitter `summary_large_image` | `layout.tsx` |
| OG image (photo, headline, metrics), 1200×630 | `public/og.png` |
| JSON-LD: `Person`, `ProfilePage`, `WebSite`, `FAQPage` | `components/JsonLd.tsx` |
| JSON-LD: `BlogPosting` | `blog/[slug]/page.tsx` |
| `sitemap.xml` (home, resume, blog, posts) | `app/sitemap.ts` |
| `robots.txt` (allows all, disallows `/api/`) | `app/robots.ts` |
| RSS feed | `app/rss.xml/route.ts` |
| Web manifest and icon | `manifest.ts`, `public/icon.png` |
| Semantic HTML: one `h1` per page, ordered `h2`/`h3`, landmarks, skip link | all pages |
| Server-rendered content (no JS needed for crawlers) | App Router RSC |

## Keyword strategy

Primary keywords appear in the title, description, `keywords`, hero, JSON-LD `jobTitle`/`knowsAbout`, and the `/resume` headline:

- **AI Engineer**, **Generative AI Engineer**, **LLM Engineer**
- **Full Stack Developer / Engineer**, **Software Engineer**
- **React Developer**, **Next.js Developer**, **Angular Developer**
- **Backend Developer**, **Node.js Developer**, **Python FastAPI**
- Long tail: *RAG engineer*, *LangGraph*, *LangChain developer*, *AI engineer Germany / Switzerland / Netherlands / UAE / remote*

Name searches ("Vivek Kumar Srivastava", "Vivek Srivastava AI engineer") are covered by `Person` with `alternateName` and `sameAs` links to GitHub, LinkedIn and LeetCode, which helps Google build a knowledge panel.

## After deployment

1. The canonical URL is https://viveksrivastavasde.github.io (set in the deploy workflow). If you add a custom domain later, update `NEXT_PUBLIC_SITE_URL` there.
2. In Google Search Console, verify the domain and submit `/sitemap.xml`.
3. Run Google's Rich Results Test on `/` (Person, FAQ) and on a blog post (BlogPosting).
4. Put the portfolio URL on LinkedIn (Contact info and Featured), the GitHub profile README and bio, and every resume. These backlinks matter most for ranking a personal site.
5. Publish 1–2 posts a month on long-tail topics ("RAG permission filtering", "LangGraph human-in-the-loop"). This is the main lever for organic traffic.
6. Consider adding Bing Webmaster Tools and IndexNow.
