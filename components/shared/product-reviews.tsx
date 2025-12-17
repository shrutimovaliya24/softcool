'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  reviewer: string;
  date: string;
  rating: number;
  headline: string;
  body: string;
  helpful: number;
}

interface ProductReviewsProps {
  productId: number;
  reviews?: Review[];
}

export default function ProductReviews({ productId, reviews: initialReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'relevant' | 'recent' | 'rating'>('relevant');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    headline: '',
    body: '',
    reviewer: '',
  });

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
  }));

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // Most relevant (default order)
    });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      reviewer: newReview.reviewer || 'Anonymous',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rating: newReview.rating,
      headline: newReview.headline,
      body: newReview.body,
      helpful: 0,
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, headline: '', body: '', reviewer: '' });
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(reviews.map((r) =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 font-sans">
                Reviews
              </h2>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= Math.round(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 ml-1 sm:ml-2 font-sans">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-sans">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#009EDD] text-white rounded-lg font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity font-sans"
            >
              Leave a Review
            </button>
          </div>

          {/* Rating Distribution */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-6">
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-sans w-12">{rating} stars</span>
                  <div className="w-28 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#009EDD] transition-all"
                      style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-sans w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 font-sans">Filter by rating:</label>
              <select
                value={filterRating === null ? 'all' : filterRating}
                onChange={(e) => setFilterRating(e.target.value === 'all' ? null : parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-sans"
              >
                <option value="all">All stars</option>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} stars
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700 font-sans">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevant' | 'recent' | 'rating')}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-sans"
              >
                <option value="relevant">Most Relevant</option>
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 font-sans">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Your Name</label>
                <input
                  type="text"
                  value={newReview.reviewer}
                  onChange={(e) => setNewReview({ ...newReview, reviewer: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Headline</label>
                <input
                  type="text"
                  value={newReview.headline}
                  onChange={(e) => setNewReview({ ...newReview, headline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans"
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Review</label>
                <textarea
                  value={newReview.body}
                  onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-sans"
                  rows={4}
                  placeholder="Share your experience with this product"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#009EDD] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity font-sans"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors font-sans"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <p className="text-sm sm:text-base text-gray-600 text-center py-8 font-sans">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 font-sans">
                      {review.reviewer}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-sans">{review.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h5 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 font-sans">
                  {review.headline}
                </h5>
                <p className="text-sm sm:text-base text-gray-700 mb-3 font-sans">
                  {review.body}
                </p>
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Was this helpful? Yes ({review.helpful})</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

