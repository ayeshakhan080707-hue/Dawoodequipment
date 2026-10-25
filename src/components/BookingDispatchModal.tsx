import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Ship, 
  Package, 
  Phone, 
  Building, 
  Download, 
  ArrowRight,
  FileText,
  ShieldCheck,
  Mail
} from 'lucide-react';
import { Equipment } from '../types/equipment';
import { COMPANY_INFO } from '../data/fleetData';

interface BookingDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment;
  config: any;
  breakdown: any;
}

export const BookingDispatchModal: React.FC<BookingDispatchModalProps> = ({
  isOpen,
  onClose,
  equipment,
  config,
  breakdown,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [proformaId, setProformaId] = useState('');

  // Buyer Form fields
  const [companyName, setCompanyName] = useState('Global Earthworks Contracting Ltd.');
  const [buyerName, setBuyerName] = useState('Tariq Al-Mansoor');
  const [email, setEmail] = useState('tariq@globalearthworks.ae');
  const [phone, setPhone] = useState('+971 50 123 4567');
  const [destinationPortOrCity, setDestinationPortOrCity] = useState(config?.destinationPort || 'Jebel Ali / Dubai, UAE');
  const [paymentPreference, setPaymentPreference] = useState<'wire' | 'cashier' | 'lc'>('wire');
  const [specialNotes, setSpecialNotes] = useState('Please provide container stuffing inspection photos prior to vessel departure.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `PI-DE-${Math.floor(100000 + Math.random() * 900000)}`;
    setProformaId(id);
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 rounded-xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#FFB800] text-slate-950 flex items-center justify-center font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-slate-900">
                Official Pro-Forma Invoice & Purchase Request
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Dawood Equipment Co · Heavy Machinery Sales & Worldwide Export
              </p>
            </div>
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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Machine & Logistics Overview Banner */}
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#D97706] uppercase">
                  SELECTED INVENTORY ITEM
                </span>
                <div className="font-heading text-lg font-black text-slate-900 uppercase">
                  {equipment.title}
                </div>
                <div className="text-xs font-mono text-slate-600">
                  Stock #{equipment.stockNumber || 'DW-UNIT'} · {equipment.specs.operatingWeightTons} Tons · VIN: {equipment.specs.serialVin || 'CAT00D6EB960744'}
                </div>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-500 block">EST. FREIGHT LOGISTICS</span>
                <span className="text-xl font-heading font-black text-slate-900 font-mono">
                  ${breakdown?.totalEstimatedLogistics ? breakdown.totalEstimatedLogistics.toLocaleString() : '8,450'}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block">
                  ({config?.destinationType === 'domestic_trucking' ? 'US Trucking' : 'Ocean Freight & Port'})
                </span>
              </div>
            </div>

            {/* Buyer Contact & Company Details */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#D97706]" />
                <span>BUYER & COMPANY CREDENTIALS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Company / Contractor Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Authorized Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Direct Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>
              </div>
            </div>

            {/* Destination & Payment Details */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-[#D97706]" />
                <span>DESTINATION & EXPORT SPECIFICATIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    Destination Seaport or US Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={destinationPortOrCity}
                    onChange={(e) => setDestinationPortOrCity(e.target.value)}
                    placeholder="e.g. Jebel Ali / Dubai, UAE or Houston, TX"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 mb-1">
                    Preferred Settlement Method
                  </label>
                  <select
                    value={paymentPreference}
                    onChange={(e) => setPaymentPreference(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  >
                    <option value="wire">Bank Wire Transfer (SWIFT / Fedwire) — Standard</option>
                    <option value="cashier">Official Bank Cashier's Check (US Domestic)</option>
                    <option value="lc">Irrevocable Commercial Letter of Credit (L/C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">
                  Special Export, Packing or Consignee Instructions
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                  placeholder="Consignee details, Notify Party, specific container loading sequence, etc."
                />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero obligation · Fast quote turnaround within 2 hours</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-mono font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="clip-chamfer flex-1 sm:flex-initial px-6 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md text-center"
                >
                  Generate Official Pro-Forma Invoice
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
                PURCHASE INQUIRY DISPATCHED
              </div>
              <h4 className="font-heading text-3xl font-black uppercase text-slate-900">
                Pro-Forma Invoice #{proformaId}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your purchase inquiry for <strong>{equipment.title}</strong> has been received by the commercial sales & freight desk at Dawood Equipment Co.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Unit:</span>
                <span className="font-bold text-slate-900">{equipment.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-900">{destinationPortOrCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Settlement Method:</span>
                <span className="font-bold text-slate-900 uppercase">{paymentPreference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Direct Sales Agent:</span>
                <span className="font-bold text-[#D97706]">(630) 379-9175</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call (630) 379-9175 to Finalize</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300"
              >
                Return to Equipment Catalog
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
