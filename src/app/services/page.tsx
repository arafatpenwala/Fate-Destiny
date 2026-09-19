import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Digital Services | FATE & DESTINY",
  description: "Explore our premium digital services including full-stack website development, AI automation, agentic AI, and global SEO strategies.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services",
  },
};

const servicesList = [
  {
    title: "Premium Website Development",
    description: "Full-stack websites built around your brand, business goals, and customer experience.",
    slug: "website-development",
    num: "01",
  },
  {
    title: "Website Redesign",
    description: "Modern improvements to outdated websites, creating a clearer, professional, and mobile-friendly experience.",
    slug: "website-redesign",
    num: "02",
  },
  {
    title: "AI-Powered Experiences",
    description: "Intelligent web features designed to assist users and enhance interactions.",
    slug: "ai-experiences",
    num: "03",
  },
  {
    title: "SEO & Visibility",
    description: "Foundational search optimization that helps search engines understand your website.",
    slug: "seo-visibility",
    num: "04",
  },
  {
    title: "AI Creative & Content",
    description: "AI-assisted visuals, promotional assets, and content concepts.",
    slug: "ai-creative-content",
    num: "05",
  },
  {
    title: "Website Maintenance & Growth",
    description: "Ongoing support to ensure your digital presence remains fast, secure, and competitive.",
    slug: "website-maintenance",
    num: "06",
  },
  {
    title: "AI Automation",
    description: "Intelligent automation that reduces repetitive work and streamlines operations.",
    slug: "ai-automation",
    num: "07",
  },
  {
    title: "AI Agents",
    description: "Autonomous AI agents designed to handle business tasks, qualify leads, and support sales.",
    slug: "ai-agents",
    num: "08",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-[3rem] md:text-[5rem] font-abeezee font-light text-[#9E8557] mb-6 tracking-tighter uppercase">
            Our Services
          </h1>
          <p className="text-[#9B9B9B] max-w-2xl mx-auto text-sm md:text-base font-inter tracking-wide leading-relaxed">
            We deliver sophisticated digital solutions, combining premium development, cutting-edge AI, and strategic visibility to elevate your business globally.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <Link 
              key={service.slug} 
              href={`/services/${service.slug}`}
              className="block group relative p-8 border border-[#151515] bg-[#0A0A0A] hover:bg-[#111111] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_rgba(158,133,87,0.15)_0%,_transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />
              
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-6">
                {service.num}
              </span>
              
              <h2 className="text-2xl font-abeezee text-[#F5F0E6] mb-4 group-hover:text-[#9E8557] transition-colors">
                {service.title}
              </h2>
              
              <p className="text-sm font-inter text-[#9B9B9B] leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="flex items-center text-[#9E8557] text-[10px] font-inter uppercase tracking-[0.2em] mt-auto">
                Explore Service 
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
