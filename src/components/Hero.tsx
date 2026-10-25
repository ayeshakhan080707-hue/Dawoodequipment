import React, { useState } from 'react';
import { ArrowUpRight, Gauge, ShieldCheck, Zap, Radio, SlidersHorizontal, Activity } from 'lucide-react';
import { FLEET_METRICS } from '../data/fleetData';

interface HeroProps {
  onExploreFleet: () => void;
  onOpenEstimator: () => void;
  onInspectHeroMachine: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFleet,
  onOpenEstimator,
  onInspectHeroMachine,
}) => {
  const [hudActive, setHudActive] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState<'hydraulics' | 'engine' | 'weight' | 'gps'>('hydraulics');

  return (
    <section className="relative overflow-hidden bg-cyber-grid pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1E2638]">
      {/* Background ambient lighting */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,184,0,0.08),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top telemetry breadcrumb / live indicator bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E2638]/60 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#00F2FE]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE TELEMATICS MESH</span>
            </span>
            <span className="text-slate-600">/</span>
            <span>FREQ: 433.92 MHz HIGH-AVAILABILITY</span>
            <span className="hidden sm:inline text-slate-600">/</span>
            <span className="hidden sm:inline text-emerald-400">NODES SYNCHRONIZED</span>
          </div>
          <div className="flex items-center gap-4">
            <span>DISPATCH REGION: NORTH AMERICA CONUS</span>
            <span className="text-[#FFB800] font-semibold">STANDBY FOR INSTANT LOAD-OUT</span>
          </div>
        </div>

        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch pt-10">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FFB800] uppercase mb-4">
              <span className="w-2 h-0.5 bg-[#FFB800]"></span>
              <span>Ultra-Heavy Equipment Fleet & Engineering Logistics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] text-balance">
              The Heavy Fleet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-[#FFA500] to-[#FFD066]">Redefined.</span> Power On Demand.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Zero-downtime civil, mining, and heavy infrastructure machinery rentals. 
              Integrated real-time satellite telematics, certified master operators, and guaranteed 4-hour replacement field dispatch across all major industrial corridors.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenEstimator}
                className="flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold tracking-wider uppercase bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 rounded transition-all duration-200 shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_40px_rgba(255,184,0,0.5)] cursor-pointer group"
              >
                <span>Calculate Rental Rate</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onExploreFleet}
                className="flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold tracking-wider text-slate-200 bg-[#12161F] hover:bg-[#1A202C] border border-[#1E2638] hover:border-slate-500 rounded transition-all duration-200 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#00F2FE]" />
                <span>Explore Fleet & Specs</span>
              </button>
            </div>

            {/* Quick Spec Highlights */}
            <div className="mt-10 pt-6 border-t border-[#1E2638] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xs font-mono text-slate-400">ENGINE AVAILABILITY</div>
                <div className="text-sm font-bold text-white mt-1">Tier 4 Final / Stage V</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">PAYLOAD CLASS</div>
                <div className="text-sm font-bold text-white mt-1">Up to 1,000 Metric Tons</div>
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">SUPPORT SLA</div>
                <div className="text-sm font-bold text-[#FFB800] mt-1">24/7 Field Tech Units</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Machine Showcase with Telemetry Overlay */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-lg border border-[#1E2638] bg-[#0E121A] overflow-hidden group">
              
              {/* Image asset with measured contrast scrim */}
              <div className="relative h-[340px] sm:h-[420px] lg:h-full min-h-[380px] w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_excavator_heavy_1792859629737.jpg"
                  alt="CAT 395 Next-Gen Ultra Heavy Hydraulic Excavator in Night Quarry"
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-102 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tactical Scrim & Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-black/40 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0E121A]/60 via-transparent to-transparent pointer-events-none" />

                {/* HUD Top Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center gap-2 bg-[#0B0D10]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#1E2638] text-xs font-mono text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold text-white">UNIT # DW-EX-395-01</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[#FFB800]">CAT 395 NEXT-GEN</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setHudActive(!hudActive)}
                    className="flex items-center gap-1.5 bg-[#0B0D10]/80 hover:bg-[#12161F] backdrop-blur-md px-3 py-1.5 rounded border border-[#1E2638] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>{hudActive ? 'HIDE HUD' : 'SHOW HUD'}</span>
                  </button>
                </div>

                {/* Interactive HUD Telemetry Overlays */}
                {hudActive && (
                  <>
                    {/* Sensor Pin 1: Hydraulics */}
                    <button
                      type="button"
                      onClick={() => setSelectedSensor('hydraulics')}
                      className={`absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 p-1.5 rounded bg-[#0B0D10]/85 border text-xs font-mono backdrop-blur-sm transition-all cursor-pointer ${
                        selectedSensor === 'hydraulics' 
                          ? 'border-[#FFB800] text-[#FFB800] ring-2 ring-[#FFB800]/20 scale-105' 
                          : 'border-slate-700 text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <Gauge className="w-3.5 h-3.5" />
                      <span className="font-bold">350 BAR</span>
                    </button>

                    {/* Sensor Pin 2: Engine Power */}
                    <button
                      type="button"
                      onClick={() => setSelectedSensor('engine')}
                      className={`absolute top-[38%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 p-1.5 rounded bg-[#0B0D10]/85 border text-xs font-mono backdrop-blur-sm transition-all cursor-pointer ${
                        selectedSensor === 'engine' 
                          ? 'border-[#00F2FE] text-[#00F2FE] ring-2 ring-[#00F2FE]/20 scale-105' 
                          : 'border-slate-700 text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span className="font-bold">543 HP</span>
                    </button>

                    {/* Sensor Pin 3: Operating Weight */}
                    <button
                      type="button"
                      onClick={() => setSelectedSensor('weight')}
                      className={`absolute top-[75%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 p-1.5 rounded bg-[#0B0D10]/85 border text-xs font-mono backdrop-blur-sm transition-all cursor-pointer ${
                        selectedSensor === 'weight' 
                          ? 'border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/20 scale-105' 
                          : 'border-slate-700 text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="font-bold">94.2 TONS</span>
                    </button>

                    {/* Sensor Details Readout Drawer at Bottom of image */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#0B0D10]/90 backdrop-blur-md border border-[#1E2638] rounded p-3 text-xs font-mono flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-slate-400">TELEMETRY DIAGNOSTIC: </span>
                        {selectedSensor === 'hydraulics' && (
                          <span className="text-[#FFB800] font-semibold">Dual variable-displacement piston pumps @ 1,029 L/min flow rate. Operating nominal.</span>
                        )}
                        {selectedSensor === 'engine' && (
                          <span className="text-[#00F2FE] font-semibold">Cat C18 ACERT twin-turbocharged inline-6 diesel. 543 HP @ 1,800 rpm. Fuel burn: 48.2 L/h.</span>
                        )}
                        {selectedSensor === 'weight' && (
                          <span className="text-emerald-400 font-semibold">94,200 kg heavy ballast configuration with 6.5 m³ extreme duty rock bucket.</span>
                        )}
                        {selectedSensor === 'gps' && (
                          <span className="text-white font-semibold">Staged at Houston Logistics Basin. RTK GPS fix locked with 1.2 cm precision.</span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={onInspectHeroMachine}
                        className="px-3 py-1 bg-[#1E2638] hover:bg-slate-700 text-slate-100 font-sans font-semibold rounded text-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Full Spec Sheet
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI / Trust Strip below 2-column split (Mandatory frontend-design rule) */}
        <div className="mt-12 pt-8 border-t border-[#1E2638] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="p-4 rounded border border-[#1E2638]/70 bg-[#0E121A]/60">
            <div className="text-xs font-mono text-slate-400 tracking-wider">ACTIVE HEAVY FLEET</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 tabular-nums">
              {FLEET_METRICS.totalActiveFleet.toLocaleString()} <span className="text-sm font-sans font-semibold text-[#FFB800]">UNITS</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Mining, civil excavation & heavy lift</div>
          </div>

          <div className="p-4 rounded border border-[#1E2638]/70 bg-[#0E121A]/60">
            <div className="text-xs font-mono text-slate-400 tracking-wider">FLEET UPTIME VERIFIED</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1 tabular-nums">
              {FLEET_METRICS.globalFleetUptime}
            </div>
            <div className="text-xs text-slate-400 mt-1">Audited across 3.8M+ job hours</div>
          </div>

          <div className="p-4 rounded border border-[#1E2638]/70 bg-[#0E121A]/60">
            <div className="text-xs font-mono text-slate-400 tracking-wider">TELEMETRY STREAM RATE</div>
            <div className="text-2xl sm:text-3xl font-black text-[#00F2FE] font-mono mt-1 tabular-nums">
              {FLEET_METRICS.telematicsRefreshSeconds}s
            </div>
            <div className="text-xs text-slate-400 mt-1">Real-time bi-directional CAN bus</div>
          </div>

          <div className="p-4 rounded border border-[#1E2638]/70 bg-[#0E121A]/60">
            <div className="text-xs font-mono text-slate-400 tracking-wider">RAPID DISPATCH SLA</div>
            <div className="text-2xl sm:text-3xl font-black text-[#FFB800] font-mono mt-1 tabular-nums">
              &lt; {FLEET_METRICS.dispatchGuaranteeHours.toFixed(1)} <span className="text-sm font-sans font-semibold text-white">HRS</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">Lowboy mobilization from 4 regional hubs</div>
          </div>

        </div>

      </div>
    </section>
  );
};
