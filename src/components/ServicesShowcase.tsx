"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    id: "websites",
    num: "01",
    title: "PREMIUM WEBSITES",
    category: "WEBSITE DEVELOPMENT",
    desc: "Premium, responsive websites designed to present your business clearly, build trust, and create meaningful customer interactions.",
    features: ["Custom frontend development", "Full-stack web applications", "Backend systems and APIs", "Responsive design", "Authentication and databases", "Deployment and performance optimization"]
  },
  {
    id: "redesign",
    num: "02",
    title: "DIGITAL EVOLUTION",
    category: "WEBSITE REDESIGN",
    desc: "Modern improvements to outdated websites, helping businesses create a clearer, more professional, and mobile-friendly experience.",
    features: ["UI/UX modernization", "Mobile optimization", "Performance improvements", "Modern interactions", "Conversion-focused layouts", "Improved website structure"]
  },
  {
    id: "ai-experiences",
    num: "03",
    title: "INTELLIGENT FEATURES",
    category: "AI-POWERED EXPERIENCES",
    desc: "Intelligent web features designed to assist users, enhance interactions, and create sophisticated digital products.",
    features: ["AI website assistants", "AI chat interfaces", "AI-powered search", "AI recommendations", "Intelligent experiences", "AI-enhanced content features"]
  },
  {
    id: "seo",
    num: "04",
    title: "DIGITAL DOMINANCE",
    category: "SEO & VISIBILITY",
    desc: "Foundational search optimization that helps search engines understand your website and improves its technical readiness.",
    features: ["Technical SEO", "On-page SEO", "Website structure optimization", "Search Console setup", "Sitemap setup", "Performance optimization"]
  },
  {
    id: "creative",
    num: "05",
    title: "VISUAL INTELLIGENCE",
    category: "AI CREATIVE & CONTENT",
    desc: "AI-assisted visuals, promotional assets, and content concepts created to support modern marketing campaigns.",
    features: ["Website copy", "Marketing content", "Social media creatives", "Product visuals", "Advertising creatives", "Creative digital assets"]
  },
  {
    id: "maintenance",
    num: "06",
    title: "CONTINUOUS GROWTH",
    category: "MAINTENANCE & GROWTH",
    desc: "Ongoing support and iterative improvements to ensure your digital presence remains fast, secure, and competitive.",
    features: ["Website updates", "New sections & pages", "New features", "Performance tuning", "SEO improvements", "Continuous development"]
  },
  {
    id: "ai-automation",
    num: "07",
    title: "AI AUTOMATION",
    category: "AI AUTOMATION",
    desc: "Intelligent AI-powered workflows that automate repetitive business processes, connect your tools, and reduce manual work.",
    features: ["Workflow automation", "API integrations", "Repetitive task reduction", "Data synchronization", "Custom automation scripts", "Efficiency optimization"]
  },
  {
    id: "agentic-ai",
    num: "08",
    title: "AGENTIC AI",
    category: "AGENTIC AI",
    desc: "Intelligent AI agents that understand tasks, make decisions within defined boundaries, use connected tools, and take actions to complete business workflows.",
    features: ["Autonomous agents", "Task execution", "Decision making", "Tool integration", "Workflow completion", "Intelligent behavior"]
  }
];

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

