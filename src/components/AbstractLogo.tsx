export default function AbstractLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeDasharray="4 4"
        className="opacity-40 animate-[spin_20s_linear_infinite]" 
      />
      
      {/* Inner Solid Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="38" 
        stroke="currentColor" 
        strokeWidth="1"
        className="opacity-60" 
      />

      {/* Central Geometric Structure (Abstract F&D / Star) */}
      <path 
        d="M50 15 L60 40 L85 50 L60 60 L50 85 L40 60 L15 50 L40 40 Z" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Core Node */}
      <circle 
        cx="50" 
        cy="50" 
        r="6" 
        fill="currentColor" 
      />
      
      {/* Accent Dots */}
      <circle cx="50" cy="8" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="50" cy="92" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="8" cy="50" r="2" fill="currentColor" className="opacity-80" />
      <circle cx="92" cy="50" r="2" fill="currentColor" className="opacity-80" />
    </svg>
  );
}
