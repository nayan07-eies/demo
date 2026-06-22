import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { api } from '../../services/api'; // ✨ UPDATED IMPORT

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      // ✨ UPDATED: Call from the api object
      const data = await api.getProductReviews(productId);
      setReviews(data);
      calculateAverage(data);
    };
    fetchReviews();
  }, [productId]);

  const calculateAverage = (reviewData) => {
    if (reviewData.length === 0) return setAverageRating(0);
    const sum = reviewData.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating(Math.round((sum / reviewData.length) * 10) / 10);
  };

  const handleNewReview = async (newReview) => {
    // ✨ UPDATED: Call from the api object
    const updatedReviews = await api.submitReview(newReview);
    setReviews(updatedReviews);
    calculateAverage(updatedReviews);
  };

  return (
    <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      <h2 className="text-2xl font-black uppercase tracking-widest mb-6 text-slate-900 dark:text-white">Customer Data Logs</h2>
      
      {/* Summary */}
      <div className="flex items-center gap-4 mb-8">
        <StarRating rating={Math.round(averageRating)} readOnly />
        <span className="text-lg font-medium">{averageRating} out of 5</span>
        <span className="text-slate-500 text-sm tracking-widest uppercase">({reviews.length} logs)</span>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-slate-500 italic">No operational data recorded yet. Be the first to initialize a log!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-slate-200 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} readOnly />
                <span className="font-semibold text-slate-900 dark:text-white">{review.userName}</span>
                <span className="text-xs text-slate-500 tracking-widest uppercase ml-2">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Submit Form */}
      <ReviewForm productId={productId} onReviewSubmitted={handleNewReview} />
    </div>
  );
};

export default ReviewList;