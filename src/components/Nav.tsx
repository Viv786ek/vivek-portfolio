"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { openChat } from "./ui";
import { Sparkle } from "./Icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#ai", label: "AI" },
  { href: "/#github", label: "GitHub" },
  { href: "/blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <Link href="/" className="group flex items-center gap-2.5 font-medium tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-fg font-mono text-[13px] font-bold text-bg transition-transform group-hover:rotate-6">
            V
          </span>
          <span className="hidden sm:inline">Vivek Kumar Srivastava</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="hidden items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
            aria-label="⌘K — open command palette"
          >
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </button>
          <button
            onClick={() => openChat()}
            className="flex items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            <Sparkle className="h-3.5 w-3.5" /> Ask my AI
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-line md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="flex flex-col gap-1">
              <span className={`h-px w-4 bg-fg transition ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-fg transition ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-muted hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
