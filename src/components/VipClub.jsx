import React, { useState } from 'react';
import { Crown, CheckCircle2, Coffee, Sparkles, Gift, Send } from 'lucide-react';
import { translations } from '../data/barberData';
import confetti from 'canvas-confetti';

export default function VipClub({ lang }) {
  const t = translations[lang].vip;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setRegistered(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="vip" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#090b0e] via-[#12161f] to-[#090b0e]">
      
      {/* Background Accent Graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="glass-panel-gold rounded-3xl p-8 sm:p-14 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          
          {/* Top Decorative Crown */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="badge-gold mb-4 py-1.5 px-4">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{t.badge}</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
                {t.title}
              </h2>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-400/20 text-amber-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-200 text-sm sm:text-base font-medium">{t.benefit1}</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-400/20 text-amber-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-200 text-sm sm:text-base font-medium">{t.benefit2}</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-400/20 text-amber-400 mt-0.5">
                    <Coffee className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-200 text-sm sm:text-base font-medium">{t.benefit3}</span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-amber-400/20 text-amber-400 mt-0.5">
                    <Gift className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-slate-200 text-sm sm:text-base font-medium">{t.benefit4}</span>
                </li>
              </ul>

              <button
                onClick={() => { setShowModal(true); setRegistered(false); }}
                className="btn-gold py-4 px-8 text-base shadow-xl group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>{t.ctaJoin}</span>
              </button>
            </div>

            {/* Right Card Illustration */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 text-center relative shadow-2xl bg-gradient-to-br from-slate-900 to-black">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Crown className="w-9 h-9 text-slate-950 stroke-[2]" />
                </div>

                <div className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">
                  Gentleman Membership Card
                </div>
                <div className="text-xl font-bold text-white font-serif mb-6">
                  SHEGER VIP MEMBER
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between text-left text-xs">
                  <div>
                    <div className="text-slate-400">Card ID</div>
                    <div className="font-mono text-amber-300 font-bold">#SHG-8842</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Status</div>
                    <div className="text-emerald-400 font-bold">ACTIVE</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* VIP Registration Modal */}
      {showModal && (
        <div className="modal-backdrop z-50">
          <div className="glass-panel-gold p-8 rounded-3xl max-w-md w-full relative animate-fadeIn border border-amber-500/50 shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            {!registered ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-serif">{t.modalTitle}</h3>
                </div>

                <p className="text-slate-300 text-xs mb-6">
                  {lang === 'am' ? 'የሽገር VIP ክለብ አባል በመሆን ልዩ ቅናሾችና አገልግሎቶችን ያግኙ።' : 'Join the VIP Executive Club to claim instant discounts and free grooming rewards.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / ሙሉ ስም</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Abebe Bikila"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Ethiopia) / ስልክ ቁጥር</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+251 911 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address (Optional)</label>
                    <input 
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full justify-center py-3.5 mt-2 text-sm">
                    <Send className="w-4 h-4" />
                    <span>Register Now</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">Welcome to VIP Club!</h3>
                <p className="text-slate-300 text-xs mb-6">
                  {lang === 'am' 
                    ? `እንኳን ደስ አለዎት ${formData.name}! የVIP አባልነትዎ ተረጋግጧል። በስልክዎ መልእክት ይደርስዎታል።`
                    : `Congratulations ${formData.name}! Your VIP Executive membership card is active. SMS confirmation sent to ${formData.phone}.`}
                </p>
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-gold py-2.5 px-6 text-xs mx-auto"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
