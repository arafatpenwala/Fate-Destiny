import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Maintenance & Support Services | FATE & DESTINY",
  description: "Ensure your digital presence remains fast, secure, and competitive. FATE & DESTINY offers ongoing website maintenance and continuous development.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/website-maintenance",
  },
};

export default function WebsiteMaintenanceServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Maintenance & Support Services",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Ensure your digital presence remains fast, secure, and competitive with ongoing website maintenance.",
    "serviceType": "Web Maintenance",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 06
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            Website Maintenance & Growth
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Ongoing support and iterative improvements to ensure your digital presence remains fast, secure, and highly competitive. We don't just build websites; we nurture and evolve them.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Continuous Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Technical Updates & Security</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Regular patching, framework updates, and security audits to keep your platform completely safe from vulnerabilities.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Continuous Development</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Expanding your website thoughtfully as your business requirements evolve, adding new sections, pages, and dynamic features.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Performance Tuning</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Constant monitoring and optimization of code, images, and server response times to maintain peak Core Web Vitals.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Iterative SEO Improvements</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Adapting your content and structure to ongoing search engine algorithm changes to maintain and grow organic rankings.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">A Partnership for Growth</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            A static website quickly becomes obsolete. By partnering with us for ongoing maintenance, your platform evolves alongside your business and technological advancements, ensuring you never fall behind the competition.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
