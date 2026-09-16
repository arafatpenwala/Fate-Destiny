"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FateEngine from "./FateEngine";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Entrance animation refs
  const engineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll animation refs
  const engineScrollRef = useRef<HTMLDivElement>(null);
  const textScrollRef = useRef<HTMLDivElement>(null);
  const ctaScrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !engineRef.current || !textRef.current || !engineScrollRef.current || !textScrollRef.current) return;

    if (!prefersReducedMotion) {
      // Initial load animation (animates the inner elements)
      const tlIn = gsap.timeline({ defaults: { ease: "expo.out", duration: 2.5 } });
      
      tlIn.fromTo(textRef.current.children, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, delay: 1 }
      )
      .fromTo(engineRef.current,
        { scale: 1.05, opacity: 0, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 4, ease: "power2.out" },
        "-=2.5"
      );

      // Scroll transformation (animates the wrapper elements)
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: true,
          pinSpacing: false, // Allows next section to overlap!
        }
      });

      tlScroll.to(textScrollRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.98,
        ease: "power1.inOut",
      }, 0)
      .to(engineScrollRef.current, {
        scale: 0.8,
        y: 100,
        opacity: 0.1,
        ease: "power2.inOut",
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



      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between z-10 relative">
        
        {/* Visual Centerpiece (Moved to background conceptually for extreme overlap) */}
        <div ref={engineScrollRef} className="absolute inset-0 flex justify-center lg:justify-end lg:pr-32 items-center z-0 opacity-80">
          <div ref={engineRef} className="w-full h-full flex justify-center items-center">
            <FateEngine />
          </div>
        </div>

        {/* Editorial Typography */}
        <div ref={textScrollRef} className="w-full px-6 md:px-12 flex flex-col z-20 h-full justify-center lg:justify-end pb-16 lg:pb-32 pointer-events-none mix-blend-difference">
          <div ref={textRef}>
            <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-abeezee font-light leading-[1.1] md:leading-[0.95] mb-8 lg:mb-12 text-[#F4EFE5] uppercase tracking-tighter">
              We Build <br />
              <span className="italic text-[#C5A46D] pr-4">What The Future</span> <br className="hidden md:block" />
              Has Not Imagined.
            </h1>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full lg:w-4/5 gap-6 lg:gap-10">
              <p className="text-[#858585] font-inter font-light text-[10px] sm:text-[11px] md:text-xs max-w-xs md:max-w-sm leading-loose tracking-wide uppercase">
                Premium websites, digital experiences, and AI-enhanced web solutions engineered for ambitious businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-6 z-20">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={12} className="text-[#C5A46D]" strokeWidth={1} />
        </motion.div>
        <span className="text-[8px] font-inter tracking-[0.4em] text-[#858585] uppercase hidden sm:block">
          Scroll
        </span>
      </div>
    </section>
  );
}
