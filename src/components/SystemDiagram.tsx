"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Layers, Database, Activity } from "lucide-react";
import { div } from "three/src/nodes/math/OperatorNode.js";

export default function SystemDiagram() {
  const containerRef = useRef<HTMLElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      }
    });

    // Animate Nodes popping in
    tl.fromTo(nodesRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out(1.5)" }
    );

    // Animate SVG Lines drawing in
    if (linesRef.current) {
      const paths = linesRef.current.querySelectorAll("path");
      tl.fromTo(paths,
        { strokeDasharray: "1000", strokeDashoffset: "1000" },
        { strokeDashoffset: "0", duration: 1.5, stagger: 0.3, ease: "power2.inOut" },
        "-=1"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="system"
      ref={containerRef}
      className="relative min-h-[70vh] lg:min-h-[120vh] w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden z-20 border-t border-[#151515] pt-24 pb-48 md:py-32"
    >
      {/* Background Matrix */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9E8557 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#050505_80%)] z-0 pointer-events-none" />

      {/* Typography Header */}
      <div className="relative w-full max-w-[1400px] px-6 md:px-12 z-30 mb-12 flex flex-col items-center text-center">
        <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-6 animate-pulse">
          THE ARCHITECTURE
        </span>
        <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-abeezee font-light leading-[0.9] text-[#F5F0E6] uppercase tracking-tighter mix-blend-difference mb-8">
          UNIFIED <span className="italic text-[#9E8557]">SYSTEMS.</span>
        </h2>
        <p className="text-[10px] md:text-[12px] font-inter text-[#858585] tracking-[0.2em] max-w-2xl leading-loose uppercase border-t border-[#151515] pt-8">
          A highly orchestrated architecture. Interfaces react, platforms scale, and data flows seamlessly in perfect synchrony.
        </p>
      </div>

      {/* The Diagram Area */}
      <div className="relative z-10 mx-auto flex items-center justify-center w-full overflow-hidden h-[450px] sm:h-[600px] md:h-[800px] lg:h-[1000px] lg:overflow-visible mt-12 lg:mt-32">
        <div className="relative w-[1600px] h-[1600px] shrink-0 flex items-center justify-center scale-[0.25] sm:scale-[0.40] md:scale-[0.55] lg:scale-[0.70] xl:scale-[0.90] 2xl:scale-100 origin-center">

          {/* Animated Connection Lines (SVG) */}
          <svg ref={linesRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: "drop-shadow(0px 0px 8px rgba(158,133,87,0.4))" }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9E8557" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F5F0E6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#9E8557" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Orbital Ring Track */}
            <circle cx="800" cy="800" r="600" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10 10" className="animate-[spin_40s_linear_infinite_reverse] origin-[800px_800px]" />
            <circle cx="800" cy="800" r="600" fill="none" stroke="#9E8557" strokeWidth="1" strokeOpacity="0.3" className="origin-[800px_800px]" />

            {/* Central Core Connection */}
            <circle cx="800" cy="800" r="280" fill="none" stroke="#151515" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite] origin-[800px_800px]" />
            <circle cx="800" cy="800" r="220" fill="none" stroke="#9E8557" strokeWidth="1" strokeOpacity="0.2" className="animate-[spin_15s_linear_infinite_reverse] origin-[800px_800px]" />
          </svg>

          {/* Central Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40 h-40 flex items-center justify-center pointer-events-none" style={{ WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 80%)', maskImage: 'radial-gradient(circle, black 65%, transparent 80%)' }}>
            <div className="w-full h-full bg-[url('/fd-logo-gold.png')] bg-contain bg-center bg-no-repeat mix-blend-screen opacity-90" />
          </div>

          {/* Circular Orbit Wrappers */}
          {[
            { num: "01", layer: "ARCHITECTURE LAYER", title: "PREMIUM WEBSITE DEVELOPMENT", desc: "Custom, responsive websites designed to present your brand clearly and build trust.", delay: "0s" },
            { num: "02", layer: "EVOLUTION LAYER", title: "WEBSITE REDESIGN & MODERNIZATION", desc: "Transform outdated websites into modern premium digital experiences.", delay: "-5s" },
            { num: "03", layer: "INTELLIGENCE LAYER", title: "AI-POWERED DIGITAL EXPERIENCES", desc: "Intelligent web features designed to assist users and enhance interactions.", delay: "-10s" },
            { num: "04", layer: "DISCOVERY LAYER", title: "SEO & GOOGLE VISIBILITY", desc: "Foundational search optimization that helps search engines understand your website.", delay: "-15s" },
            { num: "05", layer: "CREATIVE LAYER", title: "AI CREATIVE & CONTENT", desc: "AI-assisted visuals and content concepts created to support modern marketing.", delay: "-20s" },
            { num: "06", layer: "GROWTH LAYER", title: "WEBSITE MAINTENANCE & GROWTH", desc: "Continuous website development and performance optimization.", delay: "-25s" },
            { num: "07", layer: "AUTOMATION LAYER", title: "AI AUTOMATION", desc: "Intelligent AI-powered workflows that automate repetitive business processes and connect your tools.", delay: "-30s" },
            { num: "08", layer: "AUTONOMOUS LAYER", title: "AGENTIC AI", desc: "Intelligent AI agents that understand tasks, make decisions, and take actions to complete workflows.", delay: "-35s" }
          ].map((node, i) => (
            <div key={i} className="absolute inset-0 pointer-events-none" style={{ animation: 'spin 40s linear infinite', animationDelay: node.delay }}>
              <div
                className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] pointer-events-auto"
                style={{ animation: 'spin 40s linear infinite reverse', animationDelay: node.delay }}
              >
                <div
                  ref={el => { nodesRef.current[i] = el; }}
                  className="w-full h-full bg-gradient-to-br from-[#0A0A0A]/90 to-[#050505]/90 backdrop-blur-xl border border-[#1A1A1A] rounded-[30px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#9E8557]/50 hover:-translate-y-4 transition-all duration-700 group z-10 flex flex-col justify-between overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,_rgba(158,133,87,0.2)_0%,_transparent_70%)] blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Bottom Right FD Logo */}
                  <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-[url('/fd-logo-gold.png')] bg-contain bg-no-repeat opacity-[0.15] lg:opacity-[0.05] group-hover:opacity-[0.15] mix-blend-screen transition-all duration-700 pointer-events-none z-0" />

                  <div>
                    <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10 block">{node.num} // {node.layer}</span>
                    <h3 className="text-3xl md:text-4xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 relative z-10">{node.title}</h3>
                  </div>
                  <p className="text-[11px] md:text-[12px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-[2] uppercase relative z-10">
                    {node.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

    </section >
  );
}
