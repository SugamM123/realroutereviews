'use client'

import { StarIcon } from "lucide-react"
import { normalizeRouteId } from "@/lib/utils"

export function RouteHeader({ id, name, rating }) {
  // Normalize the ID for display
  const displayId = normalizeRouteId(id)
  
  return (
    <div className="bg-gray-200 rounded-lg sm:rounded-full p-4 sm:p-6 md:p-8 lg:p-10 text-black">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-700 text-center">
        {name} {displayId}
      </h1>
      <div className="flex items-center justify-center mt-2">
        <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
        <span className="ml-2 text-base sm:text-lg">{rating} overall rating</span>
      </div>
    </div>
  )
} 