import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { SiteJsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/navigation";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createMetadata({})
};

export const viewport: Viewport = {
  themeColor: "#071013",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-ink font-sans text-slate-100 antialiased">
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
