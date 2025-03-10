'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { searchRoutes } from "@/lib/api" // Import the searchRoutes function

export function SearchInterface() {
  const [routeNumber, setRouteNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSearch = async (e) => {
    e.preventDefault()
    const rawInput = routeNumber.trim()
    
    if (!rawInput) return
    
    setIsSearching(true)
    setError(null)
    
    try {
      // First try to search for routes matching the input
      const routes = await searchRoutes(rawInput)
      
      if (routes && routes.length > 0) {
        // If routes found, navigate to the first matching route
        router.push(`/route/${routes[0].id}`)
      } else {
        // If no routes found, try direct navigation (will show error if not found)
        router.push(`/route/${encodeURIComponent(rawInput)}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      setError("Failed to search for routes. Please try again.")
    } finally {
      setIsSearching(false)
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
          disabled={isSearching}
        />
        <button
          className="mt-2 sm:mt-0 px-4 sm:px-6 py-2 sm:py-3 bg-red-700 text-white font-medium rounded-lg sm:rounded-l-none hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-colors duration-200 text-sm sm:text-base"
          type="submit"
          disabled={isSearching}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
        Try searching for popular routes like "Bonfire", "01", or "MSC"
      </p>
    </div>
  )
}