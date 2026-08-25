import React, { useState } from 'react';
import { Clock, CheckCircle2, Sparkles, ArrowRight, Scissors } from 'lucide-react';
import { translations, servicesData } from '../data/barberData';

export default function ServicesMenu({ lang, onSelectService }) {
  const t = translations[lang].services;
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'haircuts', label: t.catHaircuts },
    { id: 'beard', label: t.catBeard },
    { id: 'spa', label: t.catSpa },
    { id: 'packages', label: t.catPackages }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 relative bg-[#090b0e]">
      
      {/* Decorative background light */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-gold mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የአገልግሎቶች ዝርዝር' : 'Grooming Menu'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-4 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
            {t.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Service Image Header */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-transparent to-transparent"></div>
                  
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{service.duration} {t.estTime}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className={`text-xl font-bold text-white group-hover:text-amber-400 transition-colors ${lang === 'am' ? 'font-amharic' : ''}`}>
                      {lang === 'am' ? service.nameAm : service.nameEn}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                    {lang === 'am' ? service.descriptionAm : service.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price & Book Button */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-auto flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Price</div>
                  <div className="text-2xl font-extrabold gold-gradient-text font-serif">
                    {service.priceETB} <span className="text-xs font-sans text-amber-300/80">{t.currency}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="btn-gold py-2.5 px-4 text-xs group-hover:scale-105 transition-transform"
                >
                  <span>{t.bookService}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
