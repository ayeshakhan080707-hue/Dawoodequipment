import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Phone, 
  SlidersHorizontal, 
  LayoutGrid, 
  ListFilter, 
  ArrowUpDown, 
  CheckCircle2, 
  X,
  Truck,
  Package,
  Ship,
  Globe
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { FLEET_INVENTORY, COMPANY_INFO } from '../data/fleetData';
import { MachineryCard } from './MachineryCard';
import { useAuth } from '../context/AuthContext';

interface AllMachineryPageProps {
  onBackToHome: () => void;
  onInspectMachine: (machine: Equipment) => void;
  onOpenShippingEstimator: (machine?: Equipment) => void;
  fleet?: Equipment[];
}

export const AllMachineryPage: React.FC<AllMachineryPageProps> = ({
  onBackToHome,
  onInspectMachine,
  onOpenShippingEstimator,
  fleet: propFleet,
}) => {
  const { manufacturers, categories, fleet: authFleet } = useAuth();
  const activeFleet = propFleet || authFleet || FLEET_INVENTORY;

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'year-desc' | 'hours-asc' | 'weight-desc'>('default');

  const dynamicCategories = useMemo(() => {
    return [
      { id: 'all', label: 'All Equipment For Sale' },
      ...categories.map(c => ({ id: c.slug || c.name, label: c.name }))
    ];
  }, [categories]);

  const dynamicVendors = useMemo(() => {
    return manufacturers.map(m => m.slug || m.name);
  }, [manufacturers]);

  const filteredMachines = useMemo(() => {
    let result = activeFleet.filter((item) => {
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

    // Sorting
    if (sortBy === 'year-desc') {
      result = [...result].sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'hours-asc') {
      result = [...result].sort((a, b) => (a.hours || 0) - (b.hours || 0));
    } else if (sortBy === 'weight-desc') {
      result = [...result].sort((a, b) => b.specs.operatingWeightTons - a.specs.operatingWeightTons);
    }

    return result;
  }, [selectedType, selectedVendor, searchQuery, statusFilter, sortBy]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-slate-900 pb-24">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D97706] transition-transform group-hover:-translate-x-1" />
            <span>Return to Homepage</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Dawood Equipment</span>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span className="text-[#D97706] font-bold">All Machinery</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="px-3.5 py-1.5 rounded bg-amber-50 text-slate-900 border border-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span>(630) 379-9175</span>
            </a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Page Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-[#D97706] uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>OFFICIAL CATALOG: /COLLECTIONS/ALL-MACHINERY</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 leading-none">
              All Machinery For Sale
            </h1>
            <p className="mt-3 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Complete inventory of inspected used earthmoving machinery. Outright purchase with turnkey domestic trucking, containerizing, and ocean freight to any worldwide seaport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="p-3 rounded-lg bg-white border border-slate-300 text-xs font-mono flex items-center gap-3 shadow-xs">
              <span className="text-slate-500">TOTAL UNITS IN CATALOG:</span>
              <span className="font-bold text-slate-900 font-heading text-lg">
                {activeFleet.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {dynamicCategories.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedType(t.id)}
              className={`px-4 py-2.5 text-xs font-heading uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer rounded-sm border ${
                selectedType === t.id
                  ? 'bg-[#FFB800] text-slate-950 border-[#FFB800] shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:border-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filter & Sorting Controls */}
        <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Caterpillar, Dozer, Stock #, Hours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-slate-50 border border-slate-300 focus:border-[#FFB800] rounded text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            
            {/* Make Selector */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <span>MAKE:</span>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
              >
                <option value="all">All Manufacturers</option>
                {dynamicVendors.map((v) => (
                  <option key={v} value={v}>{v.toUpperCase()}</option>
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
                All
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

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <span>SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
              >
                <option value="default">Default Order</option>
                <option value="year-desc">Newest Year First</option>
                <option value="hours-asc">Lowest Meter Hours</option>
                <option value="weight-desc">Operating Weight (Heavy to Light)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter & Active Filters Bar */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Showing {filteredMachines.length} of {FLEET_INVENTORY.length} Machineries</span>
          {(selectedType !== 'all' || selectedVendor !== 'all' || statusFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedType('all');
                setSelectedVendor('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-[#D97706] hover:underline cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Machinery Grid with Interactive Image Slider Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((machine) => (
            <MachineryCard
              key={machine.id}
              item={machine}
              onInspectMachine={onInspectMachine}
            />
          ))}
        </div>

        {filteredMachines.length === 0 && (
          <div className="mt-12 p-12 text-center rounded-xl bg-white border border-slate-300 space-y-4">
            <div className="font-heading text-2xl font-black uppercase text-slate-800">
              No Machinery Matching Your Filter
            </div>
            <p className="text-xs text-slate-600 font-mono max-w-md mx-auto">
              We frequently acquire Caterpillar, Komatsu, and Case machines. Call our inventory desk directly to check unlisted upcoming arrivals.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedVendor('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded bg-slate-100 text-slate-800 text-xs font-mono font-bold border border-slate-300 hover:bg-slate-200"
              >
                Reset Filters
              </button>
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="px-5 py-2.5 rounded bg-[#FFB800] text-slate-950 text-xs font-heading font-black uppercase"
              >
                Call (630) 379-9175
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
