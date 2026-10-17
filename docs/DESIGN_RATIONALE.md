# Design Rationale

## The idea

Most developer portfolios compete on decoration. This one competes on **evidence**: every surface shows a number, a decision or a working system. The visual language says "engineering-grade" quietly, the way Linear, Vercel and Anthropic do. Restraint signals confidence.

## Visual system

| Decision | Why |
|---|---|
| **Near-black canvas (#08080A) with one warm accent, "ember" (#FF7A45)** | Blue and purple gradients are the default for AI products. A warm signal colour is distinctive and memorable, and maps to "production heat". A cool cyan appears only in diagrams as a data colour. |
| **Geist Sans + Geist Mono** | Engineered, neutral and highly legible. Mono is used for metadata (dates, indices, eyebrows) to suggest a technical document. |
| **Tight negative tracking on display type** | The premium editorial feel of Stripe and Apple headlines. |
| **Numbered sections (01 / About …)** | Reads like a technical spec and helps recruiters orient on a long page. |
| **Hairline borders and translucent cards, no heavy shadows** | Depth comes from layering, not decoration. |
| **Engineering-paper grid plus a live retrieval graph** | The hero background is an interactive node graph that lights up toward the cursor, a quiet RAG metaphor. It's canvas, not Three.js: about 2 KB vs 150 KB+, so the hero stays fast. |

## Interaction design: what makes it memorable

1. **"Hiring for" lens.** The recruiter tells the site what they need, and the site rearranges itself. It's a product-thinking signal, not just a visual one.
2. **The AI assistant is the portfolio piece.** Instead of claiming RAG skills, the site *is* a RAG system the visitor can try in two seconds, with cited sources.
3. **Case files, not cards.** Projects open into problem → solution → architecture → challenges → impact, which is how senior engineers think.
4. **Terminal plus ⌘K.** Delight for engineers and CTOs, and an easter egg (`sudo`, `hire`).
5. **Animated architecture diagrams** that run only while visible, with hoverable stages.

## Stack choices vs the brief

| Brief | Decision |
|---|---|
| Next.js, React, TS, Tailwind | Next 16 App Router, React 19, TS strict, Tailwind v4 |
| Framer Motion / GSAP | Framer Motion for state transitions only. Scroll reveals use native CSS scroll-driven animations. GSAP was skipped as redundant weight. |
| Three.js / R3F | **Deliberately skipped**: it would cost the Lighthouse target. The canvas graph gives the same wow at about 1% of the weight. Roadmap item if wanted on desktop only. |
| OpenAI / Claude / RAG / vector search | Claude (primary), OpenAI (fallback), BM25 retrieval over chunked profile data. A vector DB is overkill for about 30 chunks; the roadmap covers when to add one. |
| Resend, PostHog, Vercel Analytics | Integrated, all optional, all lazy |

## Accessibility

WCAG 2.1 AA contrast; visible focus rings in the accent colour; skip link; `prefers-reduced-motion` honoured everywhere (canvas renders one static frame, CSS animations collapse); dialogs close on Esc; aria-live for chat and terminal output. Lighthouse accessibility: 100.
