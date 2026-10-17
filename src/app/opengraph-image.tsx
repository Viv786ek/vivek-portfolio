import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { metrics, person } from "@/data/profile";

export const alt = `${person.name} — AI Engineer & Full-Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public", "vivek.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#08080a", color: "#ededf0", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, color: "#9a9ca6", letterSpacing: 3, textTransform: "uppercase" }}>AI Engineer · Full-Stack Engineer</div>
            <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginTop: 24, letterSpacing: -2 }}>{person.name}</div>
            <div style={{ fontSize: 40, marginTop: 20, color: "#ff7a45", fontWeight: 600 }}>I build AI products that survive production.</div>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            {metrics.slice(0, 3).map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 44, fontWeight: 700 }}>{m.value}</div>
                <div style={{ fontSize: 18, color: "#9a9ca6", maxWidth: 220 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={360} height={450} style={{ objectFit: "cover", borderRadius: 28, marginLeft: 48, border: "2px solid rgba(255,122,69,0.5)" }} alt="" />
      </div>
    ),
    size,
  );
}
