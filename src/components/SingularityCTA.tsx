"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function SingularityCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Spotlight state
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    
    // Spotlight Logic
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });

    // Magnetic Button Logic
    if (buttonRef.current && buttonContainerRef.current) {
      const btnRect = buttonContainerRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      
      // If cursor is within 150px of the button center
      if (Math.abs(distX) < 150 && Math.abs(distY) < 150) {
        // Move button slightly towards cursor
        gsap.to(buttonRef.current, {
          x: distX * 0.4,
          y: distY * 0.4,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        // Reset button position
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setSpotlightPos({ x: 50, y: 50 }); // Center spotlight
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sectionRef.current || !lineRef.current || !textRef.current || prefersReducedMotion) return;

    // Cinematic Reveal Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    // 1. Golden line drops down
    tl.fromTo(lineRef.current, 
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1, ease: "expo.inOut", transformOrigin: "top center" }
    );

    // 2. Line expands into a glow (Bloom)
    tl.to(lineRef.current, {
      scaleX: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut"
    });

    // 3. Text slowly fades in
    tl.fromTo(textRef.current,
      { opacity: 0, filter: "blur(20px)", y: 50 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 2, ease: "power2.out" },
      "-=0.5"
    );

    // 4. Button fades in
    if (buttonContainerRef.current) {
      tl.fromTo(buttonContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=1.5"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden z-20 border-t border-[#151515] py-32 cursor-crosshair"
    >
      
      {/* Dynamic Cursor Spotlight (Overlay) */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-80"
        style={{
          background: `radial-gradient(circle 600px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(158,133,87,0.4) 0%, transparent 80%)`,
          transition: "background 0.2s ease"
        }}
      />
      
      {/* Background ambient glow (Singularity Core) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.03)_0%,_transparent_70%)] rounded-full blur-[50px]" />
      </div>

      {/* The Reveal Line */}
      <div 
        ref={lineRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[#9E8557] to-transparent z-0 pointer-events-none"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto">
        
        <h2 
          ref={textRef}
          className="text-[4rem] md:text-[8rem] lg:text-[11rem] font-abeezee font-light leading-[0.85] text-transparent uppercase tracking-tighter mb-16 mix-blend-plus-lighter"
          style={{
            WebkitTextStroke: "1px rgba(245, 240, 230, 0.1)",
            backgroundImage: "linear-gradient(180deg, #F5F0E6 0%, rgba(245, 240, 230, 0.2) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          THE NEXT <br />
          <span className="text-[#9E8557]" style={{ backgroundImage: "none", WebkitTextStroke: "0px" }}>ERA OF</span> <br />
          DIGITAL.
        </h2>

        {/* Magnetic Button Container */}
        <div ref={buttonContainerRef} className="p-8">
          <a 
            ref={buttonRef}
            href="#contact"
            className="group relative flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border border-[#9E8557]/30 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:border-[#9E8557] hover:bg-[#151515]"
          >
            {/* Magnetic Button Sweep */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9E8557]/20 to-transparent translate-y-[100%] group-hover:translate-y-[50%] transition-transform duration-700 ease-out" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="text-[#F5F0E6] text-[10px] md:text-xs font-inter tracking-[0.3em] uppercase group-hover:text-[#9E8557] transition-colors duration-500">
                Initiate
              </span>
              <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center group-hover:bg-[#9E8557] group-hover:border-[#9E8557] transition-all duration-500">
                <ArrowRight size={16} className="text-[#858585] group-hover:text-[#050505] transition-colors duration-500" />
              </div>
            </div>
            
            {/* Soft inner glow */}
            <div className="absolute inset-2 border border-[#F5F0E6]/5 rounded-full pointer-events-none" />
          </a>
        </div>
        
      </div>
    </section>
  );
}
