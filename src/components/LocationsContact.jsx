import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, Coffee, ShieldCheck } from 'lucide-react';
import { translations, branchesData } from '../data/barberData';

export default function LocationsContact({ lang, onOpenBooking }) {
  const t = translations[lang].locations;
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0]);

  return (
    <section id="locations" className="py-24 relative bg-[#090b0e]">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-gold mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'am' ? 'የአዲስ አበባ አድራሻዎች' : 'Addis Ababa Outlets'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-4 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
            {t.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {branchesData.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`glass-panel p-8 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? 'border-amber-500 bg-slate-900/90 shadow-2xl scale-102' 
                    : 'border-slate-800 hover:border-slate-700'
                } flex flex-col justify-between`}
              >
                <div>
                  {/* Branch Status Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {branch.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{branch.seats} Barber Chairs</span>
                  </div>

                  <h3 className={`text-2xl font-bold text-white mb-3 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
                    {lang === 'am' ? branch.nameAm : branch.nameEn}
                  </h3>

                  <p className="text-slate-300 text-sm mb-6 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>{lang === 'am' ? branch.addressAm : branch.addressEn}</span>
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'am' ? branch.vibeAm : branch.vibeEn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{t.daily}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                    className="btn-outline w-full justify-center py-2.5 text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{branch.phone}</span>
                  </a>

                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 text-xs text-amber-300 hover:text-amber-200 font-semibold text-center py-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t.getDirections}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Interactive Simulated Map & Call to Action Banner */}
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border border-amber-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Walk-ins & Online Booking Welcome</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-2 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
              {lang === 'am' ? 'አሁኑኑ ቦታዎን ያስይዙ' : 'Ready for Your Sheger Transformation?'}
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              {lang === 'am' 
                ? 'በቦሌ፣ ካዛንችስ ወይም ፒያሳ ቅርንጫፎቻችን ይቀላቀሉን። የትኛውንም ያህል ቢጣደፉ ፈጣን እና ጥራት ያለው አገልግሎት እናረጋግጣለን።' 
                : 'Reserve your time slot online with instant confirmation or give us a quick call.'}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button onClick={onOpenBooking} className="btn-gold py-3.5 px-7 text-sm shadow-xl">
              <span>{t.title ? 'Book Appointment' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
