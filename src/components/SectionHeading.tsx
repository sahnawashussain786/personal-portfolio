"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative mb-14">
      <span
        aria-hidden
        className="text-outline-faint pointer-events-none absolute -top-12 left-0 select-none font-display text-[20vw] font-bold leading-none md:text-[9rem]"
      >
        {index}
      </span>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <p className="mb-2 font-mono text-sm text-cyan-400">
          <span className="text-slate-500">{index}.</span> {subtitle}
        </p>
        <h2 className="font-display text-4xl font-bold text-slate-100 md:text-5xl">
          {title}
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 h-px w-40 origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
        />
      </motion.div>
    </div>
  );
}
