import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Redesign & Modernization | FATE & DESTINY",
  description: "Transform your outdated website into a modern, high-converting digital experience. FATE & DESTINY offers premium UI/UX and performance upgrades.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/website-redesign",
  },
};

export default function WebsiteRedesignServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Redesign & Modernization",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Transform your outdated website into a modern, high-converting digital experience.",
    "serviceType": "Web Design",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 02
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            Website Redesign & Modernization
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Modern improvements to outdated websites, helping businesses create a clearer, more professional, and mobile-friendly experience. We evolve your digital presence to meet today's premium standards.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Core Upgrades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">UI/UX Modernization</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Thoughtful interface upgrades that make digital products easier to understand, navigate, and use.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Mobile Optimization</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Ensuring flawless presentation and interaction across all mobile devices and screen sizes.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Conversion-Focused Layouts</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Redesigning user journeys to seamlessly guide visitors toward relevant actions and conversions.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Modern Interactions</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Implementing smooth animations and transitions that elevate the perceived value of your brand.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Why Redesign?</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            An outdated website damages brand trust and costs you customers. A strategic redesign improves performance, accessibility, SEO rankings, and ultimately, your bottom line by presenting a polished, authoritative image to the world.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
