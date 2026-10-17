import Link from "next/link";
import { person } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, Mail } from "./Icons";

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-medium">{person.name}</p>
          <p className="mt-1 text-xs text-muted">{person.role} · Built with Next.js, TypeScript & Claude</p>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-muted" aria-label="Footer">
          <Link href="/resume" className="hover:text-fg">Resume</Link>
          <Link href="/blog" className="hover:text-fg">Writing</Link>
          <a href="/rss.xml" className="hover:text-fg">RSS</a>
          <a href={person.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg"><GitHubIcon /></a>
          <a href={person.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fg"><LinkedInIcon /></a>
          <a href={`mailto:${person.email}`} aria-label="Email" className="hover:text-fg"><Mail /></a>
        </nav>
      </div>
      <p className="pb-8 text-center font-mono text-[11px] text-faint">© {new Date().getFullYear()} · Press ⌘K anywhere</p>
    </footer>
  );
}
