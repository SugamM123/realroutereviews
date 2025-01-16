'use client'

import { ReviewCard } from "./ReviewCard"

export function ReviewList({ reviews }) {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold text-red-700 text-center">Recent Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
} 