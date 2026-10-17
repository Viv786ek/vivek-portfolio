"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Animated, interactive architecture diagram. Nodes are laid out in a snake so
 * any 4–8 step pipeline fits both phone and desktop widths; a packet travels
 * the path and hovering a node highlights it.
 */
export function ArchitectureDiagram({ nodes, accent = "#ff7a45" }: { nodes: string[]; accent?: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  // Only animate while on screen: SVG dash/motion animations run on the main thread.
  const ref = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const animate = inView && !reduce;
  const cols = Math.ceil(nodes.length / 2);
  const W = 640;
  const H = 210;
  const padX = 74;
  const gap = cols > 1 ? (W - padX * 2) / (cols - 1) : 0;
  const pts = nodes.map((_, i) => {
    const row = i < cols ? 0 : 1;
    const col = row === 0 ? i : cols - 1 - (i - cols);
    return { x: padX + col * gap, y: row === 0 ? 55 : 155 };
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Architecture: ${nodes.join(" → ")}`}>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <path
        d={d}
        fill="none"
        stroke={accent}
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        style={animate ? { animation: "flow 1.6s linear infinite" } : undefined}
      />
      {animate && (
        <circle r="4" fill={accent}>
          <animateMotion dur={`${nodes.length * 0.9}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
      {pts.map((p, i) => {
        const on = hover === i;
        const w = Math.min(136, Math.max(84, nodes[i].length * 7.2 + 30));
        return (
          <motion.g
            key={nodes[i]}
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "default" }}
          >
            <rect
              x={p.x - w / 2}
              y={p.y - 19}
              width={w}
              height={38}
              rx={10}
              fill={on ? "rgba(255,122,69,0.14)" : "#121216"}
              stroke={on ? accent : "rgba(255,255,255,0.14)"}
            />
            <text x={p.x - w / 2 + 10} y={p.y - 24} fontSize="9" fill="#5e606b" fontFamily="var(--font-mono)">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fontSize="11.5"
              fill={on ? "#fff" : "#cfd0d6"}
              fontFamily="var(--font-sans)"
            >
              {nodes[i]}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
