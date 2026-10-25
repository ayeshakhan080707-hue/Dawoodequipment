import React from 'react';

interface PrimeCtaBannerProps {
  onTalkToSpecialist: () => void;
  onRequestPricing: () => void;
}

export const PrimeCtaBanner: React.FC<PrimeCtaBannerProps> = ({
  onTalkToSpecialist,
  onRequestPricing,
}) => {
  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-20 pb-28 border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-900 leading-none">
          UPGRADE YOUR FLEET WITH CONFIDENCE
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Get expert recommendations, transparent pricing, and dependable after-sales support.
        </p>

        {/* Dual Chamfered Action Buttons matching reference image */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onTalkToSpecialist}
            className="clip-chamfer px-8 py-3.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,184,0,0.35)]"
          >
            Talk to Specialist
          </button>

          <button
            type="button"
            onClick={onRequestPricing}
            className="clip-chamfer px-8 py-3.5 text-xs font-heading font-black uppercase tracking-wider bg-slate-200 hover:bg-slate-300 text-slate-900 transition-all cursor-pointer"
          >
            Request Pricing
          </button>
        </div>

      </div>

      {/* Heavy Excavator Arm & Bucket Graphic Framing matching reference image */}
      <div className="relative mt-8 max-w-5xl mx-auto h-48 sm:h-64 flex items-end justify-between px-4 sm:px-12 pointer-events-none select-none opacity-90">
        
        {/* Left: Heavy excavator boom arm */}
        <div className="w-48 sm:w-72 h-full flex items-end">
          <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
            {/* Boom hydraulic arm */}
            <path d="M20 240 L120 120 L220 70 L260 140" stroke="#FFB800" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 240 L125 130 L215 85 L250 145" stroke="#D97706" strokeWidth="8" />
            {/* Hydraulic cylinder */}
            <line x1="80" y1="180" x2="190" y2="100" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" />
            <line x1="100" y1="165" x2="170" y2="115" stroke="#475569" strokeWidth="4" />
            {/* Bucket with teeth */}
            <path d="M250 140 L280 200 L210 220 L200 170 Z" fill="#334155" stroke="#0F172A" strokeWidth="3" />
            {/* Teeth */}
            <polygon points="280,200 295,210 285,215" fill="#FFB800" />
            <polygon points="265,205 280,215 270,220" fill="#FFB800" />
            <polygon points="250,210 265,220 255,225" fill="#FFB800" />
          </svg>
        </div>

        {/* Right: Steel scoop bucket */}
        <div className="w-44 sm:w-64 h-full flex items-end justify-end">
          <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
            <path d="M20 190 L240 190 L250 110 L180 80 L30 110 Z" fill="#475569" stroke="#1E293B" strokeWidth="4" />
            <path d="M30 110 L180 80 L230 130" stroke="#64748B" strokeWidth="3" />
            {/* Heavy rock teeth */}
            <polygon points="20,190 5,180 15,170" fill="#FFB800" />
            <polygon points="60,190 45,180 55,170" fill="#FFB800" />
            <polygon points="100,190 85,180 95,170" fill="#FFB800" />
            <polygon points="140,190 125,180 135,170" fill="#FFB800" />
            <polygon points="180,190 165,180 175,170" fill="#FFB800" />
            <polygon points="220,190 205,180 215,170" fill="#FFB800" />
          </svg>
        </div>

      </div>

    </section>
  );
};
