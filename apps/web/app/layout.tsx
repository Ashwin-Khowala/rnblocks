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
  alternates: {
    canonical: "https://rnblocks.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "react native",
    "expo",
    "react native components",
    "mobile ui registry",
    "mobile ui",
    "copy paste react native",
    "react native blocks",
    "nativewind",
    "shadcn react native",
    "open source react native",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://rnblocks.vercel.app/#webapp",
      "name": "RNBlocks",
      "url": "https://rnblocks.vercel.app",
      "description":
        "Production-ready React Native blocks and screens for Expo and React Native apps. Discover, inspect source code, and copy components directly into your codebase.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "iOS, Android, Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "author": {
        "@type": "Person",
        "name": "Ashwin Khowala",
        "url": "https://github.com/Ashwin-Khowala",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://rnblocks.vercel.app/#code",
      "name": "RNBlocks Registry",
      "codeRepository": "https://github.com/Ashwin-Khowala/rnblocks",
      "programmingLanguage": ["TypeScript", "JavaScript"],
      "runtimePlatform": ["React Native", "Expo"],
      "license": "https://opensource.org/licenses/MIT",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${jetbrainsMono.variable} ${timesItalic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
