"use client";

import Image from "next/image";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const extendedCategories = [
  {
    id: "premium-websites",
    title: "01. PREMIUM WEBSITE DEVELOPMENT",
    items: [
      { name: "Premium Website Development", desc: "Premium, responsive websites designed to present your business clearly, build trust, and create meaningful customer interactions." },
      { name: "Custom Web Applications", desc: "Complex, feature-rich web applications built for specific business requirements." },
      { name: "Landing Pages", desc: "Focused landing pages designed to communicate one clear offer and guide visitors toward a relevant action." },
      { name: "Business Website Development" },
      { name: "Corporate Websites" },
      { name: "Real Estate Websites" },
      { name: "Portfolio Websites" },
      { name: "E-commerce Websites" }
    ]
  },
  {
    id: "website-redesign",
    title: "02. WEBSITE REDESIGN & MODERNIZATION",
    items: [
      { name: "Website Redesign", desc: "Modern improvements to outdated websites, helping businesses create a clearer, more professional, and mobile-friendly experience." },
      { name: "UI/UX Modernization", desc: "Thoughtful interface upgrades that make digital products easier to understand, navigate, and use." },
      { name: "Mobile Optimization", desc: "Ensuring flawless presentation and interaction across all mobile devices." },
      { name: "Performance Improvements" },
      { name: "Modern Interactions" },
      { name: "Animation & Transitions" },
      { name: "Conversion-Focused Layouts" },
      { name: "Improved Website Structure" }
    ]
  },
  {
    id: "ai-digital-experiences",
    title: "03. AI-POWERED DIGITAL EXPERIENCES",
    items: [
      { name: "AI Website Assistants", desc: "Helpful conversational experiences that answer common questions and guide visitors." },
      { name: "AI Chat Interfaces", desc: "Custom chat solutions seamlessly integrated into your digital platform." },
      { name: "AI-Powered Search", desc: "Intelligent search capabilities that help users find exactly what they need instantly." },
      { name: "AI Recommendations" },
      { name: "Intelligent Website Experiences" },
      { name: "AI-Powered Content Features" },
      { name: "AI-Enhanced Customer Experiences" }
    ]
  },
  {
    id: "seo-visibility",
    title: "04. SEO & GOOGLE VISIBILITY",
    items: [
      { name: "Technical SEO", desc: "Foundational search optimization that helps search engines understand your website." },
      { name: "On-Page SEO", desc: "Optimizing individual pages to rank higher and earn more relevant traffic in search engines." },
      { name: "Website Structure Optimization" },
      { name: "Search Console Setup" },
      { name: "Sitemap Setup" },
      { name: "Indexing Optimization" },
      { name: "Search-Friendly Content Structure" },
      { name: "Global SEO Foundations" },
      { name: "Performance Optimization" }
    ]
  },
  {
    id: "ai-creative",
    title: "05. AI CREATIVE & CONTENT",
    items: [
      { name: "Website Copy", desc: "Professional, engaging text that effectively communicates your brand's value proposition." },
      { name: "Marketing Content", desc: "Compelling content designed to support your broader digital marketing initiatives." },
      { name: "Product Visuals", desc: "High-quality, AI-assisted imagery showcasing your offerings in the best light." },
      { name: "Social Media Creatives" },
      { name: "Advertising Creatives" },
      { name: "AI-Assisted Video Content" },
      { name: "Creative Digital Assets" }
    ]
  },
  {
    id: "maintenance-growth",
    title: "06. WEBSITE MAINTENANCE & GROWTH",
    items: [
      { name: "Website Updates", desc: "Regular technical updates to keep your platform secure and running smoothly." },
      { name: "New Sections & Pages", desc: "Expanding your website thoughtfully as your business requirements evolve." },
      { name: "Continuous Website Development" },
      { name: "New Features" },
      { name: "Performance Optimization" },
      { name: "SEO Improvements" },
      { name: "Design Improvements" }
    ]
  }
];

