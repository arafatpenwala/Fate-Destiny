import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E6] flex flex-col items-center justify-center relative overflow-hidden font-inter p-6">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9E8557 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#050505_80%)] z-0 pointer-events-none" />
      
      <div className="relative z-10 text-center flex flex-col items-center max-w-2xl">
        <span className="text-[12px] font-inter tracking-[0.4em] text-[#9E8557] uppercase block mb-4">
          Error 404
        </span>
        <h1 className="text-5xl md:text-7xl font-abeezee font-light leading-[1] text-[#F5F0E6] uppercase tracking-tighter mb-6">
          Page Not <span className="italic text-[#9E8557]">Found.</span>
        </h1>
        <p className="text-[11px] md:text-[13px] font-inter text-[#858585] tracking-[0.2em] max-w-md leading-loose uppercase mb-12">
          The destination you are seeking does not exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-[#9E8557] text-[#050505] text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#C5A46D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
          <Link 
            href="/#services"
            className="flex items-center gap-2 px-8 py-4 bg-transparent border border-[#9E8557]/30 text-[#9E8557] text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#9E8557]/10 hover:border-[#9E8557] transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}
