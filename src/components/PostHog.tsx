"use client";

import { useEffect } from "react";

type PH = { capture: (event: string, props?: Record<string, unknown>) => void };
let client: PH | null = null;

/**
 * Loads PostHog only when NEXT_PUBLIC_POSTHOG_KEY is set, lazily and after the
 * page is idle, so it ships in its own chunk and never affects Lighthouse.
 */
export function PostHog() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    const load = () =>
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
          person_profiles: "identified_only",
        });
        client = posthog;
      });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    if (idle) idle(load);
    else setTimeout(load, 2000);
  }, []);
  return null;
}

/** Fire-and-forget analytics event; no-ops when PostHog isn't configured. */
export function track(event: string, props?: Record<string, unknown>) {
  try {
    client?.capture(event, props);
  } catch {
    /* analytics must never break the UI */
  }
}
