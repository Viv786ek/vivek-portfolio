---
title: "RAG in production: what changed when the users were real"
description: "Lessons from shipping retrieval-augmented generation on a telecom identity platform with 1M+ users."
date: "2026-09-14"
tags: ["RAG", "LLM", "PGVector", "LangChain"]
---

A retrieval-augmented generation demo takes an afternoon. Shipping one that support and operations teams rely on every day took a lot longer — and almost none of that time went into the model.

This is what I learned building a production RAG system on a telecom Identity & Access Management platform serving more than a million users.

## 1. Define "good" before writing a prompt

The first thing we built wasn't a pipeline. It was a list of real questions people had asked, each paired with the documents that actually answered them. That list became our regression suite. Every change — chunk size, embedding model, prompt wording — was measured against it.

Without it, every tweak "feels better". With it, we could say retrieval quality improved by **35%** and know it was true.

## 2. Chunking is a product decision

One global chunk size is the most common mistake I see. Runbooks, policy documents and ticket histories have completely different shapes:

- **Runbooks** want chunks aligned to steps, with the section heading carried into every chunk.
- **Policies** need larger chunks so conditions and exceptions stay together.
- **Tickets** are short; the useful signal is the resolution, not the conversation.

## 3. Permissions belong *before* the model

On an identity platform, the worst failure isn't a wrong answer — it's a correct answer to someone who shouldn't see it. We filtered retrieval by the caller's access level so restricted chunks never reached the prompt. Prompt-level instructions like "don't reveal X" are not a security boundary.

## 4. Teach it to say "I don't know"

Below a similarity threshold, the assistant says it doesn't have a confident answer and points to the right team. Every answer cites its sources. Trust grew faster from honest refusals than from clever answers.

## 5. Boring infrastructure wins

We used **PGVector** inside the Postgres we already ran, rather than adding a managed vector database. One less system to secure, back up and explain to auditors. At our scale the latency was more than good enough.

## The takeaway

The model is the easy part. Evaluation, chunking strategy, access control and graceful failure are what turn RAG from a demo into a tool people trust.
