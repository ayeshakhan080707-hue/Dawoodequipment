import React, { useState } from 'react';
import { 
  Radio, 
  Fuel, 
  Activity, 
  MapPin, 
  Gauge, 
  RefreshCw,
  BarChart3,
  Compass
} from 'lucide-react';
import { FLEET_INVENTORY } from '../data/fleetData';

export const TelematicsCommandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gps' | 'fuel' | 'health' | 'payload'>('gps');
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(0);
  const [isSimulatingStream, setIsSimulatingStream] = useState(true);

  const currentMachine = FLEET_INVENTORY[selectedMachineIndex] || FLEET_INVENTORY[0];

  const fallbackTelematics = {
    unitId: 'DW-UNIT-01',
    connectionStatus: 'online' as const,
    gpsCoordinates: { lat: 41.8781, lng: -87.6298 },
    hubLocation: 'Central Illinois Hub',
    engineHours: 3200,
    fuelLevelPercent: 78,
    hydraulicHealthPercent: 96,
    lastInspectionDate: '2026-10-15',
  };

  const telematics = currentMachine.telematics || fallbackTelematics;
  const loadChart = (currentMachine.loadChart && currentMachine.loadChart.length > 0)
    ? currentMachine.loadChart
    : [{ reachRadiusMeters: 4, maxLoadTons: 25 }];

  return (
    <section id="telematics" className="py-16 bg-[#F8F9FA] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D97706] uppercase mb-2 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#D97706]" />
              <span>DAWOOD SATELLITE TELEMATICS OS v4.2</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
              Fleet Telematics & Live Operational Monitoring
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Every machine deployed in our fleet transmits millisecond-accurate CAN bus telemetry, GPS positioning, load cell strain metrics, and preventative health diagnostics.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-white border border-slate-300 shadow-sm text-xs font-mono shrink-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-700 font-bold">ALL 1,420 UNITS REPORTING</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">LATENCY: 42ms</span>
          </div>
        </div>

        {/* Machine Quick Switcher */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono text-slate-500 uppercase shrink-0 mr-2 font-semibold">
            SELECT ACTIVE RIG:
          </span>
          {FLEET_INVENTORY.map((machine, idx) => (
            <button
              key={machine.id}
              type="button"
              onClick={() => setSelectedMachineIndex(idx)}
              className={`px-3.5 py-2 rounded text-xs font-mono transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                selectedMachineIndex === idx
                  ? 'bg-white text-slate-950 border-2 border-[#FFB800] font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-950 border border-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{machine.telematics?.unitId || `DW-${machine.model}`}</span>
              <span className="text-slate-400">({machine.model})</span>
            </button>
          ))}
        </div>

        {/* Dashboard Shell with Interactive Tabs */}
        <div className="mt-6 rounded-lg border border-slate-300 bg-white shadow-md overflow-hidden">
          
          {/* Tab Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('gps')}
                className={`px-4 py-2 text-xs font-mono uppercase rounded transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'gps'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>GPS Radar & Map</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('fuel')}
                className={`px-4 py-2 text-xs font-mono uppercase rounded transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'fuel'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                }`}
              >
                <Fuel className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>Fuel & Burn Analytics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('health')}
                className={`px-4 py-2 text-xs font-mono uppercase rounded transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'health'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hydraulic & Machine Health</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('payload')}
                className={`px-4 py-2 text-xs font-mono uppercase rounded transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'payload'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Payload & Cycle Stats</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="hidden sm:inline">DATA STREAM: 256-BIT ENCRYPTED</span>
              <button
                type="button"
                onClick={() => setIsSimulatingStream(!isSimulatingStream)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950 cursor-pointer font-semibold"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingStream ? 'animate-spin text-[#D97706]' : ''}`} />
                <span>{isSimulatingStream ? 'Live Refreshing' : 'Stream Paused'}</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            
            {/* TAB 1: GPS Radar & Map */}
            {activeTab === 'gps' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative h-80 sm:h-96 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden p-6 flex flex-col justify-between text-white">
                  
                  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#00F2FE" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="70%" fill="none" stroke="#64748B" strokeWidth="1" />
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#475569" strokeWidth="1" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#475569" strokeWidth="1" />
                  </svg>

                  <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping"></span>
                      <span className="text-[#00F2FE] font-bold">RADAR SECTOR: GULF BASIN ALPHA</span>
                    </div>
                    <span>ZOOM: 1:25,000</span>
                  </div>

                  <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-[#FFB800] bg-[#FFB800]/20 flex items-center justify-center animate-pulse">
                        <MapPin className="w-6 h-6 text-[#FFB800]" />
                      </div>
                      <div className="mt-2 bg-slate-950/95 border border-[#FFB800] px-3 py-1 rounded text-center">
                        <div className="text-xs font-bold text-white font-mono">{telematics.unitId}</div>
                        <div className="text-[10px] font-mono text-[#FFB800]">SPEED: 0.0 KM/H (ACTIVE DIG)</div>
                      </div>
                    </div>

                    <div className="absolute top-10 left-16 flex items-center gap-1 text-[10px] font-mono text-slate-300 opacity-80">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      <span>DW-HL-60H-02 (Hauling)</span>
                    </div>

                    <div className="absolute bottom-12 right-20 flex items-center gap-1 text-[10px] font-mono text-slate-300 opacity-80">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      <span>DW-LD-994K-01 (Loading)</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-700">
                    <span>GEOFENCE: PERIMETER RESTRICTED [APPROVED ZONE 4]</span>
                    <span className="text-emerald-400">STATUS: IN-BOUNDS 100%</span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-mono text-slate-500 font-semibold">TARGET UNIT SPECIFICATIONS</div>
                    <div className="text-lg font-bold text-slate-900">{currentMachine.name}</div>
                    
                    <div className="space-y-2 text-xs font-mono pt-2 border-t border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Deployment Base:</span>
                        <span className="text-slate-900 font-semibold">{telematics.hubLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">GPS Coordinates:</span>
                        <span className="text-slate-900 font-mono font-semibold">{telematics.gpsCoordinates.lat.toFixed(4)}° N, {Math.abs(telematics.gpsCoordinates.lng).toFixed(4)}° W</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Meter Hours:</span>
                        <span className="text-slate-900 font-mono tabular-nums font-semibold">{telematics.engineHours.toLocaleString()} hrs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Bi-directional CAN Bus:</span>
                        <span className="text-emerald-700 font-bold">SYNCHRONIZED (40 msg/sec)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs font-mono shadow-sm">
                    <span className="text-slate-600">Next Scheduled Field Maintenance:</span>
                    <span className="text-[#D97706] font-bold">In 180 Operating Hours</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Fuel Analytics */}
            {activeTab === 'fuel' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 font-semibold">
                    <span>FUEL TANK REMAINING</span>
                    <Fuel className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
                    {telematics.fuelLevelPercent}%
                  </div>
                  <div className="mt-3 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#FFB800] h-full rounded-full" 
                      style={{ width: `${telematics.fuelLevelPercent}%` }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Capacity: {currentMachine.specs.fuelCapacityLiters} L</span>
                    <span>Range: ~18.5 Working Hours</span>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 font-semibold">
                    <span>REAL-TIME FUEL BURN RATE</span>
                    <Activity className="w-4 h-4 text-cyan-700" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
                    42.8 <span className="text-sm font-sans font-medium text-slate-500">L / HR</span>
                  </div>
                  <div className="text-xs text-emerald-700 font-mono mt-2 font-semibold">
                    ↓ 14% below heavy fleet average
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                    Tier 4 Final common rail direct injection efficiency active
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 font-semibold">
                    <span>IDLE TIME OPTIMIZATION</span>
                    <Gauge className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-emerald-700 font-mono tabular-nums">
                    8.4% <span className="text-sm font-sans font-medium text-slate-500">IDLE</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-2">
                    Auto-shutdown timer set @ 4.0 minutes
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-500">
                    Saved approx. 182 Liters of diesel this week
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Machine Health */}
            {activeTab === 'health' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono text-slate-500 font-semibold">HYDRAULIC PRESSURE</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    {currentMachine.specs.hydraulicPressureBar} <span className="text-xs font-normal text-slate-500">BAR</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-emerald-700 font-semibold">Nominal Circuit Pressure</div>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">Dual main pump balanced</div>
                </div>

                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono text-slate-500 font-semibold">OIL & COOLANT TEMP</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-2 tabular-nums">
                    88.4 <span className="text-xs font-normal text-slate-500">°C</span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-emerald-700 font-semibold">Thermal Threshold Safe</div>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">Thermostatic fan 44% load</div>
                </div>

                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono text-slate-500 font-semibold">COMPONENT HEALTH SCORE</div>
                  <div className="text-2xl font-black text-emerald-700 font-mono mt-2 tabular-nums">
                    {telematics.hydraulicHealthPercent}%
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-600">Wear particle sensor clear</div>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">ISO 4406 fluid class 16/14/11</div>
                </div>

                <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono text-slate-500 font-semibold">PREDICTIVE ALERTS</div>
                  <div className="text-2xl font-black text-[#D97706] font-mono mt-2 tabular-nums">
                    0 CRITICAL
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-600">Air filter clean · DEF 88%</div>
                  <div className="mt-3 text-[11px] font-mono text-slate-400">Automated dispatch ok</div>
                </div>
              </div>
            )}

            {/* TAB 4: Payload */}
            {activeTab === 'payload' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                  <div className="text-xs font-mono text-slate-500 uppercase font-semibold">LOAD CELL SENSOR</div>
                  <div className="text-4xl font-black text-slate-900 font-mono tabular-nums">
                    {currentMachine.specs.operatingWeightTons > 100 ? '42.4 TONS' : '8.6 TONS'}
                  </div>
                  <div className="text-xs font-mono text-slate-600">
                    Live Bucket / Rigging Load Measurement
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Safe Work Load Limit:</span>
                      <span className="text-slate-900 font-bold">{loadChart[0].maxLoadTons} Tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Overload Safety Margin:</span>
                      <span className="text-emerald-700 font-bold">+44% Clear</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
                  <div className="text-xs font-mono text-slate-500 uppercase font-semibold">OPERATIONAL SHIFT PRODUCTIVITY</div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded bg-white border border-slate-200 shadow-sm">
                      <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">124</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">Total Cycles / Shift</div>
                    </div>
                    <div className="p-4 rounded bg-white border border-slate-200 shadow-sm">
                      <div className="text-2xl font-black text-[#D97706] font-mono tabular-nums">26.2s</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">Avg Cycle Time</div>
                    </div>
                    <div className="p-4 rounded bg-white border border-slate-200 shadow-sm">
                      <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">2,840 T</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">Shift Production</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
