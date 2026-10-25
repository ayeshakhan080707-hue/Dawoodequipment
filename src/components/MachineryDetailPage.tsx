import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  Package, 
  Ship, 
  Share2, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Video, 
  ShieldCheck, 
  Calendar, 
  Gauge, 
  Check, 
  FileText
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { COMPANY_INFO, WORLDWIDE_EXPORT_PORTS } from '../data/fleetData';

interface MachineryDetailPageProps {
  machine: Equipment;
  onBackToCatalog: () => void;
  onOpenShippingEstimator: (machine: Equipment) => void;
}

export const MachineryDetailPage: React.FC<MachineryDetailPageProps> = ({
  machine,
  onBackToCatalog,
  onOpenShippingEstimator,
}) => {
  const images = (machine.images && machine.images.length > 0) 
    ? machine.images 
    : [machine.image];

  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video'>('photos');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Zoom feature state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Inquiry form state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [destinationPortOrCity, setDestinationPortOrCity] = useState('');
  const [needTrucking, setNeedTrucking] = useState(true);
  const [needContainerizing, setNeedContainerizing] = useState(true);
  const [needOceanFreight, setNeedOceanFreight] = useState(true);
  const [questions, setQuestions] = useState('');
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `INQ-DE-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationNumber(ref);
    setInquirySubmitted(true);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-slate-900 pb-24">
      
      {/* Top Breadcrumb & Return Action Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <button
            type="button"
            onClick={onBackToCatalog}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D97706] transition-transform group-hover:-translate-x-1" />
            <span>Back to All Equipment For Sale</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Dawood Equipment</span>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span className="text-[#D97706] font-bold">{machine.stockNumber || 'DW-UNIT'}</span>
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
        
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider mb-1">
              <span>{machine.vendor}</span>
              <span>·</span>
              <span>{machine.categoryLabel}</span>
              <span>·</span>
              <span>STOCK #{machine.stockNumber || 'DW-UNIT'}</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              {machine.title}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-mono flex flex-wrap items-center gap-3">
              <span>Year: <strong className="text-slate-900">{machine.year}</strong></span>
              <span>·</span>
              <span>Hours: <strong className="text-slate-900">{machine.hours != null ? `${machine.hours.toLocaleString()} hrs` : 'Inspected'}</strong></span>
              <span>·</span>
              <span>Operating Weight: <strong className="text-slate-900">{machine.specs.operatingWeightTons} Metric Tons</strong></span>
              <span>·</span>
              <span>VIN: <strong className="text-slate-900">{machine.specs.serialVin || 'VERIFIED'}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {machine.isSold ? (
              <span className="px-4 py-2 rounded bg-red-600 text-white font-mono text-sm font-bold uppercase shadow-sm">
                (SOLD) OUTRIGHT
              </span>
            ) : (
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">OUTRIGHT PURCHASE</span>
                <span className="font-heading text-3xl font-black text-slate-900 uppercase">
                  {machine.priceDisplay || 'Call for Price'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Main Showcase: Left Media Gallery (7 cols), Right Fast Inquiry (5 cols) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Gallery & Video Player (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Media Tabs: Photos vs HD Video */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveMediaTab('photos')}
                className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === 'photos'
                    ? 'bg-[#FFB800] text-slate-950 shadow-sm'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                }`}
              >
                <span>Photo Gallery ({images.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeMediaTab === 'video'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-[#D97706]" />
                <span>HD Video Walkaround</span>
              </button>
            </div>

            {/* TAB 1: Photo Gallery with Zoom Lens */}
            {activeMediaTab === 'photos' ? (
              <div className="space-y-4">
                
                {/* Main Large Image with Hover Zoom Lens */}
                <div 
                  className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-lg select-none group"
                  onMouseEnter={() => setIsHoverZooming(true)}
                  onMouseLeave={() => setIsHoverZooming(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={images[activeImageIndex] || machine.image}
                    alt={`${machine.title} - Angle ${activeImageIndex + 1}`}
                    className={`w-full h-full object-cover filter contrast-105 transition-transform duration-100 ${
                      isHoverZooming ? 'scale-150' : 'scale-100'
                    }`}
                    style={
                      isHoverZooming
                        ? {
                            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                          }
                        : undefined
                    }
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/src/assets/images/hero_excavator_heavy_1792859629737.jpg';
                    }}
                  />

                  {/* Navigation Arrows on Large Image */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
                        aria-label="Previous Photo"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
                        aria-label="Next Photo"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Top-Right Fullscreen Lightbox Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setZoomLevel(1.5);
                      setIsLightboxOpen(true);
                    }}
                    className="absolute top-3 right-3 bg-slate-950/80 hover:bg-[#FFB800] text-white hover:text-slate-950 p-2 rounded-lg backdrop-blur-xs transition-colors z-20 cursor-pointer flex items-center gap-1.5 text-xs font-mono font-bold shadow-md"
                    title="Open Fullscreen Zoom Lightbox"
                  >
                    <ZoomIn className="w-4 h-4" />
                    <span>Zoom Fullscreen</span>
                  </button>

                  {/* Photo Counter Pill */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-xs font-mono px-3 py-1 rounded-md z-10">
                    Photo {activeImageIndex + 1} of {images.length}
                  </div>

                  {/* Zoom Hint */}
                  {!isHoverZooming && (
                    <div className="absolute bottom-3 right-3 bg-slate-950/60 backdrop-blur-xs text-slate-300 text-[10px] font-mono px-2 py-1 rounded z-10 pointer-events-none">
                      🔍 Hover to zoom details
                    </div>
                  )}
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-5 gap-2">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-slate-100 ${
                        activeImageIndex === idx
                          ? 'border-[#FFB800] ring-2 ring-[#FFB800]/30 shadow-md scale-98'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/src/assets/images/fleet_mining_loader_1792859632094.jpg';
                        }}
                      />
                      <span className="absolute bottom-1 right-1 bg-slate-950/80 text-white text-[9px] font-mono px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

              </div>
            ) : (
              /* TAB 2: HD Video Walkaround Player */
              <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl p-4 space-y-4">
                <div className="flex items-center justify-between text-white text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-[#FFB800] uppercase">
                      OFFICIAL OPERATION WALKAROUND
                    </span>
                  </div>
                  <span className="text-slate-400">1080p 60FPS HD</span>
                </div>

                {/* Simulated Custom High-End Video Player */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group">
                  <video
                    src={machine.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-excavator-working-on-a-construction-site-41619-large.mp4'}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    autoPlay={isPlaying}
                    playsInline
                  />

                  {/* Play / Pause Center Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/30 transition-colors">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-2xl"
                      aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>
                  </div>

                  {/* Video Control Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-4 flex items-center justify-between text-white text-xs font-mono z-10">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-[#FFB800] cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-[#FFB800] cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span>{machine.videoDuration || '3:20 min'}</span>
                    </div>

                    <div className="text-[11px] text-slate-300 truncate max-w-xs">
                      {machine.videoTitle || 'Inspection Walkaround'}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span>Engine cold start, hydraulic relief pressure, and slewing test verified.</span>
                  <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
                </div>
              </div>
            )}

            {/* Auxiliary Services Provided for this Machine */}
            <div className="p-5 rounded-xl bg-white border border-slate-300 shadow-sm space-y-3">
              <div className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>EXPORT & LOGISTICS SERVICES PROVIDED FOR THIS UNIT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Inland Trucking</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Heavy-haul RGN transport from Illinois yard to Baltimore, Houston, or Newark port.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Containerizing</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Professional teardown of booms, stick & cab; blocked & strapped in 40ft High Cube.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Ocean Freight</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Maritime Ro-Ro or container vessel export to Jebel Ali, Lagos, Santos, Rotterdam.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onOpenShippingEstimator(machine)}
                  className="text-xs font-mono font-bold text-slate-900 hover:text-[#D97706] underline cursor-pointer"
                >
                  Estimate exact freight rate to your destination port →
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Inquiry Form & Call Desk (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Hotline Card */}
            <div className="p-6 rounded-xl bg-amber-50 border border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#D97706] uppercase tracking-wider">
                  DIRECT EQUIPMENT DESK
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-mono font-bold">
                  IMMEDIATE RESPONSE
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 block">CALL FOR CURRENT PRICE</span>
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="font-mono text-3xl font-black text-slate-950 hover:text-[#D97706] transition-colors block"
                >
                  (630) 379-9175
                </a>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with Dawood Equipment sales managers for confirmed price, clean title inspection reports, and port departure schedules.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="clip-chamfer py-3 px-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Purchase Inquiry for Stock %23${machine.stockNumber || 'DW-UNIT'}: ${encodeURIComponent(machine.title)}`}
                  className="py-3 px-4 text-xs font-mono font-bold bg-white hover:bg-slate-100 text-slate-800 rounded border border-slate-300 transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Email Sales</span>
                </a>
              </div>
            </div>

            {/* Dedicated Machine Inquiry & Pro-Forma Form */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-300 shadow-xl space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="font-heading text-xl font-bold uppercase text-slate-900">
                  Send Purchase Inquiry
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Request price, inspection documentation, or Pro-Forma invoice.
                </p>
              </div>

              {!inquirySubmitted ? (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (630) 000-0000"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1">Company / Contractor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Global Earthworks LLC"
                      value={inquiryCompany}
                      onChange={(e) => setInquiryCompany(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1">
                      Destination Seaport or US Delivery City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jebel Ali / Dubai, Tin Can Island / Lagos, or Houston TX"
                      value={destinationPortOrCity}
                      onChange={(e) => setDestinationPortOrCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-[11px] font-mono text-slate-500 uppercase font-bold">
                      REQUIRED AUXILIARY SERVICES:
                    </label>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <label className="flex items-center gap-1.5 p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needTrucking}
                          onChange={(e) => setNeedTrucking(e.target.checked)}
                          className="rounded text-[#D97706]"
                        />
                        <span>Trucking</span>
                      </label>
                      <label className="flex items-center gap-1.5 p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needContainerizing}
                          onChange={(e) => setNeedContainerizing(e.target.checked)}
                          className="rounded text-[#D97706]"
                        />
                        <span>Containerizing</span>
                      </label>
                      <label className="flex items-center gap-1.5 p-2 rounded bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={needOceanFreight}
                          onChange={(e) => setNeedOceanFreight(e.target.checked)}
                          className="rounded text-[#D97706]"
                        />
                        <span>Ocean Freight</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 mb-1">Specific Questions / Requirements</label>
                    <textarea
                      rows={3}
                      placeholder={`Please send current price, mechanical inspection report, and freight quote to ${destinationPortOrCity || 'our port'}.`}
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="clip-chamfer w-full py-3.5 px-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md text-center mt-2"
                  >
                    Submit Inquiry to Dawood Equipment Co
                  </button>

                  <div className="text-[11px] font-mono text-slate-400 text-center">
                    Routed directly to Sales@dawoodequipment.com · (630) 379-9175
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-xl font-bold uppercase text-slate-900">
                    Inquiry Received: #{confirmationNumber}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you, <strong>{inquiryName}</strong>. Our machinery export manager will review your inquiry for <strong>{machine.title}</strong> and contact you at {inquiryPhone || inquiryEmail} with official pricing and freight logistics.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquirySubmitted(false)}
                    className="text-xs font-mono text-[#D97706] hover:underline cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Complete Technical Specification Matrix */}
        <div className="mt-14 pt-12 border-t border-slate-300 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#D97706] font-bold uppercase tracking-wider">
                CERTIFIED MECHANICAL AUDIT
              </span>
              <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-slate-900 mt-0.5">
                Full Specification Sheet
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">
              100-Point Pre-Purchase Verification Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">ENGINE MODEL</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.engineModel}</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">FLYWHEEL POWER</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.flywheelPowerHP} HP</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">OPERATING WEIGHT</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.operatingWeightTons} Metric Tons</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">METER HOURS</span>
              <span className="font-bold text-slate-900 text-sm">{machine.hours != null ? `${machine.hours.toLocaleString()} hrs` : 'Inspected'}</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">HYDRAULIC PRESSURE</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.hydraulicPressureBar} BAR</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">FUEL CAPACITY</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.fuelCapacityLiters} Liters</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">EMISSIONS TIER</span>
              <span className="font-bold text-slate-900 text-sm">{machine.specs.emissionsTier}</span>
            </div>
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-500 block text-[10px]">CONDITION RATING</span>
              <span className="font-bold text-emerald-700 text-sm">{machine.specs.condition}</span>
            </div>
          </div>

          {/* Description & Features */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-slate-900">
              Machinery History & Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {machine.description}
            </p>

            <div className="pt-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
                VERIFIED FACTORY EQUIPMENT & OPTIONS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {machine.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH ZOOM FEATURE */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Zoom Controls */}
          <div className="flex items-center justify-between text-white z-20 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#FFB800] font-bold uppercase">
                {machine.title}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Photo {activeImageIndex + 1} of {images.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.3))}
                  className="p-1 hover:text-[#FFB800] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(3.5, prev + 0.3))}
                  className="p-1 hover:text-[#FFB800] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="text-[10px] text-slate-400 hover:text-white ml-1 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Central Zoom Viewport */}
          <div className="flex-1 flex items-center justify-center overflow-auto p-4 select-none relative">
            <img
              src={images[activeImageIndex] || machine.image}
              alt="Zoom Preview"
              className="max-h-[80vh] object-contain transition-transform duration-150 cursor-grab active:cursor-grabbing shadow-2xl"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Previous & Next Lightbox Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/80 hover:bg-[#FFB800] text-white hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-800 overflow-x-auto z-20">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveImageIndex(idx);
                  setZoomLevel(1);
                }}
                className={`w-16 h-12 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#FFB800] scale-105' : 'border-slate-700 opacity-60'
                }`}
              >
                <img src={imgUrl} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
