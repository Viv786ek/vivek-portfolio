import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080a", borderRadius: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#ededf0", color: "#08080a", fontSize: 30, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>V</div>
      </div>
    ),
    size,
  );
}
