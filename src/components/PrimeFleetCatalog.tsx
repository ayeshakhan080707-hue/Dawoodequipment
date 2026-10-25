import React, { useState, useMemo } from 'react';
import { Search, Phone, ArrowRight } from 'lucide-react';
import { Equipment } from '../types/equipment';
import { FLEET_INVENTORY, MACHINERY_TYPES, VENDOR_LIST, COMPANY_INFO } from '../data/fleetData';
import { MachineryCard } from './MachineryCard';
import { useAuth } from '../context/AuthContext';

interface PrimeFleetCatalogProps {
  onInspectMachine: (machine: Equipment) => void;
  onSelectForQuote: (machine: Equipment) => void;
  onViewAll?: () => void;
  fleet?: Equipment[];
}

export const PrimeFleetCatalog: React.FC<PrimeFleetCatalogProps> = ({
  onInspectMachine,
  onSelectForQuote,
  onViewAll,
  fleet = FLEET_INVENTORY,
}) => {
  const { manufacturers, categories } = useAuth();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');

  const filteredItems = useMemo(() => {
    return fleet.filter((item) => {
      const isSold = Boolean(item.isSold);
      // Type filter
      if (selectedType !== 'all' && item.productType !== selectedType) {
        return false;
      }
      // Vendor filter
      if (selectedVendor !== 'all' && item.vendor !== selectedVendor) {
        return false;
      }
      // Status filter
      if (statusFilter === 'available' && isSold) return false;
      if (statusFilter === 'sold' && !isSold) return false;
      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchVendor = (item.vendor || '').toLowerCase().includes(q);
        const matchStock = (item.stockNumber || '').toLowerCase().includes(q);
        const matchType = (item.productType || '').toLowerCase().includes(q);
        if (!matchTitle && !matchVendor && !matchStock && !matchType) {
          return false;
        }
      }
      return true;
    });
  }, [fleet, selectedType, selectedVendor, searchQuery, statusFilter]);

  return (
    <section id="equipment" className="py-16 sm:py-24 bg-[#F8F9FA] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with VIEW ALL option matching user screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#D97706] uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>COLLECTION: /COLLECTIONS/ALL-MACHINERY</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              Equipment For Sale
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              All machines in our catalog are listed strictly for outright purchase. Call <span className="font-bold text-slate-900 font-mono">(630) 379-9175</span> for pricing and arrange inland trucking, containerizing, or ocean freight to any worldwide seaport.
            </p>
          </div>

          {/* VIEW ALL BUTTON + INVENTORY STATS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="text-xs font-mono text-slate-500 bg-white px-3 py-2 rounded border border-slate-300 shadow-xs">
              <span>CATALOG INVENTORY: </span>
              <span className="font-bold text-slate-900">
                {fleet.length} UNITS
              </span>
            </div>

            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="clip-chamfer px-5 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-sm flex items-center gap-2 shrink-0"
              >
                <span>View All Equipments</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs - Dynamic from MongoDB */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2.5 text-xs font-heading uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer rounded-sm border ${
              selectedType === 'all'
                ? 'bg-[#FFB800] text-slate-950 border-[#FFB800] shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-slate-300'
            }`}
          >
            All Equipment For Sale
          </button>
          {(categories.length > 0
            ? categories.map(c => ({ name: c.name, slug: c.slug || c.name }))
            : MACHINERY_TYPES.filter(t => t.id !== 'all').map(t => ({ name: t.label, slug: t.id }))
          ).map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedType(c.slug)}
              className={`px-4 py-2.5 text-xs font-heading uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer rounded-sm border ${
                selectedType === c.slug
                  ? 'bg-[#FFB800] text-slate-950 border-[#FFB800] shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-slate-300'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Secondary Filter Controls: Vendor, Status, Search */}
        <div className="mt-4 p-4 rounded bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Search by model, stock #, or keyword */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Caterpillar, Komatsu, Stock #, Hours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-slate-50 border border-slate-300 focus:border-[#FFB800] rounded text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            
            {/* Vendor Selector */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <span>MAKE:</span>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
              >
                <option value="all">All Manufacturers</option>
                {(manufacturers.length > 0 ? manufacturers.map(m => m.slug || m.name) : VENDOR_LIST.filter(v => v !== 'all')).map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 text-xs font-mono">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-white text-slate-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Status
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('available')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  statusFilter === 'available'
                    ? 'bg-white text-emerald-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Available
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('sold')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  statusFilter === 'sold'
                    ? 'bg-white text-red-600 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                (SOLD)
              </button>
            </div>

          </div>
        </div>

        {/* Mobile swipe hint */}
        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400 md:hidden">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span>Swipe to browse units</span>
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        {/* Machinery Product Grid — horizontal scroll on mobile, grid on desktop */}
        <div className="mt-4 md:mt-8 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-x-visible -mx-4 px-4 md:mx-0 md:px-0">
          {filteredItems.slice(0, 9).map((item) => (
            <div key={item.id} className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-auto md:shrink">
              <MachineryCard
                item={item}
                onInspectMachine={onInspectMachine}
              />
            </div>
          ))}
        </div>

        {/* View All Machinery Footer Bar */}
        <div className="mt-12 p-6 rounded-xl bg-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-heading font-black uppercase text-xl text-white">
              View Complete Machinery Catalog ({FLEET_INVENTORY.length} Machines)
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Browse our full inventory with advanced multi-parameter sorting, lowboy trucking quotes, and container export feasibility.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="clip-chamfer px-6 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>Open All Machinery Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="px-5 py-3 text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white rounded border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>(630) 379-9175</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
