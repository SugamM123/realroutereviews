'use client'

import { StarIcon, ClockIcon, BusIcon, UserIcon } from "lucide-react"

export function ReviewCard({ review }) {
  // Format the date
  const formattedDate = review.created_at 
    ? new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown date';

  // Rating display component
  const RatingDisplay = ({ value, icon: Icon, label }) => (
    <div className="flex items-center">
      <Icon className="h-4 w-4 text-red-600 mr-1" />
      <span className="text-xs font-medium text-gray-700">{label}:</span>
      <div className="flex ml-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon 
            key={star}
            className={`h-3 w-3 ${
              star <= value 
                ? "text-yellow-500 fill-yellow-500" 
                : "text-gray-300"
            }`} 
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-base text-gray-800">{review.user_name}</h3>
          <p className="text-gray-500 text-xs">{formattedDate}</p>
        </div>
        <div className="flex items-center bg-red-50 px-2 py-1 rounded-full">
          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="ml-1 text-sm font-bold text-red-700">{review.rating}</span>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-lg">
        <RatingDisplay 
          value={review.punctuality || review.rating} 
          icon={ClockIcon} 
          label="Punctuality" 
        />
        <RatingDisplay 
          value={review.cleanliness || review.rating} 
          icon={BusIcon} 
          label="Cleanliness" 
        />
        <RatingDisplay 
          value={review.crowdedness || review.rating} 
          icon={UserIcon} 
          label="Crowdedness" 
        />
      </div>
      
      <p className="mt-3 text-sm text-gray-700 border-t border-gray-100 pt-3">{review.comment}</p>
    </div>
  )
} 