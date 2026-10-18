import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a fully static site into `out/` for GitHub Pages.
 * Without it, the site builds as a normal Next.js server app (e.g. Vercel)
 * with the Claude-powered /api/chat and Resend /api/contact routes.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: { NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "" },
  // API routes are named route.api.ts so they are only picked up for server builds.
  pageExtensions: isStatic ? ["tsx", "ts"] : ["tsx", "ts", "api.ts"],
  ...(isStatic
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
        },
        async headers() {
          return [{ source: "/(.*)", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
