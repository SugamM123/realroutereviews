'use client'

import { ReviewCard } from "./ReviewCard"

export function ReviewList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
} 