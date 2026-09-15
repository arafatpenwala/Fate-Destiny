"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AbstractLogo from "./AbstractLogo";

export default function WhyFateDestiny() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.difference-card') as HTMLElement[];
    
    // Set initial states: Card 1 is visible, Card 2 and 3 are pushed down
    gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1, y: 0 });
    gsap.set(cards[1], { yPercent: 120, opacity: 0, scale: 0.9, y: 0 });
    gsap.set(cards[2], { yPercent: 120, opacity: 0, scale: 0.9, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Enter Card 2, Push Card 1 Back
    tl.to(cards[0], { scale: 0.95, opacity: 0.6, y: -30, duration: 1 }, "card2")
      .to(cards[1], { yPercent: 0, opacity: 1, scale: 1, duration: 1 }, "card2");

    // Enter Card 3, Push Card 1 & 2 Back
    tl.to(cards[0], { scale: 0.90, opacity: 0.3, y: -60, duration: 1 }, "card3")
      .to(cards[1], { scale: 0.95, opacity: 0.6, y: -30, duration: 1 }, "card3")
      .to(cards[2], { yPercent: 0, opacity: 1, scale: 1, duration: 1 }, "card3");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="why-us"
      ref={containerRef}
      className="relative w-full h-[300vh] bg-[#050505] border-t border-[#151515] z-20"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-24 pb-12 px-6">
        
        {/* Premium Background Design */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
          
          {/* Animated Glow Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_60%)] blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(158,133,87,0.1)_0%,_transparent_60%)] blur-[120px] animate-[pulse_12s_ease-in-out_infinite_reverse]" />

          {/* Architectural Moving Grid Lines */}
          <div className="absolute inset-0 animate-grid-scroll" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(158,133,87,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(158,133,87,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />

          {/* Animated Sweeping Light Beam */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(158,133,87,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-sweep" />

          {/* Massive Geometric Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
             <AbstractLogo className="w-[120vw] md:w-[80vw] h-auto text-[#9E8557] opacity-30 animate-[spin_60s_linear_infinite] drop-shadow-[0_0_50px_rgba(158,133,87,0.5)]" />
          </div>
          
          {/* Dark Vignette Fade */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#050505_100%)] z-20" />
        </div>

        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase bg-[#050505]/80 px-4 py-2 rounded-full border border-[#9E8557]/30 backdrop-blur-md">
            THE DIFFERENCE
          </span>
        </div>

        {/* Cards Container */}
        <div className="relative w-full max-w-[900px] h-[60vh] md:h-[70vh] z-10 perspective-[1200px]">
          
          {/* Card 1: Design */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full bg-gradient-to-br from-[#0A0A0A]/70 to-[#050505]/70 backdrop-blur-3xl rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 01
              </span>
              <h3 className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                DISTINCTIVE <br/> <span className="text-[#9E8557] italic">BY DESIGN</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                EVERY EXPERIENCE FEELS INTENTIONAL, MEMORABLE, AND UNIQUE. WE DO NOT USE TEMPLATES; WE ART-DIRECT DIGITAL ENVIRONMENTS THAT ELEVATE YOUR BRAND FAR BEYOND THE ORDINARY.
              </p>
            </div>
          </div>

          {/* Card 2: Intelligence */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full bg-gradient-to-br from-[#0A0A0A]/70 to-[#050505]/70 backdrop-blur-3xl rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 02
              </span>
              <h3 className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                INTELLIGENT <br/> <span className="text-[#9E8557] italic">BY NATURE</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                WE INTEGRATE AI AND AUTOMATION DEEPLY INTO OUR SOLUTIONS. WE DON&apos;T JUST BUILD STATIC WEBSITES; WE CREATE AUTONOMOUS CAPABILITIES THAT ADAPT, REASON, AND WORK FOR YOU.
              </p>
            </div>
          </div>

          {/* Card 3: Engineering */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full bg-gradient-to-br from-[#0A0A0A]/70 to-[#050505]/70 backdrop-blur-3xl rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 03
              </span>
              <h3 className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                ENGINEERED <br/> <span className="text-[#9E8557] italic">FOR IMPACT</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                THOUGHTFUL DESIGN REQUIRES RIGOROUS EXECUTION. OUR SYSTEMS ARE BUILT ON ENTERPRISE-GRADE ARCHITECTURE—DESIGNED TO SCALE INSTANTLY, PERFORM FLAWLESSLY, AND REMAIN HIGHLY SECURE.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
