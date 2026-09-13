import IntroLoader from "@/components/IntroLoader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] text-[#F5F0E6] min-h-screen selection:bg-[#9E8557] selection:text-[#050505] overflow-clip relative">
      <IntroLoader />
      <Navigation />
      
      {/* Hero pinned via GSAP inside */}
      <Hero />
      
      {/* Main Content Block (slides over Hero) */}
      <div className="relative z-10 bg-[#050505] shadow-[0_-20px_50px_rgba(5,5,5,1)]">
        <Manifesto />
        <Services />
        <SelectedWork />
        <Process />
      </div>

      {/* Footer Block (Reveals from underneath) */}
      <div className="relative z-0 w-full h-screen sticky bottom-0">
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
