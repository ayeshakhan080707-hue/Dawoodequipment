import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2 } from 'lucide-react';

interface ExpertHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertHelpModal: React.FC<ExpertHelpModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [equipmentType, setEquipmentType] = useState('Heavy Excavators & Earthmoving');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-xs font-mono text-[#D97706] uppercase font-bold tracking-wider">
              DIRECT FLEET CONSULTATION
            </div>
            <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-slate-900">
              Talk to a Heavy Machinery Specialist
            </h3>
            <p className="text-xs text-slate-600">
              Get matched with our certified equipment engineers for job site load calculation, transport permits, and lease rates.
            </p>

            <div className="p-3 rounded bg-amber-50 border border-amber-200 flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-[#D97706] shrink-0" />
              <div className="text-xs font-mono">
                <span className="text-slate-600">Immediate Phone Line: </span>
                <a href="tel:+18005550199" className="text-slate-950 font-bold hover:text-[#D97706]">
                  1-800-HEAVY-FLEET (Ext. 4)
                </a>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">Direct Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">Equipment Application</label>
                <select
                  value={equipmentType}
                  onChange={(e) => setEquipmentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#FFB800]"
                >
                  <option>Heavy Excavators & Earthmoving</option>
                  <option>Lattice Crawler Cranes & Rigging</option>
                  <option>Articulated Haul Trucks</option>
                  <option>Mining Wheel Loaders</option>
                  <option>Full Fleet Package & Site Mobilization</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="clip-chamfer w-full py-3 mt-4 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-md"
            >
              Request 15-Min Specialist Callback
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-2xl font-black uppercase text-slate-900">
              Callback Request Logged
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Our regional fleet superintendent will contact you at <strong>{phone}</strong> within 15 minutes.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded text-xs font-heading font-bold uppercase bg-[#FFB800] text-slate-950 shadow-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
