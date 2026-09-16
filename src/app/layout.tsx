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
  title: "FATE&DESTINY | Premium Website Development & Digital Experiences",
  description: "FATE&DESTINY creates premium websites, digital experiences, SEO, AI-enhanced solutions, branding, and creative content for businesses worldwide.",
  keywords: [
    "Premium Website Development",
    "Custom Website Development",
    "Web Design & Development",
    "Business Website Development",
    "Website Redesign",
    "E-commerce Website Development",
    "Real Estate Website Development",
    "AI-Powered Website Development",
    "SEO Services",
    "Digital Experience Design"
  ],
  openGraph: {
    title: "FATE&DESTINY | Premium Website Development & Digital Experiences",
    description: "FATE&DESTINY creates premium websites, digital experiences, SEO, AI-enhanced solutions, branding, and creative content for businesses worldwide.",
    url: "https://fatedestinyofficial.com/",
    siteName: "FATE&DESTINY",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FATE&DESTINY | Premium Website Development & Digital Experiences",
    description: "FATE&DESTINY creates premium websites, digital experiences, SEO, AI-enhanced solutions, branding, and creative content for businesses worldwide.",
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
                  "name": "FATE&DESTINY",
                  "url": "https://fatedestinyofficial.com/",
                  "logo": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "image": "https://fatedestinyofficial.com/fd-logo-gold.png",
                  "description": "FATE&DESTINY creates premium digital experiences, intelligent business systems, and AI-assisted creative solutions for businesses worldwide.",
                  "telephone": "+919372132828",
                  "email": "fatedestinyofficials@gmail.com",
                  "priceRange": "$$$"
                },
                {
                  "@type": "WebSite",
                  "name": "FATE&DESTINY",
                  "url": "https://fatedestinyofficial.com/",
                  "description": "FATE&DESTINY creates premium websites, digital experiences, SEO, AI-enhanced solutions, branding, and creative content for businesses worldwide."
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
