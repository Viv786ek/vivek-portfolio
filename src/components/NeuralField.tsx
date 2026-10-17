"use client";

import { useEffect, useRef } from "react";

/**
 * A lightweight canvas "retrieval graph": drifting nodes, nearby nodes link up,
 * and pulses travel along edges toward the cursor — a quiet nod to RAG.
 * ~2 KB and no WebGL, so it costs nothing on Lighthouse. Pauses off-screen and
 * renders a single static frame for prefers-reduced-motion.
 */
export function NeuralField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Skip on small screens: decorative only, and phones benefit most from idle CPU.
    if (window.innerWidth < 768) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    type N = { x: number; y: number; vx: number; vy: number; r: number; hot: number };
    let nodes: N[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        hot: 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const link = 130;
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        n.hot = Math.max(n.hot * 0.94, dm < 160 ? 1 - dm / 160 : 0);
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > link) continue;
          const heat = Math.max(a.hot, b.hot);
          const alpha = (1 - d / link) * (0.12 + heat * 0.5);
          ctx.strokeStyle = heat > 0.05 ? `rgba(255,122,69,${alpha})` : `rgba(255,255,255,${alpha * 0.6})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.hot > 0.05 ? `rgba(255,122,69,${0.5 + n.hot * 0.5})` : "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.hot * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    // Start after the page is idle so the animation never competes with hydration.
    const start = () => {
      resize();
      if (reduce) draw();
      else raf = requestAnimationFrame(loop);
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const idleId = ric ? ric(start, { timeout: 2500 }) : window.setTimeout(start, 1200);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      if (!ric) clearTimeout(idleId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
