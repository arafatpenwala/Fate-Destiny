"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FateEngine() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[700px] lg:h-[900px] flex items-center justify-center overflow-visible perspective-[1200px]">
      
      {/* Background glow behind artifact */}
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(197,164,109,0.08)_0%,_transparent_70%)] blur-2xl mix-blend-screen pointer-events-none" />

      {/* Central Core Intelligence Artifact */}
      <motion.div 
        className="absolute w-32 h-32 md:w-48 md:h-48 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), rgba(197,164,109,0.15) 40%, rgba(5,5,5,1) 80%)",
          boxShadow: "inset -10px -10px 40px rgba(0,0,0,0.9), inset 5px 5px 20px rgba(197,164,109,0.2), 0 0 60px rgba(197,164,109,0.05)",
          backdropFilter: "blur(15px)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagon core
        }}
        animate={{ 
          rotateZ: 360,
          rotateY: [0, 15, -15, 0],
          rotateX: [0, 10, -10, 0]
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 opacity-40 border-[0.5px] border-[#C5A46D]/20 mix-blend-screen" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
      </motion.div>
      
      {/* Precision Geometric Frame */}
      <motion.div
        className="absolute w-[60vw] max-w-[350px] h-[60vw] max-h-[350px] md:max-w-[500px] md:max-h-[500px] md:w-[500px] md:h-[500px] border-[0.5px] border-[#C5A46D]/20 mix-blend-screen"
        style={{ borderRadius: "50%" }}
        animate={{ rotateZ: -360, rotateX: 65, rotateY: 25 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbital Trackers */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#C5A46D] shadow-[0_0_15px_#C5A46D]" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-[#F4EFE5] shadow-[0_0_8px_#F4EFE5]" />
      </motion.div>

      {/* Interlocking Structural Rings */}
      <motion.div
        className="absolute w-[75vw] max-w-[450px] h-[75vw] max-h-[450px] md:max-w-[700px] md:max-h-[700px] md:w-[700px] md:h-[700px] border-[0.5px] border-[#F4EFE5]/10 mix-blend-screen"
        style={{ borderRadius: "50%" }}
        animate={{ rotateZ: 360, rotateX: 75, rotateY: -15 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-[#C5A46D]/40 shadow-[0_0_10px_#C5A46D]" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-[#C5A46D]/40" />
      </motion.div>

      {/* Large Outer Architecture */}
      <motion.div
        className="absolute w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] md:max-w-[950px] md:max-h-[950px] md:w-[950px] md:h-[950px] border-[0.5px] border-[#C5A46D]/5"
        style={{ borderRadius: "50%", rotateX: 55, rotateY: -25 }}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-1/4 right-0 w-[0.5px] h-12 bg-[#C5A46D]/50 shadow-[0_0_20px_rgba(197,164,109,0.3)]" />
      </motion.div>

      {/* Internal Machine Reflections */}
      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full border-[0.5px] border-[#C5A46D]/10 mix-blend-overlay"
        animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Extremely Fine Technical Paths & Grid */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-50">
        <div className="w-[0.5px] h-[80%] sm:h-[100%] bg-gradient-to-b from-transparent via-[#C5A46D]/30 to-transparent" />
        <div className="absolute w-[100%] h-[0.5px] bg-gradient-to-r from-transparent via-[#C5A46D]/20 to-transparent" />
        
        {/* Reticles */}
        <div className="absolute w-8 h-[0.5px] bg-[#C5A46D]/40" />
        <div className="absolute h-8 w-[0.5px] bg-[#C5A46D]/40" />
        <div className="absolute w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] border-[0.5px] border-[#C5A46D]/5 rounded-full" />
      </div>
      
      {/* Mechanical Metadata */}
      <div className="absolute top-[20%] right-[15%] md:right-[20%] text-[8px] font-inter text-[#C5A46D] tracking-[0.4em] opacity-40 hidden lg:block">
        SYS.ARCH // VX.901
        <br />
        <span className="text-[#858585]">CORE: ACTIVE</span>
      </div>
      <div className="absolute bottom-[20%] left-[15%] md:left-[20%] text-[8px] font-inter text-[#858585] tracking-[0.3em] opacity-40 hidden lg:block mix-blend-screen text-right">
        [INTELLIGENCE_LOOP]
        <br />
        SYNCING...
      </div>
    </div>
  );
}
