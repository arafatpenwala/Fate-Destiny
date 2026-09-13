"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FateEngine from "./FateEngine";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !engineRef.current || !textRef.current || !overlayRef.current) return;

    if (!prefersReducedMotion) {
      // Initial load animation
      const tlIn = gsap.timeline({ defaults: { ease: "power3.out", duration: 2 } });
      
      tlIn.fromTo(textRef.current.children, 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 1.2 }
      )
      .fromTo(engineRef.current,
        { scale: 1.1, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 3 },
        "-=2"
      );

      // Scroll transformation (pinned overlap)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false, // Allows next section to overlap!
        }
      });

      tlScroll.to(textRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.95,
        ease: "power1.inOut",
      }, 0)
      .to(engineRef.current, {
        scale: 0.75,
        y: 100,
        opacity: 0.1,
        ease: "power1.inOut",
      }, 0)
      .to(overlayRef.current, {
        opacity: 1,
        ease: "none",
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#050505] pt-20"
    >
      {/* Scroll Overlay Mask (darkens hero on scroll as next section comes up) */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#050505] z-30 opacity-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.1)_0%,_transparent_50%)] blur-3xl pointer-events-none mix-blend-screen" />
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between z-10 relative">
        
        {/* Visual Centerpiece (Moved to background conceptually for extreme overlap) */}
        <div ref={engineRef} className="absolute inset-0 flex justify-center lg:justify-end lg:pr-24 items-center z-0 opacity-70">
          <FateEngine />
        </div>

        {/* Typography */}
        <div ref={textRef} className="w-full px-6 md:px-12 flex flex-col z-20 h-full justify-center lg:justify-end pb-20 lg:pb-32 pointer-events-none">
          <div className="mb-6 pointer-events-auto">
            <span className="inline-block text-[9px] md:text-[10px] font-inter tracking-[0.3em] text-[#9E8557] uppercase font-light">
              Independent Digital Systems Studio
            </span>
          </div>

          <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] font-abeezee font-light leading-[0.9] mb-12 text-[#F5F0E6] uppercase tracking-tighter mix-blend-difference pointer-events-auto">
            We Build <br />
            <span className="italic text-[#9E8557] pr-4">What The Future</span> <br />
            Has Not Imagined.
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full lg:w-4/5 gap-10 pointer-events-auto">
            <p className="text-[#9B9B9B] font-inter font-light text-[11px] md:text-xs max-w-sm leading-loose tracking-wide">
              Websites, intelligent automations, and AI agents designed to move ambitious businesses forward. Precision engineered.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              <button className="group relative overflow-hidden rounded-none border border-[#9E8557]/30 bg-[#050505]/50 backdrop-blur-md px-10 py-5 transition-all duration-700 hover:border-[#9E8557] hover:bg-[#9E8557]">
                <span className="relative z-10 text-[9px] md:text-[10px] font-inter tracking-[0.3em] text-[#F5F0E6] transition-colors duration-500 group-hover:text-[#050505] uppercase font-medium">
                  Start a Project
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-6 z-20">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-[#9E8557]" strokeWidth={1.5} />
        </motion.div>
        <span className="text-[8px] font-inter tracking-[0.4em] text-[#9B9B9B] uppercase">Scroll to Discover</span>
      </div>
    </section>
  );
}
