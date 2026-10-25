import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Gauge, 
  Zap, 
  Scale, 
  CheckCircle2, 
  Clock, 
  MapPin,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { Equipment, EquipmentCategory } from '../types/equipment';
import { FLEET_INVENTORY, MACHINERY_TYPES } from '../data/fleetData';

interface FleetExplorerProps {
  onInspectMachine: (machine: Equipment) => void;
  onSelectForEstimator: (machine: Equipment) => void;
}

export const FleetExplorer: React.FC<FleetExplorerProps> = ({
  onInspectMachine,
  onSelectForEstimator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'power-desc' | 'weight-desc'>('recommended');

  const filteredMachines = useMemo(() => {
    return FLEET_INVENTORY.filter(machine => {
      if (selectedCategory !== 'all' && machine.productType !== selectedCategory) {
        return false;
      }
      if (onlyAvailable && machine.isSold) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = (machine.name || '').toLowerCase().includes(query);
        const matchesModel = (machine.model || '').toLowerCase().includes(query);
        const matchesMfr = (machine.vendor || '').toLowerCase().includes(query);
        const matchesTag = (machine.tagline || '').toLowerCase().includes(query);
        if (!matchesName && !matchesModel && !matchesMfr && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.dailyRate || 0;
      const priceB = b.dailyRate || 0;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'power-desc') return b.specs.flywheelPowerHP - a.specs.flywheelPowerHP;
      if (sortBy === 'weight-desc') return b.specs.operatingWeightTons - a.specs.operatingWeightTons;
      return 0;
    });
  }, [selectedCategory, searchQuery, onlyAvailable, sortBy]);

  return (
    <section id="fleet" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#D97706] uppercase mb-2 font-bold">
              CATALOG & INVENTORY SPEC SHEET
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
              Heavy Machinery Fleet Explorer
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Inspect verified mechanical specifications, live telemetry health, and load charts. Available for emergency mobilization or scheduled long-term contract deployment.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
            <span>INVENTORY STATUS:</span>
            <span className="text-[#D97706] font-bold">{filteredMachines.length} UNITS READY FOR DISPATCH</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {MACHINERY_TYPES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2.5 text-xs font-semibold tracking-wide rounded transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-[#FFB800] text-slate-950 shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded bg-slate-50 border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search machine, model, manufacturer or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-white border border-slate-300 focus:border-[#FFB800] rounded text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 rounded bg-white border-slate-300 text-[#FFB800] focus:ring-0 cursor-pointer accent-[#FFB800]"
                />
                <span>Available Units Only</span>
              </label>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span>SORT:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-slate-300 focus:border-[#FFB800] rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
                >
                  <option value="recommended">Recommended Order</option>
                  <option value="price-asc">Daily Rate: Low to High</option>
                  <option value="price-desc">Daily Rate: High to Low</option>
                  <option value="power-desc">Flywheel Power: High to Low</option>
                  <option value="weight-desc">Operating Weight: Heaviest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Machine Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              className="flex flex-col rounded-lg border border-slate-200 bg-white hover:border-slate-400 transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-lg"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900">
                    {!machine.isSold ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Available</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 text-rose-600" />
                        <span className="text-rose-700 font-semibold">(SOLD)</span>
                      </>
                    )}
                  </div>

                  <div className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600">
                    {machine.stockNumber || machine.id}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-mono text-slate-900 bg-white/80 px-2 py-0.5 rounded">
                  <MapPin className="w-3 h-3 text-[#D97706]" />
                  <span>{machine.specs.location || 'Central US Hub'}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                    <span className="font-bold text-[#D97706]">{machine.vendor}</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-slate-700 font-medium">{machine.categoryLabel}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#D97706] transition-colors line-clamp-1">
                    {machine.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {machine.description || machine.tagline}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2.5 py-3 px-3.5 rounded bg-slate-50 border border-slate-200 text-left">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                        <Zap className="w-3 h-3 text-[#D97706]" />
                        <span>POWER</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-mono mt-0.5 tabular-nums">
                        {machine.specs.flywheelPowerHP} HP
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                        <Scale className="w-3 h-3 text-cyan-700" />
                        <span>WEIGHT</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-mono mt-0.5 tabular-nums">
                        {machine.specs.operatingWeightTons} Tons
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                        <Gauge className="w-3 h-3 text-emerald-600" />
                        <span>HOURS</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-mono mt-0.5 tabular-nums">
                        {(machine.hours || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-xs font-mono text-slate-500">PRICE: </span>
                      <span className="text-lg font-black text-slate-900 font-mono">
                        {machine.priceDisplay || 'Call for Price'}
                      </span>
                    </div>

                    <div className="text-right text-xs font-mono text-slate-600">
                      <span>Daily: </span>
                      <span className="text-slate-900 font-semibold tabular-nums">${(machine.dailyRate || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onInspectMachine(machine)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded transition-colors cursor-pointer"
                  >
                    <span>Inspect Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectForEstimator(machine)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-[#FFB800] hover:bg-[#FFA500] rounded transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Rate Calc</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
