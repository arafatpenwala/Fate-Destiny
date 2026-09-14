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
    <footer className="w-full bg-[#050505] text-[#F5F0E6] pt-32 pb-8 border-t border-[#151515] relative z-20 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#151515] pb-16 mb-16 gap-12">
          <div>
            <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-6">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-abeezee font-light leading-none text-[#F5F0E6] uppercase tracking-tighter max-w-3xl">
              READY TO SHAPE <br/>
              <span className="text-[#9E8557] italic">THE FUTURE?</span>
            </h2>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Brand Info */}
          <div className="md:col-span-2 max-w-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 relative">
                 <Image src="/fd-logo.png" alt="Fate & Destiny" fill className="object-contain mix-blend-screen" />
              </div>
              <span className="font-abeezee text-2xl tracking-[0.2em] font-light text-[#9E8557]">
                FATE&DESTINY
              </span>
            </div>
            <p className="text-[11px] font-inter text-[#858585] tracking-[0.1em] leading-[2.2] uppercase">
              A premium digital technology studio transforming ambitious ideas into intelligent digital experiences and automated systems. Engineered for scale, designed for impact.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase mb-4">Navigation</span>
            <button onClick={() => scrollTo("#services")} className="text-left text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:translate-x-2 transition-all duration-300 uppercase">Services</button>
            <button onClick={() => scrollTo("#work")} className="text-left text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:translate-x-2 transition-all duration-300 uppercase">Selected Work</button>
            <button onClick={() => scrollTo("#process")} className="text-left text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:translate-x-2 transition-all duration-300 uppercase">Process</button>
            <a href="https://wa.me/919372132828" target="_blank" rel="noopener noreferrer" className="text-left text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] hover:text-[#F5F0E6] hover:translate-x-2 transition-all duration-300 uppercase block">Contact</a>
          </div>

          {/* Disciplines */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase mb-4">Disciplines</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">AI Agents</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">Full-Stack Websites</span>
            <span className="text-[13px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">AI Automation</span>
          </div>

        </div>

        {/* Massive Typography */}
        <div className="w-full flex items-center justify-center overflow-hidden mb-12 select-none pointer-events-none">
          <h1 className="text-[8.5vw] font-abeezee font-bold uppercase tracking-tighter leading-none text-[#111111] w-full text-center whitespace-nowrap">
            FATE & DESTINY
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#151515] gap-6">
          <span className="text-[10px] font-inter tracking-[0.2em] text-[#555555] uppercase">
            © {new Date().getFullYear()} FATE&DESTINY STUDIO. ALL RIGHTS RESERVED.
          </span>
          <button 
            onClick={() => scrollTo("#hero")}
            className="group flex items-center gap-3 text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase hover:text-[#F5F0E6] transition-colors"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-[#9E8557]/30 group-hover:border-[#F5F0E6] flex items-center justify-center transition-colors">
              <ArrowUp size={14} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
