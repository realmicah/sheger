import React, { useState } from 'react';
import { Camera, Check, Heart, Sparkles, Scissors } from 'lucide-react';
import { translations } from '../data/barberData';

export default function StyleVisualizer({ lang, onOpenBooking }) {
  const t = translations[lang].styles;
  const [activeTab, setActiveTab] = useState('all');
  const [likedStyles, setLikedStyles] = useState({});

  const styleItems = [
    {
      id: 'style-1',
      titleEn: "Sheger High Skin Fade & Lineup",
      titleAm: "የሽገር ሀይ ስኪን ፌድ እና መስመር",
      category: 'fade',
      image: "/fade_cut.jpg",
      recommendedBarber: "Master Abel",
      likesCount: 248
    },
    {
      id: 'style-2',
      titleEn: "Royal Steam Beard & Sharp Edges",
      titleAm: "ሮያል የሞቀ ፎጣ ጺም ዲዛይን",
      category: 'beard',
      image: "/beard_steam.jpg",
      recommendedBarber: "Master Dawit",
      likesCount: 312
    },
    {
      id: 'style-3',
      titleEn: "Modern Afro Taper Fade",
      titleAm: "ዘመናዊ አፍሮ ቴፐር ፌድ",
      category: 'afro',
      image: "/master_abel.jpg",
      recommendedBarber: "Master Abel",
      likesCount: 189
    },
    {
      id: 'style-4',
      titleEn: "Executive Scissors Cut & Parting",
      titleAm: "ኤግዚክዩቲቭ የፀጉር ቁረጥ",
      category: 'executive',
      image: "/master_dawit.jpg",
      recommendedBarber: "Master Solomon",
      likesCount: 275
    }
  ];

  const toggleLike = (id) => {
    setLikedStyles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredStyles = activeTab === 'all' 
    ? styleItems 
    : styleItems.filter(s => s.category === activeTab);

  return (
    <section id="styles" className="py-24 relative bg-[#0b0e14]">
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-gold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === 'am' ? 'የስታይል ማกล' : 'Visualizer'}</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-4 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
            {t.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', name: t.all },
            { id: 'fade', name: t.fade },
            { id: 'beard', name: t.beard },
            { id: 'afro', name: t.afro },
            { id: 'executive', name: t.executive }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Style Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStyles.map(item => {
            const isLiked = likedStyles[item.id];
            const currentLikes = item.likesCount + (isLiked ? 1 : 0);

            return (
              <div 
                key={item.id}
                className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-transparent to-transparent"></div>

                  {/* Like Button */}
                  <button 
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 backdrop-blur-md text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Recommended Barber tag */}
                  <div className="absolute bottom-3 left-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] px-2.5 py-1 rounded-md">
                    Recommended: {item.recommendedBarber}
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className={`text-base font-bold text-white mb-2 ${lang === 'am' ? 'font-amharic' : ''}`}>
                      {lang === 'am' ? item.titleAm : item.titleEn}
                    </h3>
                    <div className="text-xs text-slate-400 mb-4">
                      ❤️ {currentLikes} clients saved this look
                    </div>
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="btn-outline w-full py-2 text-xs justify-center font-semibold hover:bg-amber-400 hover:text-black hover:border-amber-400"
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{t.selectStyle}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
