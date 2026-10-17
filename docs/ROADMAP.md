# Future Enhancement Roadmap

## Now (before sharing widely)

- [ ] Confirm the facts flagged in `BRAND_STRATEGY.md` → "Things to reconcile".
- [ ] Review the **case studies** and **project write-ups** in `profile.ts`: the approach and trade-off details are reconstructed from your resume bullets, so correct anything that differs from what actually happened.
- [ ] Review and edit the two starter blog posts. They're drafted from your resume in your voice; make them yours.
- [ ] Decide whether the public PDF should include your phone number.
- [ ] Deploy, set `NEXT_PUBLIC_SITE_URL` and `ANTHROPIC_API_KEY`, then verify with PageSpeed Insights.
- [ ] Add 2–3 testimonials (ask former leads at Concentrix and BridgeNext; LinkedIn recommendations work).

## Next 30 days: close the open-source gap

Your strongest work is confidential. Build **1–2 public flagship repos** that mirror it:

1. **`permission-aware-rag`**: a FastAPI + PGVector RAG reference with ACL filtering, eval harness and citations. Link it from the Enterprise RAG project's `github` field.
2. **`langgraph-ops-agent`**: a human-in-the-loop routing agent with traces and confidence thresholds.
3. **An MCP server** for something you use daily (e.g. your portfolio data, so Claude Desktop can answer questions about you). It's a strong 2026 signal.

Pin these on GitHub, and add `live` links where possible.

## Later

- **Vector search upgrade**: when the knowledge base grows (blog posts, repo READMEs), switch BM25 to hybrid BM25 + embeddings (pgvector on Neon/Supabase, or Upstash Vector).
- **Assistant ingests GitHub READMEs and blog posts** automatically at build time.
- **Durable rate limiting and chat analytics** with Upstash Redis; log anonymised questions to learn what recruiters ask.
- **Coding profile live stats**: LeetCode GraphQL stats via a cached server route (add HackerRank or Codeforces handles to `codingProfiles`).
- **Localisation**: German and Arabic hero and summary for DACH and UAE recruiters.
- **3D hero (desktop only)**: a lazy-loaded React Three Fiber scene behind a feature flag, with performance budgets enforced in CI.
- **Lighthouse CI** GitHub Action failing PRs below 95 / 100 / 100 / 100.
- **Case study deep-dives** as MDX pages with interactive diagrams.
- **"Download tailored resume"**: choose a role lens and get a PDF re-ordered for it, server-rendered.
