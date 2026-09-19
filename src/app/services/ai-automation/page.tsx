import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Business Automation Services | FATE & DESTINY",
  description: "Reduce manual work and streamline operations with intelligent AI automation. FATE & DESTINY connects your business workflows efficiently.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/ai-automation",
  },
};

export default function AiAutomationServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Business Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Reduce manual work and streamline operations with intelligent AI automation.",
    "serviceType": "Business Automation",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 07
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            AI Business Automation
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Intelligent automation that reduces repetitive work, streamlines operations, captures leads, and seamlessly connects your business workflows across platforms.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Automation Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Workflow Automation</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Designing complex logical flows that trigger actions automatically when specific conditions are met, eliminating manual human intervention.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">API Integrations</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Connecting disparate software systems (CRM, ERP, Email, Payment gateways) so they share data and function as a unified intelligence system.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Data Synchronization</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Ensuring real-time data accuracy across all your business tools, preventing errors and providing a single source of truth.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Repetitive Task Reduction</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Identifying and scripting solutions for time-consuming, repetitive tasks, freeing your team to focus on high-level strategy.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Scale Without Bloat</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            True scale requires efficiency. Our AI automation architectures allow your business to handle 10x the volume of leads, sales, and operations without needing to proportionally increase your workforce or overhead costs.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
