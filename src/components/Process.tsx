"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { num: "01", title: "DISCOVER", desc: "Understanding the objective, the constraints, and the absolute limits." },
  { num: "02", title: "ARCHITECT", desc: "Designing the technical foundation and autonomous system logic." },
  { num: "03", title: "DESIGN", desc: "Crafting a bespoke visual language and editorial user experience." },
  { num: "04", title: "ENGINEER", desc: "Building high-performance, resilient, intelligent digital structures." },
  { num: "05", title: "EVOLVE", desc: "Continuous refinement, observation, and optimization of the entity." },
];

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !trackRef.current || !glowRef.current) return;

    if (!prefersReducedMotion) {
      // Glow dot follows scroll exactly along the track
      gsap.to(glowRef.current, {
        y: () => trackRef.current ? trackRef.current.offsetHeight : 0,
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
        }
      });

      // Items reveal as the glow dot passes them
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        
        const content = item.querySelector('.process-content');

        gsap.fromTo(
          content,
          { opacity: 0, x: -30, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 60%", // Triggers slightly before the dot reaches it for anticipation
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
      id="process"
      ref={containerRef}
      className="w-full bg-[#050505] text-[#F5F0E6] px-6 md:px-12 py-32 lg:py-48 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.1)_0%,_transparent_70%)] blur-3xl mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col md:flex-row gap-20 lg:gap-32">
        
        <div className="w-full md:w-1/3 pt-10">
          <div className="sticky top-48">
            <span className="text-[9px] font-inter tracking-[0.3em] text-[#9E8557] uppercase font-light mb-6 block">
              Methodology
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-abeezee font-light uppercase tracking-wide text-[#F5F0E6] leading-[1.1] mix-blend-difference">
              From <br />
              <span className="italic text-[#9B9B9B]">Intention</span> <br />
              To Intelligence
            </h2>
          </div>
        </div>

        <div className="w-full md:w-2/3 relative pl-8 md:pl-0">
          {/* Continuous SVG Track */}
          <div 
            ref={trackRef} 
            className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-[#151515] via-[#2a2a2a] to-[#151515]"
          >
            {/* Glowing Tracker Node */}
            <div 
              ref={glowRef}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-[#9E8557] shadow-[0_0_20px_#9E8557] rounded-full z-20"
            />
          </div>

          <div className="flex flex-col gap-24 lg:gap-40 py-20 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className="relative flex items-start group"
              >
                {/* Content */}
                <div className="process-content pl-12 md:pl-20">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557] font-light">
                      {step.num}
                    </span>
                    <div className="h-[1px] w-12 bg-[#151515] group-hover:bg-[#9E8557]/50 transition-colors duration-700" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-abeezee font-light tracking-wide text-[#F5F0E6] mb-6 transition-colors duration-700 group-hover:text-[#9E8557]">
                    {step.title}
                  </h3>
                  <p className="text-[11px] md:text-xs font-inter text-[#666] font-light max-w-sm leading-loose transition-colors duration-500 group-hover:text-[#F5F0E6]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
