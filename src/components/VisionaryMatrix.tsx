"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AbstractLogo from "./AbstractLogo";

export default function VisionaryMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const horizontalContainer = horizontalContainerRef.current;

    if (!section || !horizontalContainer) return;

    // Calculate total horizontal scroll width
    const getScrollAmount = () => {
      return -(horizontalContainer.scrollWidth - window.innerWidth);
    };

    // Pin the section and scroll the container horizontally
    const tween = gsap.to(horizontalContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#050505] overflow-hidden border-t border-[#151515]"
    >
      {/* Background abstract gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(158,133,87,0.1)_0%,_transparent_50%)]" />

      {/* Floating Particles/Lines (Pure CSS for performance) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9E8557] to-transparent" />
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5F0E6] to-transparent opacity-50" />
      </div>

      {/* MASSIVE BACKGROUND TEXT: FATE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-screen opacity-30">
        <h2 className="text-[25rem] md:text-[40rem] lg:text-[50rem] font-abeezee font-black text-transparent [-webkit-text-stroke:2px_rgba(197,164,109,0.1)] select-none">
          FATE
        </h2>
      </div>

      {/* The Horizontal Scrolling Track */}
      <div ref={horizontalContainerRef} className="flex h-full items-center pl-[10vw] pr-[20vw] gap-24 md:gap-32 w-[fit-content] relative z-10">
        
        {/* Slide 1: Introduction */}
        <div className="flex flex-col shrink-0 w-[85vw] md:w-[70vw] max-w-3xl pt-10">
          <span className="text-[10px] md:text-xs font-inter tracking-[0.4em] text-[#9E8557] uppercase mb-6 block">
            THE VISIONARY MATRIX
          </span>
          <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] font-abeezee font-light leading-[0.9] text-[#F5F0E6] uppercase tracking-tighter mix-blend-difference">
            ENGINEERING <br />
            <span className="italic text-[#9E8557]">TOMORROW.</span>
          </h2>
          <p className="mt-8 text-[11px] md:text-sm font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose max-w-lg border-l border-[#9E8557]/30 pl-6 backdrop-blur-sm">
            We transcend traditional development to architect ecosystems where design and data converge into intelligent experiences. The future isn't predicted; it is built.
          </p>
        </div>

        {/* Slide 2: Core Pillars (Large Panoramic Panels) */}
        <div className="flex shrink-0 gap-16 items-center mt-10">
          
          {/* Panel 1 */}
          <div className="w-[80vw] max-w-[900px] h-[500px] bg-gradient-to-br from-[#0A0A0A] to-[#050505] rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 01
              </span>
              <h3 className="text-[1.8rem] sm:text-[2.5rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                DISTINCTIVE <br />
                <span className="italic text-[#9E8557]">BY DESIGN</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                EVERY EXPERIENCE FEELS INTENTIONAL, MEMORABLE, AND UNIQUE. WE DO NOT USE TEMPLATES; WE ART-DIRECT DIGITAL ENVIRONMENTS THAT ELEVATE YOUR BRAND FAR BEYOND THE ORDINARY.
              </p>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="w-[80vw] max-w-[900px] h-[500px] bg-gradient-to-br from-[#0A0A0A] to-[#050505] rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 02
              </span>
              <h3 className="text-[1.8rem] sm:text-[2.5rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                ALGORITHMIC <br />
                <span className="italic text-[#9E8557]">PRECISION</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                DATA-DRIVEN ARCHITECTURES THAT SCALE INFINITELY WHILE MAINTAINING ABSOLUTE AESTHETIC CONTROL ACROSS ALL DIMENSIONS AND INTERFACES.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="w-[80vw] max-w-[900px] h-[500px] bg-gradient-to-br from-[#0A0A0A] to-[#050505] rounded-[40px] p-12 md:p-20 flex flex-col justify-between border border-[#1A1A1A] relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] blur-[60px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-1000" />
            
            {/* Top Right Logo */}
            <div className="absolute top-16 right-16 w-16 h-16 text-[#9E8557]/40 group-hover:text-[#9E8557] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
              <AbstractLogo className="w-full h-full drop-shadow-[0_0_15px_rgba(158,133,87,0.5)]" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-inter tracking-[0.3em] text-[#858585] uppercase mb-8 block">
                PILLAR 03
              </span>
              <h3 className="text-[1.8rem] sm:text-[2.5rem] md:text-[4.5rem] leading-[1.1] font-abeezee uppercase text-[#F5F0E6]">
                SYNTHETIC <br />
                <span className="italic text-[#9E8557]">AESTHETICS</span>
              </h3>
            </div>
            
            <div className="relative z-10 border-l border-[#9E8557]/30 pl-8 mt-12 max-w-lg">
              <p className="text-[10px] md:text-xs font-inter text-[#858585] tracking-[0.2em] uppercase leading-loose">
                FUSING HUMAN INTUITION WITH PROCEDURAL GENERATION TO CREATE DIGITAL DESIGNS THAT FEEL ALIVE, RESPONSIVE, AND CONSTANTLY EVOLVING.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 3: Final Statement */}
        <div className="flex shrink-0 items-center justify-center min-w-[80vw] relative pl-4 sm:pl-8 md:pl-16">
          <div className="z-10 text-left w-full pr-4">
            <h3 className="text-[8vw] sm:text-[3rem] md:text-[5rem] text-[#F5F0E6] font-abeezee italic uppercase leading-none break-words">
              The Architecture
            </h3>
            <h3 className="text-[8vw] sm:text-[3rem] md:text-[5rem] text-[#9E8557] font-abeezee uppercase leading-none break-words">
              Of Destiny
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
