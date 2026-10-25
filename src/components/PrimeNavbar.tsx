import React, { useState } from 'react';
import { Menu, X, Phone, Mail, Globe, ArrowRight, User, ShieldCheck, LogOut, Lock } from 'lucide-react';
import dawoodLogo from '../assets/images/ea89d751-72fc-4744-bb51-a5f7bae6c659.png';
import { COMPANY_INFO } from '../data/fleetData';
import { useAuth } from '../context/AuthContext';

interface PrimeNavbarProps {
  onOpenQuote: () => void;
  onOpenExpertHelp: () => void;
  onNavigateHome?: () => void;
  onNavigateAllMachinery?: () => void;
  onNavigateLogin?: () => void;
  onNavigateDashboard?: (role: 'buyer' | 'admin') => void;
}

export const PrimeNavbar: React.FC<PrimeNavbarProps> = ({ 
  onOpenQuote, 
  onOpenExpertHelp,
  onNavigateHome,
  onNavigateAllMachinery,
  onNavigateLogin,
  onNavigateDashboard
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) onNavigateHome();
  };

  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateAllMachinery) {
      onNavigateAllMachinery();
    } else {
      const el = document.getElementById('equipment');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 transition-colors">
      
      {/* Top Utility Bar with Real Phone & Email */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 font-mono border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="text-[#FFB800] font-bold">DAWOOD EQUIPMENT CO</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">Heavy Equipment Sales & Worldwide Export</span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-emerald-400 font-bold">TRUCKING · CONTAINERIZING · OCEAN FREIGHT</span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={`tel:${COMPANY_INFO.phoneClean}`} 
              className="flex items-center gap-1.5 text-white hover:text-[#FFB800] transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Call: {COMPANY_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${COMPANY_INFO.email}`} 
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo matching official Dawood Equipment branding */}
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex items-center group shrink-0 py-1"
          title="Dawood Equipment Co. - Heavy Equipment Sales & Worldwide Export"
        >
          <img 
            src={dawoodLogo} 
            alt="Dawood Equipment Co." 
            className="h-11 sm:h-13 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
          />
        </a>

        {/* Center Nav Links - "Equipments" with NO count as requested */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <button 
            type="button" 
            onClick={handleCatalogClick} 
            className="hover:text-slate-950 transition-colors whitespace-nowrap cursor-pointer text-slate-900 font-bold"
          >
            Equipments
          </button>
          <a href="#services" onClick={() => onNavigateHome && onNavigateHome()} className="hover:text-slate-950 transition-colors whitespace-nowrap">
            Auxiliary Services
          </a>
          <a href="#sell-equipment" onClick={() => onNavigateHome && onNavigateHome()} className="hover:text-slate-950 transition-colors whitespace-nowrap text-[#D97706] font-bold">
            We Buy Machinery
          </a>
          <a href="#shipping-calculator" onClick={() => onNavigateHome && onNavigateHome()} className="hover:text-slate-950 transition-colors whitespace-nowrap">
            Export Estimator
          </a>
          <a href="#contact" onClick={() => onNavigateHome && onNavigateHome()} className="hover:text-slate-950 transition-colors whitespace-nowrap">
            Contact
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          
          {/* Phone call pill */}
          <a
            href={`tel:${COMPANY_INFO.phoneClean}`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#D97706]" />
            <span>(630) 379-9175</span>
          </a>

          {/* Login or User Dashboard button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateDashboard && onNavigateDashboard(currentUser.role)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs font-bold text-slate-900 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-[#FFB800] flex items-center justify-center text-[10px] font-black">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 uppercase">
                  {currentUser.role === 'admin' ? 'Admin' : 'Buyer'}
                </span>
              </button>

              <button
                type="button"
                onClick={logout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onNavigateLogin}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-black uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors cursor-pointer shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Login</span>
            </button>
          )}

          {/* Export Quote CTA */}
          <button
            type="button"
            onClick={onOpenQuote}
            className="clip-chamfer px-5 py-2.5 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all duration-150 cursor-pointer shadow-[0_2px_12px_rgba(255,184,0,0.3)]"
          >
            Export Quote
          </button>
        </div>

        {/* Mobile Hamburger & Mobile Login Shortcut */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser ? (
            <button
              type="button"
              onClick={() => onNavigateDashboard && onNavigateDashboard(currentUser.role)}
              className="p-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded text-xs font-bold font-mono"
            >
              {currentUser.role === 'admin' ? 'Admin' : 'Dashboard'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateLogin}
              className="px-2.5 py-1 text-xs font-bold font-heading uppercase bg-slate-900 text-[#FFB800] rounded"
            >
              Login
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3 font-semibold text-slate-800 text-sm">
            {/* Clean Equipments link with no count */}
            <button 
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateAllMachinery) onNavigateAllMachinery();
              }}
              className="py-1 text-left font-bold text-[#D97706] hover:underline"
            >
              Equipments
            </button>
            <a 
              href="#services" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="py-1 hover:text-[#D97706]"
            >
              Auxiliary Services (Trucking · Containerizing · Ocean Freight)
            </a>
            <a 
              href="#sell-equipment" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="py-1 text-[#D97706] font-bold"
            >
              We Buy Machinery (Sell to Us)
            </a>
            <a 
              href="#shipping-calculator" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="py-1 hover:text-[#D97706]"
            >
              Worldwide Shipping Estimator
            </a>
            <a 
              href="#contact" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
              className="py-1 hover:text-[#D97706]"
            >
              Contact Dawood Equipment
            </a>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateDashboard) onNavigateDashboard(currentUser.role);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-[#FFB800] font-heading font-black text-xs uppercase tracking-wider rounded text-center flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Open {currentUser.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-slate-100 text-rose-700 font-mono text-xs font-bold rounded border border-slate-300"
                >
                  Log Out ({currentUser.name})
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateLogin) onNavigateLogin();
                }}
                className="w-full py-2.5 bg-slate-900 text-[#FFB800] font-heading font-black text-xs uppercase tracking-wider rounded text-center flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}

            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#FFB800] text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded"
            >
              <Phone className="w-4 h-4" />
              <span>Call (630) 379-9175 Now</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 bg-slate-100 text-slate-800 font-mono text-xs font-bold rounded border border-slate-300"
            >
              Calculate Freight & Export
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
