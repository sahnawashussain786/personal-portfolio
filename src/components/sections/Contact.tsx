"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Loader2, CheckCircle2 } from "lucide-react";
import SectionHeading from "../SectionHeading";
import MagneticButton from "../MagneticButton";
import { socials, profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
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

          <div className="glass rounded-3xl p-8 md:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/10"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/10"
                />
              </div>
              <input
                required
                name="subject"
                placeholder="Subject"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/10"
              />
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your project…"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:bg-white/10"
              />
              <div className="flex justify-center pt-2">
                <MagneticButton strength={0.25}>
                  <button
                    type="submit"
                    disabled={status !== "idle"}
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
                    {status === "sent" && (
                      <>
                        Message sent <CheckCircle2 size={15} />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row">
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
