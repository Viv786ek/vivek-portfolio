"use client";

import dynamic from "next/dynamic";

// Chat and ⌘K palette load in their own chunks after hydration, off the critical path.
const ChatWidget = dynamic(() => import("./ChatWidget").then((m) => m.ChatWidget), { ssr: false });
const CommandPalette = dynamic(() => import("./CommandPalette").then((m) => m.CommandPalette), { ssr: false });

export function ClientExtras() {
  return (
    <>
      <ChatWidget />
      <CommandPalette />
    </>
  );
}
