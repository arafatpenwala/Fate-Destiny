"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand your business, goals, audience, and requirements.",
  },
  {
    num: "02",
    title: "STRATEGIZE",
    desc: "Define the right digital, automation, or AI solution for your needs.",
  },
  {
    num: "03",
    title: "BUILD",
    desc: "Design and develop the solution around your requirements.",
  },
  {
    num: "04",
    title: "LAUNCH",
    desc: "Test, refine, and prepare the solution for real-world use.",
  }
];

export default function Methodology() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section 
      id="process"
      className="relative w-full min-h-screen bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-t border-[#151515] z-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(158,133,87,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Editorial Intro */}
        <div className="w-full lg:w-1/3 flex flex-col pt-12">
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-6">
            THE PROCESS
          </span>
          <h2 className="text-[3rem] md:text-[4rem] font-abeezee font-light leading-[1.1] text-[#F5F0E6] uppercase tracking-tighter mb-8">
            PRECISION <br />
            <span className="text-[#555]">IN EVERY</span> <br className="hidden md:block" />
            <span className="md:hidden"> </span>STEP.
          </h2>
          <p className="text-[11px] md:text-[12px] font-inter text-[#858585] tracking-[0.1em] leading-loose uppercase">
            A rigorous, uncompromising methodology designed to transform raw ambition into flawless digital reality.
          </p>
        </div>

        {/* Right Side: The Glass Accordion */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={step.num}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative flex flex-col justify-center border border-[#151515] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive 
                    ? "bg-[#0A0A0A] h-[350px] md:h-[300px] border-[#9E8557]/40 shadow-[0_0_30px_rgba(158,133,87,0.05)]" 
                    : "bg-transparent h-[100px] md:h-[120px] hover:bg-[#0A0A0A] hover:border-[#333]"
                }`}
              >
                {/* Active Glowing Background */}
                <div 
                  className={`absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(158,133,87,0.1)_0%,_transparent_50%)] transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`} 
                />

                <div className="relative z-10 w-full px-6 md:px-12 flex flex-col">
                  
                  {/* Accordion Header (Always Visible) */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-6 md:gap-12">
                      <span className={`text-2xl md:text-3xl font-abeezee transition-colors duration-500 ${
                        isActive ? "text-[#9E8557]" : "text-[#333] group-hover:text-[#555]"
                      }`}>
                        {step.num}
                      </span>
                      <h3 className={`text-2xl md:text-4xl font-abeezee uppercase tracking-tighter transition-colors duration-500 ${
                        isActive ? "text-[#F5F0E6]" : "text-[#555] group-hover:text-[#F5F0E6]"
                      }`}>
                        {step.title}
                      </h3>
                    </div>
                    
                    {/* Toggle Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-500 ${
                      isActive ? "border-[#9E8557]/40 bg-[#9E8557]/10 text-[#9E8557]" : "border-[#151515] text-[#555] group-hover:border-[#333]"
                    }`}>
                      {isActive ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
                    </div>
                  </div>

                  {/* Accordion Body (Expands) */}
                  <div 
                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "max-h-[200px] mt-8 opacity-100" : "max-h-0 mt-0 opacity-0"
                    }`}
                  >
                    <div className="pl-[3.5rem] md:pl-[5.25rem]">
                      <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-loose uppercase border-l border-[#9E8557]/40 pl-6 md:pl-8 py-2 max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
