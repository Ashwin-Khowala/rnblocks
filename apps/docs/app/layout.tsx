import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Layers, ArrowUpRight, BookOpen, Terminal, Sparkles, FolderTree } from "lucide-react";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RNBlocks Documentation — Guides & CLI",
  description: "Official documentation for the RNBlocks React Native UI registry and CLI tooling.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${jetbrainsMono.variable}`}>
      <body className={nunitoSans.className}>
        {/* Docs Navigation Bar */}
        <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#181818] border border-white/15 flex items-center justify-center text-white">
                  <Layers size={16} />
                </div>
                <span className="font-bold text-white text-base">RNBlocks</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#A3A3A3]">
                  Docs
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-5 text-sm text-[#A3A3A3]">
                <Link href="/" className="hover:text-white transition-colors">Documentation</Link>
                <Link href="/#cli" className="hover:text-white transition-colors">CLI Reference</Link>
                <Link href="/#architecture" className="hover:text-white transition-colors">Architecture</Link>
                <Link href="/#contributing" className="hover:text-white transition-colors">Contributing</Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="http://localhost:3000"
                className="text-xs text-[#A3A3A3] hover:text-white flex items-center gap-1 transition-colors px-3 py-1.5 rounded-md border border-white/10 bg-[#111111]"
              >
                Website & Registry <ArrowUpRight size={13} />
              </a>
              <a
                href="https://github.com/Ashwin-Khowala/rnblocks"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-black font-semibold bg-white px-3 py-1.5 rounded-md hover:bg-neutral-200 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
