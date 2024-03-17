import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from "react"


const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = "Adnan Mansuri";
  const description =
    "Experienced Software Developer with expertise in TypeScript, Node.js, Next.js, data structures, and algorithms. Known for efficient and scalable solutions. Proficient in API architecture and performance optimization. Passionate about innovative and maintainable code. Skilled in automation, including web scrapers. Seeking dynamic projects to drive business growth.";

  return {
    title,
    description,
    metadataBase: new URL("https://www.adnan007d.dev"),
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://www.adnan007d.dev/og-image.jpg",
          width: 1200,
          height: 600,
          alt: "og image",
        },
      ],

      type: "website",
      url: "https://www.adnan007d.dev",
      siteName: "adnan007d",
    },
    twitter: {
      title,
      description,
      images: "https://www.adnan007d.dev/og-image.jpg",
      creator: "@adnan007d",
      card: "summary_large_image",
    },
  };
}

export const viewport : Viewport = {
  themeColor: "#1d1d1d",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "text-slate-300 bg-[#1d1d1d]",
          sourceCodePro.className,
          "max-w-7xl mx-auto dark"
        )}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
