"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Atelier", href: "#intelligence-atelier" },
  { name: "Disciplines", href: "#services" },
  { name: "Systems", href: "#system" },
  { name: "The Studio", href: "#intelligence-studio" },
  { name: "Process", href: "#process" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    
    // Smooth scrolling for elements
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-md border-b border-[#151515] py-4"
            : "bg-transparent border-b border-transparent py-6"
        }`}
      >
        <div className="w-full px-8 md:px-16 xl:px-24 flex items-center relative h-16">
          {/* Logo - Positioned Absolute Left */}
          <div
            className="cursor-pointer flex items-center gap-4 group absolute left-8 md:left-16 xl:left-24"
            onClick={() => scrollTo("#hero")}
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image 
                src="/fd-logo.png" 
                alt="FD Logo" 
                fill 
                className="object-contain mix-blend-screen" 
              />
            </div>
            <span className="font-abeezee text-[20px] md:text-2xl tracking-[0.25em] font-light text-[#9E8557] group-hover:text-[#F5F0E6] transition-colors duration-300">
              FATE&DESTINY
            </span>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden xl:flex gap-10 items-center justify-center w-full">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-[11px] font-inter uppercase tracking-[0.15em] text-[#9B9B9B] hover:text-[#F5F0E6] transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#9E8557] transition-all duration-500 ease-out group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Section - Desktop Contact & Mobile Toggle */}
          <div className="absolute right-8 md:right-16 xl:right-24 flex items-center gap-6">
            {/* Desktop Contact Button */}
            <a 
              href="https://wa.me/919372132828"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center justify-center px-8 py-3.5 bg-[#9E8557] hover:bg-[#F5F0E6] text-[#050505] transition-colors duration-300 rounded-[2px]"
            >
              <span className="text-[11px] md:text-[12px] font-inter uppercase tracking-[0.2em] font-medium">
                Contact
              </span>
            </a>

            {/* Mobile Toggle */}
            <button
              className="xl:hidden text-[#F5F0E6] hover:text-[#9E8557] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} strokeWidth={1} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity duration-700 ease-in-out xl:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/95 backdrop-blur-xl flex flex-col pt-24 pb-12 px-10 rounded-b-[40px] shadow-2xl shadow-black/50 border-b border-[#222] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          mobileMenuOpen
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
      >
        <button
          className="absolute top-8 right-8 text-[#F5F0E6] hover:text-[#9E8557] transition-colors duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={32} strokeWidth={1} />
        </button>
        
        <div className="flex flex-col items-center gap-8 w-full">
          {links.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-center text-3xl sm:text-4xl font-abeezee font-light uppercase tracking-tighter text-[#F5F0E6] hover:text-[#9E8557] transition-colors duration-300"
              style={{
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(30px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 0.1}s`,
              }}
            >
              {link.name}
            </button>
          ))}

          {/* Contact Button */}
          <a
            href="https://wa.me/919372132828"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-10 py-4 bg-[#9E8557] hover:bg-[#F5F0E6] text-[#050505] transition-colors duration-300 rounded-[2px] w-full max-w-[200px] flex items-center justify-center mx-auto"
            style={{
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(30px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(links.length + 1) * 0.1}s`,
            }}
          >
            <span className="text-[12px] font-inter uppercase tracking-[0.2em] font-medium">Contact</span>
          </a>
        </div>
        
        {/* Footer Logo */}
        <div 
          className="mt-12 w-full flex items-center justify-center gap-3 border-t border-[#222] pt-8"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `opacity 0.6s ease ${(links.length + 2) * 0.1}s`,
          }}
        >
          <div className="relative w-8 h-8 opacity-90">
            <Image 
              src="/fd-logo.png" 
              alt="FD Logo" 
              fill 
              className="object-contain mix-blend-screen" 
            />
          </div>
          <span className="font-abeezee text-[16px] tracking-[0.25em] font-light text-[#9E8557]">
            FATE&DESTINY
          </span>
        </div>
      </div>
    </>
  );
}
