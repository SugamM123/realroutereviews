'use client'

import { RouteHeader } from "@/components/route/RouteHeader"
import { RouteStats } from "@/components/route/RouteStats"

// Fake data
const FAKE_ROUTE_DATA = {
  rating: 4.5,
  stats: {
    onTime: "4.2/5",
    overall: "4.5/5",
    reliability: "4.6/5"
  }
}

export default function RoutePage({ params }) {
  const { id } = params
  
  return (
    <div className="min-h-screen bg-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <RouteHeader id={id} rating={FAKE_ROUTE_DATA.rating} />
        <RouteStats stats={FAKE_ROUTE_DATA.stats} />
      </div>
    </div>
  )
}
