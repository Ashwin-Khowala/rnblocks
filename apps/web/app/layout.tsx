import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const timesItalic = localFont({
  src: "../public/fonts/TimesNewRomanMT-Italic.ttf",
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rnblocks.vercel.app"),
  title: {
    default: "RNBlocks — The Open-Source React Native & Expo UI Registry",
    template: "%s | RNBlocks",
  },
  description:
    "Production-ready React Native blocks and screens for Expo and React Native apps. Discover, inspect source code, and copy components directly into your codebase.",
  keywords: [
    "react native",
    "expo",
    "react native components",
    "mobile ui registry",
    "mobile ui",
    "nativewind",
    "shadcn react native",
    "open source",
    "vercel oss",
  ],
  authors: [{ name: "Ashwin Khowala", url: "https://github.com/Ashwin-Khowala" }],
  creator: "Ashwin Khowala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rnblocks.vercel.app",
    title: "RNBlocks — The Open-Source React Native & Expo UI Registry",
    description:
      "Production-ready React Native blocks and screens. Discover, inspect live previews, and copy code directly into your Expo or React Native app.",
    siteName: "RNBlocks",
  },
  twitter: {
    card: "summary_large_image",
    title: "RNBlocks — The Open-Source React Native & Expo UI Registry",
    description:
      "Production-ready React Native blocks and screens. Discover, inspect live previews, and copy code directly into your Expo or React Native app.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${jetbrainsMono.variable} ${timesItalic.variable}`}>
      <body className={nunitoSans.className}>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 60px - 280px)", display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
