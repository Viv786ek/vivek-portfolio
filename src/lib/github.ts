import { person } from "@/data/profile";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
};

export type GitHubStats = {
  ok: boolean;
  avatar: string;
  publicRepos: number;
  followers: number;
  since: string;
  totalStars: number;
  languages: { name: string; count: number }[];
  topRepos: Repo[];
  recent: Repo[];
  contributions: { total: number; days: { date: string; count: number; level: number }[] };
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const REVALIDATE = 60 * 60 * 6; // refresh every 6 hours (ISR)

async function getJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

export async function getGitHubStats(): Promise<GitHubStats> {
  const user = person.githubUsername;
  const [profile, repos, contrib] = await Promise.all([
    getJSON<{ avatar_url: string; public_repos: number; followers: number; created_at: string }>(
      `https://api.github.com/users/${user}`,
    ),
    getJSON<ApiRepo[]>(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    getJSON<{ total: Record<string, number>; contributions: { date: string; count: number; level: number }[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
  ]);

  const own = (repos ?? []).filter((r) => !r.fork);
  const toRepo = (r: ApiRepo): Repo => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    pushedAt: r.pushed_at,
  });
  const langCount = new Map<string, number>();
  for (const r of own) if (r.language) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);

  const days = contrib?.contributions ?? [];
  return {
    ok: Boolean(profile && repos),
    avatar: profile?.avatar_url ?? "",
    publicRepos: profile?.public_repos ?? 160,
    followers: profile?.followers ?? 0,
    since: profile?.created_at?.slice(0, 4) ?? "2018",
    totalStars: (repos ?? []).reduce((n, r) => n + r.stargazers_count, 0),
    languages: [...langCount.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6),
    topRepos: [...own].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6).map(toRepo),
    recent: own.slice(0, 5).map(toRepo),
    contributions: {
      total: days.reduce((n, d) => n + d.count, 0),
      days: days.slice(-371),
    },
  };
}
