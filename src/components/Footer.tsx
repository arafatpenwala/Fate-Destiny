"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#050505] text-[#F5F0E6] pt-16 pb-8 border-t border-[#151515] relative z-20 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left border-b border-[#151515] pb-8 mb-8 gap-12">
          <div className="w-full flex flex-col items-center md:items-start">
            <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-4">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-abeezee font-light leading-[1.1] md:leading-none text-[#F5F0E6] uppercase tracking-tighter">
              READY TO SHAPE <span className="text-[#9E8557] italic">THE FUTURE?</span>
            </h2>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          
          {/* Brand Info */}
          <div className="md:col-span-2 max-w-md flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 relative">
                 <Image src="/fd-logo.png" alt="" fill className="object-contain mix-blend-screen" />
              </div>
              <span className="font-abeezee text-2xl tracking-[0.2em] font-light text-[#9E8557]">
                FATE&DESTINY
              </span>
            </div>
            <p className="text-[11px] font-inter text-[#858585] tracking-[0.1em] leading-[2.2] uppercase">
              A premium digital technology studio transforming ambitious ideas into intelligent digital experiences and automated systems. Engineered for scale, designed for impact.
            </p>
            <a href="mailto:fatedestinyofficials@gmail.com" className="mt-6 text-[11px] font-inter tracking-[0.2em] text-[#9E8557] hover:text-[#F5F0E6] transition-colors duration-300 block">
              Gmail - fatedestinyofficials@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
            <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase mb-4">Navigation</span>
            <button onClick={() => scrollTo("#intelligence-atelier")} className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase">Atelier</button>
            <button onClick={() => scrollTo("#services")} className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase">Disciplines</button>
            <button onClick={() => scrollTo("#system")} className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase">Systems</button>
            <button onClick={() => scrollTo("#intelligence-studio")} className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase">The Studio</button>
            <button onClick={() => scrollTo("#process")} className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase">Process</button>
            <a href="https://wa.me/919372132828" target="_blank" rel="noopener noreferrer" className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:-translate-y-1 md:hover:translate-y-0 md:hover:translate-x-2 transition-all duration-300 uppercase block">Contact</a>
          </div>

          {/* Disciplines */}
          <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left mt-8 md:mt-0">
            <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase mb-4">Disciplines</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">AI Agents</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">Full-Stack Websites</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">AI Automation</span>
          </div>

        </div>

        {/* Massive Typography */}
        <div 
          className="w-full relative flex items-center justify-center overflow-hidden mb-12 select-none group cursor-crosshair"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
          }}
        >
          {/* Base Dark Text */}
          <h1 className="text-[9.5vw] sm:text-[11vw] md:text-[8.5vw] font-abeezee font-bold uppercase tracking-tighter leading-none text-[#111111] w-full text-center whitespace-nowrap">
            FATE & DESTINY
          </h1>
          
          {/* Golden Reveal Layer */}
          <h1 
            className="absolute inset-0 text-[9.5vw] sm:text-[11vw] md:text-[8.5vw] font-abeezee font-bold uppercase tracking-tighter leading-none w-full text-center whitespace-nowrap opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle 350px at var(--x, 50%) var(--y, 50%), #C5A46D 0%, #9E8557 20%, transparent 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            FATE & DESTINY
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#151515] gap-6 w-full">
          <span className="text-[10px] font-inter tracking-[0.2em] text-[#555555] uppercase text-center md:text-left">
            © {new Date().getFullYear()} FATE&DESTINY. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[10px] font-inter tracking-[0.2em] text-[#9E8557] uppercase text-center md:text-right">
            FOUNDER: ARAFAT ZUBAIR PENWALA
          </span>
        </div>
      </div>
    </footer>
  );
}
