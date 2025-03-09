'use client'

import { StarIcon } from "lucide-react"

export function ReviewCard({ review }) {
  // Format the date
  const formattedDate = review.created_at 
    ? new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown date';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{review.user_name}</h3>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
        </div>
        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 font-semibold">{review.rating}</span>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{review.comment}</p>
    </div>
  )
} 