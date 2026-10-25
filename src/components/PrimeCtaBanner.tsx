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

      {/* Machinery Images framing the CTA section */}
      <div className="relative mt-8 max-w-6xl mx-auto h-72 sm:h-96 md:h-[480px] flex items-end justify-between px-0 pointer-events-none select-none overflow-visible">
        
        {/* Left: Heavy Yellow All-Terrain Crane Truck */}
        <div className="w-72 sm:w-[420px] md:w-[560px] h-full flex items-end">
          <img
            src="/assets/images/Heavy Yellow All-Terrain Crane Truck.png"
            alt="Heavy Yellow All-Terrain Crane Truck"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
            draggable={false}
          />
        </div>

        {/* Right: Detailed Yellow Tower Crane */}
        <div className="w-56 sm:w-80 md:w-[420px] h-full flex items-end justify-end">
          <img
            src="/assets/images/Detailed Yellow Tower Crane Isolated.png"
            alt="Detailed Yellow Tower Crane"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
            draggable={false}
          />
        </div>

      </div>

    </section>
  );
};
