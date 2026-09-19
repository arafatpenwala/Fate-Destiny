import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Digital Experiences | FATE & DESTINY",
  description: "Integrate intelligent AI assistants, chat interfaces, and dynamic web features into your platform with FATE & DESTINY's AI digital experience solutions.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/ai-experiences",
  },
};

export default function AiExperiencesServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI-Powered Digital Experiences",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Integrate intelligent AI assistants, chat interfaces, and dynamic web features into your platform.",
    "serviceType": "AI Development",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 03
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            AI-Powered Experiences
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Intelligent web features designed to assist users, enhance interactions, and create sophisticated digital products. We bridge the gap between static websites and highly engaging, proactive digital environments.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Intelligent Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">AI Website Assistants</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Helpful conversational experiences that answer common questions, guide visitors, and provide 24/7 support.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">AI Chat Interfaces</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Custom chat solutions seamlessly integrated into your digital platform, trained on your specific business knowledge.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">AI-Powered Search</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Intelligent semantic search capabilities that help users find exactly what they need instantly, understanding intent rather than just keywords.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">AI Recommendations</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Dynamic content and product recommendations personalized to user behavior and preferences.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Why Implement AI Features?</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            Today's consumers expect instant answers and highly personalized interactions. By integrating AI into your website, you increase engagement, reduce customer service overhead, and provide a cutting-edge experience that differentiates your brand globally.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
