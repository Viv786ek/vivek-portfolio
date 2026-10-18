// Next.js 16 static export writes route-segment prefetch files as
// `__next.<segment>/<file>.txt`, but the client router requests the flat form
// `__next.<segment>.<file>.txt`. Static hosts (GitHub Pages) then 404 on
// prefetch. Write a flat copy next to each nested file.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) flatten(full, path.dirname(full), entry.name);
    else walk(full);
  }
}

function flatten(dir, base, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const flatName = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, base, flatName);
    else {
      const target = path.join(base, flatName);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(full, target);
        copied++;
      }
    }
  }
}

if (!fs.existsSync(root)) {
  console.error("fix-export: out/ not found — run the static build first");
  process.exit(1);
}
walk(root);
console.log(`fix-export: wrote ${copied} flat prefetch file(s)`);
