import React, { useState } from 'react';
import { Clock, ArrowUpRight, X } from 'lucide-react';

export const PrimeBlogGuides: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<{ 
    id: number; 
    title: string; 
    readTime: string; 
    image: string; 
    summary: string; 
    fullContent: string; 
  } | null>(null);

  const articles = [
    {
      id: 1,
      title: "How to Safely Dismantle & Containerize Heavy Machinery for Ocean Export",
      readTime: "4 min read",
      image: "/src/assets/images/fleet_crawler_crane_1792859630849.jpg",
      summary: "Teardown methods, boom removal, cab lowering, and certified steel strapping that save equipment buyers 30% to 50% compared to breakbulk rates.",
      fullContent: "Exporting heavy earthmovers in 40ft High Cube containers provides substantial freight savings over Ro-Ro shipping. Our mechanical team removes excavator counterweights, unpins booms, detaches sticks, and unbolts ROPS cabs to meet container height limits. Heavy hardwood blocking and high-tensile steel banding ensure machines arrive at overseas ports without transit damage.",
    },
    {
      id: 2,
      title: "100-Point Inspection Checklist When Buying Used Earthmoving Equipment",
      readTime: "5 min read",
      image: "/src/assets/images/fleet_mining_loader_1792859632094.jpg",
      summary: "Critical inspection points: engine blow-by verification, hydraulic pump pressure testing, fluid spectrographic analysis, and remaining undercarriage wear.",
      fullContent: "Prior to purchasing used heavy equipment, comprehensive mechanical verification is vital. Verify verified meter hours against ECM history, check hydraulic relief valves for factory psi ratings, inspect pins and bushings for oval elongation, and review oil spectrographic analysis to check for bronze or iron wear particles.",
    },
    {
      id: 3,
      title: "Navigating US Domestic Trucking Permits & International Port Clearances",
      readTime: "6 min read",
      image: "/src/assets/images/telematics_cockpit_1792859631918.jpg",
      summary: "Oversized load RGN lowboy transport logistics across 50 states and AES export documentation required for overseas customs clearance.",
      fullContent: "Moving machines over 100,000 lbs requires multi-axle lowboys, state DOT travel permits, and certified pilot escort cars. For overseas export, Dawood Equipment Co handles full AES filing with US Customs, Title verification, Chamber of Commerce Certificate of Origin, and clean ocean Bills of Lading.",
    },
  ];

  return (
    <section id="insights" className="py-20 bg-[#F8F9FA] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-12 border-b border-slate-200">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
              EQUIPMENT DEALERSHIP KNOWLEDGE
            </span>
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-none">
              EXPERT MACHINERY BUYING GUIDES, CONTAINERIZING, <span className="text-slate-600">& EXPORT</span> BEST PRACTICES
            </h2>
          </div>
        </div>

        {/* 3 Articles Grid matching reference */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article 
              key={art.id}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => setActiveArticle(art)}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-5 bg-slate-200 border border-slate-300">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-[#D97706]" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold uppercase text-slate-900 group-hover:text-[#D97706] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-[#D97706]">
                <span>Read Full Export Guide</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>

        {/* Modal for Article Reading */}
        {activeArticle && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-xl shadow-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-mono text-[#D97706] font-bold uppercase">
                  DAWOOD EQUIPMENT CO · TECHNICAL EXPORT GUIDE
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-heading text-2xl font-black uppercase text-slate-900">
                {activeArticle.title}
              </h3>

              <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                <span>Reading Time: {activeArticle.readTime}</span>
                <span>·</span>
                <span>Technical Sales Advisory</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
                {activeArticle.fullContent}
              </p>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded text-xs font-mono font-bold cursor-pointer hover:bg-slate-800"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
