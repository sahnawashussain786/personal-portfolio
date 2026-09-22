"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Loader2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import SectionHeading from "../SectionHeading";
import MagneticButton from "../MagneticButton";
import { socials, profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/10";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };

      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error ?? "Something went wrong — please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please check your connection and try again.");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setError("");
  };

  return (
    <section id="contact" className="relative px-6 pb-28 pt-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="05"
          subtitle="what's next"
          title="Let's build something great"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-slate-400">
            My inbox is always open — whether you have a project in mind, a
            role to discuss, or just want to talk shaders and systems design.
          </p>

          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex flex-col items-center gap-4 py-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15 shadow-[0_0_50px_-8px_rgba(34,211,238,0.8)]"
                  >
                    <CheckCircle2 size={32} className="text-cyan-300" />
                    <motion.span
                      className="absolute h-16 w-16 rounded-full border border-cyan-400/40"
                      animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  </motion.div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Message sent!
                    </h3>
                    <p className="max-w-sm text-sm text-slate-400">
                      Thanks for reaching out — it landed in Hussain's inbox. Expect a
                      reply within 24 hours.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
                    >
                      <RefreshCw size={14} /> Send another
                    </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                {/* honeypot — hidden from humans, catnip for bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    required
                    name="name"
                    placeholder="Your name"
                    className={inputCls}
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className={inputCls}
                  />
                </div>
                <input
                  required
                  name="subject"
                  placeholder="Subject"
                  className={inputCls}
                />
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project…"
                  className={`${inputCls} resize-none`}
                />

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
                    role="alert"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>
                      {error}{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        className="underline decoration-rose-400/50 underline-offset-2 transition hover:text-rose-200"
                      >
                        Email me directly →
                        </a>
                    </span>
                  </motion.div>
                )}

                <div className="flex justify-center pt-2">
                  <MagneticButton strength={0.25}>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex min-w-48 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-3.5 font-medium text-white shadow-[0_0_40px_-10px_rgba(139,92,246,0.8)] transition hover:shadow-[0_0_60px_-8px_rgba(139,92,246,1)] disabled:opacity-80"
                    >
                      {status === "idle" && (
                        <>
                          Send message
                          <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                      {status === "sending" && (
                        <>
                          Sending <Loader2 size={15} className="animate-spin" />
                        </>
                      )}
                      {status === "error" && (
                        <>
                          Try again <RefreshCw size={15} />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 transition-colors hover:text-cyan-300"
              >
                <Mail size={15} /> {profile.email}
              </a>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
