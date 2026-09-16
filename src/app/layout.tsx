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
  title: "FATE & DESTINY | Web Development, AI Automation & AI Agents",
  description: "FATE & DESTINY builds premium full-stack websites, AI automation systems, and intelligent AI agents for businesses worldwide. Turn your vision into powerful digital experiences.",
  keywords: [
    "FATE & DESTINY",
    "web development company",
    "full stack web development",
    "custom website development",
    "AI automation",
    "business automation",
    "workflow automation",
    "AI agents",
    "agentic AI",
    "AI development services"
  ],
  openGraph: {
    title: "FATE & DESTINY | Web Development, AI Automation & AI Agents",
    description: "FATE & DESTINY builds premium full-stack websites, AI automation systems, and intelligent AI agents for businesses worldwide. Turn your vision into powerful digital experiences.",
    url: "https://fatedestinyofficial.com/",
    siteName: "FATE & DESTINY",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/fd-logo-gold.png",
        width: 1200,
        height: 630,
        alt: "FATE & DESTINY Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FATE & DESTINY | Web Development, AI Automation & AI Agents",
    description: "FATE & DESTINY builds premium full-stack websites, AI automation systems, and intelligent AI agents for businesses worldwide.",
    images: ["/fd-logo-gold.png"],
  },
  alternates: {
    canonical: "https://fatedestinyofficial.com/",
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
import Chatbot from "@/components/Chatbot";

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
        <Chatbot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "FATE & DESTINY",
                  "url": "https://fatedestinyofficial.com/",
                  "logo": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "image": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "description": "FATE & DESTINY builds premium full-stack websites, AI automation systems, and intelligent AI agents for businesses worldwide.",
                  "email": "fatedestinyofficials@gmail.com",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+919372132828",
                    "contactType": "customer service",
                    "areaServed": "Global"
                  }
                },
                {
                  "@type": "WebSite",
                  "name": "FATE & DESTINY",
                  "url": "https://fatedestinyofficial.com/",
                  "description": "FATE & DESTINY builds premium full-stack websites, AI automation systems, and intelligent AI agents for businesses worldwide."
                },
                {
                  "@type": "Service",
                  "name": "Full Stack Website Development",
                  "provider": {
                    "@type": "Organization",
                    "name": "FATE & DESTINY"
                  },
                  "description": "Premium, responsive websites designed to present your business clearly, build trust, and create meaningful customer interactions."
                },
                {
                  "@type": "Service",
                  "name": "AI Automation",
                  "provider": {
                    "@type": "Organization",
                    "name": "FATE & DESTINY"
                  },
                  "description": "Intelligent AI-powered workflows that automate repetitive business processes, connect your tools, and reduce manual work."
                },
                {
                  "@type": "Service",
                  "name": "Agentic AI",
                  "provider": {
                    "@type": "Organization",
                    "name": "FATE & DESTINY"
                  },
                  "description": "Intelligent AI agents that understand tasks, make decisions within defined boundaries, use connected tools, and take actions to complete business workflows."
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
