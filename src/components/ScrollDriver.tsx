"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { scrollProgress } from "@/lib/scroll";

export default function ScrollDriver() {
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgress.current = v;
  });
  return null;
}
