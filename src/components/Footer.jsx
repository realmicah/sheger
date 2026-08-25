import React from 'react';
import { Scissors, Phone, MapPin, Send, Share2, Clock, Globe } from 'lucide-react';
import { translations } from '../data/barberData';

export default function Footer({ lang, setLang }) {
  return (
    <footer className="bg-[#05070a] border-t border-slate-800 text-slate-400 py-16 text-sm">
      <div className="container">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <Scissors className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <div className="text-xl font-bold tracking-wider gold-gradient-text uppercase font-serif">
                {lang === 'am' ? 'ሽገር ባርቤር ሾፕ' : 'Sheger Barber'}
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'am' 
                ? 'በአዲስ አበባ ምርጡን የጽዳት፣ የፀጉር ቁረጥ እና የፊት እንክብካቤ አገልግሎት በከፍተኛ ጥራት የምንሰጥበት የባለሙያዎች ቤት።' 
                : 'Elevating male grooming standards in Addis Ababa with luxury cuts, hot towel beard sculpting, and authentic Ethiopian hospitality.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://t.me/+251911129206" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors" title="Telegram (+251 911 129 206)">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors" title="Social Media">
                <Share2 className="w-4 h-4" />
              </a>
              <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')} className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-black transition-colors text-xs font-bold" title="Switch Language">
                {lang === 'en' ? 'AM' : 'EN'}
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services & Pricing</a></li>
              <li><a href="#styles" className="hover:text-amber-400 transition-colors">Hairstyle Visualizer</a></li>
              <li><a href="#team" className="hover:text-amber-400 transition-colors">Master Barbers</a></li>
              <li><a href="#vip" className="hover:text-amber-400 transition-colors">Sheger VIP Executive Club</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Client Testimonials</a></li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif">Branches</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Bole Medhanialem (Next to Edna Mall)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Kazanchis Executive (Opposite UNECA)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Piassa Heritage (Churchill Avenue)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-serif">Working Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Monday - Sunday: 8:00 AM - 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 pt-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-amber-300">+251 911 234 567</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Walk-ins welcomed • Reservations recommended
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Sheger Barber Shop Addis Ababa. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#home" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
