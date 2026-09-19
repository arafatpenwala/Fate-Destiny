import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Creative & Content Generation | FATE & DESTINY",
  description: "Leverage AI-assisted visuals, marketing copy, and creative assets for your business. FATE & DESTINY delivers high-quality digital content at scale.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/ai-creative-content",
  },
};

export default function AiCreativeContentServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Creative & Content Generation",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Leverage AI-assisted visuals, marketing copy, and creative assets for your business.",
    "serviceType": "Content Creation",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 05
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            AI Creative & Content
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            AI-assisted visuals, promotional assets, and content concepts created to support modern marketing campaigns. We utilize advanced generative AI models to scale your creative output without sacrificing quality.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Our Creative Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Website & Marketing Copy</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Professional, engaging, and SEO-optimized text that effectively communicates your brand's value proposition and drives conversions.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Product & Visual Assets</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">High-quality, AI-assisted imagery showcasing your offerings in the best light, tailored perfectly to your brand aesthetics.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Social Media Creatives</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Dynamic, scroll-stopping visuals and copy designed specifically for engagement across various social media platforms.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Advertising Material</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Compelling ad creatives designed for high click-through rates and deep audience resonance.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">The Generative Advantage</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            Traditional content creation is slow and expensive. By leveraging cutting-edge generative AI, we provide rapid iteration, immense scale, and unique creative angles, giving your brand a distinct competitive advantage in a crowded digital landscape.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
