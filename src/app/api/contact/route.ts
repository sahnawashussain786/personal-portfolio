import { NextResponse } from "next/server";


/**
 * Contact form delivery
 * ---------------------
 * Two delivery modes, picked automatically:
 *
 * 1. DIRECT SMTP (recommended, no third party):
 *    .env.local:
 *      CONTACT_TO=sahnawashussain98@gmail.com
 *      SMTP_HOST=smtp.gmail.com
 *      SMTP_PORT=465
 *      SMTP_USER=sahnawashussain98@gmail.com
 *      SMTP_PASS=<16-char Gmail App Password>
 *    (Create the App Password at https://myaccount.google.com/apppasswords —
 *     requires 2-Step Verification enabled on the Google account.)
 *
 * 2. RELAY FALLBACK (zero config):
 *    Forwards to FormSubmit (https://formsubmit.co). The very first message
 *    triggers an activation email to CONTACT_TO — click the link once and all
 *    later messages land in the Gmail inbox.
 */

export const runtime = "nodejs";

const RECIPIENT = process.env.CONTACT_TO ?? "sahnawashussain98@gmail.com";

/* --------------------------------- types --------------------------------- */

interface Payload {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot — real users never fill this
}

/* ------------------------------ rate limiting ----------------------------- */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/* -------------------------------- validation ------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: Partial<Payload>): { ok: true; data: Payload } | { ok: false; error: string } {
  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const subject = (body.subject ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!name || name.length > 100) return { ok: false, error: "Please enter your name (max 100 characters)." };
  if (!EMAIL_RE.test(email) || email.length > 200) return { ok: false, error: "Please enter a valid email address." };
  if (!subject || subject.length > 150) return { ok: false, error: "Please enter a subject (max 150 characters)." };
  if (!message || message.length > 5000) return { ok: false, error: "Please enter a message (max 5000 characters)." };

  return { ok: true, data: { name, email, subject, message } };
}

/* ------------------------------- deliveries ------------------------------- */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function deliverViaSmtp(d: Payload): Promise<void> {
  const nodemailer = (await import("nodemailer")).default;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#0a0620;padding:32px">
    <div style="max-width:560px;margin:auto;background:#111827;border-radius:16px;overflow:hidden;border:1px solid #1f2937">
      <div style="background:linear-gradient(90deg,#22d3ee,#8b5cf6);padding:20px 28px">
        <h2 style="margin:0;color:#fff;font-size:18px">New portfolio message</h2>
      </div>
      <div style="padding:28px;color:#e5e7eb;font-size:14px;line-height:1.7">
        <p><strong style="color:#22d3ee">From:</strong> ${escapeHtml(d.name)} &lt;${escapeHtml(d.email)}&gt;</p>
        <p><strong style="color:#22d3ee">Subject:</strong> ${escapeHtml(d.subject)}</p>
        <hr style="border:none;border-top:1px solid #1f2937;margin:16px 0" />
        <p style="white-space:pre-wrap;margin:0">${escapeHtml(d.message)}</p>
      </div>
      <div style="padding:14px 28px;background:#0b1120;color:#6b7280;font-size:11px">
        Sent from your portfolio contact form · ${new Date().toISOString()}
      </div>
    </div>
  </div>`;

  await transport.sendMail({
    from: `"Portfolio" <${process.env.SMTP_USER}>`,
    to: RECIPIENT,
    replyTo: `${d.name} <${d.email}>`,
    subject: `[Portfolio] ${d.subject}`,
    text: `From: ${d.name} <${d.email}>\n\n${d.message}`,
    html,
  });
}

async function deliverViaRelay(d: Payload): Promise<void> {
  // FormSubmit accepts the first submission and emails an activation link to
  // the recipient; once activated, every message is delivered to the inbox.
  const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `[Portfolio] ${d.subject}`,
      _template: "table",
      _captcha: "false",
      Name: d.name,
      Email: d.email,
      Message: d.message,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Relay responded ${res.status}`);
}

/* --------------------------------- handler -------------------------------- */

export async function POST(request: Request) {
  /* ------------------------------ origin checks ------------------------------ */
  // Only accept same-origin, JSON POSTs of a sane size (blocks cross-site
  // form postings,CSRF-style abuse and oversized-payload DoS).
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported media type." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ ok: false, error: "Payload too large." }, { status: 413 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local";

  let body: Partial<Payload>;
  try {
    body = (await request.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if ((body.website ?? "").toString().trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages — please try again in a few minutes." },
      { status: 429 },
    );
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const useSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  try {
    if (useSmtp) {
      await deliverViaSmtp(result.data);
    } else {
      await deliverViaRelay(result.data);
    }
    return NextResponse.json({ ok: true, mode: useSmtp ? "smtp" : "relay" });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json(
      { ok: false, error: "Message could not be sent right now — please email me directly instead." },
      { status: 502 },
    );
  }
}
