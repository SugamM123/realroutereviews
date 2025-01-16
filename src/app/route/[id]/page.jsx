'use client'

import { RouteHeader } from "@/components/route/RouteHeader"
import { RouteStats } from "@/components/route/RouteStats"
import { ReviewList } from "@/components/reviews/ReviewList"
import { ReviewForm } from "@/components/reviews/ReviewForm"

const FAKE_ROUTE_DATA = {
  rating: 4.5,
  stats: {
    onTime: "4.2/5",
    overall: "4.5/5",
    reliability: "4.6/5"
  },
  reviews: [
    {
      id: 1,
      userName: "John D.",
      rating: 4,
      comment: "Usually on time, clean buses"
    },
    {
      id: 2,
      userName: "Sarah M.",
      rating: 5,
      comment: "Great service, friendly drivers"
    },
    {
      id: 3,
      userName: "Mike R.",
      rating: 4,
      comment: "Reliable route, but sometimes crowded"
    }
  ]
}

export default function RoutePage({ params }) {
  const { id } = params
  
  return (
    <div className="min-h-screen bg-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <RouteHeader id={id} rating={FAKE_ROUTE_DATA.rating} />
        <RouteStats stats={FAKE_ROUTE_DATA.stats} />
        <ReviewForm routeId={id} />
        <ReviewList reviews={FAKE_ROUTE_DATA.reviews} />
      </div>
    </div>
  )
} 