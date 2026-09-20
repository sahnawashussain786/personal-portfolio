"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { skills } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          subtitle="capabilities"
          title="My technical arsenal"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: ci * 0.1, ease }}
              className="glass group relative overflow-hidden rounded-3xl p-8 transition-colors duration-500 hover:border-violet-400/40"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all duration-700 group-hover:bg-violet-500/25" />

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-300">
                  <cat.icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-100">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500">{cat.blurb}</p>
                </div>
              </div>

              <div className="space-y-4">
                {cat.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-baseline justify-between text-sm">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="font-mono text-xs text-slate-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 1.1,
                          delay: 0.15 + si * 0.07,
                          ease,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
