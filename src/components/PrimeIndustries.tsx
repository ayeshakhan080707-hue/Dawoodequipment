import React, { useState } from 'react';
import { ArrowRight, X, Check } from 'lucide-react';

interface PrimeIndustriesProps {
  onOpenQuote: () => void;
}

export const PrimeIndustries: React.FC<PrimeIndustriesProps> = ({ onOpenQuote }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const industries = [
    {
      id: 'infrastructure',
      title: 'INFRASTRUCTURE DEVELOPMENT',
      subtitle: 'Roads, bridges, and urban projects',
      image: '/assets/images/fleet_crawler_crane_1792859630849.jpg',
      details: 'High-tonnage lattice cranes and heavy excavators deployed for highway interchanges, rail expansions, and high-load foundation pilings.',
      activeFleetCount: '480 Units Deployed',
    },
    {
      id: 'resource',
      title: 'RESOURCE EXTRACTION',
      subtitle: 'Mining and quarry operations',
      image: '/assets/images/fleet_mining_loader_1792859632094.jpg',
      details: 'Extreme duty rock loaders, articulated haulers, and high-breakout excavators engineered for continuous 24/7 aggregate production.',
      activeFleetCount: '320 Units Deployed',
    },
    {
      id: 'agriculture',
      title: 'AGRICULTURE & LAND WORK',
      subtitle: 'Farm and terrain machinery',
      image: '/assets/images/fleet_articulated_hauler_1792859631458.jpg',
      details: 'High-clearance all-terrain haulers and rough-terrain telehandlers for large-scale land clearing, irrigation canals, and soil grading.',
      activeFleetCount: '210 Units Deployed',
    },
    {
      id: 'logistics',
      title: 'WAREHOUSE & LOGISTICS',
      subtitle: 'Material movement systems',
      image: '/assets/images/telematics_cockpit_1792859631918.jpg',
      details: 'Precision 360° rotating telehandlers, terminal tractors, and mobile crane rigging for intermodal dry ports and heavy equipment laydown yards.',
      activeFleetCount: '190 Units Deployed',
    },
  ];

  return (
    <section id="industries" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
            POWERING PROJECTS ACROSS KEY INDUSTRIES
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From infrastructure to resource projects, our machines and services help industry teams work faster, safer, and more efficiently.
          </p>
        </div>

        {/* 4 Industry Cards Layout matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              onClick={() => setSelectedIndustry(ind.id)}
              className="relative h-96 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Photography with Scrim */}
              <img
                src={ind.image}
                alt={ind.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

              {/* Top Text on image */}
              <div className="absolute top-5 left-5 right-5">
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-tight leading-tight">
                  {ind.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {ind.subtitle}
                </p>
              </div>

              {/* Bottom Circular Arrow Button matching reference */}
              <div className="absolute bottom-5 right-5">
                <div className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:bg-[#FFB800] transition-colors">
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Button matching reference */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setSelectedIndustry('infrastructure')}
            className="clip-chamfer inline-block px-8 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,184,0,0.3)]"
          >
            View Industry Use Cases
          </button>
        </div>

      </div>

      {/* Industry Details Modal */}
      {selectedIndustry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedIndustry(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const ind = industries.find(i => i.id === selectedIndustry)!;
              return (
                <>
                  <div className="text-xs font-mono text-[#FFB800] uppercase font-bold">
                    FIELD DEPLOYMENT OVERVIEW
                  </div>
                  <h3 className="font-heading text-2xl font-black uppercase text-slate-900">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {ind.details}
                  </p>

                  <div className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Current Dedicated Capacity:</span>
                    <span className="font-bold text-slate-900">{ind.activeFleetCount}</span>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry(null)}
                      className="px-4 py-2 text-xs font-bold rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIndustry(null);
                        onOpenQuote();
                      }}
                      className="px-5 py-2 text-xs font-heading font-black uppercase rounded bg-[#FFB800] text-slate-950 hover:bg-[#FFA500]"
                    >
                      Request Industry Quote
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

    </section>
  );
};
