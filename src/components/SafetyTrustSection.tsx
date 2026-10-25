import React from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Clock, 
  Award, 
  CheckCircle, 
  Building2, 
  MapPin,
  PhoneCall,
  Truck
} from 'lucide-react';
import { TRUST_CASE_STUDIES, DISPATCH_HUBS } from '../data/fleetData';

export const SafetyTrustSection: React.FC = () => {
  return (
    <section id="standards" className="py-20 bg-[#0B0D10] border-b border-[#1E2638]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FFB800] uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>RIGOROUS INDUSTRIAL COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Guaranteed Zero-Downtime Architecture
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Heavy civil and mining operations cannot endure idle work crews. We engineer our fleet availability around instant 4-hour hot-swap logistics and certified field mechanics.
          </p>
        </div>

        {/* 4 Pillars of Operational Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] space-y-3">
            <div className="w-10 h-10 rounded bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">4-Hour Hot Swap SLA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an unscheduled mechanical fault arises, our lowboy transports dispatch an equivalent replacement unit to your site within 4 hours.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] space-y-3">
            <div className="w-10 h-10 rounded bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE]">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">24/7 Mobile Field Techs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              60+ dedicated 4x4 mobile service trucks outfitted with onboard hydraulic diagnostic rigs, spare hose crimpers, and fluids.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] space-y-3">
            <div className="w-10 h-10 rounded bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">OSHA & ISO 9001 Certified</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full compliance with OSHA 1926 cranes and derricks, MSHA surface mining, and ISO 9001:2015 quality fleet management standards.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] space-y-3">
            <div className="w-10 h-10 rounded bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Comprehensive Field Shield</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete zero-hassle coverage options protecting contractors against tire wear, hydraulic contamination, and minor site damage.
            </p>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency: Marquee Infrastructure Case Studies */}
        <div className="mt-16 pt-12 border-t border-[#1E2638]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">VERIFIED CONTRACTOR PERFORMANCE</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Marquee Project Deployments</h3>
            </div>
            <div className="text-xs font-mono text-[#FFB800]">
              AUDITED FLEET TELEMETRY RECORDS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRUST_CASE_STUDIES.map((cs) => (
              <div 
                key={cs.id}
                className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] hover:border-slate-600 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>{cs.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{cs.title}</h4>
                  
                  <div className="my-4 p-3 rounded bg-[#12161F] border border-[#1E2638]">
                    <div className="text-lg font-black text-[#FFB800] font-mono tabular-nums">{cs.metric}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">Audited Job Production</div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cs.subtext}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1E2638] text-[11px] font-mono text-slate-400">
                  <span className="text-slate-300 font-semibold">Machinery: </span>
                  <span>{cs.machineryUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Dispatch Hubs Section */}
        <div id="hubs" className="mt-20 pt-16 border-t border-[#1E2638]">
          <div className="text-center max-w-2xl mx-auto pb-10">
            <div className="text-xs font-mono text-[#00F2FE] uppercase tracking-wider mb-2">
              REGIONAL LOGISTICS INFRASTRUCTURE
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">
              Premier Heavy Equipment Dispatch Hubs
            </h3>
            <p className="mt-2 text-slate-400 text-sm">
              Strategic lowboy mobilization staging facilities guaranteeing rapid transit to all energy basins and metropolitan civil jobsites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISPATCH_HUBS.map((hub) => (
              <div 
                key={hub.id}
                className="p-6 rounded-lg bg-[#0E121A] border border-[#1E2638] hover:border-[#FFB800]/50 transition-colors space-y-4"
              >
                <div>
                  <div className="text-xs font-mono text-[#FFB800] font-semibold">{hub.city}</div>
                  <h4 className="text-sm font-bold text-white mt-1 leading-snug">{hub.name}</h4>
                  <div className="text-xs text-slate-400 font-mono mt-1">{hub.address}</div>
                </div>

                <div className="pt-3 border-t border-[#1E2638] space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Staged Units:</span>
                    <span className="text-white font-bold">{hub.activeUnitsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Heavy Haul Rigs:</span>
                    <span className="text-white font-bold">{hub.heavyHaulRigs} Trucks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dispatch Radius:</span>
                    <span className="text-[#00F2FE] font-bold">{hub.dispatchRadiusKm} km</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1E2638]">
                  <a
                    href={`tel:${hub.phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>{hub.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
