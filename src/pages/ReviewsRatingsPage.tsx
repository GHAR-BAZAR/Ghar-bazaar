import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Filter, 
  Heart,
  TrendingUp,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Review } from '../types';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const ReviewsRatingsPage: React.FC = () => {
  const { currentStore, currentStoreReviews, replyToReview, addReview } = useApp();

  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastText, setToastText] = useState<string | null>(null);

  // New review simulation modal
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustRating, setNewCustRating] = useState(5);
  const [newCustComment, setNewCustComment] = useState('');

  // Rating counts
  const totalReviews = currentStoreReviews.length;
  const averageRating = totalReviews > 0 
    ? (currentStoreReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const fiveStars = currentStoreReviews.filter(r => r.rating === 5).length;
  const fourStars = currentStoreReviews.filter(r => r.rating === 4).length;
  const threeStars = currentStoreReviews.filter(r => r.rating === 3).length;

  const filteredReviews = currentStoreReviews.filter(r => {
    if (selectedRatingFilter === 'all') return true;
    return r.rating === selectedRatingFilter;
  });

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToReview(reviewId, replyText);
    setReplyingReviewId(null);
    setReplyText('');
    setToastText('Reply published to storefront!');
    setTimeout(() => setToastText(null), 3000);
  };

  const handleGenerateAIReply = (customerName: string, comment: string) => {
    const isPraise = comment.toLowerCase().includes('good') || 
      comment.toLowerCase().includes('delicious') || 
      comment.toLowerCase().includes('reminds') ||
      comment.toLowerCase().includes('best');

    const reply = isPraise
      ? `Bahut bahut dhanyawad ${customerName.split(' ')[0]} ji! Hamari koshish hamesha shuddh aur taaza bhojan dene ki hoti hai. Aage bhi aise hi seva ka mauka dein!`
      : `Namaste ${customerName.split(' ')[0]} ji, aapke feedback ke liye shukriya. Hum is par turant dhyan denge aur agle order mein aapko aur behtar swad denge!`;

    setReplyText(reply);
  };

  const handleSimulateAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustComment) return;

    addReview({
      storeId: currentStore.id,
      customerName: newCustName,
      rating: newCustRating,
      comment: newCustComment,
      verifiedOrder: true
    });

    setToastText('Demo customer review posted!');
    setNewCustName('');
    setNewCustComment('');
    setShowAddReviewModal(false);
    setTimeout(() => setToastText(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastText && (
        <div className="fixed top-20 right-6 z-50 bg-forest-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-gold-400 animate-fade-in text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-gold-300" />
          <span>{toastText}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 text-forest-800 rounded-full text-xs font-bold border border-forest-200 mb-2">
            <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
            <span>Reputation & Social Proof</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-forest-950">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Build customer trust in your locality. Use AI auto-reply to thank loyal buyers in Hindi or English.
          </p>
        </div>

        <button
          onClick={() => setShowAddReviewModal(true)}
          className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition"
        >
          <MessageSquare className="w-4 h-4 text-gold-300" />
          <span>+ Simulate Customer Review</span>
        </button>
      </div>

      <DisclaimerBanner 
        featureName="Reviews and Sentiment Analysis"
        backendNeeded="Google Business Profile Reviews API and an LLM sentiment summarizer"
      />

      {/* Rating Overview Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Average Score Box */}
        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-5xl font-black text-forest-950">{averageRating}</span>
          <div className="flex text-gold-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold-400" />
            ))}
          </div>
          <p className="text-xs text-charcoal-500 font-medium">
            Based on {totalReviews} verified neighbor reviews
          </p>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mt-1">
            Top 5% Local Vendor Score
          </span>
        </div>

        {/* Stars Breakdown */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-forest-950">
            Rating Distribution
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-charcoal-700">5 Star</span>
              <div className="flex-1 h-2.5 bg-sand-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-forest-800 rounded-full" 
                  style={{ width: `${totalReviews > 0 ? (fiveStars / totalReviews) * 100 : 0}%` }} 
                />
              </div>
              <span className="w-8 text-right font-bold text-charcoal-800">{fiveStars}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-charcoal-700">4 Star</span>
              <div className="flex-1 h-2.5 bg-sand-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-forest-800 rounded-full" 
                  style={{ width: `${totalReviews > 0 ? (fourStars / totalReviews) * 100 : 0}%` }} 
                />
              </div>
              <span className="w-8 text-right font-bold text-charcoal-800">{fourStars}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-charcoal-700">3 Star</span>
              <div className="flex-1 h-2.5 bg-sand-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-forest-800 rounded-full" 
                  style={{ width: `${totalReviews > 0 ? (threeStars / totalReviews) * 100 : 0}%` }} 
                />
              </div>
              <span className="w-8 text-right font-bold text-charcoal-800">{threeStars}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-sand-100 rounded-lg text-charcoal-600 font-medium">
              👍 98% Taste satisfaction
            </span>
            <span className="px-2.5 py-1 bg-sand-100 rounded-lg text-charcoal-600 font-medium">
              🧼 96% Hygiene rating
            </span>
            <span className="px-2.5 py-1 bg-sand-100 rounded-lg text-charcoal-600 font-medium">
              ⏱️ 100% On-time preparation
            </span>
          </div>
        </div>

      </div>

      {/* Review Filter Bar & List */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        
        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-sand-200 flex items-center justify-between">
          <h3 className="font-bold text-base text-forest-950">Customer Feedback Feed</h3>
          
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedRatingFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedRatingFilter === 'all' ? 'bg-forest-800 text-white' : 'bg-sand-100 text-charcoal-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedRatingFilter(5)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedRatingFilter === 5 ? 'bg-forest-800 text-white' : 'bg-sand-100 text-charcoal-600'
              }`}
            >
              5 ★
            </button>
            <button
              onClick={() => setSelectedRatingFilter(4)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                selectedRatingFilter === 4 ? 'bg-forest-800 text-white' : 'bg-sand-100 text-charcoal-600'
              }`}
            >
              4 ★
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-y divide-sand-200 p-4 sm:p-6 space-y-4">
          {filteredReviews.map(rev => (
            <div key={rev.id} className="pt-4 first:pt-0 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-forest-950">{rev.customerName}</span>
                    {rev.verifiedOrder && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Verified Order
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gold-400 mt-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-charcoal-400">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                "{rev.comment}"
              </p>

              {/* Vendor Reply */}
              {rev.vendorReply ? (
                <div className="p-3 bg-forest-50 rounded-2xl border border-forest-200 text-xs text-forest-900 ml-3 space-y-1">
                  <div className="font-bold text-[10px] uppercase tracking-wider text-forest-800">
                    Your Response:
                  </div>
                  <p>{rev.vendorReply}</p>
                </div>
              ) : replyingReviewId === rev.id ? (
                <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-300 ml-3 space-y-2 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-forest-950">Compose Reply</span>
                    <button
                      type="button"
                      onClick={() => handleGenerateAIReply(rev.customerName, rev.comment)}
                      className="px-2.5 py-1 bg-gold-400 hover:bg-gold-500 text-forest-950 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-Generate AI Polite Reply</span>
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a polite response to thank the customer..."
                    className="w-full p-2.5 bg-white rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setReplyingReviewId(null)}
                      className="px-3 py-1.5 rounded-lg border border-sand-300 text-charcoal-600 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(rev.id)}
                      className="px-4 py-1.5 bg-forest-800 text-white rounded-lg font-bold flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post Reply</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setReplyingReviewId(rev.id);
                    setReplyText('');
                  }}
                  className="text-xs font-bold text-forest-800 hover:text-forest-900 underline ml-1"
                >
                  + Reply to {rev.customerName}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Simulate Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-sand-200">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200 mb-4">
              <h3 className="font-bold text-base text-forest-950">Add Demo Customer Review</h3>
              <button 
                onClick={() => setShowAddReviewModal(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSimulateAddReview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Customer Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harish Chandra"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Star Rating</label>
                <select
                  value={newCustRating}
                  onChange={(e) => setNewCustRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Outstanding)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars - Great)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars - Good)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-charcoal-800 block mb-1">Customer Review Comment*</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. The samosas were piping hot and filling was generous..."
                  value={newCustComment}
                  onChange={(e) => setNewCustComment(e.target.value)}
                  className="w-full px-3 py-2 bg-sand-50 rounded-xl border border-sand-300 focus:outline-none focus:border-forest-600"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="w-1/2 py-2 rounded-xl border border-sand-300 font-semibold text-charcoal-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold shadow-md"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
