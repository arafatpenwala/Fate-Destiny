"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

// The Procedural Robot Component
function ProceduralRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Smooth cursor tracking
  useFrame((state, delta) => {
    if (!headRef.current) return;
    
    // Normalize mouse coordinates (-1 to 1)
    const targetX = (state.pointer.x * Math.PI) / 4; // Max rotation X
    const targetY = (state.pointer.y * Math.PI) / 8; // Max rotation Y

    // Smoothly interpolate the head rotation
    // We negate targetY because mouse Y goes UP to 1 in R3F, but we want the head to look UP (negative X rotation)
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.05);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.05);
  });

  // Materials
  const ceramicMaterial = new THREE.MeshPhysicalMaterial({
    color: "#F5F0E6",
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  const titaniumMaterial = new THREE.MeshPhysicalMaterial({
    color: "#1A1A1A",
    metalness: 0.9,
    roughness: 0.4,
  });

  const goldMaterial = new THREE.MeshPhysicalMaterial({
    color: "#9E8557",
    metalness: 1,
    roughness: 0.2,
    clearcoat: 0.5,
  });

  const eyeMaterial = new THREE.MeshBasicMaterial({
    color: "#FFB067",
  });

  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    setLogoTexture(new THREE.TextureLoader().load("/fd-logo.png"));
  }, []);

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Neck Base / Chest */}
      <group>
        <Cylinder args={[0.6, 0.8, 1, 32]} position={[0, 0.5, 0]} material={titaniumMaterial} />
        {/* FD Logo */}
        <mesh position={[0, 0.5, 0.73]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.5, 0.4]} />
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
      
      <Cylinder args={[0.65, 0.65, 0.1, 32]} position={[0, 0.9, 0]} material={goldMaterial} />
      
      {/* Articulated Neck Core */}
      <Cylinder args={[0.3, 0.3, 1.5, 32]} position={[0, 1.2, 0]} material={titaniumMaterial} />
      
      {/* Head Group (Rotates based on cursor) */}
      <group ref={headRef} position={[0, 2, 0]}>
        
        {/* Main Cranium */}
        <Sphere args={[1.2, 64, 64]} position={[0, 0.2, -0.2]} material={ceramicMaterial} />
        
        {/* Face Plate (Dark Visor area) */}
        <Sphere args={[1.15, 64, 64]} position={[0, 0.15, 0.1]} material={titaniumMaterial} />
        
        {/* Glowing Eyes */}
        <group position={[0, 0.3, 1.05]}>
          <Cylinder args={[0.08, 0.08, 0.4, 32]} position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={eyeMaterial} />
          <Cylinder args={[0.08, 0.08, 0.4, 32]} position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={eyeMaterial} />
        </group>

        {/* Gold Ear Nodes */}
        <Cylinder args={[0.3, 0.3, 2.5, 32]} position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 2]} material={goldMaterial} />
        
        {/* Forehead accent line */}
        <Torus args={[1.22, 0.02, 16, 100]} position={[0, 0.2, -0.2]} rotation={[Math.PI / 6, 0, 0]} material={goldMaterial} />
      </group>
    </group>
  );
}

// Background Architectural Halo
function Halo() {
  const haloRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (haloRef.current) {
      haloRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <Torus ref={haloRef} args={[4, 0.02, 16, 100]} position={[0, 1, -2]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#9E8557" transparent opacity={0.3} />
      </Torus>
      <Torus args={[4.5, 0.01, 16, 100]} position={[0, 1, -2.5]}>
        <meshBasicMaterial color="#F5F0E6" transparent opacity={0.1} />
      </Torus>
    </Float>
  );
}

export default function IntelligenceAtelier() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section 
      id="intelligence-atelier"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] flex flex-col xl:flex-row items-center z-20 overflow-hidden border-t border-[#151515]"
    >
      {/* Background ambient gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Left Side: Editorial Content */}
      <div className="relative z-10 w-full xl:w-1/2 flex flex-col justify-center px-6 md:px-12 xl:pl-24 pt-32 xl:pt-0 h-auto xl:h-full pb-12 xl:pb-0">
        <span className="text-[10px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-8">
          THE INTELLIGENCE ATELIER
        </span>
        
        <h2 className="text-[3.5rem] md:text-[5rem] xl:text-[6rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter mb-10 max-w-2xl">
          BUILT WITH <br/>
          <span className="italic text-[#9E8557]">INTELLIGENCE.</span>
        </h2>
        
        <p className="text-[11px] md:text-[12px] font-inter text-[#9B9B9B] tracking-[0.1em] leading-loose uppercase border-l border-[#9E8557]/30 pl-6 max-w-lg mb-16">
          From sophisticated websites to modern digital experiences, we engineer digital solutions that transform ambition into extraordinary execution.
        </p>
        
        <button className="flex items-center gap-6 group self-start">
          <div className="w-12 h-12 rounded-full border border-[#151515] group-hover:border-[#9E8557] group-hover:bg-[#9E8557] flex items-center justify-center text-[#9E8557] group-hover:text-[#050505] transition-all duration-500">
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-inter tracking-[0.2em] text-[#F5F0E6] uppercase group-hover:text-[#9E8557] transition-colors duration-500">
            EXPLORE OUR CAPABILITIES
          </span>
        </button>
      </div>

      {/* Right Side: 3D Interactive Canvas */}
      <div className="relative z-0 w-full xl:w-1/2 h-[50vh] md:h-[60vh] xl:h-screen cursor-crosshair mt-8 xl:mt-0">
        {mounted && (
          <Canvas camera={{ position: [0, 1, 6], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['#050505']} />
            
            {/* Cinematic Lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F5F0E6" />
            <directionalLight position={[-5, 2, -5]} intensity={2} color="#9E8557" />
            <spotLight position={[0, 10, 0]} intensity={1} angle={0.5} penumbra={1} color="#ffffff" />
            
            {/* Environment Reflections */}
            <Environment preset="city" environmentIntensity={0.5} />
            
            <group position={[0, -1, 0]}>
              <ProceduralRobot />
              <Halo />
            </group>
          </Canvas>
        )}

        {/* Decorative corner brackets for the canvas */}
        <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#9E8557]/30 pointer-events-none hidden xl:block" />
        <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#9E8557]/30 pointer-events-none hidden xl:block" />
      </div>
    </section>
  );
}
