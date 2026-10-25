import React, { useState } from 'react';
import { 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Truck, 
  Package, 
  Ship, 
  Video, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { COMPANY_INFO } from '../data/fleetData';

interface MachineryCardProps {
  item: Equipment;
  onInspectMachine: (machine: Equipment) => void;
  onSelectForQuote?: (machine: Equipment) => void;
}

export const MachineryCard: React.FC<MachineryCardProps> = ({
  item,
  onInspectMachine,
  onSelectForQuote,
}) => {
  const imagesList = (item.images && item.images.length > 0) 
    ? item.images 
    : [item.image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={() => onInspectMachine(item)}
      className={`group rounded-lg border bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-400 cursor-pointer ${
        item.isSold ? 'opacity-90 border-slate-300 bg-slate-50/50' : 'border-slate-200'
      }`}
    >
      <div>
        
        {/* Visual Thumbnail with Interactive Image Slider */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-slate-200 select-none">
          
          {/* Main Slide Image */}
          <img
            src={imagesList[currentImageIndex] || item.image}
            alt={`${item.title} - Photo ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300 filter contrast-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful fallback to default asset if external url fails
              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/fleet_mining_loader_1792859632094.jpg';
            }}
          />

          {/* Slider Prev / Next Controls if multiple images */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
                aria-label="Previous Photo"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
                aria-label="Next Photo"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slider Indicator Pill */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full flex items-center gap-1.5 z-20 shadow-sm"
              >
                <span>{currentImageIndex + 1}</span>
                <span className="text-slate-400">/</span>
                <span>{imagesList.length} Photos</span>
              </div>
            </>
          )}

          {/* Status Overlay Badge */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            {item.isSold ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm bg-red-600 text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm">
                (SOLD)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-600 text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>AVAILABLE FOR PURCHASE</span>
              </span>
            )}
          </div>

          {/* Stock Number & Year Badge */}
          <div className="absolute top-3 right-3 z-10 bg-slate-950/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-1 rounded">
            {item.stockNumber || 'DW-UNIT'} · {item.year}
          </div>

          {/* Video Walkaround Indicator */}
          {item.videoUrl && (
            <div className="absolute bottom-3 left-3 z-10 bg-amber-500/90 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
              <Video className="w-3 h-3" />
              <span>HD VIDEO</span>
            </div>
          )}

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
            <span className="bg-slate-950/80 text-white text-xs font-mono font-bold px-3 py-1.5 rounded flex items-center gap-1.5 backdrop-blur-xs shadow-lg">
              <Eye className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Click to Inspect & Inquire</span>
            </span>
          </div>

        </div>

        {/* Card Body */}
        <div className="p-6">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1.5">
            <span className="font-bold text-[#D97706] uppercase">{item.vendor}</span>
            <span>{item.categoryLabel}</span>
          </div>

          <h3 className="font-heading text-xl font-black uppercase text-slate-900 group-hover:text-[#D97706] transition-colors leading-tight">
            {item.title}
          </h3>

          {/* 4 Key Specifications Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-3 rounded border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[10px]">METER HOURS</span>
              <span className="font-bold text-slate-900">{item.hours != null ? `${item.hours.toLocaleString()} hrs` : 'Inspected'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">POWER</span>
              <span className="font-bold text-slate-900">{item.specs.flywheelPowerHP} HP</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">WEIGHT</span>
              <span className="font-bold text-slate-900">{item.specs.operatingWeightTons} Tons</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">CONDITION</span>
              <span className="font-bold text-emerald-700 truncate block">{item.specs.condition}</span>
            </div>
          </div>

          {/* Auxiliary Services Provided for this Machine */}
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-slate-600">
            <span className="text-slate-400">SERVICES:</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 flex items-center gap-1">
              <Truck className="w-2.5 h-2.5 text-[#D97706]" /> Trucking
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 flex items-center gap-1">
              <Package className="w-2.5 h-2.5 text-[#D97706]" /> Containerizing
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 flex items-center gap-1">
              <Ship className="w-2.5 h-2.5 text-[#D97706]" /> Ocean Freight
            </span>
          </div>

        </div>

      </div>

      {/* Card Footer: Strictly "Call for Price" or "(SOLD)" */}
      <div className="px-6 pb-6 pt-0">
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
          
          <div>
            <span className="text-[10px] font-mono text-slate-500 block">PURCHASE PRICE</span>
            <div className="font-heading text-lg font-black uppercase tracking-tight text-slate-900">
              {item.priceDisplay || 'Call for Price'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-2.5 text-xs font-mono font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Call (630) 379-9175 for current price"
            >
              <Phone className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectMachine(item);
              }}
              className="clip-chamfer px-4 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-sm text-center flex items-center gap-1"
            >
              <span>Inquire</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
