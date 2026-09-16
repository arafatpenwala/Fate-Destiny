"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function PremiumCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoverState, setHoverState] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    // Simple reveal animation for the whole section
    gsap.fromTo(containerRef.current.querySelectorAll('.cta-item'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
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
      className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center px-6 md:px-12 py-32 z-20 overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: hoverState === 1 ? "#110D08" : hoverState === 2 ? "#0A0D11" : hoverState === 3 ? "#110808" : "#050505"
      }}
    >
      
      {/* Massive Background Glows that activate on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.15)_0%,_transparent_60%)] ${hoverState === 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`} />
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,_rgba(87,133,158,0.15)_0%,_transparent_60%)] ${hoverState === 2 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`} />
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,_rgba(158,87,87,0.15)_0%,_transparent_60%)] ${hoverState === 3 ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`} />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-16 md:mb-32">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-6">
            INITIATE
          </span>
          <h2 className="text-[2.5rem] md:text-[5rem] lg:text-[7rem] font-abeezee font-light leading-none text-[#F5F0E6] uppercase tracking-tighter mix-blend-difference mb-8">
            LET&apos;S BUILD SOMETHING <br/>
            <span className="italic text-[#9E8557]">EXCEPTIONAL.</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl flex flex-col">
          {[
            { id: 1, title: "BUILD A PREMIUM WEBSITE", action: "INITIATE", desc: "Present your business clearly." },
            { id: 2, title: "REDESIGN YOUR PLATFORM", action: "START PROJECT", desc: "Modernize your digital presence." },
            { id: 3, title: "CRAFT DIGITAL EXPERIENCES", action: "OPTIMIZE", desc: "Enhance user interactions." }
          ].map((item) => (
            <div 
              key={item.id}
              className="cta-item group flex flex-col md:flex-row items-start md:items-center justify-between border-t border-[#151515] py-8 md:py-12 cursor-pointer relative"
              onMouseEnter={() => setHoverState(item.id)}
              onMouseLeave={() => setHoverState(null)}
            >
              {/* Massive hover mask */}
              <div className="absolute inset-0 bg-[#0A0A0A] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] -z-10" />

              <div className="flex flex-col mb-4 md:mb-0 pointer-events-none pl-6 md:pl-12 mix-blend-difference">
                <span className="text-[10px] font-inter tracking-[0.2em] text-[#858585] uppercase mb-2 group-hover:text-[#9E8557] transition-colors duration-500">
                  {item.desc}
                </span>
                <h3 className="text-[2rem] md:text-[4rem] font-abeezee font-light text-[#F5F0E6] uppercase group-hover:pl-4 transition-all duration-500">
                  {item.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-6 pr-6 md:pr-12 pointer-events-none mix-blend-difference">
                <span className="text-[10px] font-inter tracking-[0.2em] text-[#F5F0E6] uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  {item.action}
                </span>
                <div className="w-16 h-16 rounded-full border border-[#151515] group-hover:border-[#9E8557] group-hover:bg-[#9E8557] flex items-center justify-center text-[#9E8557] group-hover:text-[#050505] transition-all duration-500 group-hover:scale-110">
                  <ArrowUpRight size={24} strokeWidth={1} />
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-[#151515] w-full" />
        </div>

      </div>
    </section>
  );
}
