'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export function SearchInterface() {
  const [routeNumber, setRouteNumber] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    // Normalize input: trim and remove leading zeros for numeric inputs
    const normalizedInput = routeNumber.trim().replace(/^0+/, '')
    if (normalizedInput) {
      router.push(`/route/${normalizedInput}`)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
        <input
          className="flex-grow px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm sm:text-base"
          type="text"
          placeholder="Search for a route (e.g., 01, 02, Bonfire)"
          value={routeNumber}
          onChange={(e) => setRouteNumber(e.target.value)}
        />
        <button
          className="mt-2 sm:mt-0 px-4 sm:px-6 py-2 sm:py-3 bg-red-700 text-white font-medium rounded-lg sm:rounded-l-none hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-200 text-sm sm:text-base"
          type="submit"
        >
          Search
        </button>
      </form>
      
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
        Try searching for popular routes like "Bonfire", "01", or "MSC"
      </p>
    </div>
  )
}