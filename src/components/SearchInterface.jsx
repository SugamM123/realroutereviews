'use client'

import { Input } from "@/components/ui/input"
import { UserIcon, XIcon } from "lucide-react"
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
    <div className="flex flex-col items-center justify-between min-h-screen w-full bg-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-4xl flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12 mt-20 sm:mt-24 md:mt-32 lg:mt-40 mb-auto">
        <div className="bg-gray-300 rounded-full p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex items-center justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-700 text-center">
            Real Route Reviews
          </h1>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <Input
            type="text"
            value={routeNumber}
            onChange={(e) => setRouteNumber(e.target.value)}
            placeholder="Enter Route Number (e.g., 34)"
            className="w-full pl-4 pr-10 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full bg-white text-black"
          />
          <button 
            type="button"
            onClick={() => setRouteNumber("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <XIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-gray-400" />
          </button>
        </form>
      </div>

      <div className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 mt-20 sm:mt-24 md:mt-32 lg:mt-40">
        <div className="bg-purple-200 rounded-full p-3 sm:p-4 md:p-5 lg:p-6">
          <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-purple-700" />
        </div>
        <div className="bg-purple-200 rounded-full p-3 sm:p-4 md:p-5 lg:p-6">
          <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-purple-700" />
        </div>
      </div>
    </div>
  )
}