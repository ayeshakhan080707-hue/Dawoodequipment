import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#07090C] border-t border-[#1E2638] text-slate-400 text-xs">
      
      {/* 24/7 Emergency Dispatch Banner */}
      <div className="border-b border-[#1E2638] bg-[#0E121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded bg-[#FFB800] text-slate-950 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FFB800] uppercase font-bold tracking-wider">
                24/7 RAPID ON-SITE FIELD DISPATCH HOTLINE
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Require Immediate Emergency Equipment Mobilization?
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:+18005550199"
              className="px-6 py-3 bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 shadow-[0_0_20px_rgba(255,184,0,0.3)] whitespace-nowrap"
            >
              CALL 1-800-HEAVY-FLEET
            </a>
            <span className="font-mono text-slate-400 text-xs">
              Direct Access to Central Dispatch Superintendent
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-xl font-extrabold text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-[#FFB800] text-slate-950 font-black text-sm">
                DE
              </span>
              <span className="tracking-wider">DAWOOD <span className="text-[#FFB800]">EQUIPMENTS</span></span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier industrial fleet rental standard for Tier 1 civil, mining, and energy infrastructure projects across North America. Real-time CAN telematics, zero-downtime hot swap guarantees, and certified master heavy operators.
            </p>

            <div className="pt-2 flex flex-col gap-2 font-mono text-[11px] text-slate-500">
              <div>CORPORATE HEADQUARTERS: 8400 Wallisville Road, Houston, TX 77029</div>
              <div>FEDERAL DOT # 3948102 · OSHA RECORDED ZERO INJURIES</div>
            </div>
          </div>

          {/* Quick Fleet Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Fleet Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#fleet" className="hover:text-[#FFB800] transition-colors">Ultra-Heavy Excavators</a></li>
              <li><a href="#fleet" className="hover:text-[#FFB800] transition-colors">Lattice Crawler Cranes</a></li>
              <li><a href="#fleet" className="hover:text-[#FFB800] transition-colors">Articulated Haul Trucks</a></li>
              <li><a href="#fleet" className="hover:text-[#FFB800] transition-colors">Mining Wheel Loaders</a></li>
              <li><a href="#fleet" className="hover:text-[#FFB800] transition-colors">360° Rotating Telehandlers</a></li>
            </ul>
          </div>

          {/* Standards & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Fleet Capabilities
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#telematics" className="hover:text-[#FFB800] transition-colors">Live CAN Bus Telematics</a></li>
              <li><a href="#estimator" className="hover:text-[#FFB800] transition-colors">Dynamic Cost Estimator</a></li>
              <li><a href="#standards" className="hover:text-[#FFB800] transition-colors">4-Hour Hot Swap SLA</a></li>
              <li><a href="#standards" className="hover:text-[#FFB800] transition-colors">ISO 9001:2015 Quality</a></li>
              <li><a href="#hubs" className="hover:text-[#FFB800] transition-colors">Regional Staging Hubs</a></li>
            </ul>
          </div>

          {/* Contractor Dispatch Dispatch Bulletin */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Contractor Fleet Bulletin
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Receive monthly heavy equipment availability reports and quarterly pipeline equipment rates.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="contractor@company.com"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full px-3 py-2 bg-[#12161F] border border-[#1E2638] focus:border-[#FFB800] rounded text-xs font-mono text-white focus:outline-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 bg-[#1E2638] hover:bg-[#FFB800] hover:text-slate-950 text-white font-mono text-xs font-bold uppercase rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe Bulletin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed to heavy fleet bulletin.</span>
              </div>
            )}
          </div>

        </div>

        {/* Quiet Bottom Legal Copyright */}
        <div className="mt-14 pt-8 border-t border-[#1E2638] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 Dawood Equipments Fleet Systems LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Master Rental Agreement</span>
            <span>Safety Directives</span>
            <span>OSHA Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