// The Premium 3D Robot
function StudioRobot({ activeCard }: { activeCard: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    setLogoTexture(new THREE.TextureLoader().load("/fd-logo.png"));
  }, []);

  const eyesRef = useRef<THREE.Group>(null);
  const blinkTimer = useRef(0);

  // Smooth interaction tracking based on scroll
  useFrame((state, delta) => {
    if (!headRef.current) return;
    
    let targetX = 0;
    let targetY = 0;

    if (activeCard !== null) {
      if (activeCard === 1 || activeCard === 3 || activeCard === 5) { // Card on Right
        targetX = Math.PI / 4;
        targetY = -0.15;
      } else if (activeCard === 2 || activeCard === 4 || activeCard === 6) { // Card on Left
        targetX = -Math.PI / 4;
        targetY = -0.15;
      }
    } else {
      // Idle looking forward
      targetX = 0;
      targetY = 0;
    }
    
    // Idle animation layer (elegant floating)
    targetY += Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

    // Smooth head rotation
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.05);

    // Blinking Logic
    blinkTimer.current += delta;
    if (blinkTimer.current > 4) { // Blink every ~4 seconds
      if (blinkTimer.current > 4.15) { // Blink duration 0.15s
        blinkTimer.current = 0; 
      } else {
        if (eyesRef.current) {
           eyesRef.current.scale.y = 0.05; // close eyes
        }
      }
    } else {
       if (eyesRef.current) {
          eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y, 1, 0.3); // open smoothly
       }
    }
  });

  // Premium Architectural Materials
  const obsidianMaterial = new THREE.MeshPhysicalMaterial({
    color: "#050505",
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: "#9E8557",
    metalness: 1,
    roughness: 0.15,
    clearcoat: 0.8,
  });

  const visorMaterial = new THREE.MeshPhysicalMaterial({
    color: "#9E8557", // Gold reflective visor
    metalness: 1,
    roughness: 0.1,
    transmission: 0.2, // slightly glassy
    clearcoat: 1,
    emissive: "#9E8557",
    emissiveIntensity: 0.2,
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.5}>
      
      {/* Premium Humanoid Shoulders / Base */}
      <Cylinder args={[0.7, 0.5, 0.8, 64]} position={[0, 0, 0]} material={obsidianMaterial} />
      
      {/* FATE & DESTINY Image Logo on Chest */}
      <group position={[0, 0, 0.69]}>
        <mesh position={[0, 0.05, 0]}>
          <planeGeometry args={[0.55, 0.45]} />
          {logoTexture && (
            <meshBasicMaterial 
              map={logoTexture} 
              transparent={true} 
              blending={THREE.AdditiveBlending} 
              depthWrite={false}
            />
          )}
        </mesh>
      </group>
      
      {/* Neck */}
      <Cylinder args={[0.2, 0.3, 0.6, 32]} position={[0, 0.5, 0]} material={obsidianMaterial} />
      
      {/* Humanoid Head */}
      <group ref={headRef} position={[0, 1.3, 0]}>
        
        {/* Main Cranium */}
        <Sphere args={[0.9, 64, 64]} position={[0, 0, 0]} material={obsidianMaterial} />

        {/* Glowing Blinking Eyes */}
        <group ref={eyesRef} position={[0, 0.1, 0.88]}>
          <Sphere args={[0.08, 32, 32]} position={[-0.25, 0, 0]} material={new THREE.MeshPhysicalMaterial({ color: "#F5F0E6", emissive: "#F5F0E6", emissiveIntensity: 2 })} />
          <Sphere args={[0.08, 32, 32]} position={[0.25, 0, 0]} material={new THREE.MeshPhysicalMaterial({ color: "#F5F0E6", emissive: "#F5F0E6", emissiveIntensity: 2 })} />
        </group>

        {/* Elegant Earpieces / Temporal Nodes */}
        <Cylinder args={[0.25, 0.25, 1.9, 32]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={goldMaterial} />
        <Cylinder args={[0.15, 0.15, 1.95, 32]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={obsidianMaterial} />
      </group>
    </group>
  );
}

// Subtle architectural environment for the robot
function TechEnvironment() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <Torus args={[4, 0.02, 32, 100]} position={[0, 0, -3]} rotation={[Math.PI / 4, 0, 0]}>
        <meshBasicMaterial color="#9E8557" transparent opacity={0.4} />
      </Torus>
      <Torus args={[5, 0.01, 32, 100]} position={[0, 0, -4]} rotation={[-Math.PI / 6, 0, 0]}>
        <meshBasicMaterial color="#F5F0E6" transparent opacity={0.1} />
      </Torus>
    </Float>
  );
}

