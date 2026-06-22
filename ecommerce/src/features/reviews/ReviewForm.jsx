import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a comment.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      productId,
      userId: 'currentUser123', // In a real app, get from Auth Context
      userName: 'Guest User',
      rating,
      comment,
      date: new Date().toISOString(),
    };

    onReviewSubmitted(newReview);
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <StarRating rating={rating} onRatingChange={setRating} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
        <textarea
          rows="4"
          className="w-full p-2 border rounded-md"
          placeholder="Share your thoughts about this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;