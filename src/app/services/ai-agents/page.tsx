import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic AI & Autonomous Agents | FATE & DESTINY",
  description: "Deploy intelligent AI agents to communicate with customers, qualify leads, and handle business tasks autonomously. Built by FATE & DESTINY.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/ai-agents",
  },
};

export default function AiAgentsServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Agentic AI & Autonomous Agents",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Deploy intelligent AI agents to communicate with customers, qualify leads, and handle business tasks autonomously.",
    "serviceType": "Artificial Intelligence",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 08
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            Agentic AI Systems
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Intelligent, autonomous AI agents designed to communicate with customers, answer questions logically, qualify leads, support sales, and independently execute complex business tasks.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">The Power of Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Autonomous Task Execution</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Unlike simple chatbots, our Agentic AI can break down complex goals, plan steps, and execute actions to reach a desired outcome without supervision.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Tool Integration & Usage</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Equipping agents with the ability to read databases, query APIs, send emails, and modify CRM records just like a human employee would.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Intelligent Lead Qualification</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Deploying agents as frontline representatives to hold nuanced conversations, gather requirements, and qualify leads 24/7 globally.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Dynamic Decision Making</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Agents that can react to changing information, handle edge cases gracefully, and escalate only the most complex issues to human operators.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">The Future of Workforce</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            Agentic AI represents the highest tier of business technology currently available. We architect systems where AI acts not just as software, but as a proactive, capable, and highly reliable extension of your workforce.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
