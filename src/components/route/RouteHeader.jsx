'use client'

import { StarIcon } from "lucide-react"
import { normalizeRouteId } from "@/lib/utils"

export function RouteHeader({ id, name, rating }) {
  // Normalize the ID for display
  const displayId = normalizeRouteId(id)
  
  return (
    <div className="bg-gray-300 rounded-full p-4 sm:p-6 md:p-8 lg:p-10 text-black">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700 text-center">
        {name} {displayId}
      </h1>
      <div className="flex items-center justify-center mt-2">
        <StarIcon className="h-5 w-5 text-yellow-500" />
        <span className="ml-2 text-lg">{rating} overall rating</span>
      </div>
    </div>
  )
} 