import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Phone, Mail, ArrowRight, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/fleetData';
import { useAuth } from '../context/AuthContext';

export const SellEquipmentSection: React.FC = () => {
  const { manufacturers, categories } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [equipmentType, setEquipmentType] = useState('Excavators');
  const [make, setMake] = useState('Caterpillar');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [hours, setHours] = useState('');
  const [location, setLocation] = useState('');
  const [askingPrice, setAskingPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="sell-equipment" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Decorative background glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Value Props */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFB800]/20 text-[#FFB800] text-xs font-mono font-bold uppercase tracking-wider border border-[#FFB800]/30">
              <DollarSign className="w-3.5 h-3.5" />
              <span>WE BUY USED HEAVY EQUIPMENT</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
              Turn Your Machinery Into Immediate Capital
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Dawood Equipment Co purchases surplus dozers, excavators, wheel loaders, backhoes, and pavers nationwide. We provide rapid valuations, immediate wire payments, and handle all domestic lowboy transport directly from your jobsite.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>Fast inspection & immediate bank wire transfer payment</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>Single machines or entire civil contractor fleet buyouts</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span>We arrange and pay for all nationwide trucking pickup</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-center gap-2 px-5 py-3 rounded text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FFB800]" />
                <span>Sell by Phone: (630) 379-9175</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}?subject=Selling Used Heavy Equipment`}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FFB800]" />
                <span>Email Equipment Details</span>
              </a>
            </div>
          </div>

          {/* Right Fast Valuation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              
              <div className="mb-6 pb-4 border-b border-slate-800">
                <h3 className="font-heading text-xl font-bold uppercase text-white">
                  Quick Equipment Submission Form
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Submit your machine specs for a cash offer within 24 hours.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Equipment Category</label>
                      <select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-[#FFB800]"
                      >
                        {categories.length > 0
                          ? categories.map(c => (
                              <option key={c.slug || c.name} value={c.name}>{c.name}</option>
                            ))
                          : (
                            <>
                              <option value="Crawler Dozer">Crawler Dozer</option>
                              <option value="Hydraulic Excavator">Hydraulic Excavator</option>
                              <option value="Wheel Loader">Wheel Loader</option>
                              <option value="Backhoe Loader">Backhoe Loader</option>
                              <option value="Soil Compactor / Roller">Soil Compactor / Roller</option>
                              <option value="Industrial Forklift">Industrial Forklift</option>
                              <option value="Asphalt Paver">Asphalt Paver</option>
                            </>
                          )
                        }
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Manufacturer / Make</label>
                      <select
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-[#FFB800]"
                      >
                        {manufacturers.length > 0
                          ? manufacturers.map(m => (
                              <option key={m.slug || m.name} value={m.name}>{m.name}</option>
                            ))
                          : (
                            <>
                              <option value="Caterpillar">Caterpillar</option>
                              <option value="Komatsu">Komatsu</option>
                              <option value="Case">Case</option>
                              <option value="John Deere">John Deere</option>
                              <option value="Blaw-Knox">Blaw-Knox</option>
                              <option value="Sakai">Sakai</option>
                              <option value="Taylor">Taylor</option>
                              <option value="Other">Other Make</option>
                            </>
                          )
                        }
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Model Number *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 349F L, D65PX, 980M"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Year & Meter Hours *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Year (e.g. 2019)"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Hours (e.g. 3,200)"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Equipment Location (City, State) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dallas, TX or Peoria, IL"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Target Asking Price (USD)</label>
                      <input
                        type="text"
                        placeholder="e.g. $145,000 or Best Offer"
                        value={askingPrice}
                        onChange={(e) => setAskingPrice(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(000) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="clip-chamfer w-full py-3.5 px-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-lg mt-2 text-center"
                  >
                    Submit Machinery for Immediate Cash Offer
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-xl font-bold uppercase text-white">
                    Machinery Valuation Request Received!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {sellerName}. An acquisition specialist from Dawood Equipment Co will review your {make} {model} and contact you at {phone || email} with a purchase offer.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#FFB800] hover:underline cursor-pointer"
                  >
                    Submit Another Machine
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
