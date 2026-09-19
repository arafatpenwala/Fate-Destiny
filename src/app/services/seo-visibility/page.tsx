import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global SEO & Website Visibility | FATE & DESTINY",
  description: "Achieve digital dominance with our technical and on-page SEO services. FATE & DESTINY optimizes your website to rank globally for the searches that matter.",
  alternates: {
    canonical: "https://fatedestinyofficial.com/services/seo-visibility",
  },
};

export default function SeoVisibilityServicePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Global SEO & Website Visibility",
    "provider": {
      "@type": "Organization",
      "name": "FATE & DESTINY",
      "url": "https://fatedestinyofficial.com/"
    },
    "description": "Achieve digital dominance with our technical and on-page SEO services. We optimize your website to rank globally.",
    "serviceType": "Search Engine Optimization",
    "areaServed": "Global"
  };

  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6 md:px-20 max-w-5xl mx-auto">
        <header className="mb-16">
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] block mb-4 uppercase">
            Service 04
          </span>
          <h1 className="text-[2.5rem] md:text-[4.5rem] font-abeezee font-light text-[#F5F0E6] mb-6 tracking-tighter uppercase leading-[1.1]">
            SEO & Digital Visibility
          </h1>
          <p className="text-[#9B9B9B] text-lg font-inter tracking-wide leading-relaxed max-w-3xl">
            Foundational search optimization that helps search engines understand your website and improves its technical readiness. We structure your digital presence to capture relevant global traffic.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Our Optimization Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Technical SEO</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Ensuring your website architecture, speed, mobile responsiveness, and crawlability meet strict Google guidelines.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">On-Page Optimization</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Strategic structuring of content, headers, meta tags, and structured data (JSON-LD) to clearly communicate your relevance to search engines.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Global Search Dominance</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Targeting international queries and optimizing your digital footprint so customers worldwide can discover your services.</p>
            </div>
            <div className="border-l border-[#151515] pl-6">
              <h3 className="text-xl font-abeezee mb-2">Indexing & Infrastructure</h3>
              <p className="text-[#9B9B9B] text-sm font-inter leading-relaxed">Complete setup of XML Sitemaps, Robots.txt, canonical tags, and Google Search Console to guarantee flawless indexing.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-abeezee text-[#9E8557] mb-6 uppercase">Why SEO Matters</h2>
          <p className="text-[#9B9B9B] text-base font-inter tracking-wide leading-relaxed mb-4">
            A beautiful website is useless if no one can find it. Organic search is still one of the highest-converting traffic channels available. We don't use tricks; we build a fundamentally sound, technically perfect website that search engines trust and reward with high visibility.
          </p>
        </section>
      </div>
      
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
