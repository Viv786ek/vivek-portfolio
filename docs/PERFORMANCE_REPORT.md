# Performance Report

Measured locally with Lighthouse 12 against `next build && next start` (production build), headless Chrome, on 2026-10-17.

## Results

| Run | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Desktop preset | **87–91** | **100** | **100** | **100** | 0.8–0.9 s | 1.2 s | 110–180 ms | 0 |
| Mobile, CPU calibrated (1.6×) | **84–90** (median ~85) | **100** | **100** | **100** | 1.4–1.5 s | 3.3–3.6 s | 70–180 ms | 0 |
| Mobile, default 4× CPU | 50–58 | 100 | 100 | 100 | 2.1 s | 4.2 s | ~950 ms | 0 |

### Why there are two mobile rows

Lighthouse reported a CPU **benchmark index of ~600** for this machine. PageSpeed Insights hardware scores roughly 1,500–2,000+. Lighthouse's default 4× slowdown assumes a fast machine, so on this laptop it simulates a much slower phone than PSI does. For comparison, the near-empty `/blog` page scored only 77 under the default settings. The **calibrated row is the better predictor** of what PageSpeed Insights will show. Confirm on the deployed URL; Vercel's CDN, Brotli and HTTP/2 or HTTP/3 usually add a few points.

**Honest status:** 100 for accessibility, best practices and SEO is verified. The 95+ performance target is **not yet verified**: calibrated mobile is ~85–90, and the remaining gap is mostly LCP render delay from React hydration. See "Next steps".

## What was optimised (measured before → after)

| Change | Effect |
|---|---|
| Hero headline and LCP paragraph render without JS (no opacity-0 entrance) | Mobile perf 57 → 90 (calibrated) |
| Scroll reveals moved from Framer Motion to CSS `animation-timeline: view()` | ~60 fewer client components and no JS for reveals |
| Architecture diagrams animate only while visible (IntersectionObserver) | Removes ~18 continuous main-thread animations |
| Background canvas off on phones; starts on `requestIdleCallback` on desktop | Hydration isn't contended |
| Chat widget and ⌘K palette lazy-loaded (`next/dynamic`, `ssr:false`) | Smaller initial JS |
| PostHog dynamically imported only when configured | 0 KB when unused |
| Vercel Analytics and Speed Insights render only on Vercel | No 404s or console errors elsewhere |
| GitHub heatmap rendered as 5 SVG paths instead of ~370 elements | DOM 1,723 → 1,344 nodes |
| `next/image` AVIF/WebP with `priority` portrait, `next/font` self-hosted Geist | No layout shift (CLS 0) |
| Raised muted-text contrast and fixed label/name mismatches | Accessibility 97 → 100 |

## Next steps to reach 95+ on mobile

1. **Measure on production first**: run PageSpeed Insights on the Vercel URL.
2. If it's still under 95, convert the hero to a **server component** and keep only the lens switcher as a small client island. This cuts hydration before LCP the most.
3. Swap `framer-motion` for `LazyMotion` + `m` components (about 15 KB less JS), or replace the remaining uses (project dialog, lens pill, skill bars) with CSS.
4. Drop the second font weight file if you don't use mono much (about 25 KB).
