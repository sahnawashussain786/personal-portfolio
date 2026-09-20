"use client";

import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { experience } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  return (
    <section id="journey" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          subtitle="career path"
          title="The journey so far"
        />

        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-transparent md:left-1/2" />

          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
                className={`relative mb-12 pl-10 md:w-1/2 md:pl-0 ${
                  left ? "md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                <span
                  className={`absolute top-1.5 h-4 w-4 rounded-full border-2 border-void bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_16px_rgba(34,211,238,0.7)] left-0 md:left-auto ${
                    left ? "md:-right-2" : "md:-left-2"
                  }`}
                />
                <div className="glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">
                  <span className="font-mono text-xs text-cyan-400">
                    {job.period}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-slate-100">
                    {job.role}
                  </h3>
                  <p className="mb-3 text-sm text-violet-300">{job.company}</p>
                  <p className="mb-4 text-sm leading-relaxed text-slate-400">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
