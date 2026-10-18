import { person } from "@/data/profile";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60 * 60_000)) {
    return Response.json({ ok: false, error: "Too many messages — please email directly." }, { status: 429 });
  }
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success for bots.
  if (body.website) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const company = String(body.company ?? "").trim().slice(0, 120);
  const reason = String(body.reason ?? "").trim().slice(0, 60);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "Please add your name, a valid email and a short message." }, { status: 400 });
  }

  const subject = `[Portfolio] ${reason || "Message"} — ${name}${company ? ` (${company})` : ""}`;

  if (!process.env.RESEND_API_KEY) {
    // No email provider configured: hand the visitor a pre-filled mailto instead.
    const mailto = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n— ${name} <${email}>`)}`;
    return Response.json({ ok: false, mailto });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || person.email],
      reply_to: email,
      subject,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;${company ? ` · ${esc(company)}` : ""}</p><p><em>${esc(reason)}</em></p><p style="white-space:pre-wrap">${esc(message)}</p>`,
      text: `${name} <${email}> ${company}\n${reason}\n\n${message}`,
    }),
  });

  if (!res.ok) return Response.json({ ok: false, error: "Couldn't send right now — please email directly." }, { status: 502 });
  return Response.json({ ok: true });
}
