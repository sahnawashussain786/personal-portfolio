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
  title: "Hussain — MERN Stack Developer",
  description:
    "Portfolio of Hussain, a MERN stack developer building full-stack products with MongoDB, Express, React and Node.js — fast, scalable and beautifully animated.",
  openGraph: {
    title: "Hussain — MERN Stack Developer",
    description:
      "Full-stack products built with MongoDB, Express, React and Node.js.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050a09",
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
