"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Diamond, Cpu, ShieldCheck } from "lucide-react";

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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-[#050505]">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-[#9E8557]/10 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-[#9E8557]/5 rounded-full blur-[100px] opacity-50" />

          {/* Luxury Dot Grid */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#9E8557 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

          {/* Massive Typographic Watermark */}
          <h2 className="text-[12vw] font-abeezee font-bold uppercase text-[#0A0A0A] leading-[0.8] text-center tracking-tighter mix-blend-screen z-10 select-none">
            THE<br/>DIFFERENCE
          </h2>
          
          {/* Vignette Fade */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#050505_100%)] z-20" />
        </div>

        <div className="absolute top-12 left-6 md:left-12 z-20">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase bg-[#050505]/80 px-4 py-2 rounded-full border border-[#9E8557]/30 backdrop-blur-md">
            07 // THE DIFFERENCE
          </span>
        </div>

        {/* Cards Container */}
        <div className="relative w-full max-w-[900px] h-[60vh] md:h-[70vh] z-10 perspective-[1200px]">
          
          {/* Card 1: Design */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full border-t border-l border-r border-[#9E8557]/30 bg-[#0A0A0A]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-between shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9E8557]/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#9E8557 1px, transparent 1px), linear-gradient(90deg, #9E8557 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="absolute top-0 right-0 p-12 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
              <Diamond size={100} strokeWidth={0.5} color="#9E8557" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#858585] uppercase mb-6 block">
                PILLAR 01
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter leading-none mb-6">
                DISTINCTIVE <br/> <span className="text-[#9E8557] italic">BY DESIGN</span>
              </h3>
            </div>
            <div className="relative z-10 max-w-md border-l border-[#9E8557]/40 pl-6">
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-[2.2] uppercase">
                Every experience feels intentional, memorable, and unique. We do not use templates; we art-direct digital environments that elevate your brand far beyond the ordinary.
              </p>
            </div>
          </div>

          {/* Card 2: Intelligence */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full border-t border-l border-r border-[#9E8557]/30 bg-[#0A0A0A]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-between shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9E8557]/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#9E8557 1px, transparent 1px), linear-gradient(90deg, #9E8557 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="absolute top-0 right-0 p-12 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
              <Cpu size={100} strokeWidth={0.5} color="#9E8557" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#858585] uppercase mb-6 block">
                PILLAR 02
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter leading-none mb-6">
                INTELLIGENT <br/> <span className="text-[#9E8557] italic">BY NATURE</span>
              </h3>
            </div>
            <div className="relative z-10 max-w-md border-l border-[#9E8557]/40 pl-6">
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-[2.2] uppercase">
                We integrate AI and automation deeply into our solutions. We don&apos;t just build static websites; we create autonomous capabilities that adapt, reason, and work for you.
              </p>
            </div>
          </div>

          {/* Card 3: Engineering */}
          <div className="difference-card absolute inset-x-0 bottom-0 h-full border-t border-l border-r border-[#9E8557]/30 bg-[#0A0A0A]/60 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-between shadow-[0_-30px_80px_rgba(0,0,0,0.9)] overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9E8557]/20 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#9E8557 1px, transparent 1px), linear-gradient(90deg, #9E8557 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="absolute top-0 right-0 p-12 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
              <ShieldCheck size={100} strokeWidth={0.5} color="#9E8557" />
            </div>
            
            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#858585] uppercase mb-6 block">
                PILLAR 03
              </span>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter leading-none mb-6">
                ENGINEERED <br/> <span className="text-[#9E8557] italic">FOR IMPACT</span>
              </h3>
            </div>
            <div className="relative z-10 max-w-md border-l border-[#9E8557]/40 pl-6">
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-[2.2] uppercase">
                Thoughtful design requires rigorous execution. Our systems are built on enterprise-grade architecture—designed to scale instantly, perform flawlessly, and remain highly secure.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
