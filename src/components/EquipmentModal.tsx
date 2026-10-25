import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Package, 
  Ship, 
  Check, 
  Compass,
  Gauge
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { COMPANY_INFO } from '../data/fleetData';

interface EquipmentModalProps {
  equipment: Equipment | null;
  onClose: () => void;
  onSelectForRateCalc: (equipment: Equipment) => void;
  onInstantReserve?: (equipment: Equipment) => void;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  equipment,
  onClose,
  onSelectForRateCalc,
  onInstantReserve,
}) => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDestination, setInquiryDestination] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  if (!equipment) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#D97706] uppercase">
                {equipment.vendor} · {equipment.categoryLabel}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                STOCK #{equipment.stockNumber || 'DW-UNIT'}
              </span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 leading-none">
              {equipment.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Image & Status (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shadow-sm">
                <img
                  src={equipment.image}
                  alt={equipment.title}
                  className="w-full h-full object-cover filter contrast-105"
                />

                <div className="absolute top-3 left-3">
                  {equipment.isSold ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-600 text-white text-xs font-mono font-bold uppercase shadow-sm">
                      (SOLD) OUTRIGHT PURCHASE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 text-white text-xs font-mono font-bold uppercase shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>AVAILABLE FOR PURCHASE</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded text-white text-xs font-mono flex justify-between">
                  <span>LOCATION: {equipment.specs.location}</span>
                  <span>VIN: {equipment.specs.serialVin || 'VERIFIED'}</span>
                </div>
              </div>

              {/* Auxiliary Services Badge Bar for this machine */}
              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs font-mono">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">
                  AUXILIARY LOGISTICS SERVICES AVAILABLE:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-1.5 text-slate-800">
                    <Truck className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Inland Trucking</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-1.5 text-slate-800">
                    <Package className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Containerizing</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200 flex items-center gap-1.5 text-slate-800">
                    <Ship className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Ocean Freight</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Call for Price & Contact Box (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded-lg bg-amber-50 border border-amber-200 text-slate-900 space-y-3">
                <div className="text-xs font-mono text-[#D97706] font-bold uppercase">
                  DIRECT MACHINERY INQUIRY
                </div>
                
                <div>
                  <span className="text-xs text-slate-500 block font-mono">PURCHASE PRICE:</span>
                  <div className="font-heading text-3xl font-black text-slate-900 uppercase">
                    {equipment.priceDisplay || 'Call for Price'}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Dawood Equipment Co sells outright used heavy earthmovers. Call our desk directly for current price, mechanical inspection report, and turnkey export quotes.
                </p>

                {/* Direct Phone Call Button */}
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded shadow-md transition-all cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (630) 379-9175 Now</span>
                </a>

                {/* Direct Email Inquiry */}
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Purchase Inquiry for Stock %23${equipment.stockNumber || 'DW-UNIT'}: ${encodeURIComponent(equipment.title)}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-mono text-xs font-semibold rounded border border-slate-300 transition-colors text-center"
                >
                  <Mail className="w-4 h-4 text-[#D97706]" />
                  <span>Email: {COMPANY_INFO.email}</span>
                </a>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Year:</span>
                  <span className="font-bold text-slate-900">{equipment.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Meter Hours:</span>
                  <span className="font-bold text-slate-900">{equipment.hours != null ? `${equipment.hours.toLocaleString()} hrs` : 'Inspected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Condition:</span>
                  <span className="font-bold text-emerald-700">{equipment.specs.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Business Model:</span>
                  <span className="font-bold text-slate-900">Outright Sales Only</span>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Mechanical Spec Matrix */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-3 font-semibold">
              OFFICIAL SPECIFICATION SHEET
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Engine Model:</span>
                <span className="text-slate-900 font-semibold">{equipment.specs.engineModel}</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Flywheel Power:</span>
                <span className="text-slate-900 font-semibold">{equipment.specs.flywheelPowerHP} HP</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Operating Weight:</span>
                <span className="text-slate-900 font-semibold">{equipment.specs.operatingWeightTons} Metric Tons</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Emissions Standard:</span>
                <span className="text-slate-900 font-semibold">{equipment.specs.emissionsTier}</span>
              </div>
              {equipment.specs.reachOrDigDepth && (
                <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between sm:col-span-2">
                  <span className="text-slate-500">Dimensions / Dig Reach:</span>
                  <span className="text-slate-900 font-semibold">{equipment.specs.reachOrDigDepth}</span>
                </div>
              )}
              {equipment.specs.bucketOrPayloadCapacity && (
                <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between sm:col-span-2">
                  <span className="text-slate-500">Capacity / Attachment:</span>
                  <span className="text-slate-900 font-semibold">{equipment.specs.bucketOrPayloadCapacity}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Key Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-wider text-slate-500 uppercase font-semibold">
              EQUIPMENT OVERVIEW
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded border border-slate-200">
              {equipment.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {equipment.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Machine Purchase Inquiry Form */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-mono tracking-wider text-slate-500 uppercase font-semibold mb-3">
              SEND WRITTEN PURCHASE INQUIRY
            </h4>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (630) 000-0000"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@company.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    Destination Seaport or US Delivery City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jebel Ali / Dubai, Tin Can Island / Lagos, or Houston TX"
                    value={inquiryDestination}
                    onChange={(e) => setInquiryDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">Questions / Specific Requests</label>
                  <textarea
                    rows={2}
                    placeholder={`Interested in purchasing ${equipment.title} (Stock #${equipment.stockNumber}). Please provide pricing, containerizing feasibility, and freight rate.`}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <button
                  type="submit"
                  className="clip-chamfer w-full py-2.5 px-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-sm text-center"
                >
                  Submit Inquiry to Sales@dawoodequipment.com
                </button>
              </form>
            ) : (
              <div className="p-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">Inquiry Sent to Dawood Equipment Co!</div>
                  <div className="text-emerald-700">A sales representative will contact you at {inquiryPhone || inquiryEmail} shortly.</div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">Need Immediate Pricing?</span>
            <a 
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="text-sm font-bold font-mono text-slate-900 hover:text-[#D97706] flex items-center gap-1"
            >
              <Phone className="w-4 h-4 text-[#D97706]" />
              <span>(630) 379-9175</span>
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onSelectForRateCalc(equipment);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded transition-colors cursor-pointer"
            >
              Calculate Freight & Export
            </button>

            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 rounded transition-all cursor-pointer shadow-md text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call (630) 379-9175</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
