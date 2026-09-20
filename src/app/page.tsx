"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollDriver from "@/components/ScrollDriver";
import Cursor from "@/components/Cursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import Navbar from "@/components/Navbar";
import Scene from "@/components/three/BackgroundScene";

import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <SmoothScroll />
      <ScrollDriver />
      <Cursor />
      <NoiseOverlay />

      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <main className="relative min-h-screen overflow-x-clip">
        {/* WebGL world behind everything */}
        <Scene />

        {/* content layers */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
