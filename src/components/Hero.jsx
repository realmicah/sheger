import React from 'react';
import { Calendar, Phone, Star, MapPin, Award, Users, Coffee } from 'lucide-react';
import { translations } from '../data/barberData';

export default function Hero({ lang, onOpenBooking }) {
  const t = translations[lang].hero;

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-shop-interior.jpg" 
          alt="Sheger Barber Shop Interior Addis Ababa" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/75 to-black/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Decorative Gold Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10 text-center px-4">
        
        {/* Top Gold Badge */}
        <div className="inline-flex items-center gap-2 mb-6 badge-gold py-1.5 px-4 shadow-xl backdrop-blur-md">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-amber-200">
            {t.badge}
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto leading-[1.15] ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
          {t.titleMain} <br className="hidden sm:inline" />
          <span className="gold-gradient-text drop-shadow-md">{t.titleHighlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-balance">
          {t.subtitle}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-md mx-auto">
          <button 
            onClick={onOpenBooking}
            className="btn-gold w-full sm:w-auto py-4 px-8 text-base justify-center group shadow-2xl"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{t.ctaBook}</span>
          </button>
          
          <a 
            href="#services" 
            className="btn-outline w-full sm:w-auto py-4 px-8 text-base justify-center hover:border-amber-400"
          >
            <span>{t.ctaServices}</span>
          </a>
        </div>

        {/* Quick Branch Pill Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Bole Medhanialem</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Kazanchis UNECA</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Piassa Heritage</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Complimentary Coffee</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center hover:border-amber-500/50 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text mb-1 font-serif">15,000+</div>
            <div className="text-xs text-slate-400 font-medium">{t.statClients}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-center gap-1 text-3xl sm:text-4xl font-extrabold gold-gradient-text mb-1 font-serif">
              <span>4.9</span>
              <Star className="w-6 h-6 fill-amber-400 text-amber-400 inline" />
            </div>
            <div className="text-xs text-slate-400 font-medium">{t.statRating}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center hover:border-amber-500/50 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text mb-1 font-serif">12</div>
            <div className="text-xs text-slate-400 font-medium">{t.statBarbers}</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 text-center hover:border-amber-500/50 transition-colors">
            <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text mb-1 font-serif">3</div>
            <div className="text-xs text-slate-400 font-medium">{t.statBranches}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
