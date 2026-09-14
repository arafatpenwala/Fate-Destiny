"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The Premium 3D Robot
function StudioRobot({ activeCard }: { activeCard: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const logoTexture = new THREE.TextureLoader().load("/fd-logo.png");

  // Smooth interaction tracking based on scroll
  useFrame((state, delta) => {
    if (!headRef.current) return;
    
    let targetX = 0;
    let targetY = 0;

    if (activeCard !== null) {
      if (activeCard === 1) { // Left (Full Stack Websites)
        targetX = Math.PI / 4;
        targetY = -0.15;
      } else if (activeCard === 2) { // Right (AI Automation)
        targetX = -Math.PI / 4;
        targetY = -0.15;
      } else if (activeCard === 3) { // Left (AI Agents)
        targetX = Math.PI / 4;
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
          <meshBasicMaterial 
            map={logoTexture} 
            transparent={true} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </mesh>
      </group>
      
      {/* Neck */}
      <Cylinder args={[0.2, 0.3, 0.6, 32]} position={[0, 0.5, 0]} material={obsidianMaterial} />
      
      {/* Humanoid Head */}
      <group ref={headRef} position={[0, 1.3, 0]}>
        
        {/* Main Cranium */}
        <Sphere args={[0.9, 64, 64]} position={[0, 0, 0]} material={obsidianMaterial} />
        
        {/* Sleek Daft-Punk Style Gold Visor */}
        <group position={[0, 0.1, 0]}>
           <Cylinder args={[0.92, 0.92, 0.35, 64, 1, false, -Math.PI / 2.5, Math.PI / 1.25]} rotation={[0, -Math.PI / 2.5, 0]} material={visorMaterial} />
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
            onLeave: () => setActiveCard(null),
            onLeaveBack: () => setActiveCard(null),
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

      {/* Scrolling Content Overlay */}
      <div className="relative z-10 max-w-[1200px] mx-auto -mt-[100vh]">
        
        {/* Intro Header */}
        <div className="h-screen flex flex-col justify-center items-center text-center px-6">
          <span className="text-[10px] md:text-[11px] font-inter tracking-[0.4em] text-[#9E8557] uppercase mb-6 border border-[#9E8557]/30 px-4 py-1.5 rounded-full bg-[#050505]/50 backdrop-blur-sm">
            THE INTELLIGENCE STUDIO
          </span>
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[6rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter mb-8 max-w-4xl mx-auto mix-blend-difference drop-shadow-2xl">
            BUILT FOR WHAT <br className="hidden md:block" />
            <span className="text-[#9E8557]">COMES NEXT.</span>
          </h2>
          <p className="text-[12px] md:text-[14px] font-inter text-[#F5F0E6] tracking-[0.1em] leading-[2] uppercase max-w-2xl mx-auto mix-blend-difference bg-black/20 p-4 rounded-xl backdrop-blur-sm">
            From intelligent automation to powerful digital experiences, we engineer the systems, websites, and AI agents that turn ambitious ideas into reality.
          </p>
        </div>

        {/* Spaced out Services */}
        <div className="py-32 px-6">
          
          {/* Service 01 */}
          <div className="h-[80vh] flex items-center justify-start service-block">
            <div className="group flex flex-col items-start text-left border border-[#151515] bg-[#050505]/80 backdrop-blur-md hover:border-[#9E8557]/40 p-8 lg:p-12 transition-all duration-700 cursor-pointer max-w-lg rounded-2xl">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557]">
                SERVICE 01
              </span>
              <h3 className="text-3xl md:text-4xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-6">
                FULL-STACK WEBSITES
              </h3>
              <p className="text-[12px] font-inter text-[#858585] tracking-[0.1em] leading-[1.8] uppercase mb-8">
                High-performance digital experiences engineered from interface to backend, built for scale, speed, and seamless interaction.
              </p>
            </div>
          </div>

          {/* Service 02 */}
          <div className="h-[80vh] flex items-center justify-end service-block">
            <div className="group flex flex-col items-start text-left border border-[#151515] bg-[#050505]/80 backdrop-blur-md hover:border-[#9E8557]/40 p-8 lg:p-12 transition-all duration-700 cursor-pointer max-w-lg rounded-2xl">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557]">
                SERVICE 02
              </span>
              <h3 className="text-3xl md:text-4xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-6">
                AI AUTOMATION
              </h3>
              <p className="text-[12px] font-inter text-[#858585] tracking-[0.1em] leading-[1.8] uppercase mb-8">
                Intelligent workflows that connect your tools, eliminate repetitive work, and transform complex operations into seamless systems.
              </p>
            </div>
          </div>

          {/* Service 03 */}
          <div className="h-[80vh] flex items-center justify-start service-block">
            <div className="group flex flex-col items-start text-left border border-[#151515] bg-[#050505]/80 backdrop-blur-md hover:border-[#9E8557]/40 p-8 lg:p-12 transition-all duration-700 cursor-pointer max-w-lg rounded-2xl">
              <span className="text-[10px] font-inter tracking-[0.2em] text-[#555] uppercase mb-4 transition-colors duration-500 group-hover:text-[#9E8557]">
                SERVICE 03
              </span>
              <h3 className="text-3xl md:text-4xl font-abeezee text-[#F5F0E6] uppercase tracking-tighter mb-6">
                AI AGENTS
              </h3>
              <p className="text-[12px] font-inter text-[#858585] tracking-[0.1em] leading-[1.8] uppercase mb-8">
                Purpose-built intelligent agents that understand, reason, and take action to help businesses work smarter.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
