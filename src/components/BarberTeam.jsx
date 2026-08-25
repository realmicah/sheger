import React from 'react';
import { Star, Award, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { translations, masterBarbers } from '../data/barberData';

export default function BarberTeam({ lang, onSelectBarber }) {
  const t = translations[lang].team;

  return (
    <section id="team" className="py-24 relative bg-[#090b0e]">
      
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-gold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'ባለሙያ ባርቤሮች' : 'Master Artisans'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-4 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
            {t.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {masterBarbers.map(barber => (
            <div 
              key={barber.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Barber Portrait */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={barber.image} 
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-transparent to-transparent"></div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{barber.rating}</span>
                    <span className="text-slate-400 font-normal">({barber.reviewsCount})</span>
                  </div>

                  {/* Branch Pill */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-lg text-slate-300 text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{barber.branch}</span>
                  </div>
                </div>

                {/* Barber Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors font-serif">
                    {barber.name}
                  </h3>
                  <div className={`text-xs text-amber-300/90 font-semibold mb-4 ${lang === 'am' ? 'font-amharic' : ''}`}>
                    {lang === 'am' ? barber.titleAm : barber.titleEn} • {barber.experienceYears} {t.expYears}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                      {lang === 'am' ? 'ልዩ ችሎታ' : 'Specialization'}
                    </div>
                    <div className="text-xs text-slate-300">
                      {lang === 'am' ? barber.specialtyAm : barber.specialtyEn}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book With Barber CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBarber(barber)}
                  className="btn-gold w-full justify-center text-sm py-3"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookWith} {barber.name.split(' ')[1] || barber.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
