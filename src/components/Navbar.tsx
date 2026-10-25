import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenDispatchBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2638] bg-[#0B0D10]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single element brand wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded bg-[#FFB800] text-slate-950 font-black text-sm tracking-tighter">
            DE
          </span>
          <span className="tracking-wider">DAWOOD <span className="text-[#FFB800]">EQUIPMENTS</span></span>
        </a>

        {/* Zone 2: 4-5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a 
            href="#fleet" 
            className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0"
          >
            Fleet Explorer
          </a>
          <a 
            href="#estimator" 
            className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0"
          >
            Cost Estimator
          </a>
          <a 
            href="#telematics" 
            className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0"
          >
            Telematics Live
          </a>
          <a 
            href="#standards" 
            className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0"
          >
            Safety & Standards
          </a>
          <a 
            href="#hubs" 
            className="hover:text-[#FFB800] transition-colors whitespace-nowrap shrink-0"
          >
            Dispatch Hubs
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a 
            href="tel:+18005550199" 
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>1-800-HEAVY-FLEET</span>
          </a>
          <button 
            onClick={onOpenEstimator}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide uppercase bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 rounded transition-all duration-200 shadow-[0_0_20px_rgba(255,184,0,0.25)] hover:shadow-[0_0_25px_rgba(255,184,0,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Calculate Rental Rate</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E2638] bg-[#0E121A] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FFB800]"
            >
              Fleet Explorer
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FFB800]"
            >
              Cost Estimator
            </a>
            <a 
              href="#telematics" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FFB800]"
            >
              Telematics Live
            </a>
            <a 
              href="#standards" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FFB800]"
            >
              Safety & Standards
            </a>
            <a 
              href="#hubs" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#FFB800]"
            >
              Dispatch Hubs
            </a>
          </div>

          <div className="pt-4 border-t border-[#1E2638] flex flex-col gap-3">
            <a 
              href="tel:+18005550199" 
              className="flex items-center gap-2 text-xs font-mono text-slate-400"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>24/7 Hotline: 1-800-HEAVY-FLEET</span>
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold tracking-wide uppercase bg-[#FFB800] text-slate-950 rounded"
            >
              <span>Calculate Rental Rate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
