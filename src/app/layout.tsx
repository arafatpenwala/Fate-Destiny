import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-abeezee", // Mapping this variable to the serif font for globals.css compatibility
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fatedestinyofficial.com/"),
  title: "FATE&DESTINY | Premium Websites, AI Automation & AI Agents",
  description: "FATE&DESTINY is a premium digital systems studio offering full stack custom website development, business AI automation, and AI agent development for visionary businesses globally.",
  keywords: [
    "Full Stack Web Development", 
    "AI Automation Services", 
    "AI Agent Development", 
    "Custom AI Solutions", 
    "AI-Powered Websites", 
    "Business Automation", 
    "FATE&DESTINY"
  ],
  openGraph: {
    title: "FATE&DESTINY | Premium Websites, AI Automation & AI Agents",
    description: "FATE&DESTINY is a premium digital systems studio offering full stack custom website development, business AI automation, and AI agent development for visionary businesses globally.",
    url: "https://fatedestinyofficial.com/",
    siteName: "FATE&DESTINY",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FATE&DESTINY | Premium Websites, AI Automation & AI Agents",
    description: "FATE&DESTINY is a premium digital systems studio offering full stack custom website development, business AI automation, and AI agent development.",
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
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} antialiased`}
    >
      <body className="bg-[#050505] text-[#F5F0E6] min-h-screen flex flex-col selection:bg-[#9E8557] selection:text-[#050505]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "FATE&DESTINY",
                  "url": "https://fatedestinyofficial.com/",
                  "logo": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "image": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "description": "FATE&DESTINY is a premium digital systems studio offering full stack custom website development, business AI automation, and AI agent development for visionary businesses globally.",
                  "telephone": "+919372132828",
                  "priceRange": "$$$"
                },
                {
                  "@type": "WebSite",
                  "name": "FATE&DESTINY",
                  "url": "https://fatedestinyofficial.com/"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
