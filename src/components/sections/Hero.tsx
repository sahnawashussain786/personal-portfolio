"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Terminal } from "lucide-react";
import MagneticButton from "../MagneticButton";
import { profile } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 3.1 } },
};

const item = {
  hidden: { y: 70, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 font-mono text-xs text-emerald-200"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute h-full w-full rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </motion.div>

        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm tracking-[0.35em] text-emerald-400/80 uppercase"
        >
          {profile.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[17vw] font-bold leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl"
        >
          <span
            className={`block ${
              profile.lastName
                ? "text-slate-100"
                : "text-gradient animate-gradient-x"
            }`}
          >
            {profile.firstName}
          </span>
          {profile.lastName && (
            <span className="text-gradient block animate-gradient-x">
              {profile.lastName}
            </span>
          )}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <a
              href="#work"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 font-medium text-white shadow-[0_0_40px_-10px_rgba(0,237,100,0.7)] transition-shadow hover:shadow-[0_0_60px_-8px_rgba(0,237,100,0.9)]"
            >
              <Terminal size={16} />
              View my work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-medium text-slate-200 backdrop-blur transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
            >
              Get in touch
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-emerald-300"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
