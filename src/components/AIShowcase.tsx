"use client";

import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Section } from "./Section";
import { openChat } from "./ui";
import { Reveal, SectionHeader } from "./Reveal";
import { Sparkle } from "./Icons";

const capabilities = [
  {
    title: "Retrieval-Augmented Generation",
    tag: "RAG",
    body: "Production RAG on PGVector and FAISS: chunking strategy per document type, hybrid retrieval, permission-aware filtering and cited answers.",
    proof: "+35% retrieval quality on a 1M-user platform",
  },
  {
    title: "Agentic workflows",
    tag: "LangGraph",
    body: "Stateful agent graphs with tool selection, confidence thresholds and human-in-the-loop gates that operations teams actually trust.",
    proof: "−40% manual processing effort",
  },
  {
    title: "LLM product engineering",
    tag: "OpenAI · Claude",
    body: "Streaming chat UIs, structured outputs, prompt chaining, fallbacks and cost-aware model routing — the parts between the API and the user.",
    proof: "Plan generation: days → under 3 s",
  },
  {
    title: "MCP & tool use",
    tag: "MCP",
    body: "Typed tool calling and tool selection inside agent workflows, and building with the Model Context Protocol to connect models to real systems safely.",
    proof: "Tool selection in production LangGraph agents",
  },
  {
    title: "Prompt engineering & evals",
    tag: "Quality",
    body: "Labelled question sets, retrieval metrics and regression checks so prompt changes are measured, not vibes-based.",
    proof: "DeepLearning.AI certified (2024)",
  },
  {
    title: "Secure, observable AI",
    tag: "Production",
    body: "OAuth 2.0/OIDC, PII masking, rate limits, OpenTelemetry tracing and spend controls built in from day one.",
    proof: "Shipped inside a regulated IAM platform",
  },
];

const prompts = [
  "What production AI systems has Vivek built?",
  "How does Vivek keep RAG answers grounded?",
  "Is Vivek open to relocating to Germany or Switzerland?",
];

export function AIShowcase() {
  return (
    <Section id="ai">
      <SectionHeader
        index="04"
        eyebrow="AI engineering"
        title={
          <>
            GenAI that ships — <span className="text-ember">not just demos.</span>
          </>
        }
        lede="I've been putting LLMs into production since 2023: first search relevance at BridgeNext, then RAG and agent automation on a telecom identity platform, now enterprise GenAI end to end."
      />

      <Reveal className="card mb-6 overflow-hidden p-4 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Reference architecture</p>
            <p className="mt-1 text-sm text-muted">The RAG pipeline pattern I&apos;ve shipped — hover a stage.</p>
          </div>
          <span className="chip"><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-lime" /> live</span>
        </div>
        <ArchitectureDiagram nodes={["Sources", "Chunk", "Embed", "PGVector", "Retrieve + ACL", "Rerank", "LLM", "Cited answer"]} />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <article className="card card-hover flex h-full flex-col p-6">
              <span className="chip w-fit border-ember/30 text-ember">{c.tag}</span>
              <h3 className="mt-4 font-medium">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.body}</p>
              <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-fg/70">{c.proof}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="card relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-ember/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <p className="eyebrow">Try it</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">This site has a RAG assistant trained on my career.</h3>
              <p className="mt-2 text-sm text-muted">BM25 retrieval over my profile, grounded generation with Claude, streamed to your screen. It refuses to invent experience.</p>
            </div>
            <div className="flex flex-col gap-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => openChat(p)}
                  className="group flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-left text-sm text-muted transition-colors hover:border-ember/50 hover:text-fg"
                >
                  <Sparkle className="h-3.5 w-3.5 text-ember" /> {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
