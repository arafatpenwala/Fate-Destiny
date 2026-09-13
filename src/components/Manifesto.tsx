"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current || !lineRef.current) return;

    if (!prefersReducedMotion) {
      // Save original text
      const originalText = "THE FUTURE DOES NOT ARRIVE. IT IS DESIGNED.";
      const words = originalText.split(" ");
      
      // Clear and rebuild with masking spans for clip-path reveal
      textRef.current.innerHTML = "";
      words.forEach((word) => {
        // Outer mask container
        const maskSpan = document.createElement("span");
        maskSpan.style.display = "inline-block";
        maskSpan.style.overflow = "hidden";
        maskSpan.style.verticalAlign = "bottom";
        maskSpan.style.paddingRight = "0.2em"; // spacing between words
        
        // Inner animating text
        const innerSpan = document.createElement("span");
        innerSpan.innerHTML = word;
        innerSpan.style.display = "inline-block";
        innerSpan.style.transform = "translateY(100%)";
        innerSpan.style.opacity = "0";
        
        maskSpan.appendChild(innerSpan);
        textRef.current!.appendChild(maskSpan);
      });

      const spans = textRef.current.querySelectorAll("span > span");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Start animating when section is somewhat in view
          end: "center center",
          scrub: 1.5,
        }
      });

      tl.to(spans, {
        y: "0%",
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
      })
      .to(lineRef.current, {
        scaleY: 1,
        ease: "power3.inOut",
      }, "-=0.5"); // Overlap slightly with text animation
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="manifesto"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] px-6 md:px-12 py-32 overflow-hidden z-20 shadow-[0_-20px_50px_rgba(5,5,5,1)]"
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.05)_0%,_transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        <h2 
          ref={textRef} 
          className="text-4xl md:text-5xl lg:text-[5.5rem] font-abeezee font-light leading-[1.1] text-[#F5F0E6] uppercase tracking-[0.02em]"
        >
          {/* Text is injected via JS if motion enabled */}
          THE FUTURE DOES NOT ARRIVE. IT IS DESIGNED.
        </h2>
        
        <div className="mt-32 flex justify-center w-full">
          <div className="w-[1px] h-48 bg-[#151515] relative overflow-hidden">
            <div 
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full bg-[#9E8557] origin-top scale-y-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
