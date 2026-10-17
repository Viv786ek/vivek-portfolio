---
title: "Cutting API latency by 40% without a rewrite"
description: "How tracing, the strangler pattern and a message queue took 40% off API latency on a 1M-user platform."
date: "2026-08-02"
tags: ["System Design", "Node.js", "Microservices", "RabbitMQ"]
---

"The API is slow" is not a problem statement. It's a symptom. Here's how we turned that symptom into a 40% latency reduction on a monolithic identity platform — without stopping feature work or attempting a big-bang rewrite.

## Measure first

We instrumented the hot paths with OpenTelemetry and looked at where time actually went. The answer was not where anyone guessed: a handful of endpoints were doing synchronous side effects — notifications, audit writes, enrichment calls — inside the request.

## Strangle, don't rewrite

We used the **strangler pattern**: put the existing gateway in front, carve out the highest-traffic domains into Node.js/Express services (with FastAPI where Python was the better fit), and route traffic over gradually. Every step shipped value on its own and could be rolled back.

## Queues for side effects

Anything the user didn't need to wait for moved onto **RabbitMQ**. The user-facing path became thin and synchronous; the heavy work happened in workers that scale independently during peak traffic.

## Fix the payloads

Some of the cheapest wins were the least glamorous: GraphQL resolvers that over-fetched, REST responses carrying fields no client used, and missing indexes.

## Security didn't get a pass

Splitting a monolith multiplies the places auth can go wrong. We standardised on JWT with OAuth 2.0 / OIDC across the gateway and services so every hop verified the same way.

## Results

- **40%** lower API latency
- Independent horizontal scaling at peak
- **30%** less deployment effort once services shipped through Docker and GitLab CI/CD

The lesson I keep relearning: most performance problems are architecture problems wearing a disguise — and tracing is how you take the disguise off.
