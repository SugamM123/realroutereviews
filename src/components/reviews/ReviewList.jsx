'use client'

import { ReviewCard } from "./ReviewCard"

export function ReviewList({ reviews }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-red-700">Reviews:</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4">
            <ReviewCard review={review} />
          </div>
        ))
      )}
    </div>
  );
} 