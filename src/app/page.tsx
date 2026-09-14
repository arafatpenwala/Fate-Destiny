import IntroLoader from "@/components/IntroLoader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import IntelligenceAtelier from "@/components/IntelligenceAtelier";
import AboutEthos from "@/components/AboutEthos";
import ServicesShowcase from "@/components/ServicesShowcase";
import SystemDiagram from "@/components/SystemDiagram";
import TechArchitecture from "@/components/TechArchitecture";
import WhyFateDestiny from "@/components/WhyFateDestiny";
import Methodology from "@/components/Methodology";
import Footer from "@/components/Footer";
import TheIntelligenceStudio from "@/components/TheIntelligenceStudio";

export default function Home() {
  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505] overflow-clip relative">
      <IntroLoader />
      <Navigation />
      <Hero />

      <div className="relative z-20 bg-[#050505] shadow-[0_-20px_50px_rgba(5,5,5,1)]">
        <IntelligenceAtelier />
        <ServicesShowcase />
        <SystemDiagram />
        <AboutEthos />
        <TheIntelligenceStudio />
        <WhyFateDestiny />
        <Methodology />
        <Footer />
      </div>
    </main>
  );
}
