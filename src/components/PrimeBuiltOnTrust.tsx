import React from 'react';

interface PrimeBuiltOnTrustProps {
  onLearnMore: () => void;
}

export const PrimeBuiltOnTrust: React.FC<PrimeBuiltOnTrustProps> = ({ onLearnMore }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F8F9FA] text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive "BUILT ON TRUST" Headline Lockup with Crane Lifting Block matching reference */}
        <div className="relative text-center max-w-4xl mx-auto pb-6">
          
          <div className="relative inline-block">
            <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-slate-900 leading-none">
              BUILT ON TRUST
            </h2>

            {/* Crane / Telehandler Arm Illustration lifting concrete block */}
            <div className="hidden md:flex absolute -left-28 -top-8 items-center pointer-events-none select-none">
              <div className="relative">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Heavy yellow crane boom */}
                  <path d="M10 110L70 40L140 25" stroke="#FFB800" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 110L80 50L135 35" stroke="#D97706" strokeWidth="4" />
                  {/* Cable */}
                  <line x1="140" y1="25" x2="140" y2="70" stroke="#1E293B" strokeWidth="2" strokeDasharray="3 2" />
                  {/* Suspended concrete block */}
                  <rect x="125" y="70" width="30" height="20" rx="2" fill="#475569" stroke="#0F172A" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-6 text-base sm:text-xl text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Keeping your projects moving with top-grade equipment. From single-unit purchases to full fleet supply, we help businesses operate with confidence and efficiency.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={onLearnMore}
              className="clip-chamfer inline-block px-8 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,184,0,0.3)]"
            >
              Learn About Our Company
            </button>
          </div>

        </div>

        {/* Wide Cinematic Jobsite Photography matching reference */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-2xl border border-slate-200 h-[360px] sm:h-[480px] lg:h-[540px] relative">
          <img
            src="/src/assets/images/hero_excavator_heavy_1792859629737.jpg"
            alt="Active Heavy Civil Earthmoving Jobsite with Excavators and Bulldozers"
            className="w-full h-full object-cover filter contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
            <span className="bg-slate-950/80 px-3 py-1.5 rounded backdrop-blur-md">
              LIVE OPERATION: CONTINENTAL HIGHWAY CORRIDOR PHASE 3
            </span>
            <span className="hidden sm:inline bg-slate-950/80 px-3 py-1.5 rounded backdrop-blur-md text-[#FFB800] font-bold">
              ZERO UNPLANNED INCIDENTS
            </span>
          </div>
        </div>

        {/* 3 Big Stat Counters matching reference image */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          <div className="pt-4 md:pt-0">
            <div className="font-heading text-6xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none">
              25+
            </div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-2">
              Years Experience
            </div>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="font-heading text-6xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none">
              40+
            </div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-2">
              Countries Served
            </div>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="font-heading text-6xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none">
              24/7
            </div>
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-2">
              Support Team
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
