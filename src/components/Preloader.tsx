"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { profile } from "@/lib/data";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        document.body.style.overflow = "";
        setTimeout(onComplete, 250);
      },
    });
    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <span className="text-gradient font-display text-2xl font-bold">
            {profile.firstName.charAt(0)}
          </span>
        </div>

        <p className="font-display text-7xl font-bold tabular-nums text-slate-100 md:text-8xl">
          {count}
          <span className="text-gradient">%</span>
        </p>

        <div className="mt-8 h-px w-56 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-slate-500">
          Initializing experience
        </p>
      </motion.div>

      <p className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.35em] text-slate-600">
        Portfolio © 2026
      </p>
    </motion.div>
  );
}
