'use client'

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchInterface() {
  const [routeNumber, setRouteNumber] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (routeNumber.trim()) {
      router.push(`/route/${routeNumber}`)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center border-b border-b-2 border-gray-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search for a route (e.g., 01, 02, Bonfire)"
            value={routeNumber}
            onChange={(e) => setRouteNumber(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-red-700 hover:bg-red-800 border-red-700 hover:border-red-800 text-sm border-4 text-white py-1 px-4 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      <h2 className="text-lg text-center mb-4 mt-40">Meet the Dev</h2>

      <div className="flex justify-center mt-4">
        <Image 
          src="/dev.jpg" 
          alt="Meet the Dev" 
          width={150} 
          height={150} 
          className="rounded-full" 
        />
      </div>
    </div>
  )
}