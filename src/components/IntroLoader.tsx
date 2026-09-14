"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        
        // GSAP exit animation
        const tl = gsap.timeline();
        
        tl.to(textRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(progressLineRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.4,
          ease: "expo.inOut",
        }, "-=0.2")
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        }, "-=0.1");
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F5F0E6]"
    >
      <div className="w-full max-w-sm px-8 flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 md:w-20 md:h-20 opacity-100">
              <Image 
                src="/fd-logo.png" 
                alt="FD Logo" 
                fill 
                className="object-contain mix-blend-screen" 
              />
            </div>
            <span className="font-abeezee text-3xl md:text-4xl tracking-[0.25em] font-light text-[#9E8557]">
              FATE&DESTINY
            </span>
          </div>
          <span className="text-[10px] font-inter tracking-[0.3em] text-[#9B9B9B] uppercase">Loading System</span>
        </div>
        
        <div className="w-full h-[1px] bg-[#151515] relative overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute top-0 left-0 h-full bg-[#9E8557] origin-left"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        
        <div className="mt-6 text-[10px] font-inter tracking-[0.2em] text-[#9B9B9B]">
          {progress.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}
