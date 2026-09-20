"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
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
        <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute h-full w-full rounded-full bg-cyan-400" />
          </span>
          Available for new projects
        </motion.div>

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
          I build immersive, high-performance web experiences — pairing beautiful
          interfaces with backends that never blink.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <a
              href="#work"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-7 py-3 font-medium text-white shadow-[0_0_40px_-10px_rgba(139,92,246,0.8)] transition-shadow hover:shadow-[0_0_60px_-8px_rgba(139,92,246,1)]"
            >
              <Sparkles size={16} />
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 font-medium text-slate-200 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
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
        className="absolute bottom-8 flex flex-col items-center gap-1 text-slate-500 transition-colors hover:text-cyan-300"
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
