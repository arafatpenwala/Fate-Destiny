"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutEthos() {
  const containerRef = useRef<HTMLElement>(null);
  const textFillRef = useRef<HTMLHeadingElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Scroll for 1.5x the viewport height
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    if (textFillRef.current) {
      tl.fromTo(textFillRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "none" }
      );
    }

    if (rightColumnRef.current) {
      tl.fromTo(rightColumnRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "<"
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
      className="relative w-full min-h-[100dvh] py-24 bg-[#050505] flex items-center justify-center px-6 md:px-12 lg:px-24 z-20 overflow-hidden border-t border-[#151515]"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 items-center justify-center h-full py-12 md:py-0">
        
        {/* Left Side: Scrubbed Text Reveal */}
        <div className="w-full lg:w-3/5 flex flex-col relative justify-center h-auto lg:h-full">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-4 lg:mb-8 opacity-50">
            THE ATELIER
          </span>
          
          <div className="relative">
            {/* Outline Text (Always Visible) */}
            <h2 className="text-[2.25rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-abeezee font-light leading-[1] text-transparent uppercase tracking-tighter" style={{ WebkitTextStroke: '1px rgba(245,240,230,0.1)' }}>
              WHERE DIGITAL<br />
              EXPERIENCE MEETS<br />
              INTELLIGENT<br />
              TECHNOLOGY.
            </h2>
            
            {/* Filled Text (Revealed on Scroll) */}
            <h2 
              ref={textFillRef}
              aria-hidden="true"
              className="absolute top-0 left-0 w-full text-[2.25rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter pointer-events-none"
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              WHERE DIGITAL<br />
              <span className="text-[#9E8557]">EXPERIENCE MEETS</span><br />
              INTELLIGENT<br />
              TECHNOLOGY.
            </h2>
          </div>
        </div>

        {/* Right Side: Philosophy (Fades in on scrub) */}
        <div 
          ref={rightColumnRef}
          className="w-full lg:w-2/5 flex flex-col justify-center h-auto lg:h-full gap-4 sm:gap-6 lg:gap-8"
        >
          <div className="w-12 md:w-16 h-[1px] bg-[#9E8557]/50 mb-2 md:mb-4" />
          
          <p className="text-[13px] md:text-[15px] lg:text-[13px] xl:text-[16px] font-inter text-[#F5F0E6] tracking-[0.1em] leading-[2] md:leading-[2.2] uppercase">
            FATE&DESTINY combines premium web development, automation, and AI to help businesses create stronger digital experiences and smarter operations.
          </p>
        </div>

      </div>
    </section>
  );
}
