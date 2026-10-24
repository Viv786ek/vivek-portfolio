# Vivek Kumar Srivastava — Portfolio

**Live:** https://viveksrivastavasde.github.io

AI Engineer & Full-Stack Engineer portfolio. Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Claude API · Vercel.

**Signature features**

- **AI recruiter assistant**: a RAG chatbot grounded in the profile. It uses BM25 retrieval, Claude generation and streamed answers, and falls back to OpenAI or to keyword-based answers built from your own text when no key is set.
- **"Hiring for" lens**: recruiters pick AI / Full-Stack / Backend / Frontend, and the pitch, skill map and project order re-rank to match.
- **Project case files**: each project has problem, solution, an animated architecture diagram, challenges, stack and impact.
- **GitHub intelligence dashboard**: live repos, stars, languages and a contribution heatmap, refreshed every 6 hours.
- **Command center**: a terminal (`whoami`, `projects`, `skills ai`, `ask …`) plus a ⌘K command palette.
- **Interactive resume**: `/resume` is generated from the same data, is ATS-friendly and can be saved as PDF. The original PDF is also downloadable.
- **Markdown blog** with RSS, JSON-LD on every page, OG images generated at build time, sitemap and robots.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # add keys (all optional)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production check
```

## Editing content

**Everything lives in [`src/data/profile.ts`](src/data/profile.ts).** That includes experience, projects, case studies, skills, certifications, awards, FAQ and testimonials. The UI, the `/resume` page, JSON-LD and the AI assistant's knowledge base all read from it, so one edit updates all of them.

| To change… | Edit |
|---|---|
| Headline, positioning, socials | `person` in `profile.ts` |
| Jobs and bullets | `experience` |
| Projects (add `github` / `live` links) | `projects` |
| Testimonials (section is hidden while empty) | `testimonials` |
| Blog posts | add a `.md` file to `content/blog/` (front-matter: title, description, date, tags, draft) |
| Photo | replace `public/vivek.webp` (portrait; also regenerate `public/og.png`) |
| Resume PDF | replace `public/Vivek_Kumar_Srivastava_Resume.pdf` |
| Colours / fonts | tokens in `src/app/globals.css` (`@theme`) |

## Folder structure

```
portfolio/
├── content/blog/               Markdown posts (front-matter + body)
├── .github/workflows/deploy.yml  Build + deploy to GitHub Pages (push + daily)
├── public/                     Photo, resume PDF, og.png (social preview), icon.png
├── scripts/fix-export.mjs      Post-build fix for static-export prefetch files
├── src/
│   ├── app/
│   │   ├── layout.tsx          Fonts, metadata, JSON-LD, analytics, chat + ⌘K
│   │   ├── page.tsx            Home: all sections
│   │   ├── resume/             ATS resume generated from data (print → PDF)
│   │   ├── blog/               Index + [slug] post pages
│   │   ├── api/chat/route.api.ts     RAG assistant (server builds only)
│   │   ├── api/contact/route.api.ts  Contact form → Resend (server builds only)
│   │   ├── rss.xml/            RSS feed
│   │   └── sitemap.ts · robots.ts · manifest.ts
│   ├── components/             One file per section + shared primitives
│   ├── data/profile.ts         ← single source of truth
│   └── lib/
│       ├── knowledge.ts        Profile → chunks, BM25 retriever
│       ├── github.ts           GitHub API + contributions (ISR, 6h)
│       ├── blog.ts             Markdown loader
│       └── rateLimit.ts        Per-IP limiter for API routes
└── docs/                       Brand, SEO, performance, design, resume, roadmap
```

## Environment variables

All of them are optional, and the site works with none set.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (sitemap, OG, JSON-LD). Defaults to https://viveksrivastavasde.github.io |
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | AI assistant via Claude (default model `claude-opus-5-5`, low effort) |
| `OPENAI_API_KEY`, `OPENAI_MODEL` | Fallback provider if no Anthropic key |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form email delivery |
| `GITHUB_TOKEN` | Raises the GitHub API limit (read-only, no scopes needed) |
| `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Product analytics (lazy-loaded) |

---

## Deployment: GitHub Pages (current)

The site deploys automatically to **https://viveksrivastavasde.github.io** on every push to `main`, and rebuilds daily at 03:00 UTC so GitHub stats stay fresh ([workflow](.github/workflows/deploy.yml)).

- The build runs `npm run build:static` (`STATIC_EXPORT=1`), which writes a fully static site to `out/`.
- On Pages there's no server, so the AI assistant answers **in the browser**, choosing the most relevant sentences from your profile. It never invents anything. The contact form opens a pre-filled email.
- The repo must be named `<owner>.github.io` (here: `viveksrivastavasde.github.io`, owned by the free organization *viveksrivastavasde*) to serve at the root domain. In repo Settings → Pages, Source must be **GitHub Actions**.
- To test locally: `npm run build:static && npx serve out`.

## Alternative: Vercel (full AI with Claude)

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "Portfolio v1"
   ```
   ```bash
   gh repo create viv786ek-portfolio --public --source=. --push
   ```
2. **Import into Vercel**: go to vercel.com/new, pick the repo. The framework is auto-detected and needs no build settings.
3. **Environment variables**: in Project → Settings → Environment Variables, add the keys above. At minimum set `NEXT_PUBLIC_SITE_URL`, plus `ANTHROPIC_API_KEY` for the full AI assistant.
4. **Analytics**: in Project → Analytics, enable *Web Analytics* and *Speed Insights*. The components are already in the layout and only load on Vercel.
5. **Custom domain**: in Project → Settings → Domains, add `yourname.dev`. Point an `A` record to `76.76.21.21` (apex) or a `CNAME` to `cname.vercel-dns.com` (www). HTTPS is automatic. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.
6. **Resend**: verify your domain at resend.com, then set `CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain>`.
7. **Search Console**: add the domain at search.google.com/search-console, submit `https://yourdomain/sitemap.xml`, and request indexing for `/` and `/resume`.
8. **Verify**: run PageSpeed Insights on the live URL, the Rich Results Test (Person, FAQ, BlogPosting) and the opengraph.xyz preview.

Every push to `main` deploys to production, and pull requests get preview URLs.

### Cost and safety notes for the AI assistant

- The assistant uses `claude-opus-5-5` at `effort: "low"` and `max_tokens: 1024`, with about 6 small context chunks per question. Expect a fraction of a cent per answer.
- It is limited to 20 questions per IP every 10 minutes. The limiter is in memory; for heavy traffic, swap it for Upstash Redis.
- Set a monthly spend limit in the Anthropic Console.
- The system prompt forbids inventing facts, and server-side refusal fallback is enabled.
