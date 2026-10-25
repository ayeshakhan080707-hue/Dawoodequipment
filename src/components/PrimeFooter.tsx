import React, { useState } from 'react';
import { Phone, Mail, CheckCircle2, MapPin, Truck, Package, Ship } from 'lucide-react';
import dawoodLogo from '../assets/images/ea89d751-72fc-4744-bb51-a5f7bae6c659.png';
import { COMPANY_INFO, MACHINERY_TYPES, VENDOR_LIST } from '../data/fleetData';

export const PrimeFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#ECEEF2] text-slate-600 pt-16 pb-12 border-t border-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-300">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src={dawoodLogo} 
                alt="Dawood Equipment Co." 
                className="h-12 w-auto object-contain" 
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Commercial heavy equipment & used machinery dealership. Buying and selling Caterpillar, Komatsu, Case, and John Deere equipment with turnkey domestic trucking, containerizing, and ocean freight worldwide.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                <a href={`tel:${COMPANY_INFO.phoneClean}`} className="font-bold hover:text-[#D97706]">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#D97706]">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{COMPANY_INFO.primaryLocation}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Machinery For Sale */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Equipment For Sale
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Crawler Dozers</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Hydraulic Excavators</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Wheel Loaders</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Backhoes</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Vibratory Rollers</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Heavy Forklifts</a></li>
              <li><a href="#equipment" className="hover:text-slate-950 transition-colors">Asphalt Pavers</a></li>
            </ul>
          </div>

          {/* Col 3: Auxiliary Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              Services We Provide
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#services" className="hover:text-slate-950 transition-colors flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-[#D97706]" />
                  <span>Domestic Trucking</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-950 transition-colors flex items-center gap-1.5">
                  <Package className="w-3 h-3 text-[#D97706]" />
                  <span>Containerizing</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-950 transition-colors flex items-center gap-1.5">
                  <Ship className="w-3 h-3 text-[#D97706]" />
                  <span>Ocean Freight Export</span>
                </a>
              </li>
              <li>
                <a href="#sell-equipment" className="hover:text-slate-950 transition-colors text-[#D97706] font-bold">
                  We Buy Used Equipment
                </a>
              </li>
              <li>
                <a href="#shipping-calculator" className="hover:text-slate-950 transition-colors">
                  Freight Rate Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-900">
              New Inventory Alerts
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get notified when fresh Caterpillar and Komatsu machines arrive.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FFB800]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-heading font-bold uppercase tracking-wider rounded bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-colors cursor-pointer shadow-sm"
                >
                  Get Inventory Alerts
                </button>
              </form>
            ) : (
              <div className="p-2.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Subscribed!</span>
              </div>
            )}
          </div>

        </div>

        {/* Giant Bottom Brand Watermark */}
        <div className="py-10 flex items-center justify-center gap-4 sm:gap-6 border-b border-slate-300 select-none overflow-hidden">
          <div className="w-14 h-14 sm:w-20 sm:h-20 text-[#D97706] shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M4 4h7l6 7-6 9H4l6-9-6-7z" />
            </svg>
          </div>
          <span className="font-heading text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-800 whitespace-nowrap">
            DAWOOD EQUIPMENT CO.
          </span>
        </div>

        {/* Quiet Legal Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div>
            © 2026 Dawood Equipment Co. (dawoodequipment.com). Heavy Equipment Sales & Worldwide Export.
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_INFO.phoneClean}`} className="text-slate-800 font-bold hover:text-[#D97706]">
              {COMPANY_INFO.phone}
            </a>
            <span>·</span>
            <span>Illinois, United States</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