export default function TheIntelligenceStudio() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    // Fade in text blocks as you scroll AND update active card for the robot
    gsap.utils.toArray('.service-block').forEach((block: any, index: number) => {
      
      const cardNumber = index + 1;
      
      gsap.fromTo(block,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => setActiveCard(cardNumber),
            onEnterBack: () => setActiveCard(cardNumber),
            onLeave: () => setActiveCard((prev) => (prev === cardNumber ? null : prev)),
            onLeaveBack: () => setActiveCard((prev) => (prev === cardNumber ? null : prev)),
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      id="intelligence-studio"
      ref={containerRef}
      className="relative w-full bg-[#050505] z-20 border-t border-[#151515]"
    >
      
      {/* Intro Header - Regular flow, before the robot */}
      <div className="relative z-10 max-w-[1200px] mx-auto py-24 lg:min-h-screen flex flex-col justify-center items-center text-center px-6">
        <span className="text-[10px] md:text-[11px] font-inter tracking-[0.4em] text-[#9E8557] uppercase mb-6 border border-[#9E8557]/30 px-4 py-1.5 rounded-full bg-[#050505]/50 backdrop-blur-sm">
          THE INTELLIGENCE STUDIO
        </span>
        <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter mb-8 max-w-4xl mx-auto drop-shadow-2xl">
          BUILT FOR WHAT <br className="hidden md:block" />
          <span className="text-[#9E8557]">COMES NEXT.</span>
        </h2>
        <p className="text-[12px] md:text-[14px] font-inter text-[#F5F0E6] tracking-[0.1em] leading-[2] uppercase max-w-2xl mx-auto bg-black/20 p-4 rounded-xl backdrop-blur-sm">
          From intelligent automation to powerful digital experiences, we engineer the systems, websites, and AI agents that turn ambitious ideas into reality.
        </p>
      </div>

      <div className="relative w-full">
        {/* Sticky Full-Screen Robot Canvas */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_60%)] pointer-events-none" />
          
          <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }} dpr={[1, 2]} className="pointer-events-auto">
            <color attach="background" args={['#050505']} />
            
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-5, 5, -5]} intensity={2.5} color="#9E8557" />
            <spotLight position={[0, 8, 4]} intensity={2} angle={0.6} penumbra={1} color="#ffffff" />
            
            <Environment preset="studio" environmentIntensity={0.8} />
            
            <Suspense fallback={null}>
              <StudioRobot activeCard={activeCard} />
              <TechEnvironment />
            </Suspense>
          </Canvas>
        </div>

        {/* Scrolling Content Overlay for Services */}
        <div className="relative z-10 max-w-[1200px] mx-auto -mt-[100vh]">
          
          {/* Small Spacer so the first card doesn't overlap instantly, but starts appearing as the robot is seen */}
          <div className="h-[20vh] lg:h-[30vh] w-full pointer-events-none" />

          {/* Spaced out Services */}
          <div className="py-16 lg:py-32 px-6 flex flex-col gap-24 md:gap-32 lg:gap-0">
          
          {/* Service 01 */}
          <div className="min-h-[60vh] md:min-h-[50vh] lg:min-h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-end service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 01
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                PREMIUM WEBSITE DEVELOPMENT
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                Custom, responsive websites designed to present your brand clearly, build trust, and create meaningful customer interactions.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["Custom Web Applications", "Landing Pages", "Corporate Websites", "E-commerce", "Real Estate Websites"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Service 02 */}
          <div className="min-h-[50vh] lg:h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-start service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 02
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                WEBSITE REDESIGN
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                Modern improvements to outdated websites, helping businesses create a clearer, more professional, and mobile-friendly experience.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["UI/UX Modernization", "Mobile Optimization", "Performance Improvements", "Modern Interactions", "Conversion-Focused Layouts"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Service 03 */}
          <div className="min-h-[50vh] lg:h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-end service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 03
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                AI-POWERED EXPERIENCES
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                Intelligent web features designed to assist users, enhance interactions, and create sophisticated digital products.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["AI Website Assistants", "AI Chat Interfaces", "AI-Powered Search", "AI Recommendations", "Intelligent Website Experiences"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Service 04 */}
          <div className="min-h-[50vh] lg:h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-start service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 04
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                SEO & VISIBILITY
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                Foundational search optimization that helps search engines understand your website and improves its technical readiness.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["Technical SEO", "On-Page SEO", "Website Structure", "Search Console Setup", "Sitemap Setup"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Service 05 */}
          <div className="min-h-[50vh] lg:h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-end service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 05
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                AI CREATIVE & CONTENT
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                AI-assisted visuals, promotional assets, and content concepts created to support modern marketing campaigns.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["Website Copy", "Marketing Content", "Product Visuals", "Social Media Creatives", "AI-Assisted Video Content"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Service 06 */}
          <div className="min-h-[50vh] lg:h-[80vh] py-16 lg:py-0 flex items-center justify-center lg:justify-start service-block">
            <div className="group flex flex-col items-start text-left border border-[#F5F0E6]/20 lg:border-[#F5F0E6]/10 bg-black/70 lg:bg-black/20 backdrop-blur-md lg:backdrop-blur-sm hover:border-[#9E8557]/50 hover:bg-black/80 lg:hover:bg-black/40 p-8 md:p-12 lg:p-12 transition-all duration-700 cursor-pointer w-full max-w-xl rounded-3xl mx-2 md:mx-6 lg:mx-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] lg:shadow-none relative z-10">
              <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 opacity-[0.15] lg:opacity-[0.05] lg:group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none z-0">
                <Image src="/fd-logo-gold.png" alt="" fill className="object-contain object-right-bottom" />
              </div>
              <span className="text-[10px] md:text-[11px] font-inter tracking-[0.2em] text-[#858585] lg:text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557] relative z-10">
                SERVICE 06
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-4 lg:mb-6 relative z-10">
                MAINTENANCE & GROWTH
              </h3>
              <p className="text-[12px] md:text-[14px] font-inter text-[#9B9B9B] lg:text-[#858585] tracking-[0.1em] leading-[2] uppercase mb-4 lg:mb-8 relative z-10">
                Ongoing support and iterative improvements to ensure your digital presence remains fast, secure, and competitive.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["Website Updates", "New Sections & Pages", "Continuous Development", "Performance Optimization", "Design Improvements"].map((item, i) => (
                   <span key={i} className="text-[9px] font-inter border border-[#9E8557]/30 px-3 py-1 rounded-full text-[#F5F0E6] uppercase bg-black/40 group-hover:bg-[#9E8557]/10 transition-colors duration-300">{item}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
