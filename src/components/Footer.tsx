"use client";

export default function Footer() {
  return (
    <footer className="w-full h-[20vh] bg-[#000000] text-[#666] px-6 md:px-12 flex flex-col justify-center border-t border-[#151515]/50">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="font-abeezee text-xl md:text-2xl tracking-[0.3em] font-light text-[#F5F0E6] mix-blend-difference">
            FATE&DESTINY
          </span>
          <span className="text-[8px] md:text-[9px] font-inter tracking-[0.3em] uppercase">
            Digital Systems For What Comes Next
          </span>
        </div>
        
        <div className="flex gap-10 text-[9px] font-inter tracking-[0.2em] uppercase mt-2 md:mt-0">
          <a href="#" className="hover:text-[#9E8557] transition-colors duration-500">Instagram</a>
          <a href="#" className="hover:text-[#9E8557] transition-colors duration-500">Twitter</a>
          <a href="#" className="hover:text-[#9E8557] transition-colors duration-500">LinkedIn</a>
        </div>
        
        <div className="text-[8px] md:text-[9px] font-inter tracking-[0.2em] uppercase mt-2 md:mt-0 opacity-50">
          © {new Date().getFullYear()} Fate & Destiny Studio.
        </div>
      </div>
    </footer>
  );
}
