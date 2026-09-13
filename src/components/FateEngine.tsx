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
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-visible perspective-[1000px]">
      
      {/* Background glow behind artifact */}
      <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_rgba(158,133,87,0.1)_0%,_transparent_70%)] blur-2xl mix-blend-screen" />

      {/* Central Core Artifact */}
      <motion.div 
        className="absolute w-24 h-24 md:w-40 md:h-40 rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(158,133,87,0.15) 40%, rgba(5,5,5,1) 80%)",
          boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.8), inset 5px 5px 20px rgba(158,133,87,0.2), 0 0 50px rgba(158,133,87,0.1)",
          backdropFilter: "blur(10px)",
        }}
        animate={{ 
          rotateZ: 360,
          rotateY: [0, 15, -15, 0],
          rotateX: [0, 10, -10, 0]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-white/5 opacity-50" />
      </motion.div>
      
      {/* Inner Orbit */}
      <motion.div
        className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-[#9E8557]/20 mix-blend-screen"
        animate={{ rotateZ: -360, rotateX: 60, rotateY: 20 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#9E8557] shadow-[0_0_15px_#9E8557]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </motion.div>

      {/* Middle Dimension Orbit */}
      <motion.div
        className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[650px] md:h-[650px] rounded-full border border-white/5 mix-blend-screen"
        animate={{ rotateZ: 360, rotateX: 75, rotateY: -15 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#F5F0E6] shadow-[0_0_10px_#F5F0E6]" />
      </motion.div>

      {/* Outer Orbit */}
      <motion.div
        className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[850px] md:h-[850px] rounded-full border border-[#9E8557]/10"
        style={{ rotateX: 55, rotateY: -25 }}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-1/4 right-0 w-2 h-2 rounded-full bg-[#9E8557]/60 shadow-[0_0_20px_rgba(158,133,87,0.4)]" />
      </motion.div>

      {/* Orbital Intersections (Glowing rings) */}
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full border border-[#9E8557]/5 mix-blend-overlay"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Fine technical lines & coordinates */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-60">
        <div className="w-[1px] h-[70%] sm:h-[80%] bg-gradient-to-b from-transparent via-[#9E8557]/30 to-transparent transform scale-x-50" />
        <div className="absolute w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#9E8557]/20 to-transparent transform scale-y-50" />
        
        {/* Subtle crosshair */}
        <div className="absolute w-6 h-[1px] bg-[#9E8557]/50" />
        <div className="absolute h-6 w-[1px] bg-[#9E8557]/50" />
      </div>
      
      {/* Metadata Labels */}
      <div className="absolute top-1/4 right-1/4 md:right-1/3 text-[9px] font-inter text-[#9E8557] tracking-[0.3em] opacity-40 hidden sm:block">
        SYS.REQ // 04.992
      </div>
      <div className="absolute bottom-1/3 left-1/4 text-[9px] font-inter text-[#9B9B9B] tracking-[0.2em] opacity-40 hidden sm:block mix-blend-screen">
        ORBITAL_SYNC: ACTIVE
      </div>
    </div>
  );
}
