"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Workflow, BrainCircuit, Globe } from "lucide-react";

const systemNodes = [
  {
    num: "01",
    layer: "ARCHITECTURE LAYER",
    title: "PREMIUM WEB DEVELOPMENT",
    desc: "Custom, responsive websites designed to present your brand clearly and build trust with your audience.",
    icon: Globe,
  },
  {
    num: "02",
    layer: "DISCOVERY LAYER",
    title: "SEO & VISIBILITY",
    desc: "Foundational search optimization that helps search engines understand and rank your digital presence.",
    icon: Search,
  },
  {
    num: "03",
    layer: "CREATIVE LAYER",
    title: "AI CREATIVE",
    desc: "AI-assisted visuals and dynamic content concepts created to support modern marketing strategies.",
    icon: Sparkles,
  },
  {
    num: "04",
    layer: "AUTOMATION LAYER",
    title: "AI AUTOMATION",
    desc: "Intelligent workflows that automate repetitive processes and connect your digital tools effortlessly.",
    icon: Workflow,
  },
  {
    num: "05",
    layer: "AUTONOMOUS LAYER",
    title: "AGENTIC AI",
    desc: "Intelligent AI agents that understand complex tasks, make decisions, and take actions on your behalf.",
    icon: BrainCircuit,
  }
];

// --- 3D Visual Components for the Stage ---

