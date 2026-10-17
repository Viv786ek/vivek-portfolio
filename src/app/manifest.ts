import type { MetadataRoute } from "next";
import { site } from "@/data/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Vivek",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
