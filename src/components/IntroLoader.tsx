"use client";

import { useEffect, useState, useRef } from "react";
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
      currentProgress += Math.floor(Math.random() * 8) + 1;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        
        // GSAP exit animation
        const tl = gsap.timeline();
        
        tl.to(textRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(progressLineRef.current, {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.6,
          ease: "expo.inOut",
        }, "-=0.4")
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        }, "-=0.2");
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F5F0E6]"
    >
      <div className="w-full max-w-sm px-8 flex flex-col items-center">
        <div ref={textRef} className="flex flex-col items-center mb-12">
          <span className="font-abeezee text-4xl tracking-[0.15em] font-light mb-4">F&D</span>
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
