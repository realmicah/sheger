import React, { useState, useEffect } from 'react';
import { Scissors, Phone, Clock, Globe, Calendar, Menu, X } from 'lucide-react';
import { translations } from '../data/barberData';

export default function Navbar({ lang, setLang, onOpenBooking }) {
  const t = translations[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Compute live Addis Ababa time status (UTC+3)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Check Addis Ababa Time
    const checkOpenStatus = () => {
      const now = new Date();
      // Addis Ababa is UTC+3
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const eatTime = new Date(utc + (3600000 * 3));
      const hours = eatTime.getHours();
      // Shop open from 8:00 AM (8) to 10:00 PM (22)
      setIsOpenNow(hours >= 8 && hours < 22);
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Scissors className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <div className={`text-xl font-bold tracking-wider gold-gradient-text uppercase ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
              {lang === 'am' ? 'ሽገር ባርቤር ሾፕ' : 'Sheger Barber'}
            </div>
            <div className="text-[10px] text-amber-200/70 tracking-[0.2em] uppercase font-semibold">
              Addis Ababa • Est. 2018
            </div>
          </div>
        </a>

        {/* Live Open Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/20 text-xs text-slate-300">
          <span className={`w-2.5 h-2.5 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-rose-500'}`}></span>
          <span className="font-medium text-slate-200">
            {isOpenNow ? (lang === 'am' ? 'አሁን ክፍት ነው (8:00 - 22:00)' : 'OPEN NOW (8 AM - 10 PM EAT)') : (lang === 'am' ? 'አሁን ዝግ ነው' : 'CLOSED NOW')}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#services" className="text-slate-300 hover:text-amber-400 transition-colors">{t.services}</a>
          <a href="#styles" className="text-slate-300 hover:text-amber-400 transition-colors">{t.styles}</a>
          <a href="#team" className="text-slate-300 hover:text-amber-400 transition-colors">{t.team}</a>
          <a href="#vip" className="text-slate-300 hover:text-amber-400 transition-colors">{t.vip}</a>
          <a href="#reviews" className="text-slate-300 hover:text-amber-400 transition-colors">{t.reviews}</a>
          <a href="#locations" className="text-slate-300 hover:text-amber-400 transition-colors">{t.contact}</a>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer"
            title="Switch Language / ቋንቋ ይቀይሩ"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}</span>
          </button>

          {/* Direct Phone Call Button */}
          <a 
            href="tel:+251911234567" 
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-all"
            title="Call Addis Ababa Shop"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Primary Book Now CTA */}
          <button onClick={onOpenBooking} className="btn-gold text-xs py-2.5 px-4">
            <Calendar className="w-4 h-4" />
            <span>{t.bookNow}</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="px-2.5 py-1 rounded bg-slate-800 border border-amber-500/30 text-amber-300 text-xs"
          >
            {lang === 'en' ? 'AM' : 'EN'}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-amber-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-amber-500/20 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.openHours}
            </div>
          </div>
          
          <nav className="flex flex-col gap-3 font-medium text-slate-200">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.services}</a>
            <a href="#styles" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.styles}</a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.team}</a>
            <a href="#vip" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.vip}</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.reviews}</a>
            <a href="#locations" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1">{t.contact}</a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} 
              className="btn-gold w-full justify-center text-sm py-3"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
            <a 
              href="tel:+251911234567" 
              className="btn-outline w-full justify-center text-sm py-3"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+251 911 234 567</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
