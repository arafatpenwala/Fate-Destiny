"use client";

import { useRef } from "react";
import Image from "next/image";
import { Monitor, BrainCircuit, Database, Server } from "lucide-react";

const stack = {
  frontend: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"],
  ai: ["OpenAI", "LangChain", "Vector DB", "Custom LLMs"],
  backend: ["Node.js", "Python", "PostgreSQL", "Redis", "n8n", "WebSockets"],
  infrastructure: ["Vercel", "AWS", "Docker", "CI/CD Pipelines", "Edge Compute"]
};

export default function TechArchitecture() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      id="technology"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-t border-[#151515] z-20 flex flex-col justify-center"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto mb-16 lg:mb-24 text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
        <div>
          <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-6">
            ARCHITECTURE
          </span>
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter">
            THE STACK <br className="hidden lg:block" />
            <span className="text-[#555]">BEHIND THE EXPERIENCE.</span>
          </h2>
        </div>
        <div className="md:max-w-sm">
          <p className="text-[11px] md:text-[12px] font-inter text-[#858585] tracking-[0.1em] leading-loose uppercase text-center md:text-right border-l border-transparent md:border-r md:border-[#9E8557]/40 md:pr-6">
            We engineer systems using a robust modern stack designed for speed, scale, and uncompromising reliability. Every layer is deliberate.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Frontend - Col Span 2 */}
        <div className="group flex flex-col justify-between col-span-1 lg:col-span-2 bg-[#0A0A0A] border border-[#151515] hover:border-[#9E8557]/40 p-8 md:p-12 transition-colors duration-700 rounded-3xl relative overflow-hidden min-h-[350px]">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(158,133,87,0.1)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
            <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <Monitor strokeWidth={1} className="w-10 h-10 text-[#9E8557]" />
            <div>
              <h3 className="text-2xl md:text-3xl font-abeezee text-[#F5F0E6] tracking-tighter uppercase mb-2">Frontend & Interface</h3>
              <p className="text-[11px] font-inter text-[#555] tracking-[0.15em] uppercase">Cinematic experiences at 60fps.</p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-wrap gap-3 mt-12">
            {stack.frontend.map((tech) => (
              <span key={tech} className="px-4 py-2 border border-[#151515] bg-[#050505] text-[10px] md:text-[11px] font-inter tracking-widest text-[#858585] uppercase group-hover:border-[#9E8557]/30 group-hover:text-[#F5F0E6] transition-colors duration-500">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* AI - Col Span 1 */}
        <div className="group flex flex-col justify-between col-span-1 bg-[#0A0A0A] border border-[#151515] hover:border-[#F5F0E6]/30 p-8 md:p-12 transition-colors duration-700 rounded-3xl relative overflow-hidden min-h-[350px]">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(245,240,230,0.1)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
            <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <BrainCircuit strokeWidth={1} className="w-10 h-10 text-[#F5F0E6]" />
            <div>
              <h3 className="text-2xl md:text-3xl font-abeezee text-[#F5F0E6] tracking-tighter uppercase mb-2">AI & Intelligence</h3>
              <p className="text-[11px] font-inter text-[#555] tracking-[0.15em] uppercase">Autonomous reasoning engines.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3 mt-12">
            {stack.ai.map((tech) => (
              <div key={tech} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#151515] group-hover:bg-[#F5F0E6] transition-colors duration-500" />
                <span className="text-[10px] md:text-[11px] font-inter tracking-widest text-[#858585] uppercase group-hover:text-[#F5F0E6] transition-colors duration-500">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Data - Col Span 1 */}
        <div className="group flex flex-col justify-between col-span-1 bg-[#0A0A0A] border border-[#151515] hover:border-[#858585]/40 p-8 md:p-12 transition-colors duration-700 rounded-3xl relative overflow-hidden min-h-[350px]">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(133,133,133,0.05)_50%,transparent_100%)] bg-[length:100%_200%] bg-top group-hover:bg-bottom transition-all duration-1000 pointer-events-none" />
          
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
            <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <Database strokeWidth={1} className="w-10 h-10 text-[#555] group-hover:text-[#858585] transition-colors duration-500" />
            <div>
              <h3 className="text-2xl md:text-3xl font-abeezee text-[#F5F0E6] tracking-tighter uppercase mb-2">Data & Backend</h3>
              <p className="text-[11px] font-inter text-[#555] tracking-[0.15em] uppercase">Secure, high-speed pipelines.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2 mt-12">
            {stack.backend.map((tech) => (
              <span key={tech} className="text-[10px] font-inter tracking-[0.2em] text-[#555] uppercase after:content-['/'] after:ml-2 last:after:hidden group-hover:text-[#858585] transition-colors duration-500">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Infrastructure - Col Span 2 */}
        <div className="group flex flex-col justify-between col-span-1 lg:col-span-2 bg-[#050505] border border-[#151515] hover:border-[#333] p-8 md:p-12 transition-colors duration-700 rounded-3xl relative overflow-hidden min-h-[350px]">
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
            <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <Server strokeWidth={1} className="w-10 h-10 text-[#333] group-hover:text-[#F5F0E6] transition-colors duration-500" />
            <div>
              <h3 className="text-2xl md:text-3xl font-abeezee text-[#F5F0E6] tracking-tighter uppercase mb-2">Infrastructure</h3>
              <p className="text-[11px] font-inter text-[#555] tracking-[0.15em] uppercase">Global deployment architecture.</p>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-6 mt-12">
            {stack.infrastructure.map((tech) => (
              <div key={tech} className="flex flex-col gap-2">
                <div className="w-8 h-[1px] bg-[#151515] group-hover:bg-[#F5F0E6]/30 transition-colors duration-500" />
                <span className="text-[10px] font-inter tracking-[0.15em] text-[#555] uppercase group-hover:text-[#F5F0E6] transition-colors duration-500">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
