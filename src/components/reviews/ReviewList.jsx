'use client'

import { ReviewCard } from "./ReviewCard"

export function ReviewList({ reviews }) {
  return (
    <div className="space-y-3 sm:space-y-4 px-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
} 