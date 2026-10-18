/**
 * Single source of truth for everything on the site: sections, the generated
 * resume, JSON-LD, the terminal, and the AI assistant's knowledge base all
 * read from here. Edit this file to update the portfolio.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://viveksrivastavasde.github.io",
  name: "Vivek Kumar Srivastava",
  shortName: "Vivek Srivastava",
  title: "Vivek Kumar Srivastava — AI Engineer & Full-Stack Engineer",
  description:
    "AI Engineer and Senior Full-Stack Engineer with 5+ years shipping production GenAI (RAG, LangGraph agents, LLM automation) and high-scale platforms serving 1M+ users. Open to roles in Europe, the UK, US, UAE and remote.",
  keywords: [
    "AI Engineer",
    "Generative AI Engineer",
    "GenAI Engineer",
    "LLM Engineer",
    "Full Stack Developer",
    "Full Stack Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "Backend Developer",
    "Node.js Developer",
    "Python FastAPI",
    "RAG",
    "LangChain",
    "LangGraph",
    "AI Agents",
    "Vivek Kumar Srivastava",
  ],
};

export const person = {
  name: "Vivek Kumar Srivastava",
  firstName: "Vivek",
  role: "AI Engineer · Full-Stack Engineer",
  headline: "I build AI products that survive production.",
  positioning:
    "Building production-grade AI systems and the full-stack platforms they live in — from RAG pipelines and LLM agents to APIs and interfaces used by over a million people.",
  location: "India",
  availability: "Open to relocation & remote — Switzerland, Germany, Netherlands, Luxembourg, UK, US, UAE",
  email: "vivekkumarsrivastava877@gmail.com",
  photo: "/vivek.png",
  resumePdf: "/Vivek_Kumar_Srivastava_Resume.pdf",
  languages: ["English (Professional)", "Hindi (Native)", "Arabic (Basic)"],
  socials: {
    github: "https://github.com/Viv786ek",
    linkedin: "https://www.linkedin.com/in/viveksde/",
    leetcode: "https://leetcode.com/u/Viv786ek/",
  },
  githubUsername: "Viv786ek",
  /** Permanent account ID — API lookups use it so a username change never breaks the dashboard. */
  githubId: 43187055,
};

export const metrics = [
  { value: "1M+", label: "users on platforms I've shipped" },
  { value: "40%", label: "API latency reduction" },
  { value: "35%", label: "RAG retrieval quality gain" },
  { value: "40%", label: "manual effort automated with LLMs" },
  { value: "90%+", label: "automated test coverage" },
  { value: "4", label: "engineering awards, 2022–2025" },
];

export const about = {
  story: [
    "I started as an intern at XenonStack in 2021, rebuilding React components across five large projects. The lesson that stuck: users feel milliseconds, and teams feel architecture.",
    "At BridgeNext I led a six-person team across fintech, logistics, insurance and retail clients — migrating a 40,000-line Polymer codebase to React, designing Node.js and FastAPI services, and shipping some of our earliest LLM features in 2023.",
    "At Concentrix Catalyst I owned full-stack and GenAI delivery for a telecom identity platform serving more than a million users: a production RAG system, LangGraph-orchestrated automation, and a monolith-to-microservices migration that cut latency by 40%.",
    "Today, at Enterprise Minds AI, I build enterprise GenAI applications end to end — retrieval, agents, APIs, evaluation and the UI people actually touch.",
  ],
  mission:
    "Make AI genuinely useful inside real businesses: grounded in their data, secure by default, measurable, and fast enough that nobody notices the model.",
  values: [
    {
      title: "Ship, then measure",
      body: "Every feature I own has a number attached — latency, retrieval quality, completion rate, hours saved.",
    },
    {
      title: "Production over demos",
      body: "Auth, observability, cost controls, failure modes and tests are part of the feature, not a follow-up.",
    },
    {
      title: "Ownership end to end",
      body: "From the vector index to the button label. I'm comfortable across the stack and accountable for the whole thing.",
    },
    {
      title: "Raise the team",
      body: "I've mentored 4–6 engineers at a time and set the quality gates that let teams move fast without breaking things.",
    },
  ],
};

