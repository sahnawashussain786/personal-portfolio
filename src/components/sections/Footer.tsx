"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import MagneticButton from "../MagneticButton";
import { profile, socials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
        >
          <p className="text-outline-faint select-none font-display text-[13vw] font-bold leading-none md:text-[7rem]">
            {profile.firstName}
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={13} className="text-fuchsia-500" /> using
            Next.js, Three.js & GSAP-grade motion
          </p>
          <MagneticButton strength={0.3}>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.7)]"
            >
              <ArrowUp size={16} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
