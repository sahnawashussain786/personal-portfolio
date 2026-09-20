"use client";

import { motion } from "framer-motion";
import { MapPin, Download } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Counter from "../Counter";
import MagneticButton from "../MagneticButton";
import { stats, profile } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          subtitle="who I am"
          title="Engineering meets design"
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="space-y-5 text-lg leading-relaxed text-slate-400"
          >
            <p>
              I&apos;m <span className="text-slate-100">{profile.name}</span> — a
              full-stack developer who treats the browser as a canvas and the
              server as an engine room. For{" "}
              <span className="text-gradient font-semibold">5+ years</span> I&apos;ve
              shipped products across fintech, e-commerce and developer tooling.
            </p>
            <p>
              My sweet spot is the full journey: sculpting pixel-perfect,
              motion-rich interfaces, then backing them with resilient APIs,
              real-time systems and infrastructure that scales. If it lives on
              the web, I can build it — and make it feel{" "}
              <em className="text-slate-200">effortless</em>.
            </p>
            <p>
              When I&apos;m not coding you&apos;ll find me contributing to open
              source, experimenting with generative art, or chasing perfect
              espresso ratios.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <MagneticButton>
                <a
                  href="#contact"
                  data-cursor="Say hi"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-2.5 text-sm text-cyan-200 transition hover:bg-cyan-500/20"
                >
                  <MapPin size={15} /> {profile.location}
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
                >
                  <Download size={15} /> Résumé
                </a>
              </MagneticButton>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className="glass group rounded-2xl p-6 text-center transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_50px_-12px_rgba(34,211,238,0.45)]"
              >
                <Counter
                  to={s.value}
                  suffix={s.suffix}
                  className="text-gradient font-display text-4xl font-bold md:text-5xl"
                />
                <p className="mt-2 text-xs leading-snug text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
