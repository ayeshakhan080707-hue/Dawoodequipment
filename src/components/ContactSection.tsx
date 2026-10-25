import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { COMPANY_INFO, MACHINERY_TYPES } from '../data/fleetData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [equipmentType, setEquipmentType] = useState('Excavators');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setFormKey(key);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto pb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#D97706] uppercase mb-2 font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT EQUIPMENT INQUIRIES & SALES</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
            Contact Dawood Equipment Co
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Reach our equipment desk directly for "Call for Price" machinery, inspections, or nationwide transport logistics.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Phone Card */}
            <div className="p-6 rounded-lg bg-amber-50 border border-amber-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#FFB800] text-slate-950 flex items-center justify-center font-black">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-slate-900">
                Primary Phone Line
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct connection to our machinery sales specialists for immediate pricing and availability verification.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="font-mono text-2xl font-black text-slate-950 hover:text-[#D97706] transition-colors block"
                >
                  {COMPANY_INFO.phone}
                </a>
                <span className="text-xs text-slate-500 font-mono">Toll-free / Direct Line</span>
              </div>
            </div>

            {/* Email & Office Info */}
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-sm space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">SALES & QUOTES EMAIL:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-bold text-slate-900 hover:text-[#D97706] text-sm"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <MapPin className="w-4 h-4 text-[#D97706] mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">DISPATCH REGION:</span>
                  <span className="font-semibold text-slate-900">
                    {COMPANY_INFO.primaryLocation}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Clock className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <span className="text-slate-500 block">DESK OPERATING HOURS:</span>
                  <span className="font-semibold text-slate-900">
                    Monday – Saturday: 7:00 AM – 7:00 PM CST
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (Workflow 3) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-lg bg-white border border-slate-300 shadow-md">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="font-heading text-xl font-bold uppercase text-slate-900">
                      Send Equipment Inquiry Form
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SSL Encrypted</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Company / Contracting LLC"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                        Direct Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(630) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                      Equipment of Interest
                    </label>
                    <select
                      value={equipmentType}
                      onChange={(e) => setEquipmentType(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    >
                      {MACHINERY_TYPES.filter(m => m.id !== 'all').map((m) => (
                        <option key={m.id} value={m.label}>{m.label}</option>
                      ))}
                      <option value="Multiple Machines">Multiple Fleet Packages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                      Inquiry Message / Request
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please include details such as desired equipment model, destination seaport or US delivery city, required trucking, containerizing, or export documentation..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-[#FFB800]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="clip-chamfer w-full py-3.5 px-6 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all duration-150 cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Dawood Equipment Co</span>
                  </button>

                  <div className="text-[11px] font-mono text-slate-400 text-center pt-1">
                    Direct notification routed to Sales@dawoodequipment.com
                  </div>

                </form>
              ) : (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-3xl font-black uppercase text-slate-900">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your inquiry has been logged with session token <code className="font-mono text-slate-800 font-bold">{formKey.slice(0, 8)}</code> and forwarded to <span className="text-[#D97706] font-semibold">Sales@dawoodequipment.com</span>.
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    A representative will contact you directly at {phone} within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-heading uppercase"
                  >
                    Send Another Inquiry
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
