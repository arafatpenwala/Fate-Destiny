"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current || prefersReducedMotion) return;

    // We do not need heavy scroll triggers here because the CSS sticky bottom-0 
    // will naturally reveal this section from underneath as the user scrolls past Process.
    // We just add a subtle parallax scale to the text as it is revealed.
    gsap.fromTo(
      textRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="relative h-[80vh] w-full flex flex-col justify-center bg-[#000000] px-6 md:px-12 py-32 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen">
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.15)_0%,_transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row justify-between items-center gap-20 h-full">
        <div ref={textRef} className="w-full md:w-2/3 flex flex-col justify-center">
          <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-abeezee font-light leading-[0.9] uppercase tracking-tighter text-[#F5F0E6] mb-12 mix-blend-difference">
            Let's Build <br />
            <span className="italic text-[#9E8557] pr-4">Your Next</span> <br />
            Advantage.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center mt-8">
            <button className="group relative overflow-hidden rounded-none border border-[#9E8557]/30 bg-[#050505]/50 backdrop-blur-md px-12 py-6 transition-all duration-700 hover:border-[#9E8557] hover:bg-[#9E8557]">
              <span className="relative z-10 text-[9px] md:text-[10px] font-inter tracking-[0.3em] text-[#F5F0E6] transition-colors duration-500 group-hover:text-[#050505] uppercase font-medium">
                Start a Conversation
              </span>
            </button>
            <p className="text-[10px] md:text-[11px] font-inter text-[#666] font-light max-w-[250px] leading-relaxed">
              Have an ambitious idea, a complex workflow, or a system that should work smarter?
            </p>
          </div>
        </div>
        
        {/* Abstract echo of the Fate Engine closing the loop */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end opacity-50">
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-[#151515] flex items-center justify-center relative overflow-hidden mix-blend-screen">
            <div className="absolute inset-0 bg-transparent z-0" />
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#9E8557]/10 animate-[spin_30s_linear_infinite] z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9E8557] shadow-[0_0_15px_#9E8557] absolute top-0 -translate-y-1/2" />
            </div>
            <div className="absolute w-[1px] h-[150%] bg-gradient-to-b from-transparent via-[#151515] to-transparent z-0" />
            <div className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#151515] to-transparent z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
