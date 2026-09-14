"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Layers, Database, ArrowUpRight } from "lucide-react";

export default function SystemDiagram() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    // Stagger animation for bento boxes
    gsap.fromTo(cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="system"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden z-20 border-t border-[#151515] py-24 md:py-32"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_60%)] pointer-events-none" />

      {/* Typography Header */}
      <div className="relative w-full px-6 md:px-12 z-30 mb-20 md:mb-32">
        <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-4">
          03 // THE ARCHITECTURE
        </span>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-abeezee font-light leading-none text-[#F5F0E6] uppercase tracking-tighter">
            UNIFIED SYSTEMS.
          </h2>
          <p className="text-[10px] md:text-[11px] font-inter text-[#858585] tracking-[0.15em] max-w-sm leading-loose md:text-right">
            A precise three-tier architecture connecting intelligent agents, premium front-end interfaces, and autonomous operational workflows.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="relative w-full max-w-[1400px] px-6 md:px-12 z-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-auto md:h-[450px]">
        
        {/* Logic Layer - Large Box */}
        <div 
          ref={el => { cardsRef.current[0] = el; }}
          className="group relative flex flex-col justify-center gap-8 md:gap-12 col-span-1 md:col-span-2 bg-[#0A0A0A] border border-[#151515] p-8 md:p-12 overflow-hidden hover:border-[#9E8557]/40 transition-colors duration-700 rounded-sm"
        >
          {/* Enhanced Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0" />
          
          {/* Beautiful Gold Glow on Hover */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.15)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 scale-150 group-hover:scale-100 transition-all duration-1000 pointer-events-none z-0" />

          <div className="relative z-10 flex justify-start items-start">
            <Cpu strokeWidth={1} className="w-10 h-10 md:w-16 md:h-16 text-[#9E8557] group-hover:scale-110 transition-transform duration-700" />
          </div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase block mb-4 group-hover:text-[#9E8557] transition-colors duration-700">
              01 // LOGIC LAYER
            </span>
            <h3 className="text-2xl md:text-4xl font-abeezee text-[#F5F0E6] tracking-tighter mb-6 uppercase">
              AI AGENTS & DECISION ENGINES
            </h3>
            <p className="text-[11px] md:text-[13px] font-inter text-[#858585] tracking-[0.15em] leading-loose max-w-xl group-hover:text-[#A5A5A5] transition-colors duration-700">
              Autonomous agents designed to understand, reason, and execute complex business logic without human intervention. We deploy custom LLMs and specialized reasoning loops.
            </p>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6 md:gap-8 h-full">
          {/* Interface Layer - Medium Box */}
          <div 
            ref={el => { cardsRef.current[1] = el; }}
            className="group relative flex-1 flex flex-col justify-center gap-6 bg-[#0A0A0A] border border-[#151515] p-8 md:p-10 overflow-hidden hover:border-[#F5F0E6]/30 transition-colors duration-700 rounded-sm"
          >
            {/* Diagonal Light Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(245,240,230,0.05)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,240,230,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <Layers strokeWidth={1} className="w-10 h-10 text-[#F5F0E6] group-hover:-translate-y-1 transition-transform duration-500" />
            
            <div className="relative z-10">
              <span className="text-[9px] font-inter tracking-[0.3em] text-[#858585] uppercase block mb-3 group-hover:text-[#F5F0E6] transition-colors duration-700">
                02 // INTERFACE LAYER
              </span>
              <h3 className="text-xl md:text-2xl font-abeezee text-[#F5F0E6] tracking-tighter mb-4 uppercase">
                FULL-STACK WEBSITES
              </h3>
              <p className="text-[10px] md:text-[11px] font-inter text-[#858585] tracking-[0.15em] leading-loose group-hover:text-[#A5A5A5] transition-colors duration-700">
                Premium front-end interfaces engineered for exceptional speed and cinematic aesthetics.
              </p>
            </div>
          </div>

          {/* Data Layer - Medium Box */}
          <div 
            ref={el => { cardsRef.current[2] = el; }}
            className="group relative flex-1 flex flex-col justify-center gap-6 bg-[#0A0A0A] border border-[#151515] p-8 md:p-10 overflow-hidden hover:border-[#555] transition-colors duration-700 rounded-sm"
          >
            {/* Data Stream Gradient on Hover */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(85,85,85,0.05)_50%,transparent_100%)] bg-[length:100%_200%] bg-top group-hover:bg-bottom transition-all duration-1000 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#555] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 pointer-events-none" />
            
            <Database strokeWidth={1} className="w-10 h-10 text-[#555] group-hover:text-[#858585] group-hover:scale-110 transition-all duration-500" />
            
            <div className="relative z-10">
              <span className="text-[9px] font-inter tracking-[0.3em] text-[#858585] uppercase block mb-3 group-hover:text-[#A5A5A5] transition-colors duration-700">
                03 // DATA LAYER
              </span>
              <h3 className="text-xl md:text-2xl font-abeezee text-[#F5F0E6] tracking-tighter mb-4 uppercase">
                AUTOMATION WORKFLOWS
              </h3>
              <p className="text-[10px] md:text-[11px] font-inter text-[#858585] tracking-[0.15em] leading-loose group-hover:text-[#A5A5A5] transition-colors duration-700">
                The invisible backbone. Secure data pipelines and robust automated workflows.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