export type Experience = {
  company: string;
  client?: string;
  role: string;
  period: string;
  start: string;
  end?: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  award?: string;
};

export const experience: Experience[] = [
  {
    company: "Enterprise Minds AI",
    role: "AI Engineer / GenAI Full-Stack Engineer",
    period: "Jul 2026 — Present",
    start: "2026-07",
    location: "India",
    summary:
      "Building enterprise Generative AI applications for business automation and knowledge intelligence.",
    highlights: [
      "Building enterprise GenAI applications with Python, FastAPI, React, LLM APIs, RAG pipelines, vector search and agent workflows.",
      "Designing backend services and secure API integrations for document ingestion, retrieval, authentication and workflow orchestration.",
      "Driving production readiness: prompt design, retrieval-quality improvements, observability, security controls and cost-aware LLM usage.",
    ],
    stack: ["Python", "FastAPI", "React", "LLM APIs", "RAG", "Vector Search", "AI Agents"],
  },
  {
    company: "Concentrix Catalyst",
    client: "T-Mobile (Telecom)",
    role: "Software Engineer II — AI Full-Stack Engineer",
    period: "Apr 2025 — Jun 2026",
    start: "2025-04",
    end: "2026-06",
    location: "Hyderabad, India",
    summary:
      "Owned full-stack and GenAI delivery for a telecom Identity & Access Management platform serving 1M+ global users.",
    highlights: [
      "Designed and deployed a production RAG system (LangChain, GPT-4, PGVector) that improved enterprise document retrieval quality by 35%.",
      "Built LangGraph-orchestrated intelligent search and classification/routing automation, cutting manual processing effort by 40%.",
      "Decomposed a monolith into Node.js/Express microservices with FastAPI integrations, reducing API latency by 40%.",
      "Re-engineered authentication journeys in Angular 17 and React 18, lifting task completion by 25% on a mission-critical flow.",
      "Moved synchronous workloads onto RabbitMQ event-driven services for independent horizontal scaling at peak traffic.",
      "Automated deployments on AWS Lambda, S3 and Docker with GitLab CI/CD and SonarQube, cutting deployment effort by 30%.",
      "Mentored 4–6 engineers on TypeScript, LangChain patterns, Playwright and clean architecture; reached 90%+ automated coverage.",
    ],
    stack: ["LangChain", "LangGraph", "OpenAI GPT-4", "PGVector", "React 18", "Angular 17", "Node.js", "FastAPI", "RabbitMQ", "AWS", "Docker"],
    award: "Excellence Award 2025",
  },
  {
    company: "BridgeNext",
    role: "Software Development Engineer — Full-Stack & GenAI",
    period: "Sep 2021 — Mar 2025",
    start: "2021-09",
    end: "2025-03",
    location: "Pune, India",
    summary:
      "Lead engineer for a 6-person team delivering MEAN/MERN platforms and early GenAI features for fintech, logistics, insurance and retail clients.",
    highlights: [
      "Shipped early LLM search and workflow automation with LangChain and OpenAI, improving content relevance by 40%.",
      "Improved frontend performance by 30% across React and Angular apps serving 100K+ concurrent users.",
      "Designed Node.js and FastAPI services on PostgreSQL/MongoDB, cutting P95 response times by 20%.",
      "Led a 40,000+ LOC Polymer → React migration with OpenAPI contracts and reusable frontend architecture.",
      "Built real-time logistics tracking and inventory dashboards on WebSockets, plus payment and notification adapters.",
      "Introduced TDD, OWASP ZAP and SonarQube quality gates; Playwright + Jest suites at 90%+ coverage; code-quality scores +12%.",
    ],
    stack: ["React", "Angular", "Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "LangChain", "WebSockets", "Playwright"],
    award: "Excellence Award 2024 · Spot Awards 2022 & 2023",
  },
  {
    company: "XenonStack",
    role: "Software Development Engineer Intern",
    period: "May 2021 — Aug 2021",
    start: "2021-05",
    end: "2021-08",
    location: "Remote",
    summary: "Frontend performance and API integration across five large-scale React/Angular projects.",
    highlights: [
      "Rebuilt React UI components across five projects, cutting load time by 20% and lifting engagement by 30%.",
      "Integrated REST APIs and optimised asset delivery with code-splitting and lazy loading, improving Core Web Vitals.",
    ],
    stack: ["React", "Angular", "Webpack", "REST"],
  },
];

export type SkillGroup = { name: string; key: Lens | "core"; skills: { name: string; level: number }[] };
export type Lens = "ai" | "fullstack" | "backend" | "frontend";

export const lenses: { key: Lens; label: string; pitch: string }[] = [
  {
    key: "ai",
    label: "AI Engineer",
    pitch: "Production RAG, LangGraph agents and LLM automation — measured, secured and cost-aware.",
  },
  {
    key: "fullstack",
    label: "Full-Stack Engineer",
    pitch: "React, Angular and Next.js on the front; Node.js and FastAPI behind it; AWS underneath.",
  },
  {
    key: "backend",
    label: "Backend Engineer",
    pitch: "Microservices, event-driven systems and APIs tuned for latency, security and scale.",
  },
  {
    key: "frontend",
    label: "Frontend Engineer",
    pitch: "Fast, accessible interfaces for 1M+ users — performance budgets, design systems, tests.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Generative AI & LLMs",
    key: "ai",
    skills: [
      { name: "RAG pipelines", level: 95 },
      { name: "LangChain", level: 92 },
      { name: "LangGraph / agents", level: 88 },
      { name: "Prompt engineering", level: 92 },
      { name: "OpenAI & Claude APIs", level: 90 },
      { name: "Vector search (PGVector, FAISS)", level: 88 },
      { name: "MCP & tool use", level: 78 },
      { name: "LLM evaluation & cost control", level: 80 },
    ],
  },
  {
    name: "Backend & APIs",
    key: "backend",
    skills: [
      { name: "Node.js / Express", level: 93 },
      { name: "Python / FastAPI", level: 88 },
      { name: "REST & GraphQL", level: 92 },
      { name: "Microservices", level: 88 },
      { name: "RabbitMQ / event-driven", level: 82 },
      { name: "OAuth 2.0 / OIDC / JWT", level: 88 },
      { name: "WebSockets", level: 84 },
    ],
  },
  {
    name: "Frontend",
    key: "frontend",
    skills: [
      { name: "React 18/19", level: 95 },
      { name: "TypeScript", level: 94 },
      { name: "Angular 12–18 (RxJS, NgRx)", level: 93 },
      { name: "Next.js", level: 88 },
      { name: "Redux Toolkit", level: 88 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Web performance & WCAG 2.1", level: 88 },
    ],
  },
  {
    name: "Data, Cloud & DevOps",
    key: "fullstack",
    skills: [
      { name: "PostgreSQL / PGVector", level: 88 },
      { name: "MongoDB", level: 86 },
      { name: "Redis", level: 82 },
      { name: "AWS (Lambda, S3, EC2, CloudFront)", level: 84 },
      { name: "Docker & Kubernetes", level: 80 },
      { name: "CI/CD (GitLab, GitHub Actions)", level: 86 },
      { name: "Observability (OpenTelemetry, Splunk)", level: 76 },
    ],
  },
  {
    name: "Quality & Practice",
    key: "core",
    skills: [
      { name: "Playwright / Jest / TDD", level: 90 },
      { name: "System design", level: 86 },
      { name: "Secure coding (OWASP)", level: 84 },
      { name: "Mentoring & code review", level: 88 },
      { name: "DSA (C++, TypeScript)", level: 86 },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "ai" | "platform" | "frontend";
  lens: Lens[];
  problem: string;
  solution: string;
  architecture: { nodes: string[]; caption: string };
  challenges: string[];
  stack: string[];
  impact: string[];
  github?: string;
  live?: string;
  confidential?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "enterprise-rag",
    title: "Enterprise RAG Knowledge Assistant",
    tagline: "Grounded answers over enterprise knowledge for a 1M-user telecom platform.",
    category: "ai",
    lens: ["ai", "backend"],
    problem:
      "Support and operations teams lost hours searching fragmented runbooks, policies and tickets. Keyword search missed intent, and wrong answers on an identity platform carry real risk.",
    solution:
      "A production retrieval-augmented generation system: document ingestion and chunking, OpenAI embeddings in PGVector, hybrid semantic retrieval, and GPT-4 answers grounded in cited sources — exposed through a streaming chat UI.",
    architecture: {
      nodes: ["Docs & tickets", "Chunk + embed", "PGVector", "Retriever", "GPT-4", "Streaming UI"],
      caption: "Ingest → embed → retrieve → generate with citations → stream to the user.",
    },
    challenges: [
      "Chunking heterogeneous documents without losing context across sections.",
      "Keeping answers grounded — refusing when retrieval confidence was low instead of guessing.",
      "Securing retrieval so results respect the caller's access level on an IAM platform.",
    ],
    stack: ["LangChain", "OpenAI GPT-4", "PGVector", "Node.js", "FastAPI", "PostgreSQL", "Redis", "AWS Lambda"],
    impact: ["+35% document retrieval quality", "Answers in seconds instead of manual searches", "Excellence Award 2025"],
    confidential: true,
    featured: true,
  },
  {
    slug: "langgraph-automation",
    title: "LangGraph Workflow Automation",
    tagline: "Multi-step LLM agents that classify, route and resolve operational work.",
    category: "ai",
    lens: ["ai", "backend"],
    problem:
      "Repetitive classification and routing of operational requests consumed a large share of team capacity and introduced inconsistent decisions.",
    solution:
      "LangGraph-orchestrated agents with explicit state, tool selection and human-in-the-loop checkpoints that classify incoming work, enrich it with retrieved context and route it to the right queue.",
    architecture: {
      nodes: ["Request", "Classifier node", "Retrieve context", "Tool calls", "Review gate", "Queue / action"],
      caption: "A stateful graph — each node is observable, testable and replaceable.",
    },
    challenges: [
      "Making agent behaviour deterministic enough for operations teams to trust.",
      "Designing fallbacks and confidence thresholds for low-certainty cases.",
      "Tracing multi-step runs end to end for debugging and cost control.",
    ],
    stack: ["LangGraph", "LangChain", "OpenAI", "Python", "FastAPI", "RabbitMQ", "AWS"],
    impact: ["−40% manual processing effort", "Consistent routing decisions", "Auditable agent traces"],
    confidential: true,
    featured: true,
  },
  {
    slug: "iam-microservices",
    title: "IAM Platform: Monolith → Event-Driven Microservices",
    tagline: "Cutting latency 40% on an identity platform serving 1M+ users.",
    category: "platform",
    lens: ["backend", "fullstack"],
    problem:
      "A monolithic identity backend limited downstream services: slow REST/GraphQL responses, synchronous processing that capped throughput at peak, and risky deployments.",
    solution:
      "Decomposed the monolith into Node.js/Express microservices with FastAPI integrations, moved async work onto RabbitMQ, enforced JWT/OAuth 2.0/OIDC, and automated delivery with Docker and GitLab CI/CD.",
    architecture: {
      nodes: ["Angular / React", "API gateway", "Auth (OIDC)", "Node services", "RabbitMQ", "Workers"],
      caption: "Synchronous edges stay thin; heavy work flows through queues and scales independently.",
    },
    challenges: [
      "Migrating incrementally with zero downtime on a mission-critical login path.",
      "Choosing service boundaries that wouldn't create a distributed monolith.",
      "Keeping auth consistent across frontend, gateway and services.",
    ],
    stack: ["Node.js", "Express", "FastAPI", "GraphQL", "RabbitMQ", "OAuth 2.0 / OIDC", "Docker", "AWS", "GitLab CI"],
    impact: ["−40% API latency", "+25% auth task completion", "−30% deployment effort", "99.9% availability target"],
    confidential: true,
    featured: true,
  },
  {
    slug: "ai-fitness",
    title: "AI Personalised Workout Planner",
    tagline: "GPT-powered plans generated in seconds instead of days.",
    category: "ai",
    lens: ["ai", "fullstack", "frontend"],
    problem:
      "Personalised fitness plans were produced manually by coaches, taking 2–3 days per user and limiting how many people the product could serve.",
    solution:
      "A prompt-chained recommendation engine on the OpenAI API that turns a user's goals, constraints and history into a structured plan, served from a React/TypeScript app on AWS.",
    architecture: {
      nodes: ["React app", "Node API", "Prompt chain", "OpenAI", "PostgreSQL", "CloudFront"],
      caption: "Structured prompts produce validated JSON plans that the UI renders and stores.",
    },
    challenges: [
      "Getting consistent, structured output from the model for rendering.",
      "Keeping recommendations safe and within the user's stated constraints.",
      "Hitting a 95+ Lighthouse score with an AI-heavy UI.",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "OpenAI API", "Node.js", "PostgreSQL", "AWS Lambda", "CloudFront"],
    impact: ["Plan generation: 2–3 days → under 3 s", "+15% user retention", "95+ Lighthouse, WCAG 2.1"],
    github: "https://github.com/Viv786ek/Personalized-Workout-Plan",
    featured: true,
  },
  {
    slug: "polymer-to-react",
    title: "40K-LOC Polymer → React Migration",
    tagline: "Modernising an enterprise frontend without stopping delivery.",
    category: "frontend",
    lens: ["frontend", "fullstack"],
    problem:
      "A large enterprise app on Polymer was hard to hire for, slow to change and drifting from its backend contracts.",
    solution:
      "An incremental strangler migration to React with a reusable component architecture, OpenAPI contract testing and JSDoc documentation — test coverage maintained throughout.",
    architecture: {
      nodes: ["Polymer shell", "Bridge layer", "React modules", "Design system", "OpenAPI contracts", "CI gates"],
      caption: "Route-by-route replacement behind a shared shell, guarded by contract tests.",
    },
    challenges: [
      "Running two frameworks side by side without regressions.",
      "Sequencing the migration around active feature work.",
    ],
    stack: ["React", "Redux Toolkit", "TypeScript", "OpenAPI", "Jest", "Playwright", "Webpack"],
    impact: ["40,000+ LOC migrated", "+30% frontend performance", "+12% code-quality score"],
    confidential: true,
  },
  {
    slug: "realtime-logistics",
    title: "Real-Time Logistics & Inventory Dashboards",
    tagline: "Live tracking for enterprise logistics clients.",
    category: "platform",
    lens: ["fullstack", "backend"],
    problem: "Operations teams relied on refresh-driven dashboards and couldn't see shipments and stock change as it happened.",
    solution:
      "WebSocket-driven tracking and inventory dashboards backed by Node.js adapters for payments, notifications and document generation, secured with RBAC, JWT and PII masking.",
    architecture: {
      nodes: ["Events", "Node adapters", "WebSocket hub", "Dashboards", "RBAC", "Audit"],
      caption: "Events fan out over WebSockets; every view is filtered through role-based access.",
    },
    challenges: ["Fan-out at 100K+ concurrent users", "Masking PII without breaking analytics"],
    stack: ["Node.js", "WebSockets", "React", "Angular", "MongoDB", "PostgreSQL", "JWT", "RBAC"],
    impact: ["Live visibility for operations teams", "−20% P95 response time"],
    confidential: true,
  },
  {
    slug: "ai-image-generator",
    title: "AI Image Generator",
    tagline: "Text-to-image with the OpenAI Images API (DALL·E).",
    category: "ai",
    lens: ["ai", "fullstack"],
    problem: "An early experiment in productising generative models behind a simple, safe API.",
    solution: "A Node.js service wrapping the OpenAI image API with a lightweight frontend for prompting and previewing results.",
    architecture: {
      nodes: ["Prompt UI", "Node API", "OpenAI Images", "Result gallery"],
      caption: "Thin server keeps keys off the client and validates prompts.",
    },
    challenges: ["Keeping API keys server-side", "Handling slow generations gracefully"],
    stack: ["JavaScript", "Node.js", "Express", "OpenAI API"],
    impact: ["Early hands-on GenAI work (2023)"],
    github: "https://github.com/Viv786ek/Image-Generator",
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio — AI Recruiter Assistant",
    tagline: "A RAG assistant that answers questions about my work.",
    category: "ai",
    lens: ["ai", "fullstack", "frontend"],
    problem: "Recruiters skim. They want specific answers — visa, stack, impact — without reading three pages.",
    solution:
      "A Next.js site whose content doubles as a knowledge base: BM25 retrieval over profile chunks, grounded generation with Claude, streaming responses and a terminal interface.",
    architecture: {
      nodes: ["Profile data", "Chunker", "BM25 retriever", "Claude", "Stream", "Chat UI"],
      caption: "One data file feeds the UI, the resume, JSON-LD and the assistant.",
    },
    challenges: ["Grounding answers so the assistant never invents experience", "Keeping Lighthouse 95+ with AI features"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude API", "Vercel"],
    impact: ["Recruiters get answers in seconds", "Works without an API key via local retrieval"],
    github: "https://github.com/viveksrivastavasde/viveksrivastavasde.github.io",
    live: "https://viveksrivastavasde.github.io",
  },
];

export const caseStudies = [
  {
    slug: "rag-in-production",
    title: "Shipping RAG on a regulated identity platform",
    context: "Concentrix Catalyst · T-Mobile IAM · 1M+ users",
    question: "How do you deploy an LLM where a wrong answer is a security problem?",
    approach: [
      "Defined the quality bar first: a labelled set of real support questions with expected source documents.",
      "Tuned chunk size and overlap per document type rather than one global setting.",
      "Filtered retrieval by the caller's permissions before the model ever saw a chunk.",
      "Made the assistant say 'I don't know' below a similarity threshold, and always cite sources.",
    ],
    tradeoffs: [
      { choice: "PGVector over a managed vector DB", why: "Data stayed in the existing, already-audited Postgres; one less system to secure." },
      { choice: "Streaming responses", why: "Perceived latency matters more than total latency for support agents." },
    ],
    result: "Retrieval quality up 35%, and support teams stopped hunting through runbooks.",
  },
  {
    slug: "latency-40",
    title: "Cutting API latency by 40% without a rewrite",
    context: "Concentrix Catalyst · Node.js · FastAPI · RabbitMQ",
    question: "Where does the time actually go in a monolith that 'just feels slow'?",
    approach: [
      "Traced hot paths end to end with OpenTelemetry instead of guessing.",
      "Extracted the highest-traffic domains into Node.js services behind the existing gateway.",
      "Moved non-critical synchronous work (notifications, audits, enrichment) onto RabbitMQ.",
      "Optimised GraphQL resolvers and REST payloads that over-fetched.",
    ],
    tradeoffs: [
      { choice: "Strangler pattern over a big-bang rewrite", why: "Every step shipped value and could be rolled back." },
      { choice: "Queues for side effects only", why: "Kept the user-facing path simple and synchronous." },
    ],
    result: "40% lower API latency, independent scaling at peak, 30% less deployment effort.",
  },
  {
    slug: "agents-people-trust",
    title: "Designing LLM agents operations teams trust",
    context: "LangGraph · classification & routing",
    question: "How do you get from an impressive demo to automation people rely on daily?",
    approach: [
      "Modelled the workflow as an explicit LangGraph state machine, not a free-running agent.",
      "Gave each node a single responsibility and its own tests.",
      "Added confidence thresholds with a human-review path for uncertain cases.",
      "Logged every step so any decision could be explained after the fact.",
    ],
    tradeoffs: [
      { choice: "Constrained graph over autonomous agent", why: "Predictability beat flexibility for operational work." },
      { choice: "Human-in-the-loop for low confidence", why: "Trust grows faster when the system knows its limits." },
    ],
    result: "40% less manual processing, with decisions the team could audit.",
  },
];

export const systemDesigns = [
  {
    title: "Retrieval-Augmented Generation",
    nodes: ["Ingest", "Chunk", "Embed", "Vector DB", "Retrieve", "Rerank", "LLM", "Cite"],
  },
  {
    title: "Event-driven microservices",
    nodes: ["Client", "Gateway", "Auth", "Service", "Queue", "Worker", "DB", "Observability"],
  },
  {
    title: "Agentic workflow",
    nodes: ["Input", "Plan", "Tool call", "Observe", "Decide", "Human gate", "Act", "Trace"],
  },
  {
    title: "Real-time dashboard",
    nodes: ["Events", "Stream", "WS hub", "Fan-out", "Client cache", "UI", "RBAC", "Audit"],
  },
];

export const certifications = [
  { name: "AI Prompt Engineering for Developers", issuer: "DeepLearning.AI", year: "2024" },
  { name: "Full Stack MERN & Product Management", issuer: "Pesto Tech", year: "2024" },
  { name: "AWS Essential Training for Developers", issuer: "LinkedIn Learning", year: "" },
  { name: "Advanced Angular (v12–v18, RxJS, NgRx)", issuer: "Udemy", year: "2022" },
];

export const awards = [
  { name: "Excellence Award", org: "Concentrix Catalyst", year: "2025", note: "GenAI integration and performance on a 1M+ user platform" },
  { name: "Excellence Award", org: "BridgeNext", year: "2024", note: "Full-stack and AI delivery across enterprise clients" },
  { name: "Spot Award", org: "BridgeNext", year: "2023", note: "High-impact engineering delivery" },
  { name: "Spot Award", org: "BridgeNext", year: "2022", note: "High-impact engineering delivery" },
];

export const education = {
  degree: "B.Tech, Information Technology",
  school: "Netaji Subhash Engineering College, Kolkata",
  period: "2017 — 2021",
  grade: "CGPA 8.23 / 10 · First Class",
};

export const codingProfiles = [
  { name: "LeetCode", url: "https://leetcode.com/u/Viv786ek/", stat: "3★", detail: "Daily-challenge streaks across 2020–2024" },
  { name: "GeeksforGeeks", url: "", stat: "<1800", detail: "Global rank; Problem-of-the-Day archives on GitHub" },
  { name: "Problems solved", url: "", stat: "250+", detail: "C++ and TypeScript" },
  { name: "GitHub", url: "https://github.com/Viv786ek", stat: "160+", detail: "Public repositories since 2018" },
];

/** Add real quotes here (with permission). The section stays hidden while empty. */
export const testimonials: { quote: string; name: string; title: string; relation: string }[] = [];

export const faq = [
  {
    q: "Is Vivek open to relocation?",
    a: "Yes — open to relocating to Switzerland, Germany, the Netherlands, Luxembourg, the UK, the US or the UAE, and to fully remote roles. Vivek is an Indian national and would need employer visa sponsorship where applicable.",
  },
  {
    q: "What roles is Vivek targeting?",
    a: "AI Engineer, GenAI / LLM Engineer, Senior Full-Stack Engineer and Backend Engineer roles — ideally where AI features ship to real users.",
  },
  {
    q: "How much experience does Vivek have?",
    a: "5+ years of professional experience since 2021 (plus a 2021 internship), across telecom, fintech, logistics, insurance and retail.",
  },
];
