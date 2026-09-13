"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

const works = [
  {
    title: "Aura Luxury Estate",
    category: "Concept Project — Full-Stack Platform",
    year: "2024",
    align: "left",
  },
  {
    title: "Nexus Operations",
    category: "Concept Project — AI Automation System",
    year: "2024",
    align: "right",
  },
  {
    title: "Sentient Interface",
    category: "Concept Project — AI Agent Dashboard",
    year: "2024",
    align: "left",
  }
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || prefersReducedMotion) return;

    itemsRef.current.forEach((item) => {
      if (!item) return;
      
      const imageWrapper = item.querySelector('.work-image-wrapper');
      const image = item.querySelector('.work-image');
      const content = item.querySelector('.work-content');

      // Extremely deliberate Mask reveal for the image wrapper
      gsap.fromTo(
        imageWrapper,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "center center",
            scrub: 1.5,
          }
        }
      );

      // Extreme parallax for the image itself
      gsap.fromTo(
        image,
        { scale: 1.4, y: 150 },
        {
          scale: 1,
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // Fade up content with delay to follow image mask
      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 60%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="work"
      ref={containerRef}
      className="w-full bg-[#050505] text-[#F5F0E6] px-6 md:px-12 py-32 lg:py-48"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="mb-32 md:mb-48 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="inline-block text-[9px] font-inter tracking-[0.3em] text-[#9E8557] uppercase font-light mb-8">
              The Archives
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-abeezee font-light uppercase tracking-wide text-[#F5F0E6]">
              Selected Systems
            </h2>
          </div>
          <div className="mt-12 md:mt-0">
            <button className="group flex items-center gap-6 text-[10px] font-inter tracking-[0.2em] text-[#9E8557] uppercase transition-colors hover:text-[#F5F0E6]">
              <span>View All Archives</span>
              <div className="w-16 h-[1px] bg-[#9E8557] group-hover:bg-[#F5F0E6] transition-colors duration-500" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-40 md:gap-64 w-full">
          {works.map((work, index) => (
            <div 
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className={`flex flex-col ${work.align === 'right' ? 'md:items-end' : 'md:items-start'} w-full`}
            >
              <div className={`w-full md:w-4/5 lg:w-[65%] group cursor-pointer`}>
                
                {/* Image Wrapper (Masked) */}
                <div className="work-image-wrapper w-full aspect-[4/5] md:aspect-[16/9] bg-[#0A0A0A] overflow-hidden relative mb-12">
                  
                  {/* The Parallax Image */}
                  <div className="work-image absolute inset-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,_rgba(21,21,21,1)_0%,_rgba(5,5,5,1)_100%)] flex items-center justify-center">
                    
                    {/* Placeholder geometric abstract art for projects */}
                    <div className="w-1/2 h-1/2 border border-[#9E8557]/10 rounded-full flex items-center justify-center opacity-30 mix-blend-screen transition-transform duration-1000 ease-out group-hover:opacity-60 group-hover:scale-110">
                      <div className="w-1/2 h-1/2 border border-[#9E8557]/30 rounded-full blur-[1px]" />
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full border border-[#9E8557]/50 backdrop-blur-sm flex items-center justify-center text-[#9E8557] scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out">
                      <ArrowRight size={24} strokeWidth={1} />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`work-content flex flex-col md:flex-row md:items-start justify-between w-full`}>
                  <div className="w-full md:w-2/3">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee font-light tracking-wide mb-4 text-[#F5F0E6] transition-colors duration-700 group-hover:text-[#9E8557]">
                      {work.title}
                    </h3>
                    <p className="text-[9px] md:text-[10px] font-inter tracking-[0.3em] text-[#666] uppercase">
                      {work.category}
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 pt-2 border-t border-[#151515] md:border-none w-full md:w-auto text-left md:text-right">
                    <span className="text-[10px] font-inter text-[#666] tracking-[0.2em]">{work.year}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
