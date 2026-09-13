"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    title: "Full-Stack Digital Experiences",
    desc: "High-performance websites and digital products engineered from interface to infrastructure.",
  },
  {
    num: "02",
    title: "AI Automation Systems",
    desc: "Intelligent workflows that remove friction, connect systems, and give businesses more time to grow.",
  },
  {
    num: "03",
    title: "AI Agent Development",
    desc: "Purpose-built AI agents that reason, act, and support real business operations.",
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    if (!prefersReducedMotion) {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        
        const elements = row.querySelectorAll('.service-el');
        const line = row.querySelector('.service-line');

        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            }
          }
        );

        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="services"
      ref={containerRef}
      className="w-full bg-[#050505] text-[#F5F0E6] px-6 md:px-12 py-32 lg:py-48"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="mb-32">
          <span className="text-[9px] font-inter tracking-[0.3em] text-[#9E8557] uppercase font-medium">
            Core Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-abeezee font-light mt-8 uppercase tracking-wide text-[#F5F0E6] max-w-4xl">
            Architecting <br />
            <span className="text-[#9B9B9B] italic">The Future</span>
          </h2>
        </div>

        <div className="flex flex-col w-full border-b border-[#151515]">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => { rowsRef.current[index] = el; }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col lg:flex-row lg:items-center py-16 md:py-24 transition-colors cursor-pointer"
            >
              {/* Top border line */}
              <div className="service-line absolute top-0 left-0 w-full h-[1px] bg-[#151515] overflow-hidden z-10" />
              
              {/* Hover gold line */}
              <div 
                className={`absolute top-0 left-0 h-[1px] bg-[#9E8557] transition-all duration-700 ease-out z-20 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} 
              />
              
              <div className="service-el w-full lg:w-1/4 mb-6 lg:mb-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-xs font-inter tracking-[0.3em] text-[#9E8557]">
                  {service.num} —
                </span>
              </div>
              
              <div className="service-el w-full lg:w-1/2 pr-0 lg:pr-12 mb-6 lg:mb-0 relative z-10">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-abeezee font-light tracking-wide text-[#F5F0E6] transition-all duration-700 ease-out group-hover:translate-x-8 mix-blend-difference">
                  {service.title}
                </h3>
              </div>
              
              <div className="service-el w-full lg:w-1/4 flex items-end justify-between lg:justify-end">
                <p className="text-[11px] md:text-xs font-inter text-[#666] font-light leading-loose max-w-[280px] transition-colors duration-500 group-hover:text-[#F5F0E6]">
                  {service.desc}
                </p>
              </div>

              {/* Diagram Placeholder Reveal */}
              <div 
                className={`absolute right-12 lg:right-1/4 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none transition-all duration-700 ease-out flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 mix-blend-screen hidden lg:flex`}
              >
                <div className="w-full h-full border border-[#9E8557]/20 rounded-full flex items-center justify-center">
                  <div className="w-1/2 h-1/2 border border-[#9E8557]/40 rounded-full animate-spin-slow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
