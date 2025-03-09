'use client'

import { StarIcon, ClockIcon, BusIcon, UserIcon } from "lucide-react"
import { normalizeRouteId } from "@/lib/utils"

export function RouteHeader({ id, name, rating, description, stops, ratings }) {
  // Normalize the ID for display
  const displayId = normalizeRouteId(id)
  
  // Default ratings if not provided
  const defaultRatings = {
    punctuality: rating,
    cleanliness: rating,
    crowdedness: rating
  }
  
  // Use provided ratings or defaults
  const displayRatings = ratings || defaultRatings

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shadow-md p-6 sm:p-8 text-black">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
        {/* Left side - Title and overall rating */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700">
            {name} <span className="text-red-600">{displayId}</span>
          </h1>
          <div className="flex items-center mt-2">
            <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="ml-2 text-lg font-medium">{rating} overall rating</span>
          </div>
        </div>
        
        {/* Right side - Detailed ratings */}
        <div className="bg-white bg-opacity-70 rounded-xl p-3 shadow-sm">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium">Punctuality:</span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`h-4 w-4 ${
                      star <= displayRatings.punctuality 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <BusIcon className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium">Cleanliness:</span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`h-4 w-4 ${
                      star <= displayRatings.cleanliness 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-medium">Crowdedness:</span>
              <div className="ml-2 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon 
                    key={star}
                    className={`h-4 w-4 ${
                      star <= displayRatings.crowdedness 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description and Stops */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Description</h2>
          <p className="text-gray-700">{description}</p>
        </div>
        
        <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Stops</h2>
          <ul className="space-y-1">
            {stops.map((stop, index) => (
              <li key={index} className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-red-600 mr-2"></span>
                {stop}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 