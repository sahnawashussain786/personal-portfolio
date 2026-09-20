"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a href="#top" className="font-display text-xl font-bold tracking-tight">
            <span className="text-gradient">{profile.firstName.charAt(0)}</span>
            <span className="text-slate-500">.dev</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-sm text-slate-300 transition-colors hover:text-white"
                >
                  <span className="mr-1 font-mono text-xs text-cyan-400">
                    0{i + 1}.
                  </span>
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-violet-400/40 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20 hover:shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)] md:block"
          >
            Hire me
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-slate-200 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass overflow-hidden md:hidden"
            >
              <ul className="space-y-1 px-6 py-4">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-lg text-slate-200"
                    >
                      <span className="mr-2 font-mono text-xs text-cyan-400">
                        0{i + 1}.
                      </span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
