import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hussain — Full-Stack Developer",
  description:
    "Portfolio of Hussain, a full-stack developer crafting immersive, high-performance web experiences with React, Node.js and WebGL.",
  openGraph: {
    title: "Hussain — Full-Stack Developer",
    description:
      "Immersive, high-performance web experiences built with React, Node.js and WebGL.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05010f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-void font-body text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
