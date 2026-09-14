"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutEthos() {
  const containerRef = useRef<HTMLElement>(null);
  const textFillRef = useRef<HTMLSpanElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    // Pin the entire section and scrub the animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Scroll for 1.5x the viewport height
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate the text fill (clip-path reveal from bottom to top)
    if (textFillRef.current) {
      tl.fromTo(textFillRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "none" }
      );
    }

    // Simultaneously fade and slide in the right column content
    if (rightColumnRef.current) {
      tl.fromTo(rightColumnRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "<" // Start at the same time as the text reveal
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] flex items-center justify-center px-6 md:px-12 lg:px-24 z-20 overflow-hidden border-t border-[#151515]"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center h-full">
        
        {/* Left Side: Scrubbed Text Reveal */}
        <div className="w-full lg:w-3/5 flex flex-col relative justify-center h-full">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-8 opacity-50">
            01 // THE ATELIER
          </span>
          
          <div className="relative">
            {/* Outline Text (Always Visible) */}
            <h2 className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-abeezee font-light leading-[0.9] text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: '1px rgba(245,240,230,0.1)' }}>
              WE ENGINEER <br />
              DIGITAL <br />
              DOMINANCE.
            </h2>
            
            {/* Filled Text (Revealed on Scroll) */}
            <span 
              ref={textFillRef}
              className="absolute top-0 left-0 text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-abeezee font-light leading-[0.9] text-[#F5F0E6] uppercase tracking-tighter"
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              WE ENGINEER <br />
              <span className="text-[#9E8557]">DIGITAL</span> <br />
              DOMINANCE.
            </span>
          </div>
        </div>

        {/* Right Side: Philosophy (Fades in on scrub) */}
        <div 
          ref={rightColumnRef}
          className="w-full lg:w-2/5 flex flex-col justify-center h-full gap-8"
        >
          <div className="w-16 h-[1px] bg-[#9E8557]/50 mb-4" />
          
          <p className="text-[14px] md:text-[16px] font-inter text-[#F5F0E6] tracking-[0.1em] leading-[2.2] uppercase">
            Fate & Destiny is not an agency. We are a private digital atelier operating at the bleeding edge of software engineering and artificial intelligence.
          </p>
          
          <p className="text-[12px] md:text-[14px] font-inter text-[#858585] tracking-[0.1em] leading-[2] uppercase">
            We partner exclusively with visionaries who refuse to settle for mediocrity. Our systems are bespoke, our code is ruthless, and our designs are engineered to obliterate the competition. 
          </p>


        </div>

      </div>
    </section>
  );
}
