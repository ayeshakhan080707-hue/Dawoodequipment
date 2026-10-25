import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const PrimeTestimonials: React.FC = () => {
  const [activeFeedbackModal, setActiveFeedbackModal] = useState(false);

  // Customer faces collage data
  const clientPhotos = [
    { title: 'Project Superintendent', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80' },
    { title: 'Civil Engineer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80' },
    { title: 'Quarry Manager', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80' },
    { title: 'Operations Director', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80' },
    { title: 'Fleet Supervisor', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80' },
    { title: 'Master Rigging Tech', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80' },
    { title: 'Safety Inspector', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80' },
    { title: 'Logistics Lead', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80' },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Purchased two Caterpillar units. Dawood Equipment handled the complete teardown, containerized them into 40ft High Cubes, and delivered to Jebel Ali Port ahead of schedule with all clean titles.",
      author: "MASON CLARK",
      company: "Apex Earthworks Group",
      role: "Managing Director",
    },
    {
      id: 2,
      quote: "The Cat 980M arrived exactly as described with verified meter hours and complete fluid reports. Inland lowboy trucking to our Texas quarry was flawless.",
      author: "ELENA ROSTOVA",
      company: "BuildCore Aggregate LLC",
      role: "Operations Director",
    },
    {
      id: 3,
      quote: "Top-tier machinery dealer. We also sold our surplus Komatsu dozers to them—they wired payment the same day and dispatched their lowboy trucks for pickup.",
      author: "DAVID STERLING",
      company: "Titan Heavy Construct Ltd.",
      role: "Field Superintendent",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Photo Mosaic Strip matching reference */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3 pb-8">
          {clientPhotos.map((p, idx) => (
            <div 
              key={idx}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden shadow-sm border border-slate-200 bg-slate-100 filter grayscale hover:grayscale-0 transition-all duration-200"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Fallback avatar icon
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-mono uppercase tracking-wider mb-2">
            Customer Praise
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900">
            SEE WHAT OUR CLIENTS SAY ABOUT US
          </h2>
        </div>

        {/* 3 Review Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-lg bg-[#F8F9FA] border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Gold Stars */}
                <div className="flex items-center gap-1 text-[#FFB800] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFB800]" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#FFB800] text-slate-950 font-black font-heading flex items-center justify-center text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-heading text-sm font-bold uppercase text-slate-900">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Button matching reference */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setActiveFeedbackModal(true)}
            className="clip-chamfer inline-block px-8 py-3 text-xs font-heading font-black uppercase tracking-wider bg-[#FFB800] hover:bg-[#FFA500] text-slate-950 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,184,0,0.3)]"
          >
            See All Client Feedback
          </button>
        </div>

      </div>

      {/* Client Feedback Modal */}
      {activeFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading text-2xl font-black uppercase text-slate-900">
              Verified Contractor Ratings
            </h3>
            <div className="p-4 rounded bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>
                <strong>4.98 / 5.0 Rating</strong> verified across 1,240 completed heavy equipment lease contracts in 2026.
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every review is independently verified through DOT bill of lading and jobsite dispatch sign-offs.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveFeedbackModal(false)}
                className="px-5 py-2 text-xs font-bold rounded bg-slate-900 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
