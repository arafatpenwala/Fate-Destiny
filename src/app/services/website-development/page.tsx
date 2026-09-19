import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Full-Stack Website Development | FATE & DESTINY",
  description: "FATE & DESTINY builds premium, high-performance websites and full-stack web applications tailored for global businesses. Elevate your digital presence today.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/website-development",
  },
};

export default function WebsiteDevelopmentServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Premium Website Development",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "FATE & DESTINY builds premium, high-performance websites and full-stack web applications tailored for global businesses.",
    "serviceType": "Web Development",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 01
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            Premium Website Development
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            We architect and build high-performance, full-stack websites designed around your brand, business goals, and customer experience. From concept to deployment, we ensure a seamless digital presence.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Custom Frontend Development</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Engaging, responsive, and beautiful user interfaces tailored to your brand identity.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Full-Stack Web Applications</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Complex, feature-rich web applications built for specific business requirements.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Backend Systems & APIs</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Robust server-side architecture to power your data and business logic securely.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Performance Optimization</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Fast-loading, optimized code ensuring maximum global reach and user retention.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Who is this for?</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            Our web development services are crafted for ambitious brands, corporations, real estate agencies, and e-commerce platforms looking to dominate their market with a premium digital footprint.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">How it works</h2>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <span className="text-[#9E8557] font-inter">01</span>
              <div>
                <h3 className="text-lg font-abeezee mb-1">Discovery & Strategy</h3>
                <p className="text-[#9B9B9B] text-sm font-inter">Understanding your vision, market, and technical requirements.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#9E8557] font-inter">02</span>
              <div>
                <h3 className="text-lg font-abeezee mb-1">Design & Architecture</h3>
                <p className="text-[#9B9B9B] text-sm font-inter">Crafting the UI/UX and planning the full-stack architecture.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#9E8557] font-inter">03</span>
              <div>
                <h3 className="text-lg font-abeezee mb-1">Development</h3>
                <p className="text-[#9B9B9B] text-sm font-inter">Building the frontend, backend, and integrating databases.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-[#9E8557] font-inter">04</span>
              <div>
                <h3 className="text-lg font-abeezee mb-1">Testing & Deployment</h3>
                <p className="text-[#9B9B9B] text-sm font-inter">Rigorous QA testing before global deployment.</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