const WebVisual = () => (
  <div className="w-[70%] h-[55%] border border-[#333]/50 rounded-2xl flex flex-col bg-[#050505] shadow-[0_20px_50px_rgba(158,133,87,0.15)] [perspective:1000px]">
    <motion.div
      initial={{ rotateX: 20, rotateY: -20 }}
      animate={{ rotateX: [20, 30, 20], rotateY: [-20, -10, -20] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-full h-full flex flex-col"
    >
      <div className="h-8 w-full border-b border-[#222] flex items-center gap-2 px-4 bg-[#0A0A0A]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
      </div>
      <div className="flex-1 flex gap-4 p-5">
        <div className="w-1/3 h-full bg-[#111] rounded-xl border border-[#222] relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9E8557]/30 to-transparent"
          />
        </div>
        <div className="w-2/3 h-full flex flex-col gap-4">
          <div className="w-full h-1/2 bg-[#111] rounded-xl border border-[#222]" />
          <motion.div className="w-full h-1/2 bg-[#9E8557]/10 border border-[#9E8557]/30 rounded-xl relative overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#9E8557]/40 to-transparent skew-x-12"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  </div>
);

const RadarVisual = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-64 h-64 rounded-full border border-[#222]/60 relative flex items-center justify-center">
      <div className="w-40 h-40 rounded-full border border-[#333]/60" />
      <div className="w-16 h-16 rounded-full border border-[#444]/60" />
      <motion.div
        animate={{ scale: [1, 2.5], opacity: [1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        className="w-12 h-12 rounded-full border border-[#9E8557] bg-[#9E8557]/20 absolute"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#9E8557] to-[#9E8557] absolute origin-center shadow-[0_0_15px_#9E8557]"
      />
      <Search className="w-8 h-8 text-[#9E8557] absolute z-10 drop-shadow-[0_0_15px_rgba(158,133,87,1)]" />
    </div>
  </div>
);

const StarsVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 180] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <Sparkles className="w-28 h-28 text-[#9E8557] drop-shadow-[0_0_30px_rgba(158,133,87,0.8)]" strokeWidth={1} />
    </motion.div>
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#9E8557_1.5px,_transparent_1.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(black,transparent_70%)]"
    />
  </div>
);

const NodesVisual = () => (
  <div className="w-full h-full relative flex flex-col items-center justify-center">

    {/* Central Data Pipeline */}
    <div className="flex items-center w-[85%] max-w-[400px] h-20 relative z-20">

      {/* Input Node */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl border border-[#222] bg-gradient-to-br from-[#111] to-[#0A0A0A] flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] z-20 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9E8557]/50 to-transparent" />
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#9E8557] rounded-sm animate-pulse shadow-[0_0_10px_#9E8557]" />
      </div>

      {/* Data Stream 1 */}
      <div className="flex-1 h-[2px] bg-[#1A1A1A] relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#9E8557] to-transparent shadow-[0_0_10px_#9E8557]"
        />
      </div>

      {/* Core Processing Node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl sm:rounded-2xl border border-[#9E8557] bg-[#0A0A0A] flex items-center justify-center shadow-[0_0_40px_rgba(158,133,87,0.4)] z-20 relative"
      >
        <Workflow className="w-8 h-8 sm:w-10 sm:h-10 text-[#9E8557] drop-shadow-[0_0_10px_rgba(158,133,87,1)]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[6px] rounded-xl sm:rounded-2xl border border-dashed border-[#9E8557]/50"
        />
      </motion.div>

      {/* Data Stream 2 */}
      <div className="flex-1 h-[2px] bg-[#1A1A1A] relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#9E8557] to-transparent shadow-[0_0_10px_#9E8557]"
        />
      </div>

      {/* Output Node */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-xl sm:rounded-2xl border border-[#222] bg-gradient-to-br from-[#111] to-[#0A0A0A] flex flex-col items-center justify-center gap-1 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] z-20 relative overflow-hidden">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9E8557]/50 to-transparent" />
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#9E8557] rounded-full shadow-[0_0_5px_#9E8557]" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#9E8557] rounded-full shadow-[0_0_5px_#9E8557]" />
        </div>
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#9E8557] rounded-full shadow-[0_0_5px_#9E8557]" />
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#9E8557] rounded-full shadow-[0_0_5px_#9E8557]" />
        </div>
      </div>

    </div>

    {/* Ambient Orbital Rings */}
    <div className="absolute w-[280px] h-[280px] rounded-full border border-[#1A1A1A] flex items-center justify-center z-10 pointer-events-none">
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full rounded-full border-[2px] border-dashed border-[#222]"
      />
    </div>
  </div>
);

const BrainVisual = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    <motion.div
      animate={{ scale: [1, 1.15, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <BrainCircuit className="w-28 h-28 text-[#9E8557] drop-shadow-[0_0_40px_rgba(158,133,87,1)]" strokeWidth={1} />
    </motion.div>
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border-[2px] border-[#9E8557]/40 border-dashed shadow-[0_0_30px_rgba(158,133,87,0.1)]"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border-[2px] border-[#333]/50 border-dotted"
    />
  </div>
);


export default function SystemDiagram() {
  const [active, setActive] = useState(0);

  // Auto-play through the tabs, resetting timer when a tab is manually clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % systemNodes.length);
    }, 10000); // 12 seconds
    return () => clearInterval(timer);
  }, [active]);

  const node = systemNodes[active];
  const Icon = node.icon;

  return (
    <section id="system" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden z-20 border-t border-[#151515]">

      {/* High-End Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#9E8557 1px, transparent 1px), linear-gradient(90deg, #9E8557 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9E8557]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 z-30 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center min-h-[700px]">

        {/* Left Column: Interactive Navigation & Text Content */}
        <div className="w-full lg:w-5/12 flex flex-col z-20 mb-12 lg:mb-0">

          <span className="text-[10px] md:text-[12px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-10 flex items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9E8557] mr-4 animate-pulse shadow-[0_0_10px_#9E8557]" />
            The Infrastructure
          </span>

          {/* Tab Navigation Menu */}
          <div className="flex lg:flex-wrap gap-4 md:gap-8 mb-12 border-b border-[#222] pb-6 overflow-x-auto no-scrollbar">
            {systemNodes.map((n, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-3 pb-4 shrink-0 transition-colors duration-500 outline-none ${active === i ? 'text-[#F5F0E6]' : 'text-[#555] hover:text-[#9E8557]'}`}
              >
                <span className="text-[11px] sm:text-[12px] md:text-[14px] font-inter tracking-widest font-medium">{n.num}</span>
                <span className="text-[10px] sm:text-[11px] font-inter tracking-[0.2em] uppercase hidden sm:block">{n.layer}</span>
              </button>
            ))}
          </div>

          {/* Animated Text Content */}
          <div className="h-[220px] sm:h-[240px] lg:h-[280px] relative mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col"
              >
                <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-abeezee font-light leading-[1.1] text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 drop-shadow-xl">
                  {node.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] md:text-[16px] font-inter text-[#858585] tracking-[0.05em] leading-relaxed max-w-md">
                  {node.desc}
                </p>

                <div className="mt-auto flex items-center gap-4 text-[#9E8557] text-[10px] md:text-[11px] font-inter tracking-[0.2em] uppercase">
                  <Icon className="w-5 h-5 animate-pulse" />
                  <span>System Active</span>
                  <div className="w-12 h-[1px] bg-gradient-to-r from-[#9E8557] to-transparent ml-2" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Massive Holographic Stage */}
        <div className="w-full lg:w-7/12 flex items-center justify-center lg:justify-end relative pointer-events-none">

          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] rounded-full border border-[#1A1A1A] bg-gradient-to-br from-[#0A0A0A] to-[#050505] relative flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_20px_60px_rgba(0,0,0,0.5)] lg:shadow-[inset_0_0_80px_rgba(0,0,0,0.8),0_20px_60px_rgba(0,0,0,0.5)]">

            {/* Spinning Golden Stage Border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[1px] rounded-full border-[2px] border-transparent border-t-[#9E8557]/40 border-b-[#9E8557]/40 opacity-50"
            />

            {/* Inner Dashboard Dashed Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[20px] rounded-full border border-dashed border-[#222]"
            />

            {/* Visual Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {active === 0 && <WebVisual />}
                {active === 1 && <RadarVisual />}
                {active === 2 && <StarsVisual />}
                {active === 3 && <NodesVisual />}
                {active === 4 && <BrainVisual />}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
