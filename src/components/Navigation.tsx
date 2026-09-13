"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Services", href: "#services" },
  { name: "Selected Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
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
            : "bg-transparent border-b border-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div
            className="cursor-pointer flex flex-col group"
            onClick={() => scrollTo("#hero")}
          >
            <span className="font-abeezee text-xl tracking-[0.2em] font-light text-[#F5F0E6] group-hover:text-[#9E8557] transition-colors duration-300">
              FATE&DESTINY
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 items-center">
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#F5F0E6] hover:text-[#9E8557] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} strokeWidth={1} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col justify-center px-10 transition-all duration-700 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-8 right-8 text-[#F5F0E6] hover:text-[#9E8557] transition-colors duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={32} strokeWidth={1} />
        </button>
        
        <div className="flex flex-col gap-10">
          {links.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-left text-4xl font-abeezee font-light text-[#F5F0E6] hover:text-[#9E8557] transition-colors duration-300"
              style={{
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(30px)",
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 0.1}s`,
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
        
        <div 
          className="absolute bottom-12 left-10 text-[10px] font-inter tracking-[0.2em] text-[#9B9B9B] uppercase"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: `opacity 0.6s ease 0.6s`,
          }}
        >
          FATE&DESTINY STUDIO
        </div>
      </div>
    </>
  );
}
