"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { projects, type Project } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.demo}
      data-cursor="Open"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.12, ease }}
      className="group relative block"
    >
      <div className="glass relative overflow-hidden rounded-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20 group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* gradient banner */}
        <div
          className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient}`}
        >
          <div className="absolute inset-0 opacity-60 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.5)_0%,transparent_45%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.35)_0%,transparent_40%)]" />
          <span
            aria-hidden
            className="absolute -bottom-7 right-4 select-none font-display text-[7rem] font-bold leading-none text-white/20 transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-6"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/25 px-3 py-1 font-mono text-xs text-white/90 backdrop-blur">
            {project.year}
          </div>
          <div className="absolute bottom-5 left-5 flex gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
              Live demo
            </span>
            <span className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
              <Github size={12} /> Code
            </span>
          </div>
        </div>

        <div className="p-7">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-slate-100 transition-colors group-hover:text-cyan-300">
              {project.title}
            </h3>
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* accent glow line */}
        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          subtitle="selected work"
          title="Projects I'm proud of"
        />
        <div className="grid gap-7 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
