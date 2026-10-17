import { codingProfiles, person } from "@/data/profile";
import { getGitHubStats } from "@/lib/github";
import { Section } from "./Section";
import { Reveal, SectionHeader } from "./Reveal";
import { ArrowUpRight, GitHubIcon, Star } from "./Icons";

const levelFill = ["rgba(255,255,255,0.05)", "rgba(255,122,69,0.25)", "rgba(255,122,69,0.45)", "rgba(255,122,69,0.7)", "#ff7a45"];

/** One SVG path per intensity level (5 nodes instead of ~370) keeps the DOM light. */
function Heatmap({ days, total }: { days: { date: string; level: number }[]; total: number }) {
  const cell = 11;
  const gap = 3;
  const offset = days.length ? new Date(days[0].date).getUTCDay() : 0;
  const paths = levelFill.map(() => "");
  days.forEach((d, i) => {
    const idx = i + offset;
    const x = Math.floor(idx / 7) * (cell + gap);
    const y = (idx % 7) * (cell + gap);
    const lvl = Math.min(4, Math.max(0, d.level));
    paths[lvl] += `M${x + 2} ${y}h${cell - 4}a2 2 0 0 1 2 2v${cell - 4}a2 2 0 0 1-2 2h-${cell - 4}a2 2 0 0 1-2-2v-${cell - 4}a2 2 0 0 1 2-2z`;
  });
  const weeks = Math.ceil((days.length + offset) / 7);
  return (
    <svg width={weeks * (cell + gap)} height={7 * (cell + gap)} role="img" aria-label={`${total} contributions in the last year`}>
      {paths.map((d, i) => (d ? <path key={i} d={d} fill={levelFill[i]} /> : null))}
    </svg>
  );
}
const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
};

/** GitHub intelligence dashboard — server-rendered, revalidated every 6 hours. */
export async function GitHubSection() {
  const gh = await getGitHubStats();
  const maxLang = Math.max(1, ...gh.languages.map((l) => l.count));

  const stats = [
    { label: "Public repositories", value: gh.publicRepos },
    { label: "Stars earned", value: gh.totalStars },
    { label: "Contributions (12 mo)", value: gh.contributions.total || "—" },
    { label: "On GitHub since", value: gh.since },
  ];

  return (
    <Section id="github">
      <SectionHeader
        index="07"
        eyebrow="GitHub intelligence"
        title="Consistency, compounding."
        lede="Live from the GitHub API — 160+ public repos since 2018, years of daily DSA practice, Hacktoberfest contributions and GenAI experiments."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="card p-5">
              <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {gh.contributions.days.length > 0 && (
        <Reveal className="card mt-4 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Contribution activity</p>
            <p className="font-mono text-xs text-faint">last 12 months</p>
          </div>
          {/* dir=rtl starts the scroll at the most recent weeks on narrow screens */}
          <div className="overflow-x-auto pb-1" dir="rtl">
            <Heatmap days={gh.contributions.days} total={gh.contributions.total} />
          </div>
        </Reveal>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="card p-6">
          <p className="mb-5 text-sm font-medium">Languages across repositories</p>
          <ul className="space-y-4">
            {gh.languages.map((l) => (
              <li key={l.name}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: langColor[l.name] ?? "#9a9ca6" }} />
                    {l.name}
                  </span>
                  <span className="font-mono text-faint">{l.count}</span>
                </div>
                <div className="h-1 rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${(l.count / maxLang) * 100}%`, background: langColor[l.name] ?? "#9a9ca6" }} />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium">Most-starred repositories</p>
            <a href={person.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-fg">
              <GitHubIcon className="h-3.5 w-3.5" /> @{person.githubUsername}
            </a>
          </div>
          <ul className="divide-y divide-line">
            {gh.topRepos.map((r) => (
              <li key={r.name}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm group-hover:text-ember">{r.name}</p>
                    <p className="truncate text-xs text-muted">{r.description ?? r.language ?? "—"}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-muted">
                    <Star /> {r.stars}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Coding profile dashboard */}
      <div id="coding" className="mt-16">
        <Reveal className="mb-6">
          <p className="eyebrow">Coding profiles</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Algorithms, practised daily for years.</h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {codingProfiles.map((p, i) => {
            const inner = (
              <>
                <p className="eyebrow">{p.name}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{p.stat}</p>
                <p className="mt-1 text-xs text-muted">{p.detail}</p>
                {p.url && <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-faint transition group-hover:text-ember" />}
              </>
            );
            return (
              <Reveal key={p.name} delay={i * 0.05}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="card card-hover group relative block h-full p-5">{inner}</a>
                ) : (
                  <div className="card relative h-full p-5">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
