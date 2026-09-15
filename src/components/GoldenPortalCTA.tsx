"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function GoldenPortalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const portalGroupRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portalGroupRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;
    
    // Smooth 3D tilt
    gsap.to(portalGroupRef.current, {
      rotateY: xPos * 15,
      rotateX: -yPos * 15,
      duration: 1.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!portalGroupRef.current) return;
    gsap.to(portalGroupRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 2,
      ease: "power3.out"
    });
  };

  useEffect(() => {
    // Keep the rotating animations (they are CSS based)
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[60vh] md:h-[80vh] bg-[#050505] overflow-hidden z-30"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "2000px" }}
    >
      <div 
        ref={stickyRef}
        className="absolute inset-0 w-full h-full bg-[#050505]"
      >
        
        {/* The 3D Scene */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            ref={portalGroupRef}
            className="relative flex items-center justify-center shrink-0 w-[95vw] h-[95vw] md:w-[100vw] md:h-[100vw] max-w-[1500px] max-h-[1500px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            {/* Layer 1: Outer Massive Ring (Spins very slowly) */}
            <div className="absolute inset-0 rounded-full border-[1px] border-[#9E8557]/20 animate-[spin_60s_linear_infinite]" style={{ transform: "translateZ(-1000px)" }}>
              <div className="absolute inset-4 rounded-full border-[20px] border-dashed border-[#9E8557]/10" />
            </div>

            {/* Layer 2: Glowing Middle Arch */}
            <div className="absolute inset-[10%] rounded-full shadow-[0_0_150px_rgba(158,133,87,0.15)] animate-[spin_40s_linear_infinite_reverse]" style={{ transform: "translateZ(-800px)" }}>
              <div className="absolute inset-0 rounded-full border border-[#9E8557]/40" style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(158,133,87,0.1) 25%, transparent 50%, rgba(158,133,87,0.1) 75%, transparent 100%)" }} />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#9E8557] rounded-full blur-sm" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#9E8557] rounded-full blur-sm" />
            </div>

            {/* Layer 3: Solid Metallic Inner Ring */}
            <div className="absolute inset-[25%] rounded-full animate-[spin_30s_linear_infinite]" style={{ transform: "translateZ(-500px)" }}>
              <div className="w-full h-full rounded-full" style={{ border: "4px solid transparent", backgroundImage: "linear-gradient(#050505, #050505), linear-gradient(135deg, #9E8557 0%, transparent 40%, transparent 60%, #9E8557 100%)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" }} />
              <div className="absolute inset-8 rounded-full border-[10px] border-dotted border-[#F5F0E6]/20" />
            </div>

            {/* Layer 4: Glass Core */}
            <div className="absolute inset-[40%] rounded-full bg-[#050505]/50 backdrop-blur-3xl border border-[#9E8557]/50 shadow-[inset_0_0_100px_rgba(0,0,0,1)]" style={{ transform: "translateZ(-200px)" }}>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.3)_0%,_transparent_70%)] rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
            </div>
            
            {/* The Deep Abyss (Void) */}
            <div className="absolute inset-[45%] rounded-full bg-black shadow-[0_0_100px_rgba(158,133,87,0.2)]" style={{ transform: "translateZ(-50px)" }} />

          </div>
        </div>

        {/* Foreground Content (Typography & CTA) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 text-center px-4">
          <div className="flex flex-col items-center pointer-events-auto">
            <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase mb-8">
              THE CONCLUSION
            </span>
            <h2 className="text-[2.2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-abeezee font-light text-[#F5F0E6] uppercase leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 mix-blend-plus-lighter drop-shadow-2xl">
              Let&apos;s Create <br />
              <span className="italic text-[#9E8557]">What Comes Next.</span>
            </h2>
            
            <p className="text-[#858585] text-[10px] md:text-xs font-inter tracking-[0.3em] uppercase mb-10 max-w-sm mix-blend-difference">
              Step into the future of digital experiences. Your vision, engineered to absolute perfection.
            </p>

            {/* Luxury Interactive Button */}
            <a 
              href="https://wa.me/1234567890?text=Hello!%20I%20would%20like%20to%20start%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 px-8 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#9E8557]/40 rounded-full overflow-hidden transition-all duration-700 hover:border-[#9E8557] hover:scale-105 hover:shadow-[0_0_40px_rgba(158,133,87,0.3)] shadow-2xl"
              onMouseEnter={() => {
                if (portalGroupRef.current) {
                  gsap.to(portalGroupRef.current, { scale: 1.05, duration: 1, ease: "power2.out" });
                }
              }}
              onMouseLeave={() => {
                if (portalGroupRef.current) {
                  gsap.to(portalGroupRef.current, { scale: 1, duration: 1, ease: "power2.out" });
                }
              }}
            >
              {/* Metallic Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9E8557]/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              
              <span className="text-[#F5F0E6] text-[11px] font-inter tracking-[0.2em] uppercase relative z-10 group-hover:text-[#9E8557] transition-colors duration-300">
                Start a Project
              </span>
              <div className="w-8 h-8 rounded-full bg-[#151515] border border-[#333] flex items-center justify-center relative z-10 group-hover:bg-[#9E8557] group-hover:border-[#9E8557] transition-colors duration-500">
                <ArrowRight size={14} className="text-[#9E8557] group-hover:text-[#050505] transition-colors duration-500" />
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
