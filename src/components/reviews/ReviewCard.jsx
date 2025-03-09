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
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base text-black">{review.user_name}</h3>
          <p className="text-gray-500 text-xs">{formattedDate}</p>
        </div>
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 text-sm font-medium text-black">{review.rating}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
    </div>
  )
} 