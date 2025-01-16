'use client'

import { StarIcon, UserIcon } from "lucide-react"

export function ReviewCard({ review }) {
  return (
    <div className="bg-gray-300 rounded-full p-4 sm:p-6">
      <div className="flex items-center space-x-3">
        <div className="bg-purple-200 rounded-full p-2">
          <UserIcon className="h-6 w-6 text-purple-700" />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">{review.userName}</h3>
            <div className="flex items-center ml-2">
              <StarIcon className="h-4 w-4 text-yellow-500" />
              <span className="ml-1 text-sm">{review.rating}</span>
            </div>
          </div>
          <p className="text-sm mt-1">{review.comment}</p>
        </div>
      </div>
    </div>
  )
} 