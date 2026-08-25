import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, User } from 'lucide-react';
import { translations, initialReviews, branchesData } from '../data/barberData';

export default function ReviewsSection({ lang }) {
  const t = translations[lang].reviews;
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    branch: 'Bole Medhanialem',
    rating: 5,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      branch: newReview.branch,
      rating: Number(newReview.rating),
      date: "Just now",
      commentEn: newReview.comment,
      commentAm: newReview.comment
    };

    setReviewsList([reviewObj, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setSubmitted(false);
      setNewReview({ name: '', branch: 'Bole Medhanialem', rating: 5, comment: '' });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-24 relative bg-[#090b0e]">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="badge-gold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{lang === 'am' ? 'የደንበኞች ምስክሮች' : 'Customer Reviews'}</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-bold text-white mb-3 ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
              {t.title}
            </h2>
            <p className="text-slate-400 text-base max-w-xl">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-gold py-3 px-6 text-sm shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.writeReview}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map(review => (
            <div 
              key={review.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm mb-6 leading-relaxed italic">
                  "{lang === 'am' ? review.commentAm : review.commentEn}"
                </p>
              </div>

              {/* Reviewer Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{review.name}</div>
                  <div className="text-[11px] text-amber-400/80">{review.branch}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="modal-backdrop z-50">
          <div className="glass-panel-gold p-8 rounded-3xl max-w-md w-full relative animate-fadeIn border border-amber-500/50">
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>

            {!submitted ? (
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-serif">{t.writeReview}</h3>
                <p className="text-slate-300 text-xs mb-6">
                  {lang === 'am' ? 'እባክዎን በሽገር ባርቤር ሾፕ የነበረዎትን ልምድ ያካፍሉን።' : 'Share your recent grooming experience at Sheger Barber Shop.'}
                </p>

                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t.formName}</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Dawit Tadesse"
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t.formBranch}</label>
                    <select
                      value={newReview.branch}
                      onChange={(e) => setNewReview({...newReview, branch: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    >
                      {branchesData.map(b => (
                        <option key={b.id} value={b.nameEn}>{lang === 'am' ? b.nameAm : b.nameEn}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t.formRating}</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t.formComment}</label>
                    <textarea 
                      rows="3"
                      required
                      placeholder="Write your review here..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold w-full justify-center py-3 text-sm">
                    {t.submitReview}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-1">Thank You!</h4>
                <p className="text-slate-300 text-xs">Your review has been published.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
