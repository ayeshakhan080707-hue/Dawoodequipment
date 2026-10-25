import React from 'react';
import { Phone, ArrowRight, Truck, Package, Ship, Globe, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/fleetData';

interface PrimeHeroProps {
  onOpenQuote: () => void;
  onBrowseInventory: () => void;
}

export const PrimeHero: React.FC<PrimeHeroProps> = ({ onOpenQuote, onBrowseInventory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF2F6] via-[#F8F9FA] to-white text-slate-900 pt-8 pb-0 border-b border-slate-200">
      
      {/* Background subtle warm glow */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(255,184,0,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Giant Watermark & Headline Lockup */}
        <div className="relative text-center pt-4 pb-4">
          
          {/* Outline watermark */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-transparent select-none pointer-events-none opacity-20 whitespace-nowrap"
            style={{
              WebkitTextStroke: '2px rgba(15, 23, 42, 0.12)',
            }}
          >
            DAWOOD EQUIPMENT CO
          </div>

          <h1 className="relative font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-slate-900 leading-none">
            HEAVY EQUIPMENT
          </h1>
          <p className="font-heading text-lg sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-slate-700 font-bold mt-2">
            FOR SALE & WORLDWIDE EXPORT
          </p>

        </div>

        {/* 3 Core Services Badge Strip */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm text-slate-800">
            <Truck className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="font-bold">Trucking</span>
            <span className="text-slate-400">(Domestic Inland Transport)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm text-slate-800">
            <Package className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="font-bold">Containerizing</span>
            <span className="text-slate-400">(Dismantling & Loading)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 shadow-sm text-slate-800">
            <Ship className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="font-bold">Ocean Freight</span>
            <span className="text-slate-400">(Worldwide Seaport Export)</span>
          </div>
        </div>

        {/* Hero Visual Stage with Floating Box */}
        <div className="relative mt-4 sm:mt-6">
          
          {/* Left Floating Info Box with Real Business Model */}
          <div className="absolute top-6 left-2 sm:left-6 z-20 max-w-xs space-y-3 bg-white/95 sm:bg-white/90 backdrop-blur-md p-5 rounded-lg border border-slate-200 shadow-xl">
            <div className="text-[11px] font-mono text-[#D97706] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>EQUIPMENT FOR SALE</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900 uppercase leading-tight">
              Used Earthmoving Machinery Dealership
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed">
              Buying and selling Caterpillar, Komatsu, Case & John Deere equipment. Outright purchase with turnkey domestic trucking, containerizing, and ocean freight.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="clip-chamfer flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-sm text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (630) 379-9175</span>
              </a>

              <button
                type="button"
                onClick={onBrowseInventory}
                className="py-1.5 text-xs font-mono font-bold text-slate-800 hover:text-slate-950 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Equipment For Sale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Central Heavy Loader Image */}
          <div className="relative w-full max-w-5xl mx-auto h-[380px] sm:h-[480px] md:h-[580px] overflow-hidden rounded-t-2xl shadow-xl border-x border-t border-slate-200">
            <img
              src="/assets/images/fleet_mining_loader_1792859632094.jpg"
              alt="Dawood Equipment Heavy Construction Machinery Ready for Sale and Export"
              className="w-full h-full object-cover object-center filter contrast-105 brightness-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Manufacturer Brand Ribbon matching Target Report Vendors */}
      <div id="vendors" className="w-full bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 text-slate-500 font-heading text-lg sm:text-xl md:text-2xl font-black uppercase tracking-widest">
            <span className="hover:text-slate-900 transition-colors cursor-default">CATERPILLAR</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">KOMATSU</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">CASE</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">BLAW-KNOX</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">JOHN DEERE</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">SAKAI</span>
            <span className="hover:text-slate-900 transition-colors cursor-default">TAYLOR</span>
          </div>
        </div>
      </div>

    </section>
  );
};
