import React from 'react';
import { Truck, Package, Ship, CheckCircle2, ArrowRight, Phone, ShieldCheck, Anchor, Compass } from 'lucide-react';
import { AUXILIARY_SERVICES, COMPANY_INFO } from '../data/fleetData';

interface PrimeServicesShowcaseProps {
  onOpenShippingEstimator: () => void;
  onRequestQuote: () => void;
}

export const PrimeServicesShowcase: React.FC<PrimeServicesShowcaseProps> = ({
  onOpenShippingEstimator,
  onRequestQuote,
}) => {
  return (
    <section id="services" className="py-20 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#D97706] uppercase font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span>LOGISTICS & EXPORT INFRASTRUCTURE</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              Services We Provide
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              When you purchase heavy machinery from Dawood Equipment Co, our in-house logistics team handles the complete end-to-end transport—from domestic lowboy trucking to dismantling, containerizing, and ocean freight to any worldwide seaport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenShippingEstimator}
              className="clip-chamfer px-6 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md text-center"
            >
              Calculate Shipping & Freight
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="px-5 py-3 text-xs font-mono font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Call (630) 379-9175</span>
            </a>
          </div>
        </div>

        {/* 3 Core Auxiliary Services Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SERVICE 1: TRUCKING */}
          <div className="group rounded-xl border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:border-[#FFB800] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-lg bg-amber-100/70 border border-amber-300 flex items-center justify-center text-[#D97706] group-hover:bg-[#FFB800] group-hover:text-slate-950 transition-colors">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded uppercase tracking-wider">
                  ALL 50 US STATES
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-slate-900">
                  Trucking
                </h3>
                <h4 className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider">
                  Domestic Inland Transport
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Heavy-haul nationwide land transportation using specialized multi-axle RGN (removable gooseneck), step-deck, and lowboy trailers from our facility or jobsite directly to your designated US location or marine departure terminal.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                  CAPABILITIES INCLUDE:
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Specialized multi-axle lowboys for 100,000+ lb excavators & dozers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Complete oversized load permits & state DOT pilot escort cars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct delivery to Baltimore, Houston, Savannah, Newark & West Coast ports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Prompt door-to-door dispatch within 3–5 business days</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Inland Logistics</span>
              <button
                type="button"
                onClick={onOpenShippingEstimator}
                className="text-xs font-mono font-bold text-slate-900 group-hover:text-[#D97706] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Calculate Trucking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SERVICE 2: CONTAINERIZING */}
          <div className="group rounded-xl border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:border-[#FFB800] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-lg bg-cyan-100/70 border border-cyan-300 flex items-center justify-center text-cyan-800 group-hover:bg-[#FFB800] group-hover:text-slate-950 transition-colors">
                  <Package className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-cyan-800 bg-cyan-100 px-3 py-1 rounded uppercase tracking-wider">
                  COST-SAVING EXPORT
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-slate-900">
                  Containerizing
                </h3>
                <h4 className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider">
                  Loading & Securing Machines in Containers
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Save 30% to 50% compared to breakbulk rates. Our expert technicians mechanically dismantle booms, sticks, ROPS cabs, counterweights, and blades, followed by heavy-load blocking, chocking, and certified steel strapping into 40ft High Cube containers.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                  CAPABILITIES INCLUDE:
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Teardown of excavator booms, sticks, buckets, and dozer push-arms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>ROPS cab unbolting and low-clearance positioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Heavy hardwood chocking & high-tensile steel strapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Anti-corrosion vapor barrier spray applied before container sealing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Container Packing</span>
              <button
                type="button"
                onClick={onOpenShippingEstimator}
                className="text-xs font-mono font-bold text-slate-900 group-hover:text-[#D97706] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Container Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SERVICE 3: OCEAN FREIGHT */}
          <div className="group rounded-xl border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:border-[#FFB800] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-lg bg-emerald-100/70 border border-emerald-300 flex items-center justify-center text-emerald-800 group-hover:bg-[#FFB800] group-hover:text-slate-950 transition-colors">
                  <Ship className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded uppercase tracking-wider">
                  WORLDWIDE SEAPORTS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-slate-900">
                  Ocean Freight
                </h3>
                <h4 className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider">
                  Maritime Export to Any International Port
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  Complete maritime shipping network delivering heavy equipment to major seaports across the Middle East, Africa, Latin America, Europe, and Asia. We manage both Roll-on/Roll-off (Ro-Ro) and container vessel charters.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-2.5">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                  CAPABILITIES INCLUDE:
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ro-Ro bookings for drivable dozers, loaders, and pavers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Weekly scheduled sailings to Jebel Ali, Dammam, Lagos, Santos & Rotterdam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>US Customs AES export filing, Title validation, and Bill of Lading (B/L)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Comprehensive Marine Cargo All-Risk Insurance coverage</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Maritime Shipping</span>
              <button
                type="button"
                onClick={onOpenShippingEstimator}
                className="text-xs font-mono font-bold text-slate-900 group-hover:text-[#D97706] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Ocean Freight Rates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Export Trust Banner */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#FFB800] text-slate-950 flex items-center justify-center shrink-0">
              <Anchor className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight">
                Exporting Heavy Earthmoving Machinery Since 1998
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Over 1,200 shipping containers and Ro-Ro shipments delivered to 42+ countries with zero customs rejections.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Export Shipping Inquiry`}
              className="px-5 py-2.5 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 transition-colors"
            >
              Email Freight Desk
            </a>
            <button
              type="button"
              onClick={onRequestQuote}
              className="clip-chamfer px-5 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer"
            >
              Request Pro-Forma Invoice
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
