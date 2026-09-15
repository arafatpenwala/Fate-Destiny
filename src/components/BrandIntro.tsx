"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandIntro() {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Pin for extra scroll distance
        pin: true,
        scrub: 1,
      }
    });

    // Words start scattered (defined in CSS/initial state). Let&apos;s animate them to their final cohesive position.
    // We will set their initial scattered states via GSAP set, then animate to 0.
    gsap.set(wordsRef.current[0], { x: -500, y: -300, scale: 3, rotate: -20, opacity: 0 }); // WE
    gsap.set(wordsRef.current[1], { x: 500, y: -400, scale: 2.5, rotate: 15, opacity: 0 }); // BUILD
    gsap.set(wordsRef.current[2], { x: -600, y: 300, scale: 4, rotate: 30, opacity: 0 }); // WHAT
    gsap.set(wordsRef.current[3], { x: 400, y: 400, scale: 2, rotate: -10, opacity: 0 }); // COMES
    gsap.set(wordsRef.current[4], { x: 0, y: 500, scale: 5, rotate: 45, opacity: 0 }); // NEXT.

    // Pull them all into place
    tl.to(wordsRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power3.inOut",
      duration: 2
    });

    // Shoot the gold line through
    tl.fromTo(lineRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, transformOrigin: "left", ease: "power4.out", duration: 1 },
      "-=0.5"
    );

    // Fade in subtext
    tl.fromTo(subTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

    // Hold for a moment before unpinning
    tl.to({}, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="intro"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center bg-[#050505] overflow-hidden z-20 border-t border-[#151515]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#F5F0E6 1px, transparent 1px), linear-gradient(90deg, #F5F0E6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Vertical Label */}
      <div className="absolute top-1/4 left-6 md:left-12 -rotate-90 origin-left hidden lg:block opacity-50 z-10">
        <span className="text-[8px] font-inter tracking-[0.4em] text-[#9E8557] uppercase">
          THE VISION
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Scattered Typography Lockup */}
        <h2 className="text-[3.5rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[8rem] font-abeezee font-light leading-[0.9] text-[#F5F0E6] uppercase tracking-tighter text-center flex flex-wrap justify-center gap-x-4 md:gap-x-8 max-w-5xl">
          <span ref={el => { wordsRef.current[0] = el; }} className="inline-block">WE</span>
          <span ref={el => { wordsRef.current[1] = el; }} className="inline-block text-[#9E8557]">BUILD</span>
          <span ref={el => { wordsRef.current[2] = el; }} className="inline-block">WHAT</span>
          <span ref={el => { wordsRef.current[3] = el; }} className="inline-block">COMES</span>
          <span ref={el => { wordsRef.current[4] = el; }} className="inline-block">NEXT.</span>
        </h2>

        {/* Separator Line */}
        <div className="w-full max-w-3xl h-[1px] bg-[#151515] mt-12 mb-12 relative overflow-hidden">
          <div ref={lineRef} className="absolute top-0 left-0 h-full w-full bg-[#9E8557] scale-x-0" />
        </div>
        
        {/* Subtext */}
        <div className="w-full flex justify-center">
          <p 
            ref={subTextRef}
            className="text-[11px] md:text-xs font-inter text-[#9B9B9B] tracking-[0.2em] uppercase max-w-[500px] leading-[2.2] text-center opacity-0"
          >
            FATE&DESTINY transforms ambitious ideas into intelligent digital experiences, powerful web applications, and automated systems designed for the future.
          </p>
        </div>
      </div>
    </section>
  );
}