// The premium 3D kinetic sculpture
function FateOrbit({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const arc1Ref = useRef<THREE.Group>(null);
  const arc2Ref = useRef<THREE.Group>(null);
  const arc3Ref = useRef<THREE.Group>(null);

  const nodesRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);

  // Premium Architectural Materials
  const obsidianMaterial = new THREE.MeshPhysicalMaterial({
    color: "#000000",
    metalness: 0.3, // Reduced metalness to prevent chrome/silver reflections
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

  const emissiveGoldMaterial = new THREE.MeshPhysicalMaterial({
    color: "#9E8557",
    emissive: "#9E8557",
    emissiveIntensity: 0.4,
    metalness: 1,
    roughness: 0.2,
  });

  useFrame((state, delta) => {
    if (!groupRef.current || !arc1Ref.current || !arc2Ref.current || !arc3Ref.current || !coreRef.current || !nodesRef.current) return;

    // Base subtle idle rotation
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.5) * 0.001;

    coreRef.current.rotation.x -= delta * 0.1;
    coreRef.current.rotation.y -= delta * 0.2;

    let targetArc1RotX = 0, targetArc1RotY = 0, targetArc1RotZ = 0;
    let targetArc2RotX = 0, targetArc2RotY = 0, targetArc2RotZ = 0;
    let targetArc3RotX = 0, targetArc3RotY = 0, targetArc3RotZ = 0;
    let targetScale = 1;
    let targetNodesOpacity = 0;

    const stateIndex = activeIndex % 3;

    if (stateIndex === 0) {
      // State 1: Digital Architecture (Structured, open)
      targetArc1RotX = Math.PI / 6;
      targetArc1RotY = 0;
      targetArc2RotX = -Math.PI / 6;
      targetArc2RotY = 0;
      targetArc3RotZ = Math.PI / 8;
      targetArc3RotX = Math.PI / 12;
      targetScale = 0.9;
      targetNodesOpacity = 0.2; // slight nodes
    } else if (stateIndex === 1) {
      // State 2: Automation Flow (Angular, flowing network)
      targetArc1RotX = Math.PI / 4;
      targetArc1RotY = 0;
      targetArc2RotY = Math.PI / 6;
      targetArc2RotX = -Math.PI / 8;
      targetArc3RotZ = -Math.PI / 6;
      targetArc3RotX = Math.PI / 10;
      targetScale = 1.0;
      targetNodesOpacity = 1;

      // Dynamic flowing motion for nodes
      nodesRef.current.rotation.z -= delta * 1.2;
      nodesRef.current.rotation.y += delta * 0.8;
    } else if (stateIndex === 2) {
      // State 3: AI Agents (Complex intelligence structure)
      targetArc1RotX = Math.PI / 4;
      targetArc1RotY = Math.PI / 6;
      targetArc2RotX = -Math.PI / 4;
      targetArc2RotY = -Math.PI / 6;
      targetArc3RotZ = Math.PI / 6;
      targetArc3RotX = Math.PI / 8;
      targetScale = 1.1;
      targetNodesOpacity = 1;

      // erratic advanced logic motion
      nodesRef.current.rotation.x += delta * 1;
      nodesRef.current.rotation.y -= delta * 0.5;
      nodesRef.current.rotation.z += delta * 1.5;
    }

    // Smooth Lerp transformations based on state
    const lerpSpeed = 0.03;

    arc1Ref.current.rotation.x = THREE.MathUtils.lerp(arc1Ref.current.rotation.x, targetArc1RotX, lerpSpeed);
    arc1Ref.current.rotation.y = THREE.MathUtils.lerp(arc1Ref.current.rotation.y, targetArc1RotY, lerpSpeed);
    arc1Ref.current.rotation.z = THREE.MathUtils.lerp(arc1Ref.current.rotation.z, targetArc1RotZ, lerpSpeed);

    arc2Ref.current.rotation.x = THREE.MathUtils.lerp(arc2Ref.current.rotation.x, targetArc2RotX, lerpSpeed);
    arc2Ref.current.rotation.y = THREE.MathUtils.lerp(arc2Ref.current.rotation.y, targetArc2RotY, lerpSpeed);
    arc2Ref.current.rotation.z = THREE.MathUtils.lerp(arc2Ref.current.rotation.z, targetArc2RotZ, lerpSpeed);

    arc3Ref.current.rotation.x = THREE.MathUtils.lerp(arc3Ref.current.rotation.x, targetArc3RotX, lerpSpeed);
    arc3Ref.current.rotation.y = THREE.MathUtils.lerp(arc3Ref.current.rotation.y, targetArc3RotY, lerpSpeed);
    arc3Ref.current.rotation.z = THREE.MathUtils.lerp(arc3Ref.current.rotation.z, targetArc3RotZ, lerpSpeed);

    // Responsive scaling: make it 80% larger on mobile screens because vertical FOV squishes it
    const isMobile = window.innerWidth < 768;
    const finalScale = targetScale * (isMobile ? 1.8 : 1);
    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), lerpSpeed);

    // Nodes opacity lerp
    nodesRef.current.children.forEach((child: any) => {
      if (child.material) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetNodesOpacity, lerpSpeed);
      }
    });

    // Keep position perfectly centered to align with the background eye, 
    // but add a subtle rotation based on mouse for a premium interactive feel.
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.pointer.y * 0.1), 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.pointer.x * 0.1) + (state.clock.elapsedTime * 0.05), 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* 1. Abstract Intelligence Core */}
      <group ref={coreRef}>
        <Icosahedron args={[0.5, 0]}>
          <primitive object={obsidianMaterial} attach="material" />
        </Icosahedron>
        {/* Core geometric cage */}
        <Icosahedron args={[0.6, 1]} >
          <meshBasicMaterial color="#9E8557" wireframe transparent opacity={0.3} />
        </Icosahedron>
        {/* Inner light/eye */}
        <Sphere args={[0.1, 16, 16]}>
          <primitive object={emissiveGoldMaterial} attach="material" />
        </Sphere>
      </group>

      {/* 2. Orbit Nodes (Hidden initially, active in Automation & Agents) */}
      <group ref={nodesRef}>
        {/* Rings */}
        <Torus args={[1.5, 0.005, 16, 100]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Torus>
        <Torus args={[1.8, 0.005, 16, 100]} rotation={[Math.PI / 4, Math.PI / 2, 0]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Torus>

        {/* Traveling mechanical indicators */}
        <Sphere args={[0.06, 16, 16]} position={[1.5, 0, 0]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Sphere>
        <Sphere args={[0.04, 16, 16]} position={[-1.5, 0, 0]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Sphere>
        <Sphere args={[0.08, 16, 16]} position={[0, 1.8, 0]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Sphere>
        <Sphere args={[0.03, 16, 16]} position={[0, -1.8, 0]}>
          <meshBasicMaterial color="#9E8557" transparent opacity={0} />
        </Sphere>
      </group>

      {/* 3. Structural Arc 1 (Inner architecture) */}
      <group ref={arc1Ref}>



      </group>

      {/* 4. Structural Arc 2 (Middle layer) */}
      <group ref={arc2Ref}>

        {/* Inner gold track */}
        <Torus args={[2.3, 0.015, 16, 100]} rotation={[0, 0, Math.PI / 4]}>
          <primitive object={goldMaterial} attach="material" />
        </Torus>
      </group>

      {/* 5. Structural Arc 3 (Outer Shell) */}
      <group ref={arc3Ref}>

        {/* Outer gold accent line */}
        <Torus args={[2.93, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <primitive object={emissiveGoldMaterial} attach="material" />
        </Torus>
      </group>

    </group>
  );
}

// Subtle atmospheric depth for the background
function CinematicEnvironment() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <Torus args={[6, 0.01, 16, 100]} position={[0, 0, -5]} rotation={[Math.PI / 4, 0, 0]}>
        <meshBasicMaterial color="#9E8557" transparent opacity={0.15} />
      </Torus>
      <Torus args={[8, 0.005, 16, 100]} position={[0, 0, -8]} rotation={[-Math.PI / 6, 0, 0]}>
        <meshBasicMaterial color="#F5F0E6" transparent opacity={0.05} />
      </Torus>
    </Float>
  );
}

export default function ServicesShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const textSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || prefersReducedMotion) return;

    // Setup scroll triggers for each text section to change active index
    textSectionsRef.current.forEach((section, index) => {
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });

      // Parallax effect on the text itself
      gsap.fromTo(
        section.querySelector('.service-content'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
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
      id="services"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-[#F5F0E6] flex flex-col xl:flex-row z-20 border-t border-[#151515]"
    >
      {/* Sticky 3D Canvas Side */}
      <div className="w-full xl:w-1/2 h-screen sticky top-0 flex flex-col p-6 md:p-12 overflow-hidden z-0 pointer-events-none xl:pointer-events-auto">
        <div className="mb-4 xl:mb-12 z-20 relative pt-16 xl:pt-0">
          <span className="text-[9px] font-inter tracking-[0.4em] text-[#9E8557] uppercase bg-[#050505]/50 px-4 py-2 rounded-full border border-[#9E8557]/20 backdrop-blur-md">
            CORE DISCIPLINES
          </span>
        </div>

        <div className="flex-1 w-full relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(158,133,87,0.08)_0%,_transparent_70%)] pointer-events-none" />

          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['#050505']} />

            {/* Cinematic Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-5, 5, -5]} intensity={2.5} color="#9E8557" />
            <spotLight position={[0, 8, 4]} intensity={2} angle={0.6} penumbra={1} color="#ffffff" />

            <Environment preset="studio" environmentIntensity={0.6} />

            <Suspense fallback={null}>
              <FateOrbit activeIndex={activeIndex} />
              <CinematicEnvironment />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Scrolling Text Side */}
      <div className="w-full xl:w-1/2 bg-[#050505]/40 xl:bg-[#050505]/80 backdrop-blur-sm xl:backdrop-blur-xl xl:border-l border-[#151515] relative z-10 mt-[-10vh] xl:mt-0 pt-[10vh] xl:pt-0">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={el => { textSectionsRef.current[index] = el; }}
            className="min-h-[90vh] xl:min-h-[100vh] flex flex-col justify-center px-6 md:px-20 py-20 xl:py-32"
          >
            <div className="service-content">
              <div className="flex items-center gap-6 mb-8">
                <span className="text-[10px] font-inter tracking-[0.3em] text-[#9E8557]">
                  {service.num}
                </span>
                <span className="text-[9px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase">
                  {service.category}
                </span>
              </div>

              <h2 className="text-[2.5rem] md:text-[4rem] font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter mb-10 mix-blend-difference drop-shadow-xl">
                {service.title}
              </h2>

              <p className="text-[11px] md:text-[12px] font-inter text-[#9B9B9B] tracking-[0.1em] max-w-md leading-[2] uppercase border-l border-[#9E8557]/30 pl-6 mb-16">
                {service.desc}
              </p>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1 h-1 rounded-full bg-[#151515]" style={{ backgroundColor: i === 0 ? '#9E8557' : '#151515' }} />
                    <span className="text-[9px] font-inter tracking-[0.2em] uppercase text-[#F5F0E6]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}


      </div>
    </section>
  );
}
