"use client";

import { marqueeTech, marqueeValues } from "@/lib/data";

function Row({
  items,
  reverse = false,
  outline = false,
}: {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className={`flex items-center gap-10 whitespace-nowrap font-display text-4xl font-bold md:text-6xl ${
              outline ? "text-outline" : "text-slate-200"
            }`}
          >
            {t}
            <span className={`h-2.5 w-2.5 rounded-full ${outline ? "bg-fuchsia-500/60" : "bg-cyan-400/80"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative py-16">
      <div className="-rotate-1 space-y-4">
        <Row items={marqueeTech} />
        <Row items={marqueeValues} reverse outline />
      </div>
    </section>
  );
}
